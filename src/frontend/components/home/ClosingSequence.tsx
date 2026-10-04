"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { siteImage } from "@backend/content/siteImages";
import { useNewsletterSubmit } from "@frontend/hooks/use-newsletter-submit";
import styles from "./closingSequence.module.css";

type FeatureSlide = {
  backdrop: string;
  portrait: string;
  detail: string;
  eyebrow: string;
  preface: string;
  title: string;
};

const journalTiles = [
  {
    image: siteImage(0),
    label: "Destination notes",
    title: "A Celebration Shaped by Late Light",
  },
  {
    image: siteImage(12),
    label: "The heirloom edit",
    title: "Old-World Detail for a Modern Ceremony",
  },
  {
    image: siteImage(10),
    label: "Editorial study",
    title: "Fashion, Flowers, and the Art of a Portrait",
  },
  {
    image: siteImage(4),
    label: "Island journal",
    title: "A Wedding Weekend at the Edge of the Sea",
  },
  {
    image: siteImage(11),
    label: "Gathering well",
    title: "An Intimate Story Built Around Connection",
  },
];

const featureSlides: FeatureSlide[] = [
  {
    backdrop: siteImage(0),
    portrait: siteImage(16),
    detail: siteImage(3),
    eyebrow: "Featured gallery",
    preface: "A celebration beneath open skies",
    title: "Tuscany, in Light",
  },
  {
    backdrop: siteImage(5),
    portrait: siteImage(7),
    detail: siteImage(2),
    eyebrow: "Featured gallery",
    preface: "A city written in flowers and movement",
    title: "Paris Reverie",
  },
  {
    backdrop: siteImage(4),
    portrait: siteImage(8),
    detail: siteImage(9),
    eyebrow: "Featured gallery",
    preface: "An island story at the water's edge",
    title: "Maldives, at Sea",
  },
];

const footerFrames = [
  {
    src: siteImage(12),
    alt: "Couple standing in a garden",
  },
  {
    src: siteImage(5),
    alt: "Bridal editorial portrait",
  },
  {
    src: siteImage(6),
    alt: "Couple walking through open landscape",
  },
  {
    src: siteImage(10),
    alt: "Fashion-forward wedding portrait",
  },
  {
    src: siteImage(11),
    alt: "Destination wedding celebration",
  },
];

const footerLinks = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Offerings", "/offerings"],
  ["About", "/about"],
  ["For Photographers", "/education"],
  ["Contact", "/contact"],
  ["Journal", "/journal"],
];

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  const points = direction === "previous" ? "25 8 13 20 25 32" : "15 8 27 20 15 32";

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40">
      <polyline points={points} />
    </svg>
  );
}

function JournalMosaic() {
  return (
    <section
      className={styles.readingRoom}
      id="publications"
      aria-labelledby="publications-title"
    >
      <div className={styles.readingInner}>
        <header className={styles.readingHeader}>
          <p>Studio journal</p>
          <h2 id="publications-title">Essential Stories</h2>
        </header>

        <div className={styles.storyMosaic}>
          {journalTiles.map((story, index) => (
            <article
              className={`${styles.storyTile} ${styles[`storyTile${index + 1}`]}`}
              key={story.title}
            >
              <Link href="/journal" aria-label={`Read ${story.title}`}>
                <img src={story.image} alt="" loading="lazy" />
                <span className={styles.storyShade} />
                <span className={styles.storyLabel}>{story.label}</span>
                <span className={styles.storyWords}>
                  <small>{story.label}</small>
                  <strong>{story.title}</strong>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedGallerySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timerVersion, setTimerVersion] = useState(0);
  const carouselRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActiveSlide((current) => (current + 1) % featureSlides.length);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) advance();
    }, 4000);

    return () => window.clearInterval(timer);
  }, [advance, timerVersion]);

  const chooseSlide = (nextIndex: number) => {
    setActiveSlide(
      (nextIndex + featureSlides.length) % featureSlides.length,
    );
    setTimerVersion((version) => version + 1);
  };

  const slide = featureSlides[activeSlide];

  return (
    <section
      className={styles.featureStage}
      id="featured-gallery"
      aria-label="Featured wedding galleries"
      aria-roledescription="carousel"
      ref={carouselRef}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className={styles.featureBackdrops} aria-hidden="true">
        {featureSlides.map((item, index) => (
          <div
            className={`${styles.featureBackdrop} ${
              index === activeSlide ? styles.isCurrent : ""
            }`}
            key={item.backdrop}
          >
            <img src={item.backdrop} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.featureVeil} />

      <div className={styles.featureLayout}>
        <div className={styles.featurePortrait} aria-hidden="true">
          {featureSlides.map((item, index) => (
            <img
              className={index === activeSlide ? styles.isCurrent : ""}
              src={item.portrait}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              key={item.portrait}
            />
          ))}
        </div>

        <div className={styles.featureCopy} aria-live="polite">
          <p className={styles.featureEyebrow}>{slide.eyebrow}</p>
          <p className={styles.featurePreface}>{slide.preface}</p>
          <h2>{slide.title}</h2>

          <div className={styles.featureBrowse}>
            <button
              type="button"
              onClick={() => chooseSlide(activeSlide - 1)}
              aria-label="Show previous featured gallery"
            >
              <ArrowIcon direction="previous" />
            </button>
            <span>browse</span>
            <button
              type="button"
              onClick={() => chooseSlide(activeSlide + 1)}
              aria-label="Show next featured gallery"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>

          <div className={styles.featureDots} aria-label="Choose a gallery">
            {featureSlides.map((item, index) => (
              <button
                className={index === activeSlide ? styles.isCurrent : ""}
                type="button"
                onClick={() => chooseSlide(index)}
                aria-label={`Show gallery ${index + 1}: ${item.title}`}
                aria-current={index === activeSlide ? "true" : undefined}
                key={item.title}
              />
            ))}
          </div>
        </div>

        <div className={styles.featureDetail} aria-hidden="true">
          {featureSlides.map((item, index) => (
            <img
              className={index === activeSlide ? styles.isCurrent : ""}
              src={item.detail}
              alt=""
              loading="lazy"
              key={item.detail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrintCollectionSection() {
  return (
    <section
      className={styles.printRoom}
      id="print-shop"
      aria-labelledby="print-title"
    >
      <div className={styles.printImageLeft}>
        <img
          data-depth="120"
          src={siteImage(4)}
          alt="Fine-art landscape photograph"
          loading="lazy"
        />
      </div>
      <div className={styles.printImageRight}>
        <img
          data-depth="40"
          src={siteImage(13)}
          alt="Fine-art editorial photograph"
          loading="lazy"
        />
      </div>

      <div className={styles.printMessage}>
        <p className={styles.printScript}>print shop</p>
        <p className={styles.printKicker}>The Wedding Entity collection</p>
        <h2 id="print-title">Land, Wonder &amp; Celebration</h2>
        <span className={styles.printRule} />
        <p className={styles.printSmall}>A personal edit of</p>
        <p className={styles.printScript}>fine-art photographs</p>
        <p className={styles.printKicker}>Made for the rooms you live in</p>
        <Link className={styles.outlineLight} href="/print-shop">
          Explore the collection
        </Link>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section
      className={styles.educationBand}
      id="education"
      aria-labelledby="education-title"
    >
      <div className={styles.educationImage}>
        <img
          src={siteImage(18)}
          alt="A photographer working in a sunlit studio"
          loading="lazy"
        />
      </div>
      <div className={styles.educationCopy}>
        <p className={styles.educationKicker}>
          The Wedding Entity Education
        </p>
        <h2 id="education-title">Shared Practice</h2>
        <p className={styles.educationScript}>for photographers</p>
        <p className={styles.educationBody}>
          Thoughtful resources for photographers building an observant,
          sustainable practice—created from real assignments, honest lessons,
          and a belief that craft grows through generous exchange.
        </p>
        <Link className={styles.outlineLight} href="/education">
          View resources
        </Link>
      </div>
    </section>
  );
}

function InquirySection() {
  return (
    <section
      className={styles.inquiryScene}
      id="inquire"
      aria-labelledby="inquiry-title"
    >
      <video
        className={styles.inquiryVideo}
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/entity-inquiry-film.mp4" type="video/mp4" />
      </video>
      <div className={styles.inquiryDimmer} />
      <div className={styles.inquiryCopy}>
        <h2 id="inquiry-title">Imagery That Feels Alive,</h2>
        <p className={styles.inquiryScript}>and wholly yours.</p>
        <p className={styles.inquiryBody}>
          Tell us where you are gathering and what matters most. The Wedding
          Entity will shape an honest, artful record of everything that follows.
        </p>
        <Link className={styles.outlineLight} href="/contact">
          Begin an inquiry
        </Link>
      </div>
    </section>
  );
}

function SiteFooter() {
  const newsletter = useNewsletterSubmit();

  const returnToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className={styles.closingFooter} id="site-footer">
      <div className={styles.footerStrip}>
        {footerFrames.map((frame) => (
          <a
            href="https://www.instagram.com/theweddingentity/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit The Wedding Entity on Instagram"
            key={frame.src}
          >
            <img src={frame.src} alt={frame.alt} loading="lazy" />
          </a>
        ))}
      </div>

      <div className={styles.footerInner}>
        <button
          className={styles.topButton}
          type="button"
          onClick={returnToTop}
        >
          <span aria-hidden="true">↑</span>
          Back to top
        </button>

        <Link className={styles.footerMark} href="/" aria-label="The Wedding Entity home">
          TheWeddingEntity
        </Link>

        <nav className={styles.footerNavigation} aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>

        <a
          className={styles.footerSocial}
          href="https://www.instagram.com/theweddingentity/"
          target="_blank"
          rel="noreferrer"
        >
          Follow @TheWeddingEntity
        </a>

        <div className={styles.newsletter}>
          <h2>Letters from The Wedding Entity</h2>
          <p>
            Occasional notes on meaningful gatherings, image-making, travel,
            and the details we keep returning to.
          </p>
          <form onSubmit={newsletter.submit}>
            <label className={styles.visuallyHidden} htmlFor="closing-email">
              Email address
            </label>
            <input
              id="closing-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              required
            />
            <button type="submit" disabled={newsletter.pending}>
              {newsletter.pending ? "Sending" : "Subscribe"}
            </button>
          </form>
          {newsletter.status ? <p role="status">{newsletter.status}</p> : null}
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} The Wedding Entity. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function ClosingSequence() {
  return (
    <div className={styles.sequence}>
      <JournalMosaic />
      <FeaturedGallerySection />
      <PrintCollectionSection />
      <EducationSection />
      <InquirySection />
      <SiteFooter />
    </div>
  );
}
