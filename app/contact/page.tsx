import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact BillBuddy",
  description: "Questions, bug reports or feature ideas for BillBuddy, the free GST invoice generator? Get in touch by email.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <div className="prose-bb mt-6">
        <p>
          Found a bug, spotted an error in a guide or have an idea that would make BillBuddy more useful? Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          When reporting a problem, please tell us the browser and device you used and what you expected to happen. Please do not send invoices containing personal or bank details. BillBuddy never receives them, and we do not need them to help.
        </p>
        <p>We cannot give tax or legal advice. For questions about your own GST position, please consult a chartered accountant.</p>
      </div>
    </div>
  );
}
