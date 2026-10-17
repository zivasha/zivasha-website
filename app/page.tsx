import Image from 'next/image';
import Link from 'next/link';
import CatalogueSection from '@/components/CatalogueSection';
import ProductCard from '@/components/ProductCard';
import SeasonNotice from '@/components/SeasonNotice';
import { hampers, laddus, nutribars } from '@/lib/products';
import { site, waCorporate } from '@/lib/site';
const featured = ['festive-potli-basket','three-jar-floral-gift','navy-three-jar-gift'].map(slug=>hampers.find(p=>p.slug===slug)!);
export default function Home(){return <>
<section className="boutique-hero wrap">
 <div className="boutique-copy"><p className="eyebrow">The art of giving</p><h1>A little thought.<br/>A lasting <em>impression.</em></h1><p className="boutique-lede">Dry-fruit hampers, traditional mithai and nutri bars, chosen for the people who matter.</p><Link className="btn" href="/shop/">Explore the collection <span aria-hidden="true">↗</span></Link><p className="boutique-caption">For family, friends and thoughtful thank-yous.</p></div>
 <figure className="boutique-figure"><div className="boutique-photo"><Image src="/products/four-jar-festive-gift.jpg" alt="Four glass jars in an ornate blue dry-fruit presentation box, with matching closed boxes" fill priority sizes="(max-width: 700px) 100vw, 55vw" quality={75}/></div><figcaption>The Four-Jar Festive Gift</figcaption></figure>
</section>
<section className="section boutique-featured" id="collection"><div className="wrap"><div className="boutique-section-heading"><div><p className="eyebrow">Choose your gift</p><h2>Beautiful things, thoughtfully filled.</h2></div><Link className="text-link" href="/shop/#hampers">View all dry-fruit gifts ↗</Link></div><div className="cards three">{featured.map(p=><ProductCard key={p.slug} p={p} category="Dry-fruit gifting"/>)}</div></div></section>
<section className="boutique-bulk wrap" id="bulk-gifting"><div><p className="eyebrow">For your people</p><h2>Make every thank-you personal.</h2></div><a className="btn ghost" href={waCorporate('WEB-home-corp')} target="_blank" rel="noopener noreferrer">Enquire for bulk pricing ↗</a></section>
<CatalogueSection id="mithai" title="Tradition, made for sharing." note="Gond Laddu, Khapli Laddu and Seven Seeds Nutri Bar in 250 g and 500 g containers. Ask us for ingredients and allergen details before ordering." items={[...laddus,...nutribars]} category="Mithai & Nutri Bars" alt/>
<section className="section boutique-ordering"><div className="wrap split"><div><p className="eyebrow">From your selection to your doorstep</p><h2>A thoughtful gift, in a few simple steps.</h2><p>Add your favourites to the cart and submit your order request here. We confirm availability, GST and delivery before you pay your agreed total through Razorpay.</p><div className="hero-ctas"><Link className="btn" href="/shop/">Choose your gifts</Link><Link className="btn ghost" href="/payment/">Pay a confirmed order</Link></div><p className="catalogue-link"><a href={site.catalogueUrl} target="_blank" rel="noopener noreferrer">Browse the full catalogue PDF ↗</a></p></div><SeasonNotice/></div></section>
</>;}
