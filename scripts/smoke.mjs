/**
 * Runtime smoke test.
 * Opens every route in Chromium at three viewports, captures console errors and
 * failed requests, verifies the hero WebGL canvas exists, and writes
 * screenshots to ./screenshots for visual review.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/services",
  "/infrastructure",
  "/cloud",
  "/ai",
  "/training",
  "/projects",
  "/contact",
  "/contact/consultation",
  "/nope",
];

const viewports = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "laptop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--no-sandbox"],
});

let failures = 0;

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });

  const targets = viewport.name === "desktop" ? routes : ["/", "/services", "/training", "/contact"];

  for (const route of targets) {
    const page = await context.newPage();
    const problems = [];
    page.on("console", (msg) => {
      const text = msg.text();
      // Google Fonts is unreachable in this sandbox; the CSS has a full fallback stack.
      if (/ERR_TUNNEL_CONNECTION_FAILED|fonts\.googleapis|fonts\.gstatic/.test(text)) return;
      if (route === "/nope" && /404/.test(text)) return;
      if (msg.type() === "error") problems.push(`console: ${text}`);
    });
    page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) => {
      const url = req.url();
      if (url.includes("fonts.googleapis") || url.includes("fonts.gstatic")) return;
      problems.push(`request failed: ${url}`);
    });

    const response = await page.goto(BASE + route, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    await page.waitForTimeout(1400);

    const status = response?.status() ?? 0;
    const expected = route === "/nope" ? 404 : 200;

    let canvasNote = "";
    if (route === "/") {
      const hasCanvas = await page.locator("canvas").count();
      canvasNote = hasCanvas > 0 ? " canvas:yes" : " canvas:NO";
      if (!hasCanvas) failures += 1;
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
    await page.screenshot({
      path: `screenshots/${viewport.name}-${slug}.png`,
      fullPage: false,
    });

    const ok = status === expected && problems.length === 0 && overflow <= 1;
    if (!ok) failures += 1;

    console.log(
      `${ok ? "PASS" : "FAIL"} ${viewport.name.padEnd(7)} ${route.padEnd(24)} ${status}${canvasNote}` +
        (overflow > 1 ? ` h-overflow:${overflow}px` : "") +
        (problems.length ? `\n       ${problems.slice(0, 4).join("\n       ")}` : ""),
    );

    await page.close();
  }

  await context.close();
}

// Scroll-storytelling check: the hero should advance stages on scroll.
const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
const page = await context.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const stageShots = [];
for (let i = 0; i < 7; i += 1) {
  await page.evaluate((n) => window.scrollTo({ top: window.innerHeight * n + 20, behavior: "instant" }), i);
  await page.waitForTimeout(900);
  const heading = await page.locator("main h1, main h2").first().textContent();
  stageShots.push(heading?.trim().slice(0, 48));
  await page.screenshot({ path: `screenshots/stage-${i}.png` });
}
console.log("\nScroll stages:", JSON.stringify(stageShots, null, 0));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
