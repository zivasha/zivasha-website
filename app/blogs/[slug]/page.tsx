import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import posts from '@/lib/blog-posts.json';
import { businessId, pageOg } from '@/lib/seo';
import { site, waBulk } from '@/lib/site';
import '../blogs.css';

type Props = { params: Promise<{slug: string}> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(({slug})=>({slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug}=await params;
  const post=posts.find(p=>p.slug===slug);
  if (!post) return {title:'Article not found'};
  return {title:post.title, description:post.description, keywords:post.keywords,
    alternates:{canonical:'/blogs/'+post.slug+'/'},
    openGraph:{...pageOg(post.image,post.imageAlt),title:post.title,description:post.description,url:'/blogs/'+post.slug+'/',type:'article',publishedTime:post.publishedAt,modifiedTime:post.updatedAt,authors:[post.author]},
  };
}
export default async function BlogPost({params}:Props) {
  const {slug}=await params;
  const post=posts.find(p=>p.slug===slug);
  if (!post) notFound();
  const date=new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'});
  const words=[post.intro,...post.sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).length;
  return <div className="journal wrap">
    <JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.description,datePublished:post.publishedAt,dateModified:post.updatedAt,mainEntityOfPage:site.domain+'/blogs/'+post.slug+'/',image:site.domain+post.image,author:{'@type':'Organization',name:post.author,url:site.domain+'/blogs/'},publisher:{'@id':businessId},keywords:post.keywords.join(', '),inLanguage:'en-IN',citation:post.sources.map(s=>s.url)}}/>
    <nav className="journal-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blogs/">Blogs</Link></nav>
    <article className="journal-article">
      <header><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="journal-meta">{post.author} · <time dateTime={post.publishedAt}>{date}</time> · {Math.max(1,Math.ceil(words/200))} min read</p><p className="journal-intro">{post.intro}</p></header>
      <p className="journal-takeaway"><strong>The key detail</strong>{post.takeaway}</p>
      {post.sections.map((section,i)=><section key={i}><h2>{section.heading}</h2>{section.paragraphs.map((p,j)=><p key={j}>{p}</p>)}{section.sourceIds.length>0 && <p className="journal-citations">Source: {section.sourceIds.map((id,j)=>{const source=post.sources.find(s=>s.id===id);return source ? <span key={id}>{j>0?' · ':''}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a></span>:null;})}</p>}</section>)}
      <figure className="journal-product"><div><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 760px" quality={75}/></div><figcaption>{post.imageCaption}</figcaption></figure>
      <aside className="journal-source-list"><h2>Sources & further reading</h2><ol>{post.sources.map(s=><li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>)}</ol><p>Researched on {new Date(post.updatedAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'})}. General information, not personalised medical advice.</p></aside>
      <div className="journal-cta"><h2>A little thought in every gift.</h2><p>Individual purchases start with a website order request. Availability, final taxes, delivery charges and total are confirmed before payment. For bulk enquiries, contact us on WhatsApp.</p><div><Link className="btn" href={post.relatedPath}>{post.relatedLabel}</Link><a className="text-link" href={waBulk('WEB-blog')} target="_blank" rel="noopener noreferrer">Bulk enquiries on WhatsApp ↗</a></div></div>
      <Link className="text-link" href="/blogs/">← All stories</Link>
    </article>
  </div>;
}
