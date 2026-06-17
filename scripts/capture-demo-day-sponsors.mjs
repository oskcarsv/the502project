import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "/opt/cursor/artifacts/screenshots";
const BASE = "http://localhost:3000/demo-day";
const SECTIONS = ["notion", "codex", "cursor"];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.screenshot({
  path: path.join(OUT, "demo-day-sponsors-full.png"),
  fullPage: true,
});

for (const id of SECTIONS) {
  const el = page.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await el.screenshot({ path: path.join(OUT, `demo-day-${id}-section.png`) });
}

await browser.close();
console.log("Screenshots saved to", OUT);
