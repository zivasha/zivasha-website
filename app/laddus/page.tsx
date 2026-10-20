import type {Metadata} from 'next';
import Link from 'next/link';
import CatalogueSection from '@/components/CatalogueSection';
import SeasonNotice from '@/components/SeasonNotice';
import {laddus} from '@/lib/products';
export const metadata:Metadata={title:'Everyday Gond & Khapli Laddus with Jaggery',description:'Discover ZIVASHA Gond and Khapli laddus for everyday tea breaks and family snack times. Sweetened with jaggery. No white sugar added. Read ingredients and allergens.'};
export default function Laddus(){return <>
<section className="page-hero"><p className="eyebrow">Traditional mithai · Everyday moments</p><h1>A little tradition.<br/><em>A moment for you.</em></h1><p>Gond Laddu with nuts, coconut and khajoor (dates). Khapli Laddu with emmer wheat, nuts and ghee. Familiar flavours for a tea break or a shared family snack.</p><p className="sweetener-line">Sweetened with jaggery. No white sugar added.</p><p>Gond Laddu also includes khajoor (dates). These sweeteners contribute sugar; the laddus are not sugar-free.</p></section>
<div className="wrap"><SeasonNotice/></div>
<CatalogueSection id="laddus" title="Choose your everyday laddu" note="250 g and 500 g containers. Both laddus contain nuts; Khapli Laddu also contains wheat/gluten and milk ingredients. Confirm the full ingredients, storage and best-before information before ordering." items={laddus} category="Laddu collection"/>
<section className="section alt"><div className="wrap everyday-grid"><article><p className="eyebrow">For home &amp; family</p><h2>Make a little room for mithai.</h2><p>Choose the flavour you enjoy and a portion that fits your usual meals and snacks. A container is for sharing or portioning; its weight does not specify the number of laddus.</p><p>Considering laddus for a child’s tiffin? Check the complete ingredients, school allergy policy and a suitable portion and texture before packing.</p></article><article><p className="eyebrow">For women over 40</p><h2>Your tea break, your choice.</h2><p>Enjoy traditional mithai as an ordinary food choice alongside a varied diet. Choose by flavour, ingredients and your own dietary needs.</p><p>Prefer a bar format? Explore our Seven Seeds Nutri Bar with oats, khajoor (dates), nuts and jaggery.</p><Link className="text-link" href="/nutribars/#everyday-women">Explore everyday nutri bars ↗</Link></article></div></section>
</>;}
