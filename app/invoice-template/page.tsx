import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free GST Invoice Templates by Profession | BillBuddy",
  description: "Browse free GST invoice templates for web developers, designers, photographers, writers, consultants, tutors and more. Prefilled examples you can edit and download as PDF.",
  path: "/invoice-template",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Invoice templates", path: "/invoice-template" },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GST invoice templates by profession</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Every trade bills differently. Pick yours to see an example invoice with the right SAC codes, sensible line items and tips on what clients expect, then open it in the generator.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {professions.map((p) => (
          <li key={p.slug}>
            <Link href={`/invoice-template/${p.slug}`} className="surface lift block h-full p-5">
              <h2 className="font-semibold">{p.name} invoice template</h2>
              <p className="mt-1 text-sm text-slate-600">SAC {p.sac[0].code} · {p.sac[0].label.split("(")[0].trim()}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Cta />
    </div>
  );
}
