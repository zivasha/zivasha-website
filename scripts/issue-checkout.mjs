// Trusted operator only. Creates an unpaid Razorpay order for an owner-confirmed
// quotation. Never run for a cart whose delivery, taxes or availability are pending.
// Preview: node scripts/issue-checkout.mjs /absolute/path/confirmed-quote.json
// Issue:   node scripts/issue-checkout.mjs /absolute/path/confirmed-quote.json --issue
import {readFile} from 'node:fs/promises';
import {signOrder,orderSummary} from '../netlify/functions/razorpay-checkout.mjs';
const q=JSON.parse(await readFile(process.argv[2],'utf8'));
if(q.ownerConfirmed!==true||!/^[A-Za-z0-9_-]{6,40}$/.test(q.reference)||typeof q.description!=='string'||q.description.length>200)throw new Error('An owner-confirmed quotation and unique reference are required.');
const amounts=['subtotalPaise','gstPaise','deliveryPaise','deliveryGstPaise'].map(k=>q[k]);
if(amounts.some(n=>!Number.isSafeInteger(n)||n<0))throw new Error('Provide confirmed subtotal, GST, delivery and delivery GST as integer paise; do not leave delivery unknown.');
const amount=amounts.reduce((a,b)=>a+b,0);if(amount<100||amount>100000000)throw new Error('Invalid confirmed total.');
const payload={amount,currency:'INR',receipt:q.reference,partial_payment:false,notes:{source:'zivasha-confirmed-order',description:q.description,subtotal_paise:String(q.subtotalPaise),gst_paise:String(q.gstPaise),delivery_paise:String(q.deliveryPaise),delivery_gst_paise:String(q.deliveryGstPaise)}};
if(!process.argv.includes('--issue')){console.log(JSON.stringify({previewOnly:true,reference:q.reference,totalPaise:amount,description:q.description},null,2));process.exit(0);}
const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
if(!key||!secret)throw new Error('Set keys in the secure process environment; never pass keys on the command line.');
const headers={Authorization:`Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`,'Content-Type':'application/json'};
const existing=await fetch(`https://api.razorpay.com/v1/orders?receipt=${encodeURIComponent(q.reference)}&count=100`,{headers,signal:AbortSignal.timeout(15000)});
if(!existing.ok)throw new Error('Could not check existing orders. No new order created.');
const previous=(await existing.json()).items.filter(o=>o.receipt===q.reference);
let order;
if(previous.length){
 if(previous.length!==1)throw new Error('Multiple matching orders: inspect Razorpay manually.');
 order=previous[0];orderSummary(order);
 if(order.amount!==amount||JSON.stringify(order.notes)!==JSON.stringify(payload.notes)){
  if(order.amount!==amount||Object.entries(payload.notes).some(([k,v])=>order.notes[k]!==v))throw new Error('Existing quotation differs. Use its original terms or a new approved reference.');
 }
 if(order.status==='paid')throw new Error('Already paid. Do not request payment again.');
}else{
 const result=await fetch('https://api.razorpay.com/v1/orders',{method:'POST',headers,body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
 if(!result.ok)throw new Error('Order creation failed. Inspect Razorpay before retrying.');order=await result.json();orderSummary(order);
}
const expires=Math.floor(Date.now()/1000)+7*86400;
const fragment=new URLSearchParams({order:order.id,expires:String(expires),token:signOrder(order.id,expires,secret)});
console.log(JSON.stringify({reference:q.reference,amountPaise:amount,orderId:order.id,status:order.status,paymentUrl:`https://zivasha.in/payment/#${fragment}`,testMode:key.startsWith('rzp_test_')},null,2));
