// Generates the site-wide default Open Graph / Twitter card image
// (public/img/og-image.png, 1200x630) from the brand logo + tokens.
//
// Usage: node scripts/generate-og-image.mjs
//
// Rebuild this whenever the brand mark, tagline, or brand colors change —
// it composes public/logo-big.svg onto a branded card using the real
// Ogg font files, so the output always matches the live site exactly.

import { ImageResponse } from "next/og.js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, "public/img/og-image.png");

const IRISH_GREEN = "#09AF0D";
const PINK_FROM = "#FA93F4";
const PINK_TO = "#EE7FE7";

const [oggBold, oggMedium, logoPng] = await Promise.all([
  readFile(path.join(ROOT, "app/fonts/Ogg Font Family/Ogg-Bold.ttf")),
  readFile(path.join(ROOT, "app/fonts/Ogg Font Family/Ogg-Medium.ttf")),
  sharp(path.join(ROOT, "public/logo-big.svg"), { density: 900 })
    .png()
    .toBuffer(),
]);

const logoDataUri = `data:image/png;base64,${logoPng.toString("base64")}`;

const tree = {
  type: "div",
  props: {
    style: {
      width: "1200px",
      height: "630px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      backgroundColor: "#ffffff",
      overflow: "hidden",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            top: "-220px",
            right: "-180px",
            width: "620px",
            height: "620px",
            borderRadius: "620px",
            display: "flex",
            backgroundImage: `linear-gradient(135deg, ${PINK_FROM} 0%, ${PINK_TO} 100%)`,
            opacity: 0.16,
          },
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: "-260px",
            left: "-200px",
            width: "560px",
            height: "560px",
            borderRadius: "560px",
            display: "flex",
            backgroundColor: IRISH_GREEN,
            opacity: 0.12,
          },
        },
      },
      {
        type: "img",
        props: {
          src: logoDataUri,
          width: 460,
          height: 180,
          style: { display: "flex" },
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "34px",
            fontFamily: "Ogg",
            fontWeight: 500,
            fontSize: "32px",
            lineHeight: 1.4,
            color: "#212121",
            textAlign: "center",
          },
          children: [
            {
              type: "div",
              props: {
                style: { display: "flex" },
                children: "Crafting unforgettable group adventures,",
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex" },
                children: "cooked just for you.",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            marginTop: "26px",
            fontFamily: "Ogg",
            fontWeight: 700,
            fontSize: "22px",
            letterSpacing: "2px",
            color: IRISH_GREEN,
          },
          children: "TRIPCOOKS.TOURS",
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "1200px",
            height: "14px",
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${IRISH_GREEN} 0%, ${IRISH_GREEN} 60%, ${PINK_FROM} 85%, ${PINK_TO} 100%)`,
          },
        },
      },
    ],
  },
};

const response = new ImageResponse(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Ogg", data: oggBold, weight: 700, style: "normal" },
    { name: "Ogg", data: oggMedium, weight: 500, style: "normal" },
  ],
});

const buffer = Buffer.from(await response.arrayBuffer());
await writeFile(OUT, buffer);
console.log("wrote", OUT, `(${buffer.length} bytes)`);
