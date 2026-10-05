import { Generator } from "@/components/generator/Generator";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import Link from "next/link";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, webApplicationJsonLd, type Faq } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free GST Invoice Generator – Create & Download PDF | BillBuddy",
  description:
    "Create GST invoices online for free: auto CGST/SGST/IGST, GSTIN validation, amount in words, 3 templates and instant PDF. No sign-up, data stays in your browser.",
  path: "/generator",
});

const faqs: Faq[] = [
  { q: "Is the BillBuddy invoice generator really free?", a: "Yes. There is no sign-up, no watermark and no limit on invoices. Everything runs in your browser." },
  { q: "Where is my invoice data stored?", a: "Only in your own browser's local storage, so your next invoice starts with your details filled in. Nothing is uploaded to a server, and clearing site data removes it." },
  { q: "How does BillBuddy decide between CGST+SGST and IGST?", a: "It compares your state with the client's state. If they match, tax is split equally into CGST and SGST. If they differ, the full tax is charged as IGST." },
  { q: "Does it validate GSTIN?", a: "It checks the 15-character format and the state code, and fills in your state from a valid GSTIN. It does not check whether the GSTIN is active on the GST portal, so verify that separately." },
  { q: "Can I use these invoices for filing GST returns?", a: "The PDF contains the mandatory fields of a tax invoice. Always confirm the details with your accountant, and use e-invoicing if your turnover is above the threshold." },
];

export default function GeneratorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd,
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Invoice generator", path: "/generator" },
          ]),
        ]}
      />
      <Generator />
      <div className="mx-auto max-w-4xl px-4">
        <section className="prose-bb mt-12">
          <h2>How to create a GST invoice with BillBuddy</h2>
          <ol>
            <li>Enter your business details and GSTIN. Your state is filled in automatically.</li>
            <li>Add your client and pick their state so the right tax (CGST + SGST or IGST) is applied.</li>
            <li>Add line items with HSN/SAC code, quantity, rate, discount and GST rate.</li>
            <li>Choose a template, check the live preview and download the PDF.</li>
          </ol>
          <p>
            New to GST invoicing? Read <Link href="/blog/what-is-a-gst-invoice-mandatory-fields">what a GST invoice must contain</Link>, or start from a{" "}
            <Link href="/invoice-template">template for your profession</Link>.
          </p>
        </section>
        <FaqList faqs={faqs} />
      </div>
    </>
  );
}
