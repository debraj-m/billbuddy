import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-teal-900/10 bg-teal-50/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-extrabold">{SITE_NAME}</p>
          <p className="mt-2 text-slate-600">Free GST invoice generator for Indian freelancers and small businesses. No sign-up. Runs in your browser.</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Invoice templates</p>
          <ul className="mt-2 space-y-1 text-slate-600">
            {professions.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link className="hover:text-teal-600" href={`/invoice-template/${p.slug}`}>
                  {p.name} invoice
                </Link>
              </li>
            ))}
            <li>
              <Link className="font-medium text-teal-600" href="/invoice-template">
                All professions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">GST invoice by state</p>
          <ul className="mt-2 space-y-1 text-slate-600">
            {stateGuides.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link className="hover:text-teal-600" href={`/gst-invoice-format/${s.slug}`}>
                  {s.name} GST format
                </Link>
              </li>
            ))}
            <li>
              <Link className="font-medium text-teal-600" href="/gst-invoice-format">
                All states
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Company</p>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><Link className="hover:text-teal-600" href="/generator">Invoice generator</Link></li>
            <li><Link className="hover:text-teal-600" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-teal-600" href="/about">About</Link></li>
            <li><Link className="hover:text-teal-600" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-teal-600" href="/privacy">Privacy</Link></li>
            <li><Link className="hover:text-teal-600" href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-teal-900/10 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE_NAME}. BillBuddy is a tool, not tax advice. Check GST rules with a qualified professional.
      </p>
    </footer>
  );
}
