import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import { ZivashaLockup } from '@/components/brand/Logo';
import { site } from '@/lib/site';

export default function Header() {
  return (
    <>
      <div className="announce">
        Diwali 2026 · Logo customisation closes <strong>{site.customisationCutoffShort}</strong>
        <span className="announce-more">
          {' '}
          · Final corporate dispatch <strong>{site.finalDispatchShort}</strong>
        </span>
      </div>
      <header className="header">
        <div className="header-in">
          <Link href="/" className="brand" aria-label="Zivasha home">
            <ZivashaLockup height={38} tone="dark" />
          </Link>
          <NavMenu />
        </div>
      </header>
    </>
  );
}
