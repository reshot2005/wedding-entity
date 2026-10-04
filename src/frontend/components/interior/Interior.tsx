import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  type JournalStory,
  type PortfolioCollection,
  type VisualAsset,
  siteUrl,
} from "@backend/content/siteContent";
import styles from "./interior.module.css";

export function createPageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const canonical = `${siteUrl}${path === "/" ? "" : path}`;
  const shortTitle = title.replace(/\s*\|\s*The Wedding Entity\s*$/i, "");

  return {
    title: shortTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export function InteriorPage({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      {children}
    </main>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  image: VisualAsset;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  compact = false,
}: PageHeroProps) {
  return (
    <header className={`${styles.hero} ${compact ? styles.heroCompact : ""}`}>
      <div className={styles.heroMedia}>
        <Image
          className={styles.heroImage}
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroLede}>{lede}</p>
      </div>
    </header>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tint?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  children,
  tint = false,
}: SectionIntroProps) {
  return (
    <section className={tint ? styles.sectionTint : styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.sectionCopy}>{children}</div>
      </div>
    </section>
  );
}

type SplitFeatureProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image: VisualAsset;
  reverse?: boolean;
  link?: { href: string; label: string };
  tint?: boolean;
};

export function SplitFeature({
  eyebrow,
  title,
  children,
  image,
  reverse = false,
  link,
  tint = false,
}: SplitFeatureProps) {
  return (
    <section className={tint ? styles.sectionTint : styles.section}>
      <div className={`${styles.split} ${reverse ? styles.splitReverse : ""}`}>
        <div className={styles.splitMedia}>
          <Image
            className={styles.splitImage}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 860px) 100vw, 58vw"
          />
        </div>
        <div className={styles.splitCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <div className={styles.bodyCopy}>{children}</div>
          {link ? (
            <Link className={styles.link} href={link.href}>
              {link.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export type ListItem = {
  title: string;
  text: string;
};

export function NumberedList({
  eyebrow,
  title,
  intro,
  items,
  tint = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: ListItem[];
  tint?: boolean;
}) {
  return (
    <section className={tint ? styles.sectionTint : styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <p className={styles.sectionCopy}>{intro}</p>
      </div>
      <div className={styles.numberedList}>
        {items.map((item, index) => (
          <article className={styles.listItem} key={item.title}>
            <span className={styles.listNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.listTitle}>{item.title}</h3>
            <p className={styles.listText}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PortfolioCards({
  collections,
}: {
  collections: PortfolioCollection[];
}) {
  return (
    <div className={styles.cards}>
      {collections.map((collection) => (
        <Link
          className={styles.card}
          href={`/portfolio/${collection.slug}`}
          key={collection.slug}
        >
          <div className={styles.cardMedia}>
            <Image
              className={styles.cardImage}
              src={collection.cover.src}
              alt={collection.cover.alt}
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.eyebrow}>{collection.eyebrow}</span>
            <h2 className={styles.cardTitle}>{collection.title}</h2>
            <p className={styles.cardText}>{collection.introduction}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ImageGallery({ images }: { images: VisualAsset[] }) {
  return (
    <section className={styles.section} aria-label="Selected photographs">
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <figure className={styles.galleryItem} key={`${image.src}-${index}`}>
            <Image
              className={styles.galleryImage}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 600px) 100vw, 70vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function JournalCards({ stories }: { stories: JournalStory[] }) {
  return (
    <div className={styles.journalGrid}>
      {stories.map((story) => (
        <Link
          className={styles.storyCard}
          href={`/journal/${story.slug}`}
          key={story.slug}
        >
          <div className={styles.storyMedia}>
            <Image
              className={styles.storyImage}
              src={story.image.src}
              alt={story.image.alt}
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <time className={styles.storyDate} dateTime={story.date}>
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(story.date))}
          </time>
          <h2 className={styles.storyTitle}>{story.title}</h2>
          <p className={styles.cardText}>{story.summary}</p>
        </Link>
      ))}
    </div>
  );
}

export function Quote({
  children,
  credit,
}: {
  children: ReactNode;
  credit?: string;
}) {
  return (
    <section className={styles.sectionTint}>
      <blockquote className={styles.quote}>
        <p className={styles.quoteText}>{children}</p>
        {credit ? (
          <footer className={styles.quoteCredit}>{credit}</footer>
        ) : null}
      </blockquote>
    </section>
  );
}

export function CallToAction({
  title,
  href,
  label,
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <section className={styles.cta}>
      <div>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <Link className={styles.link} href={href}>
          {label}
        </Link>
      </div>
    </section>
  );
}

export function ProseArticle({
  date,
  children,
}: {
  date?: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.proseSection}>
      <div>
        <span className={styles.eyebrow}>
          {date
            ? new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(date))
            : "The Wedding Entity"}
        </span>
      </div>
      <div className={styles.prose}>{children}</div>
    </article>
  );
}

export function ContentSection({
  eyebrow,
  title,
  children,
  tint = false,
}: SectionIntroProps) {
  return (
    <section className={tint ? styles.sectionTint : styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export { styles as interiorStyles };
