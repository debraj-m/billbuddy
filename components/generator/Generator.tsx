"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { GST_RATES, INDIAN_STATES, normalizeId, stateFromGstin, validateGstin, validatePan } from "@/lib/gst";
import {
  TEMPLATES,
  blankItem,
  clearDraft,
  defaultInvoice,
  invoiceFromExample,
  loadDraft,
  nextInvoiceNumber,
  saveDraft,
  type Invoice,
  type LineItem,
  type TemplateId,
} from "@/lib/invoice";
import { buildView } from "@/lib/invoiceView";
import { trackEvent } from "@/lib/analytics";
import { formatINR } from "@/lib/words";
import { InvoicePreview } from "./InvoicePreview";
import { ScaledPreview } from "./ScaledPreview";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

function Field({ label, error, hint, children, className = "" }: { label: string; error?: string | null; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="surface p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold text-slate-900">{title}</h2>
        {aside}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function StateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className={input} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select state / UT</option>
      {INDIAN_STATES.map((s) => (
        <option key={s.code} value={s.code}>
          {s.code} – {s.name}
        </option>
      ))}
    </select>
  );
}

const IFSC_RE = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/** Downscale logo to keep drafts small and PDFs fast. Re-encodes any image type as PNG/JPEG. */
async function readLogo(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("Could not read image"));
      i.src = url;
    });
    const max = 400;
    const k = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.width * k));
    c.height = Math.max(1, Math.round(img.height * k));
    c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function Generator() {
  const [inv, setInv] = useState<Invoice>(() => defaultInvoice());
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const started = useRef(false);

  // Hydrate from localStorage, or from ?example=<profession> when arriving from a template page.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const slug = new URLSearchParams(window.location.search).get("example");
      if (slug) {
        const { professions } = await import("@/data/professions");
        const p = professions.find((x) => x.slug === slug);
        if (p && !cancelled) {
          setInv(invoiceFromExample(p.example));
          window.history.replaceState(null, "", "/generator");
          setReady(true);
          return;
        }
      }
      const draft = loadDraft();
      if (!cancelled) {
        if (draft) setInv(draft);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced autosave.
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => saveDraft(inv), 400);
    return () => clearTimeout(t);
  }, [inv, ready]);

  const update = useCallback((fn: (d: Invoice) => Invoice) => {
    setInv(fn);
    if (!started.current) {
      started.current = true;
      trackEvent("generator_started");
    }
  }, []);

  const view = useMemo(() => buildView(inv), [inv]);

  const errors = {
    sellerGstin: validateGstin(inv.seller.gstin),
    buyerGstin: validateGstin(inv.buyer.gstin),
    pan: validatePan(inv.seller.pan),
    ifsc: inv.bank.ifsc && !IFSC_RE.test(normalizeId(inv.bank.ifsc)) ? "IFSC looks like HDFC0001234" : null,
    upi: inv.upi && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(inv.upi.trim()) ? "UPI ID looks like name@bank" : null,
  };
  const blocking: string[] = [];
  if (!inv.seller.name.trim()) blocking.push("Enter your business name");
  if (!inv.buyer.name.trim()) blocking.push("Enter the client name");
  if (!inv.items.some((i) => i.description.trim() && Number(i.rate) > 0)) blocking.push("Add at least one line item with a description and rate");
  if (errors.sellerGstin) blocking.push(`Your GSTIN: ${errors.sellerGstin}`);
  if (errors.buyerGstin) blocking.push(`Client GSTIN: ${errors.buyerGstin}`);
  if (errors.pan) blocking.push(`PAN: ${errors.pan}`);

  const setSeller = (patch: Partial<Invoice["seller"]>) => update((d) => ({ ...d, seller: { ...d.seller, ...patch } }));
  const setBuyer = (patch: Partial<Invoice["buyer"]>) => update((d) => ({ ...d, buyer: { ...d.buyer, ...patch } }));
  const setBank = (patch: Partial<Invoice["bank"]>) => update((d) => ({ ...d, bank: { ...d.bank, ...patch } }));
  const setItem = (id: string, patch: Partial<LineItem>) =>
    update((d) => ({ ...d, items: d.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const numeric = (v: string) => (v === "" ? 0 : Number(v));

  const onSellerGstin = (v: string) => {
    const st = stateFromGstin(v);
    setSeller({ gstin: v.toUpperCase(), ...(st ? { stateCode: st } : {}) });
  };
  const onBuyerGstin = (v: string) => {
    const st = stateFromGstin(v);
    setBuyer({ gstin: v.toUpperCase(), ...(st ? { stateCode: st } : {}) });
  };

  const onLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      setMessage("Logo is larger than 4 MB. Please choose a smaller image.");
      return;
    }
    try {
      setSeller({ logo: await readLogo(f) });
    } catch {
      setMessage("Could not read that image. Try a PNG or JPG.");
    }
  };

  const download = async () => {
    if (blocking.length) {
      setShowErrors(true);
      setMessage(null);
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const { renderInvoicePdf } = await import("./InvoicePdf");
      const blob = await renderInvoicePdf(view);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${(inv.number || "invoice").replace(/[^\w.-]+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
      trackEvent("pdf_downloaded", { template: inv.template, items: inv.items.length, tax_type: view.intra ? "cgst_sgst" : "igst" });
    } catch (err) {
      console.error(err);
      setMessage("Sorry, the PDF could not be created. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const newInvoice = () => {
    update((d) => ({
      ...d,
      number: nextInvoiceNumber(d.number),
      date: defaultInvoice().date,
      dueDate: defaultInvoice().dueDate,
      buyer: defaultInvoice().buyer,
      items: [blankItem()],
      notes: "",
    }));
    setShowErrors(false);
    setTab("edit");
  };

  const resetAll = () => {
    if (!window.confirm("Clear everything, including your saved business and bank details?")) return;
    clearDraft();
    setInv(defaultInvoice());
    setShowErrors(false);
  };

  const chooseTemplate = (id: TemplateId) => {
    if (id === inv.template) return;
    update((d) => ({ ...d, template: id }));
    trackEvent("template_changed", { template: id });
  };

  const taxBanner = !inv.seller.stateCode || !inv.buyer.stateCode
    ? "Select your state and the client's state to apply the right GST (CGST + SGST or IGST)."
    : view.intra
      ? `Same state (${view.sellerState}): CGST + SGST will be charged.`
      : `Different states (${view.sellerState} to ${view.buyerState}): IGST will be charged.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">GST Invoice Generator</h1>
          <p className="text-sm text-slate-600">Free, no sign-up. Your data stays in this browser and is never uploaded.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={newInvoice} className="rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium hover:bg-teal-50">
            New invoice
          </button>
          <button type="button" onClick={resetAll} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
            Reset all
          </button>
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-teal-900/15 hover:bg-teal-800 disabled:opacity-60"
          >
            {busy ? "Creating PDF…" : "Download PDF"}
          </button>
        </div>
      </div>

      {(showErrors && blocking.length > 0) || message ? (
        <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {message && <p>{message}</p>}
          {showErrors && blocking.length > 0 && (
            <>
              <p className="font-medium">Fix these before downloading:</p>
              <ul className="list-disc pl-5">
                {blocking.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}

      <div className="mb-4 flex rounded-lg border border-slate-200 p-1 text-sm lg:hidden" role="tablist" aria-label="Editor or preview">
        {(["edit", "preview"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-2 font-medium ${tab === t ? "bg-teal-600 text-white" : "text-slate-600"}`}
          >
            {t === "edit" ? "Edit" : "Preview"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className={`min-w-0 space-y-4 ${tab === "preview" ? "hidden lg:block" : ""}`}>
          <Section title="Template">
            <div className="grid grid-cols-3 gap-2 sm:col-span-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => chooseTemplate(t.id)}
                  aria-pressed={inv.template === t.id}
                  className={`rounded-lg border p-2 text-left text-sm ${inv.template === t.id ? "border-teal-600 bg-teal-50" : "border-slate-300 hover:bg-slate-50"}`}
                >
                  <span className="block font-semibold">{t.label}</span>
                  <span className="block text-xs text-slate-500">{t.blurb}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Invoice details">
            <Field label="Invoice number">
              <input className={input} value={inv.number} onChange={(e) => update((d) => ({ ...d, number: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Invoice date">
                <input type="date" className={input} value={inv.date} onChange={(e) => update((d) => ({ ...d, date: e.target.value }))} />
              </Field>
              <Field label="Due date">
                <input type="date" className={input} value={inv.dueDate} onChange={(e) => update((d) => ({ ...d, dueDate: e.target.value }))} />
              </Field>
            </div>
          </Section>

          <Section title="Your details (seller)">
            <Field label="Business / your name *">
              <input className={input} value={inv.seller.name} onChange={(e) => setSeller({ name: e.target.value })} autoComplete="organization" />
            </Field>
            <Field label="GSTIN" error={errors.sellerGstin} hint="15 characters. Leave blank if unregistered.">
              <input className={input} value={inv.seller.gstin} maxLength={15} onChange={(e) => onSellerGstin(normalizeId(e.target.value))} placeholder="27ABCDE1234F1Z5" />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <textarea className={input} rows={2} value={inv.seller.address} onChange={(e) => setSeller({ address: e.target.value })} />
            </Field>
            <Field label="State / UT" hint="Filled automatically from a valid GSTIN.">
              <StateSelect value={inv.seller.stateCode} onChange={(v) => setSeller({ stateCode: v })} />
            </Field>
            <Field label="PAN" error={errors.pan}>
              <input className={input} value={inv.seller.pan} maxLength={10} onChange={(e) => setSeller({ pan: normalizeId(e.target.value) })} placeholder="ABCDE1234F" />
            </Field>
            <Field label="Email">
              <input type="email" className={input} value={inv.seller.email} onChange={(e) => setSeller({ email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <input type="tel" className={input} value={inv.seller.phone} onChange={(e) => setSeller({ phone: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-slate-600">Logo (optional)</span>
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={onLogo} className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-teal-700" />
                {inv.seller.logo && (
                  <button type="button" onClick={() => setSeller({ logo: "" })} className="shrink-0 text-sm text-red-600 underline">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </Section>

          <Section title="Client details (buyer)">
            <Field label="Client name *">
              <input className={input} value={inv.buyer.name} onChange={(e) => setBuyer({ name: e.target.value })} />
            </Field>
            <Field label="GSTIN (optional)" error={errors.buyerGstin}>
              <input className={input} value={inv.buyer.gstin} maxLength={15} onChange={(e) => onBuyerGstin(normalizeId(e.target.value))} />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <textarea className={input} rows={2} value={inv.buyer.address} onChange={(e) => setBuyer({ address: e.target.value })} />
            </Field>
            <Field label="State / UT (place of supply)">
              <StateSelect value={inv.buyer.stateCode} onChange={(v) => setBuyer({ stateCode: v })} />
            </Field>
            <Field label="Email">
              <input type="email" className={input} value={inv.buyer.email} onChange={(e) => setBuyer({ email: e.target.value })} />
            </Field>
            <p className="rounded-lg bg-teal-50 p-2 text-xs text-teal-900 sm:col-span-2" aria-live="polite">
              {taxBanner}
            </p>
          </Section>

          <section className="surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-bold">Line items</h2>
              <button type="button" onClick={() => update((d) => ({ ...d, items: [...d.items, blankItem()] }))} className="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 hover:bg-teal-100">
                + Add item
              </button>
            </div>
            <div className="space-y-3">
              {inv.items.map((it, idx) => (
                <div key={it.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
                    <Field label={`Description (item ${idx + 1})`} className="col-span-2 sm:col-span-4">
                      <input className={input} value={it.description} onChange={(e) => setItem(it.id, { description: e.target.value })} />
                    </Field>
                    <Field label="HSN / SAC" className="col-span-2">
                      <input className={input} inputMode="numeric" value={it.hsn} onChange={(e) => setItem(it.id, { hsn: e.target.value.replace(/\D/g, "").slice(0, 8) })} placeholder="998314" />
                    </Field>
                    <Field label="Qty">
                      <input className={input} type="number" inputMode="decimal" min="0" step="any" value={it.qty} onChange={(e) => setItem(it.id, { qty: numeric(e.target.value) })} />
                    </Field>
                    <Field label="Rate (₹)">
                      <input className={input} type="number" inputMode="decimal" min="0" step="any" value={it.rate} onChange={(e) => setItem(it.id, { rate: numeric(e.target.value) })} />
                    </Field>
                    <Field label="Discount %">
                      <input className={input} type="number" inputMode="decimal" min="0" max="100" step="any" value={it.discount} onChange={(e) => setItem(it.id, { discount: numeric(e.target.value) })} />
                    </Field>
                    <Field label="GST rate">
                      <select className={input} value={it.gstRate} onChange={(e) => setItem(it.id, { gstRate: Number(e.target.value) })}>
                        {GST_RATES.map((r) => (
                          <option key={r} value={r}>
                            {r}%
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="col-span-2 flex items-end justify-between sm:col-span-2">
                      <span className="text-sm font-semibold">₹{formatINR(view.lines[idx]?.total ?? 0)}</span>
                      {inv.items.length > 1 && (
                        <button type="button" onClick={() => update((d) => ({ ...d, items: d.items.filter((x) => x.id !== it.id) }))} className="text-sm text-red-600 underline">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Section title="Payment details">
            <Field label="Account holder name">
              <input className={input} value={inv.bank.accountName} onChange={(e) => setBank({ accountName: e.target.value })} />
            </Field>
            <Field label="Bank name">
              <input className={input} value={inv.bank.bankName} onChange={(e) => setBank({ bankName: e.target.value })} />
            </Field>
            <Field label="Account number">
              <input className={input} inputMode="numeric" value={inv.bank.accountNumber} onChange={(e) => setBank({ accountNumber: e.target.value.replace(/\D/g, "") })} />
            </Field>
            <Field label="IFSC" error={errors.ifsc}>
              <input className={input} value={inv.bank.ifsc} maxLength={11} onChange={(e) => setBank({ ifsc: normalizeId(e.target.value) })} />
            </Field>
            <Field label="UPI ID" error={errors.upi} className="sm:col-span-2">
              <input className={input} value={inv.upi} onChange={(e) => update((d) => ({ ...d, upi: e.target.value.trim() }))} placeholder="name@okhdfcbank" />
            </Field>
          </Section>

          <Section title="Notes and terms">
            <Field label="Notes" className="sm:col-span-2">
              <textarea className={input} rows={2} value={inv.notes} onChange={(e) => update((d) => ({ ...d, notes: e.target.value }))} placeholder="Thank you for your business!" />
            </Field>
            <Field label="Terms" className="sm:col-span-2">
              <textarea className={input} rows={2} value={inv.terms} onChange={(e) => update((d) => ({ ...d, terms: e.target.value }))} />
            </Field>
          </Section>
        </div>

        <div className={`min-w-0 ${tab === "edit" ? "hidden lg:block" : ""}`}>
          <div className="lg:sticky lg:top-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span className="font-medium">Live preview</span>
              <span>Total ₹{formatINR(view.totals.grandTotal)}</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-100 shadow">
              <ScaledPreview>
                <InvoicePreview view={view} />
              </ScaledPreview>
            </div>
            <button
              type="button"
              onClick={download}
              disabled={busy}
              className="mt-3 w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 disabled:opacity-60 lg:hidden"
            >
              {busy ? "Creating PDF…" : "Download PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
