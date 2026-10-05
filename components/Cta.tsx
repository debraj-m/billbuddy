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
    <aside className="my-10 rounded-2xl bg-indigo-600 p-6 text-white sm:p-8">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="mt-2 text-indigo-100">{text}</p>
      <Link href={href} className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
        {label} →
      </Link>
    </aside>
  );
}
