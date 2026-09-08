import Link from 'next/link';
import { ZivashaLockup } from '@/components/brand/Logo';
import { site, waGeneric } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div>
          <ZivashaLockup height={46} tone="dark" tagline />
          <p style={{ marginTop: 12 }}>{site.motto}</p>
          <p>
            Premium dry fruits · gift hampers · gond laddus · seed bars.
            <br />
            Serving {site.serviceArea}.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href="/shop/">Shop</Link>
            </li>
            <li>
              <Link href="/corporate-gifting/">Corporate Gifting</Link>
            </li>
            <li>
              <Link href="/laddus/">Gond Laddus</Link>
            </li>
            <li>
              <Link href="/nutribars/">Seven Seeds Nutribar</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/our-story/">Our Story</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
            {site.instagram && (
              <li>
                <a href={site.instagram} target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
            )}
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Order &amp; Support</h4>
          <p>
            <a href={waGeneric('WEB-footer')} target="_blank" rel="noopener">
              WhatsApp {site.whatsappDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>Corporate orders: 50% advance with PO, balance before dispatch.</p>
        </div>
      </div>
      <div className="footer-legal">
        {/* build-time year: the site redeploys far more often than the year changes */}
        © {new Date().getFullYear()} {site.legalName} · {site.tagline}
        {site.fssaiNumber && <> · FSSAI Lic. No. {site.fssaiNumber}</>}
        {site.gstin && <> · GSTIN {site.gstin}</>}
      </div>
    </footer>
  );
}
