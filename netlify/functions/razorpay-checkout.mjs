import {createHmac,timingSafeEqual} from 'node:crypto';

const reply=(statusCode,data)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'},body:JSON.stringify(data)});
export function signOrder(orderId,expires,secret){return createHmac('sha256',secret).update(`zivasha-confirmed-checkout-v1|${orderId}|${expires}`).digest('hex');}
function equalHex(a,b){return /^[a-f0-9]{64}$/.test(a||'')&&/^[a-f0-9]{64}$/.test(b||'')&&timingSafeEqual(Buffer.from(a,'hex'),Buffer.from(b,'hex'));}
export function validAccess(data,secret,now=Math.floor(Date.now()/1000)){
 return /^order_[A-Za-z0-9]{6,40}$/.test(data.orderId||'')&&Number.isSafeInteger(data.expires)&&data.expires>now&&data.expires<=now+8*86400&&equalHex(data.token,signOrder(data.orderId,data.expires,secret));
}
export function orderSummary(order){
 const notes=order.notes||{};
 const amounts=['subtotal_paise','gst_paise','delivery_paise','delivery_gst_paise'].map(k=>/^\d+$/.test(String(notes[k]??''))?Number(notes[k]):NaN);
 if(notes.source!=='zivasha-confirmed-order'||order.currency!=='INR'||!Number.isSafeInteger(order.amount)||order.amount<100||amounts.some(n=>!Number.isSafeInteger(n)||n<0)||amounts.reduce((a,b)=>a+b,0)!==order.amount)throw new Error('Unconfirmed order');
 return {orderId:order.id,reference:order.receipt,amount:order.amount,currency:'INR',subtotal:amounts[0],gst:amounts[1],delivery:amounts[2],deliveryGst:amounts[3],status:order.status,description:notes.description||'Confirmed ZIVASHA order'};
}
export async function handleCheckout(event,{env=process.env,fetcher=fetch,now=Math.floor(Date.now()/1000)}={}){
 if(event.httpMethod!=='POST')return reply(405,{error:'Use POST.'});
 const origin=event.headers?.origin||event.headers?.Origin;
 const allowed=new Set(['https://zivasha.in','https://www.zivasha.in','https://zivasha.netlify.app',env.DEPLOY_PRIME_URL].filter(Boolean));
 if(!origin||!allowed.has(origin))return reply(403,{error:'Please use the ZIVASHA website.'});
 if((event.body||'').length>4096||event.isBase64Encoded)return reply(400,{error:'Invalid request.'});
 let data;try{data=JSON.parse(event.body||'{}');}catch{return reply(400,{error:'Invalid request.'});}
 const key=env.RAZORPAY_KEY_ID,secret=env.RAZORPAY_KEY_SECRET;
 if(!key||!secret)return reply(503,{error:'Online payment is not available yet. Please contact ZIVASHA.'});
 if(!validAccess(data,secret,now))return reply(403,{error:'This payment link is invalid or expired. Ask ZIVASHA for a fresh confirmed-order link.'});
 if(!['open','verify'].includes(data.action))return reply(400,{error:'Invalid request.'});
 async function get(path){
  const result=await fetcher(`https://api.razorpay.com/v1/${path}`,{headers:{Authorization:`Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`},signal:AbortSignal.timeout(10000)});
  if(!result.ok)throw new Error('Provider unavailable');return result.json();
 }
 try{
  const order=await get(`orders/${data.orderId}`);const summary=orderSummary(order);
  if(order.id!==data.orderId)throw new Error('Order mismatch');
  if(data.action==='open')return reply(200,{...summary,keyId:key,testMode:key.startsWith('rzp_test_')});
  if(!/^pay_[A-Za-z0-9]{6,40}$/.test(data.paymentId||'')||!equalHex(data.signature,createHmac('sha256',secret).update(`${order.id}|${data.paymentId}`).digest('hex')))return reply(400,{error:'Payment verification failed. Please contact ZIVASHA before retrying payment.'});
  const payment=await get(`payments/${data.paymentId}`);
  if(payment.order_id!==order.id||payment.currency!=='INR'||payment.amount!==order.amount)return reply(400,{error:'Payment details do not match this order.'});
  const received=payment.status==='captured'&&order.status==='paid'&&payment.amount_refunded===0;
  return reply(200,{...summary,received,paymentId:payment.id,paymentStatus:payment.status,testMode:key.startsWith('rzp_test_')});
 }catch{return reply(502,{error:'We could not verify this order with Razorpay. Do not pay again if money was debited; contact ZIVASHA with your reference.'});}
}
export const handler=event=>handleCheckout(event);
