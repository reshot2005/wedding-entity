"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@frontend/components/motion/engine";

import {
  drawerLinks,
  mastheadLinks,
  photographerLinks,
  portfolioLinks,
  studioIntroduction,
  type ChromeLink,
} from "@backend/content/chrome";
import styles from "./chrome.module.css";

const requestDrawerEvent = "entity:request-navigation";
const drawerId = "entity-navigation";

type SiteChromeProps = Readonly<{
  revealOnScroll?: boolean;
}>;

function MenuGlyph({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 40 52"
      focusable="false"
    >
      <line x1="4" x2="36" y1="21" y2="21" />
      <line x1="4" x2="36" y1="31" y2="31" />
    </svg>
  );
}

function LinkList({
  links,
  className,
  onNavigate,
}: Readonly<{
  links: readonly ChromeLink[];
  className: string;
  onNavigate: () => void;
}>) {
  return links.map((link) =>
    link.external ? (
      <a
        className={className}
        href={link.href}
        key={link.href}
        onClick={onNavigate}
        rel="noreferrer"
        target="_blank"
      >
        {link.label}
      </a>
    ) : (
      <Link
        className={className}
        href={link.href}
        key={link.href}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    ),
  );
}

function NavigationDrawer({
  open,
  close,
  restoreFocusTo,
}: Readonly<{
  open: boolean;
  close: () => void;
  restoreFocusTo: React.RefObject<HTMLElement | null>;
}>) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const body = document.body;
    const scrollPosition = window.scrollY;
    const focusOrigin = restoreFocusTo.current;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      locked: body.dataset.scrollLocked,
    };

    body.dataset.scrollLocked = "true";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    const focusFrame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const tabbable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0,
      );

      if (tabbable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = tabbable[0];
      const last = tabbable[tabbable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeys);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeys);
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      if (previous.locked === undefined) {
        delete body.dataset.scrollLocked;
      } else {
        body.dataset.scrollLocked = previous.locked;
      }
      window.scrollTo(0, scrollPosition);
      focusOrigin?.focus();
    };
  }, [close, open, restoreFocusTo]);

  return (
    <>
      <button
        aria-hidden="true"
        className={styles.shade}
        data-open={open}
        onClick={close}
        tabIndex={-1}
        type="button"
      />
      <aside
        aria-hidden={!open}
        aria-label="Site navigation"
        aria-modal="true"
        className={styles.drawer}
        data-open={open}
        id={drawerId}
        ref={panelRef}
        role="dialog"
      >
        <button
          className={styles.closeTrigger}
          onClick={close}
          ref={closeRef}
          type="button"
        >
          Close
        </button>

        <Link className={styles.drawerMark} href="/" onClick={close}>
          ENTITY
        </Link>

        <p className={styles.drawerIntro}>{studioIntroduction}</p>

        <nav aria-label="Expanded navigation" className={styles.drawerPrimary}>
          <LinkList
            className={styles.drawerLink}
            links={drawerLinks}
            onNavigate={close}
          />
        </nav>

        <div className={styles.drawerGroups}>
          <section aria-labelledby="portfolio-navigation-title">
            <h2
              className={styles.drawerHeading}
              id="portfolio-navigation-title"
            >
              Portfolio
            </h2>
            <div className={styles.drawerChildren}>
              <LinkList
                className={styles.drawerChild}
                links={portfolioLinks}
                onNavigate={close}
              />
            </div>
          </section>

          <section aria-labelledby="education-navigation-title">
            <h2
              className={styles.drawerHeading}
              id="education-navigation-title"
            >
              Education
            </h2>
            <div className={styles.drawerChildren}>
              <LinkList
                className={styles.drawerChild}
                links={photographerLinks}
                onNavigate={close}
              />
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}

export function SiteChrome(_props: SiteChromeProps = {}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const openerRef = useRef<HTMLElement | null>(null);
  const drawerOpenRef = useRef(false);
  drawerOpenRef.current = drawerOpen;

  const openDrawer = useCallback(() => {
    openerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setDrawerOpen(true);
    setBarVisible(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const acceptRequest = () => openDrawer();
    window.addEventListener(requestDrawerEvent, acceptRequest);
    return () => window.removeEventListener(requestDrawerEvent, acceptRequest);
  }, [openDrawer]);

  useGSAP(
    () => {
      setBarVisible(true);
      let visible = true;
      let lastY = window.scrollY;

      const showBar = (next: boolean) => {
        if (visible === next) return;
        visible = next;
        setBarVisible(next);
      };

      const onScroll = () => {
        if (drawerOpenRef.current) {
          showBar(true);
          lastY = window.scrollY;
          return;
        }

        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;

        if (y <= 24) {
          showBar(true);
          return;
        }

        if (delta > 6) showBar(false);
        else if (delta < -6) showBar(true);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: onScroll,
      });

      return () => {
        window.removeEventListener("scroll", onScroll);
        trigger.kill();
      };
    },
    { dependencies: [pathname] },
  );

  return (
    <div className={styles.root}>
      <header
        className={styles.bar}
        data-visible={barVisible}
        aria-hidden={!barVisible}
      >
        <div className={styles.barInner}>
          <button
            aria-controls={drawerId}
            aria-expanded={drawerOpen}
            aria-label="Open navigation menu"
            className={styles.menuTrigger}
            onClick={openDrawer}
            type="button"
          >
            <MenuGlyph className={styles.menuGlyph} />
          </button>

          <Link aria-label="The Wedding Entity home" className={styles.wordmark} href="/">
            ENTITY
          </Link>

          <nav aria-label="Primary navigation" className={styles.barLinks}>
            {mastheadLinks.map((link) => (
              <Link
                aria-current={pathname === link.href ? "page" : undefined}
                className={styles.barLink}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link className={styles.contactLink} href="/contact">
            Contact
          </Link>
        </div>
      </header>

      <NavigationDrawer
        close={closeDrawer}
        open={drawerOpen}
        restoreFocusTo={openerRef}
      />
    </div>
  );
}

export function HeroMenuControl() {
  const requestNavigation = () => {
    window.dispatchEvent(new Event(requestDrawerEvent));
  };

  return (
    <button
      aria-controls={drawerId}
      aria-label="Open navigation menu"
      className={styles.heroTrigger}
      onClick={requestNavigation}
      type="button"
    >
      <MenuGlyph className={`${styles.menuGlyph} ${styles.heroGlyph}`} />
      <span aria-hidden="true" className={styles.heroLabel}>
        Menu
      </span>
    </button>
  );
}
