import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const nav = [
  { href: "/invoice-template", label: "Templates" },
  { href: "/gst-invoice-format", label: "By state" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 text-base text-white shadow-sm">
            ₹
          </span>
          {SITE_NAME}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-medium">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hidden rounded-lg px-3 py-2 text-slate-600 hover:bg-teal-50 hover:text-teal-800 sm:inline">
              {n.label}
            </Link>
          ))}
          <Link href="/generator" className="ml-2 rounded-full bg-teal-700 px-4 py-2 font-semibold text-white shadow-sm hover:bg-teal-800">
            Create invoice
          </Link>
        </nav>
      </div>
    </header>
  );
}
