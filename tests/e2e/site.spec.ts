import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/offerings",
  "/portfolio",
  "/portfolio/weddings",
  "/portfolio/portraits",
  "/portfolio/editorial",
  "/journal",
  "/for-photographers",
  "/contact",
  "/education",
  "/favorites",
  "/presets",
  "/abundance-plan",
  "/print-shop",
];

for (const route of publicRoutes) {
  test(`${route} is a complete indexable page`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Wedding Entity/i);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /.+/,
    );
  });
}

test("navigation panel works with keyboard input", async ({ page }) => {
  await page.goto("/");
  const opener = page.getByRole("button", { name: /menu|navigation/i }).first();
  await opener.focus();
  await opener.press("Enter");
  await expect(page.getByRole("dialog", { name: /navigation/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /navigation/i })).toBeHidden();
});

test("homepage media loads successfully", async ({ page }) => {
  const failedLocalImages: string[] = [];
  page.on("response", (response) => {
    const url = response.url();
    if (url.includes("/images/") && response.status() >= 400) {
      failedLocalImages.push(`${response.status()} ${url}`);
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const heroFrame = page.locator("#hero img").locator("visible=true").first();
  await expect(heroFrame).toBeVisible();
  await expect
    .poll(async () => heroFrame.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  expect(failedLocalImages).toEqual([]);
});

test("crawler resources are generated", async ({ request }) => {
  for (const route of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
    expect((await request.get(route)).ok()).toBeTruthy();
  }
});

test("homepage keeps the reference section order", async ({ page }) => {
  await page.goto("/");
  const sectionIds = await page.locator("main section[id]").evaluateAll((nodes) =>
    nodes.map((node) => node.id),
  );
  expect(sectionIds).toEqual([
    "hero",
    "studio-intro",
    "known-for",
    "atelier",
    "section-3",
    "video-divider",
    "portfolio",
    "kind-words",
    "publications",
    "featured-gallery",
    "print-shop",
    "education",
    "inquire",
  ]);
});

test("reduced motion disables persistent animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const styles = await page.locator("body").evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--motion-enabled",
    ),
  );
  expect(styles.trim()).toBe("0");
});
