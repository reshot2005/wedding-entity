"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Animation21Section from "@/sections/Animation21/Animation21Section";
import styles from "./middleSequence.module.css";

import { siteImage } from "@backend/content/siteImages";
import { atelierMarks } from "@backend/content/visualFrames";

const DISCOVER_PRIMARY = siteImage(12);
const DISCOVER_SECONDARY = siteImage(17);
const DIVIDER_FILM = "/videos/entity-divider-film.mp4";
const PORTRAITS_REVEAL = siteImage(6);
const STUDIO_IMAGE = siteImage(15);

const portfolioItems = [
  {
    key: "weddings",
    title: "Weddings",
    href: "/portfolio/weddings",
    cover: siteImage(12),
    reveal: siteImage(8),
  },
  {
    key: "portraits",
    title: "Portraits",
    href: "/portfolio/portraits",
    cover: siteImage(6),
    reveal: PORTRAITS_REVEAL,
  },
  {
    key: "editorial",
    title: "Editorial",
    href: "/portfolio/editorial",
    cover: siteImage(5),
    reveal: siteImage(1),
  },
] as const;

type PortfolioItem = (typeof portfolioItems)[number];

function WorkPanel({ item }: { item: PortfolioItem }) {
  return (
    <a
      className={`${styles.workPanel} ${styles[`workPanel${item.key}`]}`}
      href={item.href}
      aria-label={`Explore The Wedding Entity ${item.title.toLowerCase()} portfolio`}
    >
      <img
        className={styles.workRevealImage}
        src={item.reveal}
        alt=""
        aria-hidden="true"
      />
      <span className={styles.workShade} aria-hidden="true" />
      <span className={styles.workRevealCopy}>
        <span className={styles.workRevealTitle}>{item.title}</span>
        <span className={styles.lightButton}>Browse portfolio</span>
      </span>
      <img
        className={styles.workCoverImage}
        src={item.cover}
        alt={`${item.title} photography by The Wedding Entity`}
      />
      <span className={styles.workMobileTitle}>{item.title}</span>
    </a>
  );
}

export function ValuesRibbon() {
  return (
    <section id="press" className={styles.valuesBand} aria-label="Studio values">
      <div className={styles.valuesInner}>
        <div className={styles.valuesCopy}>
          <p>Destination wedding photography, thoughtfully composed</p>
          <p>Editorial perspective with a deeply personal point of view</p>
          <p>Celebrations documented near home and around the world</p>
          <p>Photographs created to live far beyond the day</p>
        </div>
        <div className={styles.valuesMarks}>
          {atelierMarks.map((mark) => (
            <span className={styles.valuesMark} key={mark.label}>
              {mark.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DiscoverSection() {
  return (
    <section id="discover" className={styles.discovery}>
      <div className={styles.discoveryStage}>
        <div className={styles.discoveryPrimary}>
          <img
            src={DISCOVER_PRIMARY}
            alt="A wedding celebration photographed by The Wedding Entity"
          />
        </div>

        <p className={styles.discoveryScript}>Discover</p>

        <div className={styles.discoveryHeadline}>
          <p className={styles.displayCaps}>Images</p>
          <p className={styles.discoverySmall}>without a shelf life,</p>
          <p className={styles.displayCaps}>Moments</p>
          <p className={styles.displayItalic}>remembered</p>
          <p className={styles.discoverySmall}>as they felt.</p>
        </div>

        <div className={styles.discoverySecondary}>
          <img
            src={DISCOVER_SECONDARY}
            alt="An editorial portrait on the water by The Wedding Entity"
          />
        </div>

        <p className={styles.discoveryBody}>
          You care about the people, places, and fleeting details that make a
          celebration entirely your own. We photograph each story with
          curiosity, restraint, and an eye for honest beauty.{" "}
          <em>
            The result is a collection that feels considered, alive, and
            unmistakably yours.
          </em>
        </p>
      </div>
    </section>
  );
}

export function VideoDividerSection() {
  return (
    <section
      id="video-divider"
      className={styles.filmDivider}
      aria-label="Wedding film"
    >
      <video
        className={styles.desktopFilm}
        autoPlay
        muted
        playsInline
        preload="metadata"
      >
        <source src={DIVIDER_FILM} type="video/mp4" />
      </video>
      <video
        className={styles.mobileFilm}
        autoPlay
        muted
        playsInline
        preload="metadata"
      >
        <source src={DIVIDER_FILM} type="video/mp4" />
      </video>
    </section>
  );
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.portfolioStage}>
        <p className={styles.portfolioEyebrow}>Signature work</p>
        <h2 className={styles.portfolioTitle}>Portfolio</h2>

        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item) => (
            <WorkPanel key={item.key} item={item} />
          ))}
        </div>

        <Link className={styles.portfolioButton} href="/portfolio">
          View full portfolio
        </Link>
      </div>
    </section>
  );
}

export function KindWordsSection() {
  return (
    <section id="kind-words" className={styles.kindWords}>
      <div className={styles.kindWordsStage}>
        <div className={styles.kindWordsCopy}>
          <p className={styles.kindWordsEyebrow}>Kind words</p>
          <blockquote className={styles.kindWordsStatement}>
            We approach every celebration with calm attention—creating
            photographs that hold the scale of the setting and the intimacy of
            the people within it.
          </blockquote>
          <cite className={styles.kindWordsSignature}>The Wedding Entity</cite>
          <p className={styles.kindWordsNote}>A note from our studio</p>
        </div>
        <div className={styles.kindWordsImage}>
          <img
            src={STUDIO_IMAGE}
            alt="A quiet wedding-day detail photographed by The Wedding Entity"
          />
        </div>
      </div>
    </section>
  );
}

export default function MiddleSequence() {
  return (
    <>
      <Animation21Section />
      <VideoDividerSection />
      <PortfolioSection />
      <KindWordsSection />
    </>
  );
}
