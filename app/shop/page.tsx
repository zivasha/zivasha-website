import type {Metadata} from 'next';
import JsonLd from '@/components/JsonLd';
import CatalogueSection from '@/components/CatalogueSection';
import SeasonNotice from '@/components/SeasonNotice';
import {products,hampers,laddus,nutribars,giftingFormats} from '@/lib/products';
import {productImage} from '@/lib/images';
import {productListJsonLd} from '@/lib/seo';
import {site} from '@/lib/site';
export const metadata:Metadata={title:'The Complete Collection',description:'Explore ZIVASHA dry-fruit gift hampers, Gond Laddu, Khapli Laddu, Seven Seeds Nutri Bar and festive gifts. Confirm availability and your quotation on WhatsApp.'};
export default function Shop(){return <>
<JsonLd data={productListJsonLd('ZIVASHA Collection','/shop/',products.map(p=>({p,image:p.image?productImage(p.image):null})))}/>
<section className="page-hero"><p className="eyebrow">The complete collection</p><h1>Find your <em>thoughtful gift.</em></h1><p>Choose a collection, then share the product, pack size, quantity and delivery details on WhatsApp.</p><div className="hero-ctas center"><a className="btn" href="#hampers">Dry-fruit gifts</a><a className="btn ghost" href="#mithai">Mithai &amp; nutri bars</a><a className="btn ghost" href={site.catalogueUrl} target="_blank" rel="noopener">Full catalogue PDF</a></div></section>
<div className="wrap"><SeasonNotice/></div>
<CatalogueSection id="hampers" title="The dry-fruit gift collection" note="Approximate total dry-fruit net weights exclude outer packaging. Final assortment and fill weight are confirmed before ordering." items={hampers} category="Dry-fruit hampers"/>
<CatalogueSection id="mithai" title="Mithai & nutri bars" note="All three products are available in 250 g and 500 g containers. Ingredients, availability, taxes and delivery charges are confirmed before payment." items={[...laddus,...nutribars]} category="Container collection" alt/>
<CatalogueSection id="gifting-formats" title="More ways to gift" note="Additional formats from our catalogue. Final packaging, assortment, weight and availability are confirmed individually; a format without a photograph is not a fixed packaging commitment." items={giftingFormats} category="Festive formats"/>
</>;}
