import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/AddToCart';
import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/ProductCard';
import { blurProps, productImage } from '@/lib/images';
import { products } from '@/lib/products';
import { productCategory, productDetails, productFaqs, productPath } from '@/lib/product-details';
import { businessId, pageOg } from '@/lib/seo';
import { site, wa } from '@/lib/site';
import posts from '@/lib/blog-posts.json';
import './product.css';

type Props = { params: Promise<{slug: string}> };
export const dynamicParams = false;
export function generateStaticParams() { return products.map(({slug}) => ({slug})); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) return {title: 'Product not found'};
  const detail = productDetails[slug];
  const photo = product.image ? productImage(product.image) : null;
  const description = detail.description ?? `${product.desc} ${product.weight}. View pack options and enquire for bulk gifting with ZIVASHA.`;
  return {title: detail.title, description,
    alternates: {canonical: productPath(slug)},
    openGraph: {...pageOg(photo, product.name), title: detail.title, description, url: productPath(slug)},
  };
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();
  const detail = productDetails[slug];
  const photo = product.image ? productImage(product.image) : null;
  const faqs = productFaqs(product);
  const foodRange = ['gond-laddu', 'khapli-laddu', 'seven-seeds-nutri-bar'];
  const related = products.filter(p => p.slug !== slug && (foodRange.includes(slug) ? foodRange.includes(p.slug) : p.kind === product.kind)).slice(0, 3);
  const guides = posts.filter(post => post.relatedPath === productPath(slug));
  const absoluteUrl = site.domain + productPath(slug);
  const imageNote = product.kind === 'hamper'
    ? 'Supplied product photograph; background and branding AI-edited. Confirm the available packaging before ordering.'
    : 'AI-generated illustration. Actual product appearance and packaging may vary.';
  // No stock, ratings or merchant Offer claims: the final order, tax and delivery still require confirmation.
  const productSchema = {'@context': 'https://schema.org', '@type': 'Product', '@id': absoluteUrl + '#product', url: absoluteUrl,
    name: product.name, description: detail.intro, category: productCategory(product), sku: product.slug,
    brand: {'@type': 'Brand', name: site.name}, manufacturer: undefined,
    ...(photo ? {image: [site.domain + photo]} : {}),
    additionalProperty: [{'@type': 'PropertyValue', name: 'Pack size', value: product.weight}],
    subjectOf: {'@type':'WebPage', '@id': absoluteUrl, publisher: {'@id': businessId}},
  };
  return <>
    <JsonLd data={productSchema}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:site.domain+'/'},
      {'@type':'ListItem',position:2,name:'The collection',item:site.domain+'/shop/'},
      {'@type':'ListItem',position:3,name:product.name,item:absoluteUrl},
    ]}}/>
    <div className="product-detail wrap">
      <nav className="product-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop/">The collection</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
      <div className="product-detail-hero">
        <figure className="product-detail-figure">
          {photo ? <div className="product-detail-photo"><Image src={photo} alt={`${product.name} — ${product.weight}`} fill priority sizes="(max-width: 760px) 100vw, 55vw" quality={75} {...blurProps(photo)}/></div> : <div className="product-detail-placeholder"><p className="eyebrow">ZIVASHA · Gifting collection</p><strong>{product.name}</strong><p>{product.weight}</p><span>Final packaging selected on enquiry</span></div>}
          <figcaption>{photo ? imageNote : 'Ask us for the available packaging options with your quotation.'}</figcaption>
        </figure>
        <div className="product-detail-copy"><p className="eyebrow">{productCategory(product)}</p><h1>{product.name}</h1><p className="product-detail-weight">{product.weight}</p><p>{detail.intro}</p>
          {detail.highlights && <dl className="product-highlights">{detail.highlights.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
          <AddToCart product={product}/>
          <p className="product-order-note">Add to cart to request your order. Availability, final taxes and delivery are confirmed before payment.</p>
          <a className="product-enquiry" href={wa(`Hi ZIVASHA! Please quote a bulk price for ${product.name} (${product.weight}). Quantity: ___ | Delivery city/pincode: ___ | Required date: ___.`, `WEB-product-${slug}`)} target="_blank" rel="noopener noreferrer">Enquire for bulk pricing ↗</a>
        </div>
      </div>
      <section className="product-detail-facts" aria-label="Product information">
        <div><p className="eyebrow">The presentation</p><h2>Pack &amp; contents</h2><p>{detail.packaging}</p><p>{detail.ingredients}</p></div>
        <div><p className="eyebrow">Before you choose</p><h2>Ingredient information</h2><p>{detail.note}</p><p>Confirm the final label, storage instructions and best-before information for your order.</p></div>
      </section>
      <section className="product-detail-faq"><div><p className="eyebrow">A little help</p><h2>{detail.highlights ? 'Your questions, answered.' : 'Ordering, made clear.'}</h2><p>ZIVASHA is a brand of {site.legalName}. Reach us at <a href={'mailto:'+site.email}>{site.email}</a>.</p></div><div>{faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></section>
      {guides.length > 0 && <section className="product-guides" aria-labelledby="ingredient-guides"><p className="eyebrow">From the ZIVASHA journal</p><h2 id="ingredient-guides">Get to know your ingredients.</h2>{guides.map(post=><article key={post.slug}><h3><Link href={'/blogs/'+post.slug+'/'}>{post.title}</Link></h3><p>{post.description}</p><Link className="text-link" href={'/blogs/'+post.slug+'/'}>Read the guide →</Link></article>)}</section>}
      {related.length > 0 && <section className="product-related"><div className="boutique-section-heading"><div><p className="eyebrow">Keep exploring</p><h2>You may also like</h2></div><Link className="text-link" href="/shop/">View the collection →</Link></div><div className="cards">{related.map(p=><ProductCard key={p.slug} p={p} category={productCategory(p)}/>)}</div></section>}
    </div>
  </>;
}
