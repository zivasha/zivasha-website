import type {Metadata} from 'next';
import CatalogueSection from '@/components/CatalogueSection';
import SeasonNotice from '@/components/SeasonNotice';
import {laddus} from '@/lib/products';
export const metadata:Metadata={title:'Gond & Khapli Laddu',description:'ZIVASHA Gond Laddu and Khapli Laddu in 250 g and 500 g containers. Khapli contains wheat/gluten. Enquire on WhatsApp.'};
export default function Laddus(){return <><section className="page-hero"><p className="eyebrow">Mithai</p><h1>Sweet traditions,<br/><em>made to share.</em></h1><p>Choose Gond Laddu or Khapli Laddu, in a 250 g or 500 g container.</p></section><div className="wrap"><SeasonNotice/></div><CatalogueSection id="laddus" title="Choose your laddu" note="Khapli Laddu contains wheat/gluten. Ask for the full ingredients and allergen details for your selection; suitability and shelf life must be confirmed before ordering." items={laddus} category="Laddu collection"/></>;}
