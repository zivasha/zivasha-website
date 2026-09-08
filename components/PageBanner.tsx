import Image from 'next/image';
import type { ReactNode } from 'react';
import { blurProps } from '@/lib/images';

/**
 * Image-backed editorial banner used at the top of inner pages — the same
 * cinematic language as the home hero, at a calmer height. Falls back to the
 * plain cream page-hero when no image exists yet.
 */
export default function PageBanner({
  eyebrow,
  title,
  lede,
  image,
  alt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  image: string | null;
  alt: string;
  children?: ReactNode;
}) {
  if (!image) {
    return (
      <section className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p>{lede}</p>}
        {children && <div className="hero-ctas center">{children}</div>}
      </section>
    );
  }
  return (
    <section className="banner">
      <Image
        className="banner-img"
        src={image}
        alt={alt}
        fill
        priority
        quality={65}
        sizes="100vw"
        {...blurProps(image)}
      />
      <div className="banner-scrim" aria-hidden="true" />
      <div className="banner-content">
        <p className="eyebrow on-gold">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="banner-lede">{lede}</p>}
        {children && <div className="hero-ctas center">{children}</div>}
      </div>
    </section>
  );
}
