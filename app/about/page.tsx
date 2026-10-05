import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About BillBuddy – Free GST Invoicing Tool",
  description: "BillBuddy is a free, privacy-first GST invoice generator built for Indian freelancers and small businesses. Learn why it exists and how it works.",
  path: "/about",
});

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">About BillBuddy</h1>
      <div className="prose-bb mt-6">
        <p>
          BillBuddy is a free GST invoice generator for Indian freelancers, consultants and small businesses. It exists because most invoicing tools ask you to create an account, store your clients on their servers and then charge for the features you actually need, which is a lot to ask for a document you produce a few times a month.
        </p>
        <h2>What makes it different</h2>
        <ul>
          <li><strong>No sign-up.</strong> Open the generator and start typing.</li>
          <li><strong>No server storage.</strong> The invoice is built and the PDF is created in your browser. Drafts stay in your browser&apos;s local storage.</li>
          <li><strong>Correct tax logic.</strong> CGST + SGST for same-state supplies, IGST otherwise, with GSTIN format checks and the amount in words using lakh and crore.</li>
          <li><strong>Free guides.</strong> Plain-English <Link href="/blog">articles</Link> on GST for people who are not accountants.</li>
        </ul>
        <h2>What BillBuddy is not</h2>
        <p>
          BillBuddy is a tool, not a tax adviser. It helps you produce a well-formed invoice, but it does not file returns, verify GSTINs against the government portal or replace a chartered accountant. Rules change, so check your specific situation with a professional.
        </p>
        <p>
          Ready to try it? <Link href="/generator">Create your first invoice</Link>, or <Link href="/contact">get in touch</Link> with feedback.
        </p>
      </div>
    </div>
  );
}
