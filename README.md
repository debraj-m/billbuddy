# BillBuddy

Free GST invoice generator for Indian freelancers and small businesses. Everything runs in the browser: no database, no auth, no server-side storage of invoice data.

## What's inside

- **Generator** (`/generator`): seller/buyer details, GSTIN and PAN validation, line items with HSN/SAC, discount and GST rate, automatic CGST+SGST vs IGST, amount in words (lakh/crore), live preview, three templates (Classic, Modern, Minimal), PDF download via `@react-pdf/renderer`, drafts saved to `localStorage`.
- **Programmatic SEO**: `/invoice-template/[profession]` (16 professions, `data/professions.ts`) and `/gst-invoice-format/[state]` (12 states, `data/states.ts`), each with unique copy, an example invoice, FAQs and FAQ JSON-LD.
- **Blog**: six MDX guides in `content/blog` (frontmatter: title, description, date, slug, tags), related posts and CTAs.
- **Technical SEO**: per-page metadata, canonical URLs, Open Graph/Twitter cards (dynamic `/og` image), `app/sitemap.ts`, `app/robots.ts`, JSON-LD (Organization, WebApplication, Article, FAQPage, BreadcrumbList), Search Console meta tag, GA4 events (`generator_started`, `pdf_downloaded`, `template_changed`).

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Optional on Vercel: leave it unset to use the project's `*.vercel.app` URL (read from `VERCEL_PROJECT_PRODUCTION_URL`). Set it only with a custom domain. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token. Renders `<meta name="google-site-verification">`. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). Analytics is off when empty. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on the contact and privacy pages. |

## Structure

```
app/            routes, sitemap, robots, /og image route
components/     shared UI; components/generator/ holds form, preview and PDF
data/           professions.ts and states.ts (programmatic SEO content)
content/blog/   MDX posts
lib/            GST maths, validation, number-to-words, SEO helpers, blog loader
public/fonts/   Noto Sans/Serif (needed so the rupee sign renders in PDFs)
```

## Notes

- GST rate options are 0/5/12/18/28 plus 40 (the slab added in the 2025 rate rationalisation). Check current rates before relying on any invoice.
- GSTIN validation checks format and state code only; it does not verify the number with the GST portal.
- BillBuddy is a tool, not tax advice.
