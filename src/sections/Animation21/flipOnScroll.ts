import { Flip, gsap, ScrollTrigger } from "@frontend/components/motion/engine";

type FlipScrollOptions = {
  flip?: {
    absoluteOnLeave?: boolean;
    absolute?: boolean;
    scale?: boolean;
    simple?: boolean;
  };
  scrollTrigger?: {
    start?: string;
    end?: string;
  };
  stagger?: number;
};

const defaultFlip = {
  absoluteOnLeave: false,
  absolute: false,
  scale: true,
  simple: true,
};

const defaultScrollTrigger = {
  start: "center center",
  end: "+=300%",
};

const galleryTargets = (root: ParentNode) =>
  root.querySelectorAll(".gallery__item, .gallery__item-inner, .caption");

const killAnimation21Scroll = (root: ParentNode) => {
  if (!(root instanceof Element)) return;

  ScrollTrigger.getAll().forEach((trigger) => {
    const target = trigger.trigger;
    const pin = trigger.vars.pin;
    const pinNode = pin instanceof Node ? pin : null;
    if (
      (target instanceof Node && root.contains(target)) ||
      (pinNode && root.contains(pinNode))
    ) {
      trigger.kill();
    }
  });

  gsap.set(galleryTargets(root), {
    clearProps:
      "transform,translate,rotate,scale,width,height,maxWidth,maxHeight,minWidth,minHeight,top,left,right,bottom,position,margin,padding,overflow,opacity,filter,zIndex,gridArea",
  });

  root.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => {
    const src = el.dataset.bg;
    if (src) el.style.backgroundImage = `url(${src})`;
  });

  root.querySelectorAll(".gallery").forEach((gallery) => {
    gallery.classList.remove("gallery--switch");
  });
};

const triggerFlipOnScroll = (
  galleryEl: Element,
  options?: FlipScrollOptions,
) => {
  const settings = {
    flip: { ...defaultFlip, ...options?.flip },
    scrollTrigger: { ...defaultScrollTrigger, ...options?.scrollTrigger },
    stagger: options?.stagger ?? 0,
  };

  const galleryCaption = galleryEl.querySelector(".caption");
  const galleryItems = galleryEl.querySelectorAll(".gallery__item");
  const galleryItemsInner = [...galleryItems]
    .map((item) => (item.children.length > 0 ? [...item.children] : []))
    .flat();

  const flipTargets: Element[] = [...galleryItems];
  if (galleryCaption) {
    flipTargets.push(galleryCaption);
  }

  // Codrops pattern: capture the final layout, revert to the start layout,
  // then scrub Flip.to so items travel from scatter → stack.
  galleryEl.classList.add("gallery--switch");
  const flipstate = Flip.getState(flipTargets, {
    props: "filter, opacity",
  });
  galleryEl.classList.remove("gallery--switch");

  const pinTarget = galleryEl.parentElement;
  if (!pinTarget) return;

  const tl = Flip.to(flipstate, {
    ease: "none",
    absoluteOnLeave: settings.flip.absoluteOnLeave,
    absolute: settings.flip.absolute,
    scale: settings.flip.scale,
    simple: settings.flip.simple,
    scrollTrigger: {
      trigger: galleryEl,
      start: settings.scrollTrigger.start,
      end: settings.scrollTrigger.end,
      pin: pinTarget,
      scrub: true,
      anticipatePin: 1,
    },
    stagger: settings.stagger,
  });

  const trigger = tl.scrollTrigger;
  if (trigger && !trigger.isActive) {
    tl.progress(0, true);
  }

  if (galleryItemsInner.length) {
    tl.fromTo(
      galleryItemsInner,
      {
        scale: 2,
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: galleryEl,
          start: settings.scrollTrigger.start,
          end: settings.scrollTrigger.end,
          scrub: true,
        },
      },
      0,
    );
  }
};

export const initAnimation21Scroll = (root: ParentNode) => {
  const galleries = [
    {
      id: "#gallery-1",
      options: { flip: { absoluteOnLeave: true, scale: false } },
    },
    { id: "#gallery-2" },
    {
      id: "#gallery-3",
      options: {
        flip: { absolute: true, scale: false },
        scrollTrigger: { start: "center center", end: "+=900%" },
        stagger: 0.05,
      },
    },
    { id: "#gallery-4" },
    { id: "#gallery-5" },
    { id: "#gallery-6" },
    { id: "#gallery-7" },
    { id: "#gallery-8", options: { flip: { scale: false } } },
  ];

  galleries.forEach((gallery) => {
    const galleryElement = root.querySelector(gallery.id);
    if (!galleryElement) return;
    triggerFlipOnScroll(galleryElement, gallery.options);
  });
};

export const showAnimation21StaticLayouts = (root: ParentNode) => {
  root.querySelectorAll(".gallery").forEach((gallery) => {
    gallery.classList.add("gallery--switch");
  });
};

export { killAnimation21Scroll };

export const rebuildAnimation21Scroll = (root: ParentNode) => {
  killAnimation21Scroll(root);
  initAnimation21Scroll(root);
};
