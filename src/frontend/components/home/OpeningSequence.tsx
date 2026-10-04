"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  atelierFrames,
  atelierSignature,
  secondaryPortrait,
  studioPortrait,
  type VisualFrame,
} from "@backend/content/visualFrames";
import styles from "./openingSequence.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function StageReel({
  cursor,
  frames,
  eager = false,
}: {
  cursor: number;
  frames: VisualFrame[];
  eager?: boolean;
}) {
  return frames.map((frame, index) => (
    <img
      alt={index === cursor ? frame.alt : ""}
      aria-hidden={index !== cursor}
      className={`${styles.cycleImage} ${
        index === cursor ? styles.cycleImageVisible : ""
      }`}
      key={`${frame.src}-${index}`}
      src={frame.src}
      loading={eager && index === 0 ? "eager" : "lazy"}
    />
  ));
}

export default function OpeningSequence() {
  const root = useRef<HTMLDivElement>(null);
  const [atelierCursor, setAtelierCursor] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const atelierPulse = window.setInterval(
      () => setAtelierCursor((index) => (index + 1) % atelierFrames.length),
      1500,
    );

    return () => {
      window.clearInterval(atelierPulse);
    };
  }, []);

  useGSAP(
    () => {
      const queries = gsap.matchMedia();
      queries.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-entrance]").forEach((node) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
            },
          );
        });
      });
      return () => queries.revert();
    },
    { scope: root },
  );

  return (
    <div className={styles.sequence} ref={root}>
      <section
        className={styles.studio}
        aria-labelledby="studio-heading"
        id="studio-intro"
      >
        <div className={styles.studioStage}>
          <p className={styles.studioEyebrow} data-entrance>
            The Studio
          </p>
          <p className={styles.studioLineOne} data-entrance>
            Masterful Photography
          </p>
          <p className={styles.studioIn} data-entrance>
            in
          </p>
          <p className={styles.studioLineTwo} data-entrance>
            Spectacular
          </p>
          <p className={styles.studioLineThree} data-entrance id="studio-heading">
            Destinations
          </p>
          <img
            alt=""
            aria-hidden="true"
            className={styles.studioSignature}
            data-entrance
            src={atelierSignature}
          />
          <div className={styles.studioPortrait}>
            <StageReel cursor={atelierCursor} frames={atelierFrames} />
          </div>
          <p className={styles.studioCopy} data-entrance>
            The Wedding Entity photographs celebrations with an editorial eye
            and a documentary instinct—holding architecture, movement, detail,
            and the unscripted exchanges that make each gathering personal.
          </p>
          <Link className={styles.studioButton} href="/portfolio">
            Browse portfolio
          </Link>
        </div>
      </section>

      <section
        className={styles.known}
        aria-labelledby="known-heading"
        id="known-for"
      >
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/entity-known-for-film.mp4" type="video/mp4" />
        </video>
        <div className={styles.knownShade} />
        <div className={styles.knownCopy}>
          <p data-entrance>Known for imagery rooted in</p>
          <h2 id="known-heading">
            <span data-entrance>Adventure, Purpose,</span>
            <em data-entrance>and</em>
            <span data-entrance>Soul</span>
          </h2>
          <p className={styles.knownBody} data-entrance>
            The Wedding Entity looks for photography with meaning—images that
            hold fleeting moments and oft-forgotten details, shaped by craft,
            care for the people in front of the camera, and a lasting sense of
            place.
          </p>
        </div>
      </section>

      <section
        className={styles.atelier}
        aria-labelledby="atelier-heading"
        id="atelier"
      >
        <div className={styles.atelierStage}>
          <div className={styles.atelierLeft}>
            <img
              alt="The Wedding Entity studio portrait"
              data-depth="80"
              src={studioPortrait}
            />
          </div>
          <div className={styles.atelierRight}>
            <img
              alt="Photographer working in a light-filled setting"
              data-depth="120"
              src={secondaryPortrait}
            />
          </div>
          <p className={styles.atelierLabel} data-entrance id="atelier-heading">
            About The Wedding Entity
          </p>
          <p className={styles.atelierCopy} data-entrance>
            The Wedding Entity draws on fashion and editorial photography for
            images that are{" "}
            <em>boldly natural, graceful, honest, and entirely captivating.</em>
          </p>
          <Link className={styles.atelierButton} href="/about">
            Read more
          </Link>
        </div>
      </section>
    </div>
  );
}
