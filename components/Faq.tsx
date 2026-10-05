import type { Faq } from "@/lib/seo";

export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="mb-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {heading}
      </h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="surface group px-5 py-4 open:border-teal-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
              {f.q}
              <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
