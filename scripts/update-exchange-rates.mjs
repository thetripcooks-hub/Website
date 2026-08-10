/**
 * Refreshes constants/exchange-rates.json from the live exchangerate-api.com
 * feed. Run daily by .github/workflows/update-exchange-rates.yml, or manually:
 *   node scripts/update-exchange-rates.mjs
 * No env vars required (free tier, no API key).
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUTPUT_PATH = fileURLToPath(
  new URL("../constants/exchange-rates.json", import.meta.url),
);
const PRECISION = 4;

function round(n) {
  return Math.round(n * 10 ** PRECISION) / 10 ** PRECISION;
}

async function main() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/GBP");
  if (!res.ok) {
    throw new Error(`API returned ${res.status} ${res.statusText}`);
  }
  const data = await res.json();

  const usd = data?.rates?.USD;
  const cad = data?.rates?.CAD;
  if (typeof usd !== "number" || !(usd > 0) || typeof cad !== "number" || !(cad > 0)) {
    throw new Error(
      `Unexpected API response shape: rates.USD=${usd} rates.CAD=${cad}`,
    );
  }

  const payload = {
    GBP: 1,
    USD: round(usd),
    CAD: round(cad),
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(`Wrote ${OUTPUT_PATH}:`, payload);
}

main().catch((err) => {
  console.error("[update-exchange-rates] Failed to refresh exchange rates:", err);
  process.exit(1);
});
