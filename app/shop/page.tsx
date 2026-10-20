import type {Metadata} from 'next';
import JsonLd from '@/components/JsonLd';
import CatalogueSection from '@/components/CatalogueSection';
import SeasonNotice from '@/components/SeasonNotice';
import {products,hampers,laddus,nutribars,giftingFormats} from '@/lib/products';
import {productImage} from '@/lib/images';
import {productListJsonLd} from '@/lib/seo';
import {site} from '@/lib/site';
export const metadata:Metadata={title:'Everyday Laddus, Nutri Bars & Dry-Fruit Gifts',description:'Shop ZIVASHA Gond Laddu, Khapli Laddu and Seven Seeds Nutri Bar for everyday snack moments, plus dry-fruit gifts. Jaggery-sweetened laddus and bars, no white sugar added.'};
export default function Shop(){return <>
<JsonLd data={productListJsonLd('ZIVASHA Collection','/shop/',products.map(p=>({p,image:p.image?productImage(p.image):null})))}/>
<section className="page-hero"><p className="eyebrow">Everyday favourites &amp; thoughtful gifts</p><h1>For your home.<br/><em>For your people.</em></h1><p>Explore traditional laddus and nutri bars for everyday snack times, alongside our dry-fruit gift collection. Choose your pack and submit an order request.</p><div className="hero-ctas center"><a className="btn" href="#mithai">Laddus &amp; nutri bars</a><a className="btn ghost" href="#hampers">Dry-fruit gifts</a><a className="btn ghost" href={site.catalogueUrl} target="_blank" rel="noopener">Full catalogue PDF</a></div></section>
<div className="wrap"><SeasonNotice/></div>
<CatalogueSection id="mithai" title="Everyday laddus & nutri bars" note="Gond Laddu, Khapli Laddu and Seven Seeds Nutri Bar: sweetened with jaggery, no white sugar added. These foods still contain sugar. Explore 250 g and 500 g containers and read each product’s ingredients and allergens." items={[...laddus,...nutribars]} category="Container collection" alt/>
<CatalogueSection id="hampers" title="The dry-fruit gift collection" note="Approximate total dry-fruit net weights exclude outer packaging. Final assortment and fill weight are confirmed before ordering." items={hampers} category="Dry-fruit hampers"/>
<CatalogueSection id="gifting-formats" title="More ways to gift" note="Additional formats from our catalogue. Final packaging, assortment, weight and availability are confirmed individually; a format without a photograph is not a fixed packaging commitment." items={giftingFormats} category="Festive formats"/>
</>;}
