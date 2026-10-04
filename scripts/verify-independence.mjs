import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const scanRoots = ["src", "tests", "public"];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
]);
const piece = (...parts) => parts.join("");
const forbidden = [
  piece("kt", "merry"),
  piece("kt", "-merry"),
  piece("about", "-kt"),
  piece("about", "kt"),
  piece("kt", "sig"),
  piece("kt", "_banner"),
  piece("kt", "_logo"),
  piece("kate", "feature"),
  piece("kate", "-upton"),
  piece("kate", "upton"),
  piece("edu", "resources"),
  piece("popout", "menu"),
  piece("cloned", "_site"),
  piece("show", "it", ".co"),
  piece("static.", "show", "it", ".co"),
  piece("show", "it"),
];

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else files.push(path);
  }

  return files;
}

const files = (
  await Promise.all(scanRoots.map((directory) => collect(join(root, directory))))
).flat();
const failures = [];

for (const file of files) {
  const relativePath = relative(root, file).toLowerCase();
  for (const term of forbidden) {
    if (relativePath.includes(term)) {
      failures.push(
        `${relative(root, file)} filename contains forbidden signature "${term}"`,
      );
    }
  }

  if (!textExtensions.has(extname(file))) continue;

  const source = (await readFile(file, "utf8")).toLowerCase();
  for (const term of forbidden) {
    if (source.includes(term)) {
      failures.push(
        `${relative(root, file)} contains forbidden signature "${term}"`,
      );
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Independent-source scan passed across ${files.length} files.`);
}
