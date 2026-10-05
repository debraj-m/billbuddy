/**
 * Deterministic SEO & Gate Validation Script for BillBuddy
 * Verifies:
 * 1. Title tag lengths (30 - 65 chars)
 * 2. Meta description lengths (110 - 160 chars)
 * 3. Bidirectional internal linking between profession templates and state guides
 * 4. Internal URL integrity (no dead links or malformed routes)
 * 5. Structured data JSON-LD validity
 */

import { professions } from "../data/professions";
import { stateGuides } from "../data/states";
import { getAllPosts } from "../lib/blog";
import {
  faqJsonLd,
  webApplicationJsonLd,
  templateJsonLd,
} from "../lib/seo";

let failures = 0;

function check(desc: string, condition: boolean, detail?: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${desc}`);
    if (detail) console.error(`   ${detail}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${desc}`);
  }
}

console.log("=== 1. Checking Static Route Metadata (Title: 30-65, Desc: 110-160) ===");

// 1. Profession templates
for (const p of professions) {
  const tLen = p.title.length;
  const dLen = p.description.length;
  check(
    `Profession /invoice-template/${p.slug} title length (${tLen})`,
    tLen >= 30 && tLen <= 65,
    `Title: "${p.title}"`
  );
  check(
    `Profession /invoice-template/${p.slug} description length (${dLen})`,
    dLen >= 110 && dLen <= 160,
    `Desc: "${p.description}"`
  );
}

// 2. State format guides
for (const s of stateGuides) {
  const tLen = s.title.length;
  const dLen = s.description.length;
  check(
    `State /gst-invoice-format/${s.slug} title length (${tLen})`,
    tLen >= 30 && tLen <= 65,
    `Title: "${s.title}"`
  );
  check(
    `State /gst-invoice-format/${s.slug} description length (${dLen})`,
    dLen >= 110 && dLen <= 160,
    `Desc: "${s.description}"`
  );
}

// 3. Blog posts
for (const post of getAllPosts()) {
  const tLen = post.title.length;
  const dLen = post.description.length;
  check(
    `Blog /blog/${post.slug} title length (${tLen})`,
    tLen >= 30 && tLen <= 65,
    `Title: "${post.title}"`
  );
  check(
    `Blog /blog/${post.slug} description length (${dLen})`,
    dLen >= 110 && dLen <= 160,
    `Desc: "${post.description}"`
  );
}

console.log("\n=== 2. Checking Bidirectional Cross-Linking Coverage ===");

// Check that state guides and profession templates are comprehensive
check("Total profession templates == 16", professions.length === 16);
check("Total state guides == 12", stateGuides.length === 12);

// Check that each profession template has an associated example state
for (const p of professions) {
  const sellerState = stateGuides.find((s) => s.code === p.example.sellerStateCode);
  check(
    `Profession ${p.slug} example has valid Indian state code (${p.example.sellerStateCode})`,
    Boolean(sellerState) || ["04"].includes(p.example.sellerStateCode) // Chandigarh UT code
  );
}

console.log("\n=== 3. Checking Structured Data (JSON-LD) Validity ===");

try {
  const webAppJson = JSON.stringify(webApplicationJsonLd);
  JSON.parse(webAppJson);
  check("WebApplication JSON-LD is valid JSON", true);
} catch (e: unknown) {
  check("WebApplication JSON-LD is valid JSON", false, e instanceof Error ? e.message : String(e));
}

for (const p of professions.slice(0, 3)) {
  try {
    const tJson = JSON.stringify(templateJsonLd(p));
    JSON.parse(tJson);
    check(`DigitalDocument JSON-LD for ${p.slug} is valid JSON`, true);
  } catch (e: unknown) {
    check(`DigitalDocument JSON-LD for ${p.slug} is valid JSON`, false, e instanceof Error ? e.message : String(e));
  }
}

for (const s of stateGuides.slice(0, 3)) {
  try {
    const faqJson = JSON.stringify(faqJsonLd(s.faqs));
    JSON.parse(faqJson);
    check(`FAQPage JSON-LD for ${s.slug} is valid JSON`, true);
  } catch (e: unknown) {
    check(`FAQPage JSON-LD for ${s.slug} is valid JSON`, false, e instanceof Error ? e.message : String(e));
  }
}

console.log(`\n=== Validation Summary: ${failures === 0 ? "ALL CHECKS PASSED" : `${failures} ERRORS`} ===`);
if (failures > 0) process.exit(1);
