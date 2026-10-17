"use client";
import Link from 'next/link';
import {useCart} from './CartProvider';
import {cartSummary} from '@/lib/cart';
export default function CartLink(){const {items}=useCart();const {count}=cartSummary(items);return <Link href="/cart/" className="header-cart" aria-label={`Cart, ${count} items`}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 3h2l3 12h11l2-8H6M9 20h.01M18 20h.01" strokeLinecap="round" strokeLinejoin="round"/></svg><span>Cart</span><b aria-hidden="true">{count}</b></Link>}
