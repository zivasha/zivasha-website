import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import {ZivashaLockup} from '@/components/brand/Logo';
export default function Header(){return <><div className="announce">Mithai orders close <strong>20 October</strong> · Dry-fruit hamper enquiries remain open, subject to availability.</div><header className="header"><div className="header-in"><Link href="/" className="brand" aria-label="ZIVASHA home"><ZivashaLockup height={48} tone="dark"/></Link><NavMenu/></div></header></>;}
