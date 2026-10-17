import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import posts from '@/lib/blog-posts.json';
import { pageOg } from '@/lib/seo';
import './blogs.css';

export const metadata: Metadata = {
  title: 'Blogs — Dry Fruits, Seeds & Indian Food Traditions',
  description: 'Short, source-backed reads on Indian dry fruits, seeds, Khapli wheat and food traditions. Discover growing regions, ingredients and thoughtful gifting with ZIVASHA.',
  alternates: { canonical: '/blogs/' },
  openGraph: { ...pageOg(null, 'ZIVASHA ingredient stories'), url: '/blogs/' },
};
export default function BlogsPage() {
  const ordered = [...posts].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featured, ...older] = ordered;
  return <div className="journal wrap">
    <header className="journal-heading"><p className="eyebrow">The ZIVASHA journal</p><h1>Every ingredient<br/>has a <em>story.</em></h1><p>Small reads. Thoughtful details. Explore the places, traditions and ingredients behind the foods we share.</p></header>
    <div className="journal-topics" aria-label="Topics we explore"><span>Dry fruits & seeds</span><span>Indian growing regions</span><span>Traditional ingredients</span><span>Food & gifting</span></div>
    {featured && <article className="journal-feature">
      <Link href={'/blogs/'+featured.slug+'/'} className="journal-image" tabIndex={-1} aria-hidden="true"><Image src={featured.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" quality={75} priority/></Link>
      <div className="journal-feature-copy"><p className="eyebrow">Latest read · {featured.category}</p><h2><Link href={'/blogs/'+featured.slug+'/'}>{featured.title}</Link></h2><p>{featured.description}</p><p className="journal-meta"><time dateTime={featured.publishedAt}>{new Date(featured.publishedAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata' })}</time></p><Link className="text-link" href={'/blogs/'+featured.slug+'/'}>Read the story ↗</Link></div>
    </article>}
    {older.length > 0 && <section className="journal-archive" aria-label="More stories">{older.map(post=><article key={post.slug}><p className="eyebrow">{post.category}</p><h2><Link href={'/blogs/'+post.slug+'/'}>{post.title}</Link></h2><p>{post.description}</p><Link className="text-link" href={'/blogs/'+post.slug+'/'}>Read the story ↗</Link></article>)}</section>}
    <aside className="journal-note"><h2>Curiosity, with care.</h2><p>Our articles link to their sources. Growing-region stories describe agriculture, not the origin of every ZIVASHA batch. Traditional uses are distinguished from established evidence, and food articles do not replace personalised medical advice.</p></aside>
  </div>;
}
