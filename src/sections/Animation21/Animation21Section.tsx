"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useMotionRuntime } from "@frontend/components/motion";
import {
  killAnimation21Scroll,
  rebuildAnimation21Scroll,
  showAnimation21StaticLayouts,
} from "./flipOnScroll";
import { siteImage } from "@backend/content/siteImages";
import { preloadImages } from "./preloadImages";
import "./animation21.css";

function frameSrc(originalIndex: number) {
  return siteImage(originalIndex - 1);
}

function itemProps(originalIndex: number) {
  const src = frameSrc(originalIndex);
  return {
    style: { backgroundImage: `url(${src})` },
    "data-bg": src,
  };
}

const GALLERY_7_FRAMES = [
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 51, 52, 53, 54, 55, 56, 57, 58,
  59, 60, 61, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60, 61, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 51, 52,
  53, 54, 55, 56, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 51, 52, 53, 54,
  55, 56, 57, 58,
] as const;

export default function Animation21Section() {
  const sectionRef = useRef<HTMLElement>(null);
  const { refreshScrollEffects } = useMotionRuntime();
  const refreshScrollEffectsRef = useRef(refreshScrollEffects);
  refreshScrollEffectsRef.current = refreshScrollEffects;

  useGSAP(
    (_context, contextSafe) => {
      const root = sectionRef.current;
      if (!root || !contextSafe) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        showAnimation21StaticLayouts(root);
        return;
      }

      let cancelled = false;
      let resizeTimer = 0;
      let settleTimer = 0;

      const refresh = () => {
        refreshScrollEffectsRef.current();
      };

      const boot = contextSafe(() => {
        if (cancelled) return;
        rebuildAnimation21Scroll(root);
        requestAnimationFrame(refresh);
      });

      const onResize = contextSafe(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(boot, 250);
      });

      const pageReady =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              window.addEventListener("load", () => resolve(), { once: true });
            });

      Promise.all([
        preloadImages(root.querySelectorAll(".gallery__item")),
        pageReady,
      ]).then(() => {
        if (cancelled) return;
        requestAnimationFrame(() => requestAnimationFrame(boot));
        settleTimer = window.setTimeout(boot, 450);
      });

      window.addEventListener("resize", onResize);

      return () => {
        cancelled = true;
        window.clearTimeout(resizeTimer);
        window.clearTimeout(settleTimer);
        window.removeEventListener("resize", onResize);
        killAnimation21Scroll(root);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section-3"
      className="landing-section landing-section--animation21"
      aria-labelledby="section-3-title"
      data-skip-entrance="true"
    >
      <div className="frame">
        <div className="frame__title">
          <p className="frame__title-main">Discover</p>
        </div>
        <Link className="frame__prev" href="/portfolio">
          Browse portfolio
        </Link>
        <Link className="frame__cta" href="/contact">
          Check availability
        </Link>
      </div>

      <section className="project project--intro">
        <span className="project__label project__label--name">Studio</span>
        <span className="project__name">The Wedding Entity</span>
        <span className="project__label project__label--date">Focus</span>
        <span className="project__date">Destination · Editorial</span>
        <h2 className="project__title" id="section-3-title">
          <span className="project__title-line">Images</span>
          <span className="project__title-line">Remembered</span>
        </h2>
        <span className="project__label project__label--mission">Approach</span>
        <div className="project__mission">
          <p>
            Discover images without a shelf life, moments remembered as they
            felt. You care about the people, places, and fleeting details that
            make a celebration entirely your own.
          </p>
          <p>
            We photograph each story with curiosity, restraint, and an eye for
            honest beauty. The result is a collection that feels considered,
            alive, and unmistakably yours.
          </p>
        </div>
        <Link className="project__cta" href="/contact">
          Check availability
        </Link>
      </section>

      <div className="gallery-wrap">
        <div className="gallery gallery--row" id="gallery-1">
          <div className="gallery__item gallery__item--s" {...itemProps(6)} />
          <div className="gallery__item gallery__item--m" {...itemProps(3)} />
          <div className="gallery__item gallery__item--l" {...itemProps(4)} />
          <div
            className="gallery__item gallery__item--xl gallery__item--center"
            {...itemProps(1)}
          />
          <div className="gallery__item gallery__item--l" {...itemProps(5)} />
          <div className="gallery__item gallery__item--m" {...itemProps(2)} />
          <div className="gallery__item gallery__item--s" {...itemProps(6)} />
          <div className="caption">
            Destination wedding photography, thoughtfully composed—images made
            to hold the scale of a setting and the intimacy of the people
            within it.
          </div>
        </div>
      </div>

      <section className="project project--details project--left">
        <span className="project__label project__label--default">
          Thoughtfully composed
        </span>
        <p>
          Destination wedding photography, thoughtfully composed. Editorial
          perspective with a deeply personal point of view. Celebrations
          documented near home and around the world. Photographs created to
          live far beyond the day.
        </p>
      </section>

      <div className="gallery-wrap gallery-wrap--large">
        <div className="gallery gallery--grid gallery--breakout" id="gallery-2">
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(8)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(7)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(15)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(9)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(12)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(14)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(10)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(13)} />
          </div>
          <div className="gallery__item gallery__item-cut">
            <div className="gallery__item-inner" {...itemProps(11)} />
          </div>
          <div className="caption">
            <p>
              The Wedding Entity draws on fashion and editorial photography for
              images that are boldly natural, graceful, honest, and entirely
              captivating.
            </p>
          </div>
        </div>
      </div>

      <section className="project project--details project--right">
        <span className="project__label project__label--default">
          Editorial perspective
        </span>
        <p>
          Editorial perspective with a deeply personal point of view. We look
          for photography with meaning—images that hold fleeting moments and
          oft-forgotten details, shaped by craft, care for the people in front
          of the camera, and a lasting sense of place.
        </p>
      </section>

      <div className="gallery-wrap">
        <div className="gallery gallery--grid10" id="gallery-3">
          <div className="gallery__item pos-1" {...itemProps(16)} />
          <div className="gallery__item pos-2" {...itemProps(17)} />
          <div className="gallery__item pos-3" {...itemProps(18)} />
          <div className="gallery__item pos-4" {...itemProps(30)} />
          <div className="gallery__item pos-5" {...itemProps(20)} />
          <div className="gallery__item pos-6" {...itemProps(21)} />
          <div className="gallery__item pos-7" {...itemProps(22)} />
          <div className="gallery__item pos-8" {...itemProps(23)} />
          <div className="gallery__item pos-9" {...itemProps(24)} />
          <div className="gallery__item pos-10" {...itemProps(25)} />
          <div className="gallery__item pos-11" {...itemProps(26)} />
          <div className="gallery__item pos-12" {...itemProps(31)} />
          <div className="gallery__item pos-13" {...itemProps(28)} />
          <div className="gallery__item pos-14" {...itemProps(29)} />
          <div className="gallery__item pos-15" {...itemProps(19)} />
          <div className="gallery__item pos-16" {...itemProps(27)} />
          <div className="caption">Moments remembered as they felt</div>
        </div>
      </div>

      <section className="project project--details">
        <span className="project__label project__label--default">
          Near home and around the world
        </span>
        <p>
          Celebrations documented near home and around the world. The Wedding
          Entity photographs architecture, movement, detail, and the
          unscripted exchanges that make each gathering personal.
        </p>
      </section>

      <div className="gallery-wrap gallery-wrap--dense">
        <div
          className="gallery gallery--stack gallery--stack-inverse gallery--stack-dark"
          id="gallery-4"
        >
          <div className="gallery__item" {...itemProps(33)} />
          <div className="gallery__item" {...itemProps(34)} />
          <div className="gallery__item" {...itemProps(35)} />
          <div className="gallery__item" {...itemProps(36)} />
          <div className="gallery__item" {...itemProps(37)} />
          <div className="gallery__item" {...itemProps(38)} />
          <div className="caption">
            <p>
              Photographs created to live far beyond the day—considered, alive,
              and unmistakably yours.
            </p>
          </div>
        </div>
      </div>

      <div className="gallery-wrap gallery-wrap--dense">
        <div className="gallery gallery--stack gallery--stack-glass" id="gallery-5">
          <div className="gallery__item" {...itemProps(39)} />
          <div className="gallery__item" {...itemProps(40)} />
          <div className="gallery__item" {...itemProps(41)} />
          <div className="gallery__item" {...itemProps(42)} />
          <div className="gallery__item" {...itemProps(43)} />
          <div className="gallery__item" {...itemProps(44)} />
          <div className="caption">
            <p>
              You care about the people, places, and fleeting details that make
              a celebration entirely your own.
            </p>
          </div>
        </div>
      </div>

      <div className="gallery-wrap gallery-wrap--dense">
        <div
          className="gallery gallery--stack gallery--stack-inverse gallery--stack-scale gallery--stack-dark"
          id="gallery-6"
        >
          <div className="gallery__item" {...itemProps(45)} />
          <div className="gallery__item" {...itemProps(46)} />
          <div className="gallery__item" {...itemProps(47)} />
          <div className="gallery__item" {...itemProps(48)} />
          <div className="gallery__item" {...itemProps(49)} />
          <div className="gallery__item" {...itemProps(50)} />
          <div className="caption">
            <p>
              We photograph each story with curiosity, restraint, and an eye
              for honest beauty.
            </p>
          </div>
        </div>
      </div>

      <section className="project project--details project--right">
        <span className="project__label project__label--default">
          A life beyond the day
        </span>
        <p>
          Photographs created to live far beyond the day. Objects become
          meaningful through context. We move between wide scenes and close
          observations so the finished collection holds both atmosphere and
          texture.
        </p>
      </section>

      <div className="gallery-wrap">
        <div className="gallery gallery--gridtiny" id="gallery-7">
          {GALLERY_7_FRAMES.map((frame, index) => (
            <div
              className="gallery__item"
              key={`gallery-7-${index}-${frame}`}
              {...itemProps(frame)}
            />
          ))}
          <div className="caption">Images without a shelf life</div>
        </div>
      </div>

      <section className="project project--details project--left">
        <span className="project__label project__label--default">
          Honest beauty
        </span>
        <p>
          The strongest photographs often happen between scheduled moments. A
          little breathing room allows people to arrive fully, move naturally,
          and remain connected to the celebration.
        </p>
      </section>

      <div className="gallery-wrap">
        <div className="gallery gallery--bento" id="gallery-8">
          <div className="gallery__item" {...itemProps(64)} />
          <div className="gallery__item" {...itemProps(63)} />
          <div className="gallery__item" {...itemProps(62)} />
          <div className="gallery__item" {...itemProps(69)} />
          <div className="gallery__item" {...itemProps(65)} />
          <div className="gallery__item" {...itemProps(67)} />
          <div className="gallery__item" {...itemProps(68)} />
          <div className="gallery__item" {...itemProps(66)} />
          <div className="caption">Honest beauty</div>
        </div>
      </div>
    </section>
  );
}
