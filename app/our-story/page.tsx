import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import { HeroScene } from '@/components/brand/ProductArt';
import { blurProps, imageSeries, productImage } from '@/lib/images';
import { pageOg } from '@/lib/seo';
import { waCorporate } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Zivasha — Tradition Nourished Gifted. Dry fruits hand-picked at Khari Baoli, laddus made to a North Indian winter recipe, hampers assembled by hand in Delhi NCR.',
  openGraph: pageOg(
    productImage('story-origin'),
    'A Zivasha wooden tray hamper lined with brocade, jars and laddus in warm light',
  ),
};

const lifestyleAlts = [
  'Lit diyas and marigold flowers at Diwali',
  'Assorted premium nuts in a bowl',
  'A green gift box changing hands',
  'A cascade of almonds',
];

const arrivals = [
  {
    img: productImage('col-hatbox'),
    title: 'The Hatbox',
    line: 'Lift the lid on a round reveal',
    href: '/shop/',
    alt: 'A round Zivasha hatbox with the lid off — jars of almonds and pistachios nestled in gold shred beside a green silk potli',
  },
  {
    img: productImage('col-potli'),
    title: 'The Silk Potli',
    line: 'Drawstring silk, tied by hand',
    href: '/shop/',
    alt: 'Three silk potlis in green, cream and gold, spilling almonds, pistachios and dried cranberries',
  },
  {
    img: productImage('col-tower'),
    title: 'The Gift Tower',
    line: 'Three tiers, one gold ribbon',
    href: '/corporate-gifting/',
    alt: 'A three-tier tower of cream and green Zivasha gift boxes tied with a gold satin ribbon',
  },
];

export default function OurStory() {
  const lifestyle = imageSeries('lifestyle');
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title={<>Rooted in tradition. <em>Made for today.</em></>}
        image={productImage('story-origin')}
        alt="A Zivasha wooden tray hamper lined with brocade, jars and laddus in warm light"
      />

      <section className="section">
        <div className="wrap narrow">
          <p className="lede">
            Our dry fruits are hand-picked at <strong>Khari Baoli</strong> — Delhi’s historic
            wholesale market, where the city has bought its almonds and pistachios for over three
            centuries. That is where Zivasha begins: with ingredients chosen by hand, from traders
            who have judged a batch of Mamra almonds by eye for generations.
          </p>
          <p>
            Our Gond Laddus follow a North Indian winter recipe: gond roasted in desi ghee, bound
            with jaggery the traditional way. Our Seven Seeds Nutribar carries that same honesty
            into a modern snack — seven seeds, one clean bar. And every hamper is assembled by hand
            in small batches, sealed jar by jar, and checked before it leaves.
          </p>
          <p>Because a gift carries your name as much as ours.</p>
        </div>
      </section>

      {lifestyle.length > 0 && (
        <section className="section alt">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">The Zivasha table</p>
              <h2>Goodness you can see</h2>
            </div>
            <div className="life-grid">
              {lifestyle.map((img, i) => (
                <div className="life-item" key={img}>
                  <Image
                    src={img}
                    alt={lifestyleAlts[i] ?? ''}
                    fill
                    quality={60}
                    sizes="(max-width: 1041px) 50vw, 270px"
                    {...blurProps(img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="story">
        <div className="story-in">
          <div>
            <p className="eyebrow">What we stand for</p>
            <h2>Three centuries of Khari Baoli, in one box</h2>
            <p>
              Premium ingredients. Traditional jaggery and desi-ghee recipes. Hygienically prepared
              and packed, batch by batch. Thoughtfully designed gifting — for families, corporates
              and every special occasion.
            </p>
          </div>
          <div className="chapter-media">
            {productImage('story-ritual') ? (
              <Image
                src={productImage('story-ritual')!}
                alt="A Zivasha hamper amid lit diyas on a Diwali evening"
                fill
                sizes="(max-width: 900px) 100vw, 510px"
                {...blurProps('story-ritual')}
              />
            ) : (
              <HeroScene />
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The Presentation</p>
            <h2>How a Zivasha gift arrives</h2>
          </div>
          <div className="trio">
            {arrivals.map((a) => (
              <Link className="trio-item" href={a.href} key={a.title}>
                {a.img ? (
                  <Image
                    src={a.img}
                    alt={a.alt}
                    fill
                    quality={60}
                    sizes="(max-width: 640px) 100vw, (max-width: 1120px) 30vw, 347px"
                    {...blurProps(a.img)}
                  />
                ) : (
                  <div className="trio-fallback" />
                )}
                <span className="trio-caption">
                  <b>{a.title}</b>
                  <i>{a.line}</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap narrow">
          <div className="section-head">
            <p className="eyebrow">See it for yourself</p>
            <h2>The proof is in the box.</h2>
          </div>
          <div className="hero-ctas center">
            <Link className="btn gold" href="/shop/">
              See the range
            </Link>
            <Link className="btn ghost" href="/corporate-gifting/">
              Corporate gifting
            </Link>
            <a className="btn ghost" href={waCorporate('WEB-story')} target="_blank" rel="noopener">
              Request a sample box
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
