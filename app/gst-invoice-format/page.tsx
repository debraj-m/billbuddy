import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GST Invoice Format by State: CGST, SGST & IGST Guide | BillBuddy",
  description: "State-wise GST invoice format guides: state codes, GSTIN prefixes, and when to charge CGST+SGST or IGST for Maharashtra, Karnataka, Delhi, Tamil Nadu and more.",
  path: "/gst-invoice-format",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "GST invoice format by state", path: "/gst-invoice-format" },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GST invoice format by state</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        The law is the same everywhere, but the practical questions differ: which state code applies, which neighbours trigger IGST, and what local clients expect. Choose your state for a worked example.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stateGuides.map((s) => (
          <li key={s.slug}>
            <Link href={`/gst-invoice-format/${s.slug}`} className="surface lift block h-full p-5">
              <h2 className="font-semibold">{s.name}</h2>
              <p className="mt-1 text-sm text-slate-600">State code {s.code} · {s.hubs.slice(0, 3).join(", ")}</p>
            </Link>
          </li>
        ))}
      </ul>
      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold tracking-tight">GST invoice templates by profession</h2>
        <p className="mt-2 text-slate-600">
          Looking for profession-specific SAC codes and sample line items? Browse prefilled GST invoice templates:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professions.map((p) => (
            <Link key={p.slug} href={`/invoice-template/${p.slug}`} className="surface lift block p-4">
              <span className="font-semibold text-slate-900 block">{p.name} GST invoice template</span>
              <span className="mt-1 text-xs text-slate-500 block">SAC {p.sac[0].code} · {p.sac[0].label.split("(")[0].trim()}</span>
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </div>
  );
}
