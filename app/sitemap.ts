import type { MetadataRoute } from "next";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: [string, number][] = [
    ["/", 1],
    ["/generator", 0.9],
    ["/invoice-template", 0.8],
    ["/gst-invoice-format", 0.8],
    ["/blog", 0.8],
    ["/about", 0.4],
    ["/contact", 0.3],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...staticPages.map(([path, priority]) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...professions.map((p) => ({ url: absoluteUrl(`/invoice-template/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stateGuides.map((s) => ({ url: absoluteUrl(`/gst-invoice-format/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getAllPosts().map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
