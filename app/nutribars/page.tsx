import type {Metadata} from 'next';
import CatalogueSection from '@/components/CatalogueSection';
import {nutribars} from '@/lib/products';
export const metadata:Metadata={title:'Seven Seeds Nutri Bar',description:'Seven Seeds Nutri Bar made with seeds, oats, dates and nuts, in 250 g and 500 g containers. Order details confirmed on WhatsApp.'};
export default function Nutribars(){return <><section className="page-hero"><p className="eyebrow">Nutri bars</p><h1>A little crunch.<br/><em>A moment to share.</em></h1><p>Seven seeds, oats, dates and nuts, brought together in our Seven Seeds Nutri Bar.</p></section><CatalogueSection id="nutribars" title="Choose your container" note="Available in 250 g and 500 g containers. Ingredients, allergens, availability and the order deadline are confirmed on enquiry." items={nutribars} category="Seven Seeds Nutri Bar"/></>;}
