import Image from 'next/image';
import Link from 'next/link';
import { HeroScene, ProductArt } from '@/components/brand/ProductArt';
import { blurProps, productImage } from '@/lib/images';
import { hampers, inr } from '@/lib/products';
import { site, waCorporate, waGeneric } from '@/lib/site';

export default function Home() {
  const hero = productImage('hero');
  const origin = productImage('story-origin');
  const indulge = productImage('story-indulge');
  const ritual = productImage('story-ritual');
  const corporate = productImage('story-gifting');
  const pantry = productImage('story-pantry');

  const trio = [
    { img: productImage('laddu-box-12'), title: 'The Laddus', line: 'Gond, ghee, jaggery — the winter recipe', href: '/laddus/' },
    { img: productImage('bar-6'), title: 'The Nutribars', line: 'Seven seeds, one clean bar', href: '/nutribars/' },
    { img: pantry ?? productImage('makhana-100'), title: 'The Pantry', line: 'Thirteen jars of everyday luxury', href: '/shop/#pouches' },
  ];

  return (
    <>
      {/* ————— Chapter I · The arrival (split hero: words on silk, photo unharmed) ————— */}
      <section className="cine">
        <div className="cine-panel">
          <p className="eyebrow on-gold">Diwali 2026 · Delhi NCR</p>
          <h1>
            Tradition, <em>nourished</em>.
            <br />
            Luxury, gifted.
          </h1>
          <p className="cine-lede">
            Khari Baoli&rsquo;s finest dry fruits, laddus from a winter recipe three generations
            old, and hampers finished by hand — for the people you thank, honour and love.
          </p>
          <div className="hero-ctas">
            <a className="btn gold" href="#collection">
              Explore the collection
            </a>
            <Link className="btn ghost on-dark" href="/corporate-gifting/">
              Corporate gifting
            </Link>
          </div>
          <p className="cine-note">
            Free logo sleeve from 25 boxes · customisation closes {site.customisationCutoffShort}
          </p>
        </div>
        <div className="cine-media">
          {hero ? (
            <Image
              className="cine-img"
              src={hero}
              alt="A Zivasha hamper in warm light — jars of dry fruits, gond laddus and seed bars"
              fill
              priority
              quality={65}
              sizes="(max-width: 900px) 100vw, 56vw"
              {...blurProps(hero)}
            />
          ) : (
            <div className="cine-fallback">
              <HeroScene />
            </div>
          )}
        </div>
      </section>

      {/* ————— Chapter II · The origin ————— */}
      <section className="chapter dark">
        <div className="wrap chapter-grid">
          <div className="chapter-media" data-reveal>
            {origin ? (
              <Image
                src={origin}
                alt="A wooden Zivasha tray lined with brocade — jars of almonds, cashews and pistachios, laddus and a silk potli"
                fill
                quality={60}
                sizes="(max-width: 900px) 100vw, 510px"
                {...blurProps(origin)}
              />
            ) : (
              <ProductArt art="hamper4" />
            )}
          </div>
          <div data-reveal>
            <p className="eyebrow">The Origin</p>
            <h2>
              Three centuries of Khari Baoli, <em>chosen by hand</em>
            </h2>
            <p className="chapter-copy">
              Every almond in a Zivasha jar was judged by eye in Delhi&rsquo;s oldest wholesale
              market — the way traders have judged Mamra and Akbari pista for three hundred years.
              We buy small, pack fresh, and seal each jar the same week it is filled.
            </p>
            <p className="chapter-copy">
              No factory. No warehouse dust. Just the season&rsquo;s best, carried from the mandi
              to your table.
            </p>
            <Link className="link-gold" href="/our-story/">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ————— Chapter III · The collection ————— */}
      <section className="section" id="collection">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The Collection</p>
            <h2>Six hampers. One standard.</h2>
            <p>
              From the Aarambh starter to the two-tier Signature Utsav trunk — B2B pricing from 25
              boxes, slab discounts from 50. Buying a few for family? Final price incl. GST on
              WhatsApp.
            </p>
          </div>
          <div className="col-grid">
            {hampers.map((p) => {
              const img = productImage(p.slug);
              return (
                <article className="col-card" key={p.slug} data-reveal>
                  <div className="col-img">
                    {img ? (
                      <Image
                        src={img}
                        alt={`${p.name} — Zivasha gift hamper`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 540px"
                        {...blurProps(img)}
                      />
                    ) : (
                      <ProductArt art={p.art} />
                    )}
                    {p.badge && <span className="badge overlay">{p.badge}</span>}
                  </div>
                  <div className="col-meta">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
                    <div className="price-row">
                      <span className="price">{inr(p.price)}</span>
                      <span className="price-note">+ GST · single boxes welcome</span>
                      <span className="weight">{p.weight}</span>
                    </div>
                    <a
                      className="btn small"
                      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                        `Hi Zivasha! I'd like to order the ${p.name} hamper (${inr(p.price)}).`
                      )}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Chapter IV · The indulgence ————— */}
      <section className="indulge">
        {indulge && (
          <Image
            className="indulge-img"
            src={indulge}
            alt="A gond laddu broken open — jaggery, ghee and roasted nuts glistening"
            fill
            quality={60}
            sizes="100vw"
            {...blurProps(indulge)}
          />
        )}
        <div className="indulge-veil" aria-hidden="true" />
        <div className="indulge-words" data-reveal>
          <p className="eyebrow on-gold">The Indulgence</p>
          <h2>
            Gond. Ghee. Jaggery.
            <br />
            <em>The recipe your grandmother kept.</em>
          </h2>
          <Link className="btn ghost on-dark" href="/laddus/">
            Taste the laddus
          </Link>
        </div>
      </section>

      {/* ————— Chapter V · Three doors ————— */}
      <section className="section">
        <div className="wrap">
          <div className="trio">
            {trio.map((t) => (
              <Link className="trio-item" href={t.href} key={t.title} data-reveal>
                {t.img ? (
                  // decorative inside a link the caption already labels
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    quality={60}
                    sizes="(max-width: 640px) 100vw, (max-width: 1120px) 30vw, 347px"
                    {...blurProps(t.img)}
                  />
                ) : (
                  <div className="trio-fallback" />
                )}
                <span className="trio-caption">
                  <b>{t.title}</b>
                  <i>{t.line}</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Chapter VI · The ritual ————— */}
      <section className="chapter dark">
        <div className="wrap chapter-grid flip">
          <div data-reveal>
            <p className="eyebrow">The Ritual</p>
            <h2>
              Gifts that arrive before Dhanteras <em>glow the longest</em>
            </h2>
            <p className="chapter-copy">
              A Zivasha hamper lands a few days early — when the house is being readied, the diyas
              are being counted, and a beautiful box still has time to be admired. Logo
              customisation closes {site.customisationCutoff}; final Diwali dispatch{' '}
              {site.finalDispatch}.
            </p>
            <div className="hero-ctas">
              <Link className="btn gold" href="/shop/">
                Shop the season
              </Link>
              <a className="btn ghost on-dark" href={waGeneric('WEB-home')} target="_blank" rel="noopener">
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="chapter-media" data-reveal>
            {ritual ? (
              <Image
                src={ritual}
                alt="A Zivasha hamper amid lit diyas and marigold garlands on a Diwali evening"
                fill
                quality={60}
                sizes="(max-width: 900px) 100vw, 510px"
                {...blurProps(ritual)}
              />
            ) : (
              <ProductArt art="hamper5" />
            )}
          </div>
        </div>
      </section>

      {/* ————— Chapter VII · The corporate invitation ————— */}
      <section className="chapter">
        <div className="wrap chapter-grid">
          <div className="chapter-media" data-reveal>
            {corporate ? (
              <Image
                src={corporate}
                alt="The Zivasha green trunk hamper — jars above, laddus and seed bars in the drawer"
                fill
                quality={60}
                sizes="(max-width: 900px) 100vw, 510px"
                {...blurProps(corporate)}
              />
            ) : (
              <ProductArt art="combo" />
            )}
          </div>
          <div data-reveal>
            <p className="eyebrow">Corporate &amp; Bulk</p>
            <h2>
              The gift that gets you <em>remembered</em>
            </h2>
            <p className="chapter-copy">
              Client gifting, dealer gifting, doctor gifting — with published slab pricing, a free
              logo sleeve from 25 boxes, and documentation that de-risks the decision for your
              procurement team.
            </p>
            <ul className="keylines">
              <li>Free logo sleeve from 25 boxes</li>
              <li>Slab discounts published, from 50 boxes</li>
              <li>50% advance with PO · balance before dispatch</li>
            </ul>
            <div className="hero-ctas">
              <Link className="btn gold" href="/corporate-gifting/">
                See slab pricing
              </Link>
              <a className="btn ghost" href={waCorporate('WEB-home')} target="_blank" rel="noopener">
                Request a sample box
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
