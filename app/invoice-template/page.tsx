import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free GST Invoice Templates by Profession | BillBuddy",
  description: "Free GST invoice templates for web developers, designers, writers, consultants and tutors. Prefilled examples you can edit and download as PDF.",
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
      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold tracking-tight">GST invoice format by state</h2>
        <p className="mt-2 text-slate-600">
          Invoicing a client in another Indian state? Check place-of-supply rules, state codes, and CGST/SGST vs IGST splits for each state:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stateGuides.map((s) => (
            <Link key={s.slug} href={`/gst-invoice-format/${s.slug}`} className="surface lift block p-4">
              <span className="font-semibold text-slate-900 block">{s.name} GST invoice format</span>
              <span className="mt-1 text-xs text-slate-500 block">State code {s.code} · Hubs: {s.hubs.slice(0, 3).join(", ")}</span>
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </div>
  );
}
