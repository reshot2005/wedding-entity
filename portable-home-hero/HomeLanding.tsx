import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LetterSwitcher from './LetterSwitcher';
import './HomeLanding.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SWITCH_WORDS = ['Weddings', 'Moments', 'Something', 'Different'] as const;
const STATIC_WORDS = ['that', 'never', 'fade'] as const;

type HomeLandingProps = {
  /** Called after preloader finishes — pass true to play the entrance. */
  ready?: boolean;
  backgroundSrc?: string;
  projectName?: string;
  projectHref?: string;
};

const HomeLanding = ({
  ready: readyProp = true,
  backgroundSrc = '/images/hero_wedding.jpg',
  projectName = 'Emily & David',
  projectHref = '/projects/emily-david',
}: HomeLandingProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (!readyProp) {
      setEntered(false);
      return;
    }
    const id = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(id);
  }, [readyProp]);

  useGSAP(
    () => {
      if (!entered) return;

      let tl: gsap.core.Timeline | undefined;
      const delay = gsap.delayedCall(0.5, () => {
        tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        tl.call(
          () => {
            const next =
              wordIndexRef.current + 1 > SWITCH_WORDS.length - 1
                ? 0
                : wordIndexRef.current + 1;
            wordIndexRef.current = next;
            setWordIndex(next);
          },
          undefined,
          6
        );
      });

      return () => {
        delay.kill();
        tl?.kill();
      };
    },
    { dependencies: [entered] }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const setProgress = (value: number) => {
        section.style.setProperty('--progress', value.toFixed(4));
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });

      const onTick = () => ScrollTrigger.update();
      gsap.ticker.add(onTick);
      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);

      return () => {
        window.clearTimeout(refreshId);
        gsap.ticker.remove(onTick);
        trigger.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`home-landing ${entered ? 'is-ready' : ''}`}
      style={{ '--progress': 0 } as React.CSSProperties}
    >
      <div className="home-landing__sticky">
        <div className="home-landing__bg" aria-hidden="true">
          <img src={backgroundSrc} alt="" />
        </div>

        <div className="home-hero">
          <h1 className="home-hero__sr-only">
            {SWITCH_WORDS[wordIndex]} that never fade
          </h1>

          <div className="home-hero__content">
            <div className="home-hero__line home-hero__line--switch">
              <LetterSwitcher currentWord={SWITCH_WORDS[wordIndex]} />
            </div>

            {STATIC_WORDS.map((word, index) => (
              <div className={`home-hero__line home-hero__line--${word}`} key={word}>
                <span aria-hidden="true" data-word={`word-${index + 1}`}>
                  {word}
                </span>
              </div>
            ))}
          </div>

          <a className="home-hero__project" href={projectHref}>
            <p>{projectName}</p>
            <span>See Project</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeLanding;
