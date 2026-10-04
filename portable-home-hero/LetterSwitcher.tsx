import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './LetterSwitcher.css';

gsap.registerPlugin(useGSAP);

type LetterSwitcherProps = {
  currentWord: string;
  duration?: number;
  direction?: 1 | -1;
  staggerDelay?: number;
  className?: string;
};

const LetterSwitcher = ({
  currentWord,
  duration = 0.75,
  direction = 1,
  staggerDelay = 0,
  className = '',
}: LetterSwitcherProps) => {
  const [shownWord, setShownWord] = useState(currentWord);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstPaint = useRef(true);
  const hasSwapped = useRef(false);

  const getLetters = () => Array.from(containerRef.current?.children ?? []);

  useGSAP(
    () => {
      if (!isFirstPaint.current) return;
      isFirstPaint.current = false;
      gsap.to(getLetters(), {
        y: '0%',
        opacity: 1,
        duration,
        stagger: staggerDelay,
        ease: 'power1.out',
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (shownWord === currentWord) return;

      const outY = direction === 1 ? '-100%' : '100%';

      gsap.to(getLetters(), {
        y: outY,
        duration,
        stagger: staggerDelay,
        ease: 'power1.in',
        overwrite: true,
        onComplete: () => {
          hasSwapped.current = true;
          setShownWord(currentWord);
        },
      });
    },
    { dependencies: [currentWord, direction, duration, staggerDelay] }
  );

  useGSAP(
    () => {
      if (!hasSwapped.current) return;

      const inY = direction === 1 ? '100%' : '-100%';
      const letters = getLetters();
      gsap.set(letters, { y: inY, opacity: 1 });
      gsap.to(letters, {
        y: '0%',
        duration,
        stagger: staggerDelay,
        ease: 'power2.out',
      });
    },
    { dependencies: [shownWord] }
  );

  return (
    <div
      ref={containerRef}
      className={`letter-switcher ${className}`.trim()}
      aria-label={currentWord}
    >
      {shownWord.split('').map((letter, index) => (
        <div className="letter-switcher__char" key={`${shownWord}-${index}-${letter}`}>
          <div>{letter}</div>
        </div>
      ))}
    </div>
  );
};

export default LetterSwitcher;
