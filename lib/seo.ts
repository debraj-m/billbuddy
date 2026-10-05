import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl, CONTACT_EMAIL } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

/** Title is used verbatim for <title> (the root layout has no template) and for OG/Twitter. */
export function pageMetadata({ title, description, path, type = "website", publishedTime, tags }: PageMetaInput): Metadata {
  const ogImage = `/og?title=${encodeURIComponent(title)}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, tags } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export interface Faq {
  q: string;
  a: string;
}

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  email: CONTACT_EMAIL,
  description: "BillBuddy is a free, privacy-first GST invoice generator for Indian freelancers and small businesses.",
};

export const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${SITE_NAME} GST Invoice Generator`,
  url: absoluteUrl("/"),
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Invoicing & Billing Software",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en-IN",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Create GST-compliant tax invoices with automatic CGST, SGST and IGST, amount in words and PDF download. Runs entirely in your browser without signup.",
  featureList: [
    "Automatic CGST/SGST/IGST calculation",
    "GSTIN format validation",
    "Amount in words (lakh/crore)",
    "Three invoice templates",
    "UPI and bank details on the invoice",
    "Instant PDF download without sign-up",
    "100% private client-side processing",
  ],
};

export const templateJsonLd = (p: { name: string; slug: string; description: string }) => ({
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: `GST Invoice Template for ${p.name}s`,
  description: p.description,
  url: absoluteUrl(`/invoice-template/${p.slug}`),
  encodingFormat: "application/pdf",
  isAccessibleForFree: true,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
});

export const articleJsonLd = (a: { title: string; description: string; slug: string; date: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  dateModified: a.date,
  mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
  image: absoluteUrl(`/og?title=${encodeURIComponent(a.title)}`),
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
});
