import Link from "next/link";

export function Cta({
  title = "Create your GST invoice in two minutes",
  text = "Free, no sign-up, and your data never leaves your browser.",
  href = "/generator",
  label = "Open the invoice generator",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <aside className="relative my-12 overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-amber-50 p-6 shadow-sm sm:p-10">
      <div aria-hidden="true" className="dot-grid absolute -right-10 -top-10 h-48 w-48 opacity-60 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="relative">
        <h2 className="max-w-xl font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-xl text-slate-600">{text}</p>
        <Link href={href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-900/15 hover:bg-teal-800">
          {label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
