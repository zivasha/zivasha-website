import Image from 'next/image';
import Link from 'next/link';
import CatalogueSection from '@/components/CatalogueSection';
import SeasonNotice from '@/components/SeasonNotice';
import {hampers,laddus,nutribars} from '@/lib/products';
import {site,waCorporate,waGeneric} from '@/lib/site';
export default function Home(){return <>
<section className="cine">
 <div className="cine-panel"><p className="eyebrow on-gold">ZIVASHA · THE DIWALI COLLECTION</p><h1>Gifts,<br/><em>thoughtfully chosen.</em></h1><p className="cine-lede">Dry-fruit gifts, traditional mithai and seven-seed nutri bars — for your team, your family and the people you love.</p><div className="hero-ctas"><Link className="btn gold" href="/shop/">Explore the collection</Link><a className="btn ghost on-dark" href={waGeneric('WEB-home')} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></div><p className="cine-note">A brand of Phoeniix AgriNexa Ventures</p></div>
 <div className="cine-media"><Image className="cine-img" src="/products/four-jar-festive-gift.jpg" alt="Four-jar festive dry-fruit gift in a printed presentation box" fill priority sizes="(max-width: 900px) 100vw, 56vw" quality={65}/></div>
</section>
<div className="wrap"><p className="image-note">Photo-based hamper imagery with AI-edited backgrounds and branding. Actual appearance may vary.</p><SeasonNotice/></div>
<CatalogueSection id="collection" title="Dry-fruit gifts, beautifully presented." note="Six designs from our latest catalogue. Approximate weights are total edible contents, excluding packaging; final assortment, weight and availability are confirmed before ordering." items={hampers} category="Dry-fruit gifting"/>
<CatalogueSection id="mithai" title="Tradition, made for sharing." note="Gond Laddu, Khapli Laddu and Seven Seeds Nutri Bar in 250 g and 500 g containers. Ask us for ingredients and allergen details before ordering." items={[...laddus,...nutribars]} category="Mithai & Nutri Bars" alt/>
<section className="section"><div className="wrap split"><div><p className="eyebrow">Personal & corporate gifting</p><h2>A thoughtful gift for every thank-you.</h2><p>Share your occasion, quantity, delivery city and date. We will confirm the selection, packaging, total and delivery details with you.</p><div className="hero-ctas"><a className="btn gold" href={waCorporate('WEB-home-corp')} target="_blank" rel="noopener noreferrer">Plan a bulk order</a><Link className="btn ghost" href="/corporate-gifting/">Corporate gifting</Link></div></div><div className="order-card"><h3>Choose. Confirm. Pay.</h3><p>Add your favourites to the cart and submit your order request here. We confirm the final total before you pay through Razorpay.</p><Link className="btn" href="/payment/">Pay a confirmed order</Link><p><a href={site.catalogueUrl} target="_blank" rel="noopener">View the full catalogue PDF ↗</a></p></div></div></section>
</>;}
