import type {Metadata} from 'next';
import Link from 'next/link';
import {ZivashaLockup} from '@/components/brand/Logo';
import {site,waGeneric} from '@/lib/site';
export const metadata:Metadata={title:'Links',robots:{index:false,follow:true}};
export default function Links(){return <section className="section"><div className="wrap links-col"><ZivashaLockup height={62} tone="light" tagline/><p className="eyebrow">The ZIVASHA collection</p><a className="btn gold links-btn" href={waGeneric('IG-BIO')} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a><Link className="btn ghost links-btn" href="/shop/">Explore all gifts</Link><a className="btn ghost links-btn" href={site.catalogueUrl} target="_blank" rel="noopener">View the catalogue PDF</a><Link className="btn ghost links-btn" href="/payment/">Pay a confirmed order</Link><Link className="btn ghost links-btn" href="/corporate-gifting/">Corporate &amp; bulk gifting</Link><p className="links-note">{site.orderNotice}</p></div></section>;}
