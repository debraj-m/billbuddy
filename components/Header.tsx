import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const nav = [
  { href: "/invoice-template", label: "Templates" },
  { href: "/gst-invoice-format", label: "By state" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-md bg-indigo-600 text-sm text-white">
            ₹
          </span>
          {SITE_NAME}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hidden text-slate-600 hover:text-indigo-600 sm:inline dark:text-slate-300">
              {n.label}
            </Link>
          ))}
          <Link href="/generator" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700">
            Create invoice
          </Link>
        </nav>
      </div>
    </header>
  );
}
