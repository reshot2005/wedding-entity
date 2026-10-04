function extractBackgroundUrls(value: string) {
  return [...value.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)]
    .map((match) => match[2])
    .filter((url) => Boolean(url) && url !== "none");
}

function collectBackgroundUrls(element: Element, urls: Set<string>) {
  if (!(element instanceof HTMLElement)) return;

  extractBackgroundUrls(element.style.backgroundImage).forEach((url) =>
    urls.add(url),
  );
  extractBackgroundUrls(getComputedStyle(element).backgroundImage).forEach(
    (url) => urls.add(url),
  );

  for (const child of element.children) {
    collectBackgroundUrls(child, urls);
  }
}

export function preloadImages(selectorOrElements: string | ArrayLike<Element>) {
  const elements =
    typeof selectorOrElements === "string"
      ? document.querySelectorAll(selectorOrElements)
      : selectorOrElements;

  return new Promise<void>((resolve) => {
    const urls = new Set<string>();

    Array.from(elements).forEach((element) => {
      collectBackgroundUrls(element, urls);
    });

    if (urls.size === 0) {
      resolve();
      return;
    }

    let remaining = urls.size;
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
    };

    urls.forEach((src) => {
      const image = new Image();
      image.onload = done;
      image.onerror = done;
      image.src = src;
    });
  });
}
