import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use | BillBuddy Free GST Invoicing",
  description: "Terms of use for BillBuddy, the free GST invoice generator: acceptable use, no tax advice, and limitation of liability.",
  path: "/terms",
});

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <div className="prose-bb mt-6">
        <p>By using BillBuddy you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>The service</h2>
        <p>BillBuddy is a free tool for creating invoices in your browser. We may change, suspend or discontinue any part of it at any time.</p>
        <h2>Not tax or legal advice</h2>
        <p>
          BillBuddy and its guides give general information only. GST rules, rates and procedures change and depend on your circumstances. You are responsible for the accuracy of every invoice you issue and for your tax compliance. Consult a qualified chartered accountant or tax professional before relying on any content.
        </p>
        <h2>Your content</h2>
        <p>You own the invoices you create. You are responsible for the information you enter and for having the right to use any logo you upload.</p>
        <h2>Acceptable use</h2>
        <p>Do not use BillBuddy to produce false, misleading or fraudulent invoices, to infringe anyone&apos;s rights or to attack or overload the site.</p>
        <h2>No warranty</h2>
        <p>BillBuddy is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee that it will be error-free, uninterrupted or that calculations will suit your situation.</p>
        <h2>Limitation of liability</h2>
        <p>To the fullest extent permitted by law, BillBuddy and its operators are not liable for any indirect or consequential loss, or for any loss arising from your use of the service, including penalties, interest or lost input tax credit.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India. Courts in India have jurisdiction over any dispute.</p>
      </div>
    </div>
  );
}
