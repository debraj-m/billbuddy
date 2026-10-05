import type { Faq } from "@/lib/seo";

export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="mb-4 text-2xl font-bold tracking-tight">
        {heading}
      </h2>
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {faqs.map((f) => (
          <details key={f.q} className="group p-4">
            <summary className="cursor-pointer list-none font-medium marker:hidden">
              <span className="mr-2 text-indigo-600 group-open:hidden">+</span>
              <span className="mr-2 hidden text-indigo-600 group-open:inline">−</span>
              {f.q}
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
