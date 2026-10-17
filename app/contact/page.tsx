import type {Metadata} from 'next';
import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';
import SeasonNotice from '@/components/SeasonNotice';
import {site,waGeneric} from '@/lib/site';
export const metadata:Metadata={title:'Contact & Orders',description:'Contact ZIVASHA on WhatsApp +91 97736 95862 or hello@zivasha.in for product selection, quotations and delivery confirmation.'};
export default function Contact(){return <><section className="page-hero"><p className="eyebrow">Contact & orders</p><h1>Let’s choose<br/><em>something thoughtful.</em></h1><p>Share your product, quantity, city or pincode and required date.</p><a className="btn gold" href={waGeneric('WEB-contact')} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsappDisplay}</a></section><section className="section"><div className="wrap split"><div><h2>Reach ZIVASHA</h2><p><a href={'mailto:'+site.email}>{site.email}</a></p><p>Our primary delivery focus is Delhi NCR. Enquiries from Electronic City, Bengaluru and other locations are welcome; delivery feasibility, charges and dates must be confirmed.</p><SeasonNotice/><p><Link href="/payment/">Pay a confirmed order through Razorpay</Link></p></div><div><h2>Personal &amp; bulk enquiries</h2><EnquiryForm/></div></div></section></>;}
