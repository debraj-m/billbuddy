import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy | BillBuddy",
  description: "How BillBuddy handles your data: invoices are created in your browser and never uploaded. Details on local storage and Google Analytics.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <div className="prose-bb mt-6">
        <p>BillBuddy is built so that we do not need your invoice data. This page explains what stays on your device and what is collected.</p>
        <h2>Invoice data</h2>
        <p>
          Everything you type into the generator (business details, GSTIN, client details, line items, bank and UPI details, logo) is processed in your browser. The PDF is generated on your device. None of it is sent to our servers, and we have no database.
        </p>
        <h2>Local storage</h2>
        <p>
          To save you retyping, BillBuddy stores a draft of your invoice in your browser&apos;s local storage. It stays on your device. You can remove it with the Reset button in the generator or by clearing your browser&apos;s site data. Avoid using the generator on a shared computer if you do not want the next person to see the draft.
        </p>
        <h2>Analytics</h2>
        <p>
          If enabled, we use Google Analytics 4 to understand which pages are used and whether features such as PDF download work. It records events such as <code>generator_started</code>, <code>pdf_downloaded</code> and <code>template_changed</code>, along with usual page-view data and approximate location. These events never include the contents of your invoice. You can block analytics with a browser extension or your browser&apos;s privacy settings.
        </p>
        <h2>Cookies</h2>
        <p>BillBuddy itself does not set cookies. Google Analytics may set its own cookies if it is enabled.</p>
        <h2>Fonts and hosting</h2>
        <p>Fonts are served from our own domain. The site is hosted on a third-party platform that may keep standard server logs such as IP address and request time.</p>
        <h2>Your choices</h2>
        <p>You can use BillBuddy without an account, and delete your local data at any time. For any question, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        <p>This policy may be updated as the product changes. The current version always applies.</p>
      </div>
    </div>
  );
}
