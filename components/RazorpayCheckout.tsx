"use client";
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {money} from '@/lib/cart';
import {wa} from '@/lib/site';
type Access={orderId:string;expires:number;token:string};
type Order={orderId:string;reference:string;amount:number;currency:string;subtotal:number;gst:number;delivery:number;deliveryGst:number;status:string;description:string;keyId:string;testMode:boolean};
type Payment={razorpay_payment_id:string;razorpay_order_id:string;razorpay_signature:string};
declare global{interface Window{Razorpay?:new(options:Record<string,unknown>)=>{open:()=>void;on:(event:string,callback:()=>void)=>void}}}
let scriptPromise:Promise<void>|undefined;
function loadCheckout(){
 if(window.Razorpay)return Promise.resolve();
 if(!scriptPromise)scriptPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.onload=()=>resolve();script.onerror=()=>{script.remove();scriptPromise=undefined;reject(new Error('The secure payment window could not load. Please try again.'));};document.body.appendChild(script);});
 return scriptPromise;
}
async function api(data:Record<string,unknown>){
 const response=await fetch('/.netlify/functions/razorpay-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(20000)});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'Payment service is unavailable.');return result;
}
export default function RazorpayCheckout(){
 const [access,setAccess]=useState<Access|null>(null),[order,setOrder]=useState<Order|null>(null),[status,setStatus]=useState('loading'),[message,setMessage]=useState(''),[paymentId,setPaymentId]=useState('');
 const busy=useRef(false),mounted=useRef(false);
 useEffect(()=>{if(mounted.current)return;mounted.current=true;
  const params=new URLSearchParams(window.location.hash.slice(1));
  if(!params.get('order')){setStatus('no-link');return;}
  const a={orderId:params.get('order')||'',expires:Number(params.get('expires')),token:params.get('token')||''};setAccess(a);
  api({...a,action:'open'}).then(result=>{setOrder(result);setStatus(result.status==='paid'?'already-paid':'ready');}).catch(error=>{setMessage(error.message);setStatus('error');});
 },[]);
 async function pay(){
  if(!access||!order||busy.current)return;busy.current=true;setStatus('opening');setMessage('');
  try{
   await loadCheckout();const fresh:Order=await api({...access,action:'open'});setOrder(fresh);
   if(fresh.status==='paid'){setStatus('already-paid');busy.current=false;return;}
   if(!window.Razorpay)throw new Error('The secure payment window did not load.');
   const checkout=new window.Razorpay({key:fresh.keyId,order_id:fresh.orderId,amount:fresh.amount,currency:'INR',name:'ZIVASHA',description:fresh.reference,theme:{color:'#681d35'},retry:{enabled:false},modal:{ondismiss:()=>{busy.current=false;setStatus(s=>s==='opening'?'ready':s);}},handler:async(payment:Payment)=>{
    setStatus('verifying');setPaymentId(payment.razorpay_payment_id);
    try{
     if(payment.razorpay_order_id!==fresh.orderId)throw new Error('The payment reference differs from your order. Please contact ZIVASHA.');
     const result=await api({...access,action:'verify',paymentId:payment.razorpay_payment_id,signature:payment.razorpay_signature});
     setStatus(result.received?'received':'pending');
     if(!result.received)setMessage('Your payment is awaiting confirmation. Please do not pay again; contact ZIVASHA with your payment reference.');
    }catch{setStatus('pending');setMessage('We could not confirm the payment status. Please do not pay again; contact ZIVASHA with your payment reference.');}finally{busy.current=false;}
   }});
   checkout.on('payment.failed',()=>{busy.current=false;setStatus('pending');setMessage('This attempt did not complete successfully. If money was debited, contact ZIVASHA before retrying.');});checkout.open();
  }catch(error){busy.current=false;setStatus('ready');setMessage(error instanceof Error?error.message:'The payment window could not open. Please try again.');}
 }
 if(status==='loading')return <p role="status">Checking your confirmed order…</p>;
 if(status==='no-link')return <><h2>Pay after your order is confirmed.</h2><p>Choose your products and submit the cart. We confirm availability, GST and delivery, then send a secure link to pay the agreed total on this website.</p><Link className="btn gold" href="/shop/">Choose your gifts</Link><p><a href={wa('Hi ZIVASHA! Please send the secure payment link for my confirmed order.','WEB-payment')} target="_blank" rel="noopener noreferrer">Request your payment link on WhatsApp</a></p></>;
 return <div className="secure-checkout">
  {order&&<><p className="eyebrow">{order.testMode?'Test payment — no real money':'Confirmed quotation'}</p><h2>{order.reference}</h2><p>{order.description}</p>
   <div className="summary-row"><span>Products</span><strong>{money(order.subtotal)}</strong></div><div className="summary-row"><span>GST on products</span><strong>{money(order.gst)}</strong></div><div className="summary-row"><span>Confirmed delivery</span><strong>{money(order.delivery)}</strong></div>{order.deliveryGst>0&&<div className="summary-row"><span>GST on delivery</span><strong>{money(order.deliveryGst)}</strong></div>}<div className="summary-row"><span>Total payable</span><strong>{money(order.amount)}</strong></div></>}
  {['ready','opening'].includes(status)&&<button type="button" className="btn gold payment-primary" onClick={pay} disabled={status==='opening'}>{status==='opening'?'Opening secure checkout…':`Pay ${order?money(order.amount):''} with Razorpay`}</button>}
  {status==='verifying'&&<p role="status">Verifying your payment with Razorpay…</p>}
  {status==='received'&&<div role="status"><h3>{order?.testMode?'Test payment verified':'Payment received'}</h3><p>{order?.testMode?'This was a simulation; no money was collected.':'Thank you. ZIVASHA will contact you about fulfilment.'}</p></div>}
  {status==='already-paid'&&<p role="status">Razorpay records this order as paid. Please do not pay again. Contact ZIVASHA for fulfilment or refund status.</p>}
  {message&&<p className="form-error" role="alert">{message}</p>}
  {paymentId&&<p>Payment reference: <strong>{paymentId}</strong></p>}
  <p className="form-note">Card and UPI details are entered in Razorpay’s secure window. ZIVASHA does not collect them on this website.</p><a href={wa(`Please help with website order ${order?.reference||''}${paymentId?`, payment ${paymentId}`:''}.`,'WEB-payment-help')} target="_blank" rel="noopener noreferrer">Contact ZIVASHA about this payment</a>
 </div>;
}
