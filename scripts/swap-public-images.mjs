import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { extname, join } from "node:path";

const SRC = "images";
const DEST = "public/images";
const KEEP = new Set(["entity-wordmark-light.svg"]);
const WEB_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function isJpeg(filePath) {
  const buffer = readFileSync(filePath);
  return buffer.length > 2 && buffer[0] === 0xff && buffer[1] === 0xd8;
}

function isWebImage(name, filePath) {
  const ext = extname(name).toLowerCase();
  if (WEB_EXT.has(ext)) return true;
  if (ext === ".heic") return false;
  if (/jpe?g$/i.test(name)) return isJpeg(filePath);
  return false;
}

mkdirSync(DEST, { recursive: true });

for (const name of readdirSync(DEST)) {
  if (KEEP.has(name)) continue;
  unlinkSync(join(DEST, name));
}

const sources = readdirSync(SRC)
  .filter((name) => isWebImage(name, join(SRC, name)))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const urls = [];
sources.forEach((name, index) => {
  const destName = `photo-${String(index + 1).padStart(2, "0")}.jpg`;
  copyFileSync(join(SRC, name), join(DEST, destName));
  urls.push(`/images/${destName}`);
});

if (!existsSync(join(DEST, "entity-wordmark-light.svg"))) {
  console.warn("wordmark missing; footer logo will 404 until restored");
}

const ts = `export const siteImages = [
${urls.map((url) => `  "${url}",`).join("\n")}
] as const;

export type SiteImage = (typeof siteImages)[number];

export function siteImage(index: number) {
  return siteImages[
    ((index % siteImages.length) + siteImages.length) % siteImages.length
  ];
}

export const heroImage = siteImages[0];
export const studioPortrait = siteImages[1] ?? siteImages[0];
export const secondaryPortrait = siteImages[2] ?? siteImages[0];
export const atelierSignature = "/images/entity-wordmark-light.svg";
`;

writeFileSync("src/backend/content/siteImages.ts", ts);
console.log(`copied ${urls.length} photos into ${DEST}`);
console.log(urls.join("\n"));
