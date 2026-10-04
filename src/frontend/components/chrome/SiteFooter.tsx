"use client";

import Image from "next/image";
import Link from "next/link";

import {
  footerImages,
  footerLinks,
  newsletterCopy,
  type FooterImage,
} from "@backend/content/chrome";
import { useNewsletterSubmit } from "@frontend/hooks/use-newsletter-submit";
import styles from "./chrome.module.css";

type SocialMosaicProps = Readonly<{
  images?: readonly FooterImage[];
}>;

export function SocialMosaic({
  images = footerImages,
}: SocialMosaicProps) {
  return (
    <div className={styles.socialStrip}>
      {images.map((image) => (
        <a
          aria-label="View ENTITY on Instagram"
          className={styles.socialTile}
          href="https://www.instagram.com/theweddingentity/"
          key={image.src}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt={image.alt}
            fill
            sizes="(max-width: 767px) 91px, 215px"
            src={image.src}
          />
        </a>
      ))}
    </div>
  );
}

type SiteFooterProps = Readonly<{
  images?: readonly FooterImage[];
}>;

export function SiteFooter({ images = footerImages }: SiteFooterProps) {
  const returnToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const newsletter = useNewsletterSubmit();

  return (
    <footer className={styles.footer}>
      <SocialMosaic images={images} />

      <div className={styles.footerInner}>
        <button
          className={styles.toTop}
          onClick={returnToTop}
          type="button"
        >
          Back to top
        </button>

        <Link aria-label="The Wedding Entity home" className={styles.footerMark} href="/">
          TheWeddingEntity
        </Link>

        <nav
          aria-label="Footer navigation"
          className={styles.footerNavigation}
        >
          {footerLinks.map((link) =>
            "external" in link && link.external ? (
              <a
                className={styles.footerLink}
                href={link.href}
                key={`${link.label}-${link.href}`}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ) : (
              <Link
                className={styles.footerLink}
                href={link.href}
                key={`${link.label}-${link.href}`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <a
          className={styles.followLink}
          href="https://www.instagram.com/theweddingentity/"
          rel="noreferrer"
          target="_blank"
        >
          Follow @TheWeddingEntity
        </a>

        <section
          aria-labelledby="newsletter-heading"
          className={styles.newsletter}
        >
          <h2 className={styles.newsletterHeading} id="newsletter-heading">
            Get The Newsletter
          </h2>
          <p className={styles.newsletterCopy}>{newsletterCopy}</p>

          <form
            className={styles.newsletterForm}
            onSubmit={newsletter.submit}
          >
            <label className="entity-visually-hidden" htmlFor="footer-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className={styles.emailInput}
              id="footer-email"
              inputMode="email"
              name="email"
              placeholder="Your email address"
              required
              type="email"
            />
            <button
              className={styles.subscribeButton}
              disabled={newsletter.pending}
              type="submit"
            >
              {newsletter.pending ? "Sending" : "Subscribe"}
            </button>
          </form>
          {newsletter.status ? (
            <p className={styles.legal} role="status">
              {newsletter.status}
            </p>
          ) : null}

          <p className={styles.legal}>
            © {new Date().getFullYear()} ENTITY Photography. All rights
            reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}
