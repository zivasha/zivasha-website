import type {Metadata} from 'next';
import {products} from '@/lib/products';
import {productImage} from '@/lib/images';
import CartPage from '@/components/CartPage';
export const metadata:Metadata={title:'Your cart',description:'Choose your ZIVASHA gifts, pack sizes and quantities. Submit your order request directly on our website.',robots:{index:false,follow:true}};
export default function Cart(){return <><section className="page-hero cart-hero"><p className="eyebrow">Your ZIVASHA selection</p><h1>Your <em>cart.</em></h1><p>Choose your gifts here. We will confirm availability, taxes, delivery and your final total before payment.</p></section><CartPage images={Object.fromEntries(products.flatMap(p=>{const image=p.image?productImage(p.image):null;return image?[[p.slug,image]]:[]}))}/></>}
