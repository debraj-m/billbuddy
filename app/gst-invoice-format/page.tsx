import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
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
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
        The law is the same everywhere, but the practical questions differ: which state code applies, which neighbours trigger IGST, and what local clients expect. Choose your state for a worked example.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stateGuides.map((s) => (
          <li key={s.slug}>
            <Link href={`/gst-invoice-format/${s.slug}`} className="block h-full rounded-xl border border-slate-200 p-4 hover:border-indigo-500 hover:shadow dark:border-slate-800">
              <h2 className="font-semibold">{s.name}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">State code {s.code} · {s.hubs.slice(0, 3).join(", ")}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Cta />
    </div>
  );
}
