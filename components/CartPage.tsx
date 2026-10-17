"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useRef,useState,type FormEvent} from 'react';
import {useCart} from './CartProvider';
import {cartSummary,cartDescription,resolveItem,money} from '@/lib/cart';
import {site,wa} from '@/lib/site';
import SeasonNotice from './SeasonNotice';
export default function CartPage({images}:{images:Record<string,string>}){
 const {items,ready,storageWarning,setQuantity,remove,clear}=useCart();
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'|'uncertain'>('idle');
 const [reference,setReference]=useState('');
 const referenceRef=useRef('');
 const busy=useRef(false);
 const summary=cartSummary(items);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy.current||!items.length)return;
  const data=new FormData(event.currentTarget);if(data.get('bot-field'))return;
  busy.current=true;setStatus('sending');
  const ref=referenceRef.current||`ZV-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  referenceRef.current=ref;setReference(ref);
  const body=new URLSearchParams();data.forEach((v,k)=>body.set(k,String(v)));
  body.set('form-name','zivasha-order-request');body.set('reference',ref);body.set('items',cartDescription(items));
  body.set('priced-subtotal',money(summary.pricedSubtotalPaise));body.set('quote-required',String(summary.quoteQuantity));
  body.set('estimated-gst',money(summary.estimatedGstPaise));body.set('estimated-total',money(summary.estimatedTotalPaise));body.set('delivery-charge','To be confirmed individually');
  body.set('payment-status','NOT PAID — request only; taxes, delivery and availability pending confirmation');
  try{
   const response=await fetch('/order-request.html',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
   if(!response.ok){setStatus('error');return;}
   setStatus('success');clear();
  }catch{setStatus('uncertain');}finally{busy.current=false;}
 }
 if(!ready)return <section className="section"><div className="wrap" role="status">Loading your cart…</div></section>;
 if(status==='success')return <section className="section"><div className="wrap narrow order-received" role="status"><p className="eyebrow">Request received</p><h2>Thank you for choosing ZIVASHA.</h2><p>Your reference is <strong>{reference}</strong>. Please save it.</p><p>We will contact you with availability and a final quotation, including taxes and delivery. Your order is not confirmed and no payment has been taken.</p><Link className="btn" href="/shop/">Continue shopping</Link><p>Already received your confirmed total? <Link href="/payment/">Pay through Razorpay</Link>.</p></div></section>;
 if(!items.length)return <section className="section"><div className="wrap narrow empty-cart"><h2>A thoughtful gift awaits.</h2><p>Your cart is empty. Explore our hampers, laddus and nutri bars to start your selection.</p><Link className="btn gold" href="/shop/">Explore the collection</Link></div></section>;
 return <section className="section"><div className="wrap">
  {storageWarning&&<p className="form-note" role="status">Your browser could not save the cart. Keep this tab open until you submit your request.</p>}
  <div className="cart-layout"><div className="cart-items">
   {items.map(item=>{const detail=resolveItem(item);if(!detail)return null;const {product,pack}=detail;return <article className="cart-item" key={`${item.slug}:${item.variant}`}>
    {images[product.slug]&&<div className="cart-image"><Image src={images[product.slug]} alt={product.name} fill sizes="120px" quality={65}/></div>}
    <div className="cart-item-info"><h2>{product.name}</h2><p>{pack.label}</p><p>{pack.pricePaise===undefined?'Price on request':`${money(pack.pricePaise)} each`}</p>{product.allergens&&<p className="allergen-note">{product.allergens}</p>}
    <label className="quantity-label">Quantity<input type="number" min="1" max="999" step="1" aria-label={`Quantity for ${product.name}, ${pack.label}`} value={item.quantity} onChange={e=>setQuantity(item.slug,item.variant,e.target.valueAsNumber)} disabled={status==='sending'}/></label>
    <button className="remove-item" type="button" aria-label={`Remove ${product.name}, ${pack.label}`} onClick={()=>remove(item.slug,item.variant)} disabled={status==='sending'}>Remove</button></div>
    <strong className="cart-line-total">{pack.pricePaise===undefined?'Quotation':money(pack.pricePaise*item.quantity)}</strong>
   </article>})}
   <Link href="/shop/" className="continue-shopping">← Continue shopping</Link><SeasonNotice/>
  </div><aside className="cart-summary"><h2>Your selection</h2><div className="summary-row"><span>Total packs</span><strong>{summary.count}</strong></div>
   {summary.pricedSubtotalPaise>0&&<div className="summary-row"><span>Priced items subtotal</span><strong>{money(summary.pricedSubtotalPaise)}</strong></div>}
   {summary.quoteQuantity>0&&<div className="summary-row"><span>Packs needing a quote</span><strong>{summary.quoteQuantity}</strong></div>}
   {summary.pricedSubtotalPaise>0&&<><div className="summary-row"><span>Estimated GST (5%)</span><strong>{money(summary.estimatedGstPaise)}</strong></div><div className="summary-row"><span>Priced items including estimated GST</span><strong>{money(summary.estimatedTotalPaise)}</strong></div></>}
   <div className="summary-row"><span>Delivery</span><strong>To be confirmed</strong></div>
   <p className="summary-notice">Delivery is quoted individually before payment. We confirm availability, final taxes and any unpriced items, then send your secure payment link. Bulk pricing is available on enquiry.</p><a href="#order-details" className="btn gold">Continue to order details</a>
  </aside></div>
  <section id="order-details" className="order-details"><div><p className="eyebrow">Finish your request here</p><h2>Where should your gifts go?</h2><p>Submit your details on this website. ZIVASHA will contact you to confirm the order and payment total.</p><p className="form-note">Your details are used to respond to this request and arrange your order. No payment information is collected here.</p></div>
  <form className="form" name="zivasha-order-request" onSubmit={submit}><input type="hidden" name="form-name" value="zivasha-order-request"/><input name="bot-field" hidden tabIndex={-1} autoComplete="off"/>
   <fieldset disabled={status==='sending'||status==='uncertain'} className="order-fieldset"><div className="form-row"><div><label htmlFor="order-name">Name</label><input id="order-name" name="name" autoComplete="name" maxLength={100} required/></div><div><label htmlFor="order-phone">Phone number</label><input id="order-phone" name="phone" type="tel" autoComplete="tel" pattern="[+0-9 ()-]{10,20}" maxLength={20} required/></div></div>
   <label htmlFor="order-email">Email (optional)</label><input id="order-email" name="email" type="email" autoComplete="email" maxLength={150}/>
   <div className="form-row"><div><label htmlFor="order-city">Delivery city</label><input id="order-city" name="city" autoComplete="address-level2" maxLength={100} required/></div><div><label htmlFor="order-pincode">Pincode</label><input id="order-pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" pattern="[1-9][0-9]{5}" maxLength={6} required/></div></div>
   <label htmlFor="order-date">Preferred delivery date (subject to confirmation)</label><input id="order-date" name="required-date" type="date"/>
   <label htmlFor="order-notes">Gift message, assortment or other requirements (optional)</label><textarea id="order-notes" name="notes" rows={3} maxLength={2000}/>
   <label className="order-consent"><input type="checkbox" name="contact-consent" value="Yes" required/> I agree to be contacted about this request and understand that availability and the final total must be confirmed before payment.</label>
   <button className="btn gold" type="submit">{status==='sending'?'Sending your request…':'Submit order request'}</button></fieldset>
   {status==='error'&&<p className="form-error" role="alert">Your request could not be submitted. Your cart is saved; please try again or <a href={wa(cartDescription(items),'WEB-cart-help')} target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p>}
   {status==='uncertain'&&<p className="form-error" role="alert">We could not confirm receipt. To avoid a duplicate, please <a href={wa(`Please check website request ${reference}.`,'WEB-cart-check')} target="_blank" rel="noopener noreferrer">ask us to check reference {reference}</a> or email {site.email}. Your cart has been kept.</p>}
  </form></section>
 </div></section>;
}
