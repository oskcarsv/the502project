import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SIZE = 512;
const PADDING_RATIO = 0.12; // smaller padding => bigger logo
const SOURCE = path.join(root, "public/logo-white.png");

async function build() {
  const pad = Math.round(SIZE * PADDING_RATIO);
  const inner = SIZE - pad * 2;

  // 1) Trim transparent pixels around the logo, then fit into the inner area.
  const logo = await sharp(SOURCE)
    .ensureAlpha()
    .trim() // remove transparent edges
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 2) Black square canvas with the white logo composited centered.
  const out = await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();

  const targets = [
    path.join(root, "src/app/icon.png"),
    path.join(root, "src/app/apple-icon.png"),
  ];
  for (const t of targets) {
    await sharp(out).toFile(t);
    console.log("Wrote", t);
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
