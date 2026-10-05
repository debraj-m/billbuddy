import { InvoicePreview } from "@/components/generator/InvoicePreview";
import { ScaledPreview } from "@/components/generator/ScaledPreview";
import { invoiceFromExample, type ExampleInvoice } from "@/lib/invoice";
import { buildView } from "@/lib/invoiceView";
import type { TemplateId } from "@/lib/invoice";

/** Server-rendered, fixed-date example invoice so static pages stay stable between builds. */
export function exampleView(ex: ExampleInvoice, template: TemplateId = "modern") {
  const inv = { ...invoiceFromExample(ex, template), date: "2026-11-03", dueDate: "2026-11-18" };
  return buildView(inv);
}

export function ExampleInvoicePreview({ example, template, label }: { example: ExampleInvoice; template?: TemplateId; label: string }) {
  const view = exampleView(example, template);
  return (
    <div className="mx-auto max-w-[860px] overflow-hidden rounded-lg border border-slate-300 bg-slate-100 shadow">
      <ScaledPreview label={label}>
        <InvoicePreview view={view} />
      </ScaledPreview>
    </div>
  );
}
