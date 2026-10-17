// Temporary, owner-requested sandbox check. Cannot create a live-money order.
import {signOrder,orderSummary} from './razorpay-checkout.mjs';
const DEADLINE=Date.parse('2026-10-17T16:30:00Z');
const RECEIPT='ZV-SANDBOX-20261017';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const json=(statusCode,data)=>({statusCode,headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify(data)});
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>ZIVASHA — Payment test</title><style>body{margin:0;background:#f7f0e4;color:#4e1f30;font:18px/1.6 system-ui}main{max-width:620px;margin:10vh auto;padding:36px}h1{font:42px Georgia}button{background:#532037;color:#fff;border:0;border-radius:8px;padding:16px 24px;font-size:18px;cursor:pointer}.badge{display:inline-block;background:#efe0bc;padding:6px 12px;font-weight:bold}</style><main><p>ZIVASHA</p><p class="badge">RAZORPAY TEST MODE</p><h1>Let’s check your payment flow.</h1><p>This simulates a <strong>₹1 payment</strong>. No real money will be charged and no product order will be fulfilled.</p><p>Continue opens the same website checkout and server-side payment verification used for confirmed quotations.</p><button id="start">Open ₹1 simulated checkout</button><p id="status" role="status"></p></main><script>document.getElementById('start').onclick=async function(){this.disabled=true;const status=document.getElementById('status');status.textContent='Preparing the sandbox order…';try{const r=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});const d=await r.json();if(!r.ok)throw Error(d.error||'Unable to open test');location.assign(d.paymentUrl)}catch(e){status.textContent=e.message;this.disabled=false}};</script></html>`;
export async function runSandbox(event,{env=process.env,fetcher=fetch,now=Date.now()}={}){
 if(now>=DEADLINE)return json(410,{error:'This temporary payment test has ended.'});
 const key=env.RAZORPAY_KEY_ID,secret=env.RAZORPAY_KEY_SECRET;
 if(!key?.startsWith('rzp_test_')||!secret)return json(403,{error:'Sandbox unavailable. This test never runs with live payment credentials.'});
 if(event.httpMethod==='GET')return {statusCode:200,headers:{...headers,'Content-Type':'text/html; charset=utf-8'},body:html};
 if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed.'});
 if(!['https://zivasha.in','https://www.zivasha.in'].includes(event.headers?.origin||event.headers?.Origin))return json(403,{error:'Open this test on the ZIVASHA website.'});
 if((event.body||'').length>100)return json(400,{error:'Invalid test request.'});
 const auth={Authorization:`Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`,'Content-Type':'application/json'};
 const notes={source:'zivasha-confirmed-order',description:'SANDBOX TEST ONLY — no real payment or fulfilment',subtotal_paise:'100',gst_paise:'0',delivery_paise:'0',delivery_gst_paise:'0'};
 try{
  const found=await fetcher(`https://api.razorpay.com/v1/orders?receipt=${RECEIPT}&count=100`,{headers:auth,signal:AbortSignal.timeout(10000)});
  if(!found.ok)return json(502,{error:'Razorpay test credentials could not be verified. No payment was attempted.'});
  const matches=(await found.json()).items.filter(o=>o.receipt===RECEIPT);
  if(matches.length>1)return json(409,{error:'Multiple sandbox orders exist. Inspect the test dashboard before retrying.'});
  let order=matches[0];
  if(!order){
   const created=await fetcher('https://api.razorpay.com/v1/orders',{method:'POST',headers:auth,body:JSON.stringify({amount:100,currency:'INR',receipt:RECEIPT,partial_payment:false,notes}),signal:AbortSignal.timeout(10000)});
   if(!created.ok)return json(502,{error:'Razorpay could not create the sandbox order. No money was charged.'});
   order=await created.json();
  }
  orderSummary(order);
  if(order.amount!==100||order.receipt!==RECEIPT||Object.entries(notes).some(([k,v])=>order.notes[k]!==v))throw Error('Unexpected test order');
  const expires=Math.min(Math.floor(now/1000)+1800,Math.floor(DEADLINE/1000));
  const fragment=new URLSearchParams({order:order.id,expires:String(expires),token:signOrder(order.id,expires,secret)});
  return json(200,{testMode:true,paymentUrl:`https://zivasha.in/payment/#${fragment}`});
 }catch{return json(502,{error:'The sandbox order could not be verified. No live payment was attempted.'});}
}
export const handler=event=>runSandbox(event);
