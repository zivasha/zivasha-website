"use client";
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from './CartProvider';
import {packsFor,money} from '@/lib/cart';
import {type Product} from '@/lib/products';
export default function AddToCart({product}:{product:Product}) {
 const packs=packsFor(product);
 const [variant,setVariant]=useState(packs.find(p=>p.pricePaise!==undefined)?.id||packs[0].id);
 const [added,setAdded]=useState(false);
 const {add,ready}=useCart();
 const pack=packs.find(p=>p.id===variant)!;
 return <div className="product-purchase">
  {packs.length>1&&<label>Pack size<select aria-label={`Pack size for ${product.name}`} value={variant} onChange={e=>{setVariant(e.target.value);setAdded(false);}}>{packs.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</select></label>}
  <p className="product-price">{pack.pricePaise===undefined?'Price on request':money(pack.pricePaise)}<small>{pack.pricePaise===undefined?'Final quotation before payment':'GST and delivery extra'}</small></p>
  <button className="btn cart-add" type="button" disabled={!ready} onClick={()=>{add(product.slug,variant);setAdded(true);}} aria-label={`Add ${product.name} to cart`}>Add to cart</button>
  <div className="cart-feedback" role="status">{added&&<>Added to your cart. <Link href="/cart/">View cart →</Link></>}</div>
 </div>;
}
