import ProductCard from '@/components/ProductCard';
import { type Product } from '@/lib/products';
export default function CatalogueSection({id,title,note,items,category,alt=false}:{id:string;title:string;note:string;items:Product[];category:string;alt?:boolean}) {
 return <section id={id} className={alt?'section alt':'section'}><div className="wrap"><div className="section-head"><p className="eyebrow">{category}</p><h2>{title}</h2><p>{note}</p></div><div className="cards">{items.map(p=><ProductCard key={p.slug} p={p} category={category}/>)}</div></div></section>;
}
