import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "/opt/cursor/artifacts";
const BASE = "http://localhost:3000/demo-day";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: OUT, size: { width: 1440, height: 900 } },
});
const page = await context.newPage();

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

for (const id of ["notion", "codex", "cursor"]) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
}

await page.waitForTimeout(500);
await context.close();
await browser.close();

console.log("Video recorded to", OUT);
