import Image from 'next/image';
import AddToCart from '@/components/AddToCart';
import { blurProps, productImage } from '@/lib/images';
import { type Product } from '@/lib/products';
import { wa } from '@/lib/site';
export default function ProductCard({p,category,waCode='WEB-shop'}:{p:Product;category:string;waCode?:string}) {
 const photo=p.image ? productImage(p.image) : null;
 return <article className="card">
  {photo ? <div className="card-photo"><Image src={photo} alt={`${p.name} — ${category}`} fill sizes="(max-width: 686px) 100vw, (max-width: 1120px) 46vw, 342px" quality={65} {...blurProps(photo)}/></div> :
   <div className="format-art"><span>ZIVASHA</span><strong>{p.name}</strong><small>Packaging selected on enquiry</small></div>}
  <div className="card-body"><h3>{p.name}</h3><p className="desc">{p.desc}</p><p className="catalogue-weight">{p.weight}</p>
   {p.allergens && <p className="allergen-note">{p.allergens}</p>}
   <AddToCart product={p}/><a className="product-enquiry" href={wa(`Hi ZIVASHA! Please quote a bulk price for ${p.name} (${p.weight}). Quantity: ___ | Delivery city/pincode: ___ | Required date: ___.`,waCode)} target="_blank" rel="noopener noreferrer">Enquire for bulk pricing</a>
   {photo && <p className="image-note">{p.kind==='hamper'?'Photo-based packaging; backgrounds and branding AI-edited.':'AI-generated illustration. Actual product and packaging may vary.'}</p>}
  </div></article>;
}
