// Private, expiring owner-authorized INR 1 integration check; no product fulfilment.
import {createHash,timingSafeEqual} from 'node:crypto';
import {signOrder,orderSummary} from './razorpay-checkout.mjs';
const DEADLINE=Date.parse('2026-10-17T16:30:00Z');
const TOKEN_HASH='48f6210df7cf6f2f9d2f28f11213d114a5a514cded0b84f318a712eed6ff5f1b';
const RECEIPT='ZV-LIVE-CHECK-20261017';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow'};
const json=(statusCode,data)=>({statusCode,headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify(data)});
const page=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ZIVASHA — ₹1 live payment check</title><style>body{margin:0;background:#f7f0e4;color:#4e1f30;font:18px/1.6 system-ui}main{max-width:620px;margin:8vh auto;padding:32px}h1{font:42px Georgia}.badge{background:#e9dbb5;padding:8px 12px;display:inline-block;font-weight:bold}button{background:#532037;color:white;border:0;border-radius:8px;padding:16px 24px;font-size:18px;cursor:pointer}</style><main><p>ZIVASHA</p><p class="badge">LIVE PAYMENT · ₹1 TOTAL</p><h1>Check your live checkout.</h1><p>This is an owner-authorized real ₹1 payment to verify the website. It is not a product order and will not be fulfilled. No automatic refund is initiated.</p><p>Continue opens the website’s regular Razorpay checkout. Complete UPI or bank approval yourself.</p><button id="start">Open ₹1 live checkout</button><p id="status" role="status"></p></main><script>document.getElementById('start').onclick=async function(){this.disabled=true;const status=document.getElementById('status');status.textContent='Preparing the confirmed ₹1 checkout…';try{const accessToken=location.hash.slice(1);const r=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accessToken})});const d=await r.json();if(!r.ok)throw Error(d.error||'Unable to open checkout');location.replace(d.paymentUrl)}catch(e){status.textContent=e.message;this.disabled=false}};</script></html>`;
export async function runLiveTest(event,{env=process.env,fetcher=fetch,now=Date.now()}={}){
 if(now>=DEADLINE)return json(410,{error:'This private payment check has expired.'});
 if(event.httpMethod==='GET')return {statusCode:200,headers:{...headers,'Content-Type':'text/html; charset=utf-8'},body:page};
 if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed.'});
 if(!['https://zivasha.in','https://www.zivasha.in'].includes(event.headers?.origin||event.headers?.Origin))return json(403,{error:'Use the ZIVASHA website.'});
 if(event.isBase64Encoded||(event.body||'').length>150)return json(400,{error:'Invalid request.'});
 let accessToken;try{({accessToken}=JSON.parse(event.body||'{}'));}catch{return json(400,{error:'Invalid request.'});}
 if(typeof accessToken!=='string'||!/^[a-f0-9]{64}$/.test(accessToken)||!timingSafeEqual(createHash('sha256').update(accessToken).digest(),Buffer.from(TOKEN_HASH,'hex')))return json(403,{error:'This private link is invalid.'});
 const key=env.RAZORPAY_KEY_ID,secret=env.RAZORPAY_KEY_SECRET;
 if(!key?.startsWith('rzp_live_')||!secret)return json(503,{error:'Live payment credentials are not available.'});
 const auth={Authorization:`Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`,'Content-Type':'application/json'};
 const notes={source:'zivasha-confirmed-order',description:'Owner-authorized INR 1 live payment check — no product fulfilment',subtotal_paise:'100',gst_paise:'0',delivery_paise:'0',delivery_gst_paise:'0'};
 try{
  const found=await fetcher(`https://api.razorpay.com/v1/orders?receipt=${RECEIPT}&count=100`,{headers:auth,signal:AbortSignal.timeout(10000)});
  if(!found.ok)return json(502,{error:'Could not check existing live orders. No new order created.'});
  const matches=(await found.json()).items.filter(o=>o.receipt===RECEIPT);
  if(matches.length>1)return json(409,{error:'Multiple matching orders found. Inspect Razorpay before retrying.'});
  let order=matches[0];
  if(!order){
   const result=await fetcher('https://api.razorpay.com/v1/orders',{method:'POST',headers:auth,body:JSON.stringify({amount:100,currency:'INR',receipt:RECEIPT,partial_payment:false,notes}),signal:AbortSignal.timeout(10000)});
   if(!result.ok)return json(502,{error:'Order creation could not be confirmed. Inspect Razorpay before retrying.'});
   order=await result.json();
  }
  orderSummary(order);
  if(order.amount!==100||order.receipt!==RECEIPT||Object.entries(notes).some(([k,v])=>order.notes[k]!==v))throw Error('Unexpected order');
  const expires=Math.min(Math.floor(now/1000)+1800,Math.floor(DEADLINE/1000));
  const fragment=new URLSearchParams({order:order.id,expires:String(expires),token:signOrder(order.id,expires,secret)});
  return json(200,{liveMode:true,paymentUrl:`https://zivasha.in/payment/#${fragment}`});
 }catch{return json(502,{error:'Could not verify the live test order. Inspect Razorpay before retrying. Do not pay again if money was debited.'});}
}
export const handler=event=>runLiveTest(event);
