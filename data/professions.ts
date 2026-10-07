import type { ExampleInvoice } from "@/lib/invoice";
import type { Faq } from "@/lib/seo";

export interface Profession {
  slug: string;
  name: string;
  /** <title> */
  title: string;
  /** meta description */
  description: string;
  h1: string;
  intro: string[];
  sac: { code: string; label: string }[];
  tips: { title: string; text: string }[];
  /** short paragraph on how people in this trade usually price/bill */
  billing: string;
  faqs: Faq[];
  example: ExampleInvoice;
  /** blog slugs shown as further reading */
  blog: string[];
  /** related profession slugs */
  related: string[];
}

export const professions: Profession[] = [
  {
    slug: "web-developer",
    name: "Web Developer",
    title: "GST Invoice Template for Web Developers (Free PDF) | BillBuddy",
    description:
      "Free GST invoice template for freelance web developers in India. Prefilled with SAC 998314, milestone billing and hosting lines. Download a PDF in minutes.",
    h1: "GST invoice template for web developers",
    intro: [
      "Web development work rarely fits a single line on an invoice. A typical project mixes a fixed-fee build, a few change requests, a domain or hosting purchase made on the client's behalf, and a monthly maintenance retainer. Each of those can carry a different GST treatment, so an invoice that just says \"Website – ₹80,000\" invites questions from the client's accounts team.",
      "This template splits the work the way developers actually bill it: build milestones, third-party costs and recurring support, all under SAC 998314 (IT design and development services) at 18%. Replace the sample client, change the rates, and the CGST/SGST or IGST split is worked out for you based on the two states.",
    ],
    sac: [
      { code: "998314", label: "IT design and development services (websites, web apps, custom code)" },
      { code: "998315", label: "Hosting and IT infrastructure provisioning, when you resell hosting" },
      { code: "998313", label: "IT consulting and support, for retainers and technical audits" },
    ],
    tips: [
      { title: "Invoice by milestone, not at the end", text: "Raise a separate tax invoice when each milestone (design sign-off, staging, launch) is accepted. GST is due when you issue the invoice or receive payment, whichever is earlier, so a 50% advance needs its own invoice or receipt voucher anyway." },
      { title: "Show reimbursed costs honestly", text: "If you buy a domain, theme licence or plugin for the client, either bill it at cost with GST as a separate line or use the pure-agent route with proper documentation. Burying it in your fee can push your taxable turnover up without you noticing." },
      { title: "Name the deliverable", text: "\"Corporate website – 8 pages, CMS, responsive, 2 rounds of revisions\" prevents scope arguments later and gives the client's auditor something concrete to match against the contract." },
      { title: "Mention the maintenance period", text: "Retainers should say the month they cover (\"Support – November 2026\"). It stops disputes about double billing and keeps your books clean when you file GSTR-1." },
    ],
    billing:
      "Indian freelance developers commonly bill fixed-price projects in two or three milestones (30/40/30 is popular), plus hourly or retainer billing for maintenance. Agencies that outsource to you will usually ask for a GSTIN on the invoice so they can claim input tax credit.",
    faqs: [
      { q: "Which SAC code should a freelance web developer use?", a: "Most website and web-app development is billed under SAC 998314 (IT design and development services). Support and consulting sit under 998313, and reselling hosting is 998315. All three are generally taxed at 18%." },
      { q: "Do I charge GST to a foreign client for a website I built?", a: "Usually not. Software development delivered to a client outside India and paid in foreign exchange qualifies as export of services and can be zero-rated under a Letter of Undertaking. See our guide on invoicing international clients." },
      { q: "What if a client wants a lump-sum invoice for the whole project?", a: "That is fine as long as the invoice still shows the SAC code, the taxable value and the GST split. Add a short description of what the lump sum covers so it can be matched to the work order." },
    ],
    example: {
      sellerName: "Pixelforge Web Studio",
      sellerAddress: "14, 2nd Floor, Indiranagar, Bengaluru 560038",
      sellerStateCode: "29",
      buyerName: "Greenleaf Organics Pvt Ltd",
      buyerAddress: "Plot 22, MIDC Andheri East, Mumbai 400093",
      buyerStateCode: "27",
      items: [
        { description: "E-commerce website build – milestone 2 of 3 (storefront and checkout)", hsn: "998314", qty: 1, rate: 60000, gstRate: 18 },
        { description: "Payment gateway integration and testing", hsn: "998314", qty: 1, rate: 12000, gstRate: 18 },
        { description: "Domain and SSL renewal (1 year, at cost)", hsn: "998315", qty: 1, rate: 1500, gstRate: 18 },
      ],
      notes: "Milestone 3 (go-live and handover) will be invoiced on launch.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies", "invoice-payment-terms-and-late-payments"],
    related: ["app-developer", "ui-ux-designer", "seo-specialist", "international-freelancer"],
  },
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    title: "Graphic Designer Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice for graphic designers. Prefilled logo, branding and social-creative line items with SAC 998391. Edit and download as PDF.",
    h1: "GST invoice template for graphic designers",
    intro: [
      "Designers sell an odd mix of things: hours of creative thinking, a set of files, and sometimes the right to use them. An invoice that only says \"Logo design\" leaves the important questions open, like how many concepts were included, how many revision rounds, and whether the client now owns the artwork or just licenses it.",
      "This template lists work the way studios do, per deliverable, with SAC 998391 (specialty design services) and 18% GST. It also leaves room for a licence note, which is the line that saves you when a client reuses a logo for something you never priced.",
    ],
    sac: [
      { code: "998391", label: "Specialty design services (logos, branding, packaging, illustration)" },
      { code: "998361", label: "Advertising services, when you produce campaign creatives" },
      { code: "998392", label: "Design originals, where you transfer ownership of the artwork" },
    ],
    tips: [
      { title: "Separate concept from usage", text: "Bill the creative work and the usage rights as separate lines when the client wants exclusive or unlimited use. It makes later licence extensions easy to price and easy to invoice." },
      { title: "Count revision rounds on the invoice", text: "\"Includes 2 revision rounds\" printed on the invoice is a polite, written boundary. Extra rounds become a new line instead of an awkward conversation." },
      { title: "Print vendors are not your income", text: "If you pay a printer on the client's behalf, bill it as a pass-through with the printer's invoice attached. Marking up print is normal, but the markup is your taxable supply." },
      { title: "Use per-deliverable pricing for social packs", text: "A pack of 12 social posts at ₹1,500 each reads far better to a client's finance team than a 12-hour block of time." },
    ],
    billing:
      "Brand identity projects are usually fixed-fee with a 50% advance. Ongoing social and marketing design is more often a monthly retainer or a per-asset rate card. Both can use the same invoice layout; only the line items change.",
    faqs: [
      { q: "What SAC code applies to logo and branding design?", a: "Logo, branding, packaging and illustration work generally falls under SAC 998391, specialty design services, at 18% GST. If you sell outright ownership of the original artwork, some practitioners use 998392 instead." },
      { q: "Can I invoice in USD to an overseas client?", a: "You can show the amount in USD, but the Indian tax invoice must also state the INR value at the applicable exchange rate. Exports of design services can be zero-rated under LUT. Our international invoicing guide covers the details." },
      { q: "Do I need GST registration as a freelance designer?", a: "Only if your aggregate turnover crosses ₹20 lakh in a year (₹10 lakh in a few north-eastern states), or you make inter-state supplies that need registration under specific rules. Services to overseas clients count towards turnover." },
    ],
    example: {
      sellerName: "Meera Nair Design",
      sellerAddress: "Flat 5B, Marine Drive Apartments, Kochi 682031",
      sellerStateCode: "32",
      buyerName: "Spice Route Foods LLP",
      buyerAddress: "9 Anna Salai, Chennai 600002",
      buyerStateCode: "33",
      items: [
        { description: "Brand identity: logo (3 concepts, 2 revisions), colour palette, typography", hsn: "998391", qty: 1, rate: 45000, gstRate: 18 },
        { description: "Packaging label design – 4 SKUs", hsn: "998391", qty: 4, rate: 6000, gstRate: 18 },
        { description: "Social media post templates (Canva-ready)", hsn: "998391", qty: 12, rate: 1200, discount: 10, gstRate: 18 },
      ],
      notes: "Final artwork files released on receipt of full payment. Licence: perpetual, India, all media.",
    },
    blog: ["what-is-a-gst-invoice-mandatory-fields", "hsn-vs-sac-codes-practical-guide", "invoice-payment-terms-and-late-payments"],
    related: ["ui-ux-designer", "video-editor", "social-media-manager"],
  },
  {
    slug: "photographer",
    name: "Photographer",
    title: "Photographer GST Invoice Template (Free PDF Download) | BillBuddy",
    description:
      "Free GST invoice template for photographers: event, portrait and product shoots with SAC 998383, advance receipts and album lines. Download as PDF.",
    h1: "GST invoice template for photographers",
    intro: [
      "A photographer's invoice usually tells a small story: a booking advance weeks before the shoot, the shoot day itself, then edits and an album months later. Because the money and the work are spread across time, getting the dates and advance adjustments right matters more here than in almost any other trade.",
      "This template covers a wedding or event shoot with a booking advance already adjusted, a line for edited deliverables and an optional printed album. It uses SAC 998383 (event photography and videography) at 18%. For portraits and commercial shoots, swap in 998381 or 998382.",
    ],
    sac: [
      { code: "998383", label: "Event photography and event videography" },
      { code: "998381", label: "Portrait photography" },
      { code: "998382", label: "Advertising and related photography (product, catalogue)" },
      { code: "998386", label: "Photographic processing and album services" },
    ],
    tips: [
      { title: "Show the advance and balance", text: "Print the advance received (with its date) and the balance due. Clients and auditors both want to see how the total was reached, and it proves you charged GST on the advance." },
      { title: "Be exact about deliverables", text: "\"500 edited images in an online gallery, 1 printed album (40 pages)\" avoids the classic \"I thought I'd get every frame\" dispute." },
      { title: "Charge travel and assistants clearly", text: "Travel, accommodation and second-shooter fees belong on their own lines. If the client pays them directly, say so in the notes so nobody pays twice." },
      { title: "Raw files are a separate product", text: "If you hand over unedited RAW files, price them as a separate line. It is a different asset with different resale risk." },
    ],
    billing:
      "Weddings and events are priced per package with a booking amount (often 30–50%) and the balance before or on the event day. Commercial photographers price per day or per image, with usage rights built into the rate.",
    faqs: [
      { q: "Is GST applicable on wedding photography?", a: "Yes. Photography services are taxable at 18% once you are registered. A freelancer below the ₹20 lakh threshold is not required to register or to charge GST, but must then issue a bill of supply or a plain invoice without tax." },
      { q: "How do I show an advance on a GST invoice?", a: "Issue a receipt voucher for the advance, then on the final tax invoice show the full value and deduct the advance already received. GST on the advance is payable in the month it is received." },
      { q: "Can I invoice a client in another state?", a: "Yes. If the client is in a different state from you, charge IGST instead of CGST + SGST. For event photography, place of supply follows the venue of the event in many cases, so check where the event actually happens." },
    ],
    example: {
      sellerName: "Rohan Mehta Photography",
      sellerAddress: "B-204, Satellite Road, Ahmedabad 380015",
      sellerStateCode: "24",
      buyerName: "Kapoor Wedding Planners",
      buyerAddress: "Civil Lines, Jaipur 302006",
      buyerStateCode: "08",
      items: [
        { description: "Wedding photography – 2 days, 2 photographers", hsn: "998383", qty: 2, rate: 40000, gstRate: 18 },
        { description: "Edited gallery: 600 images, online delivery", hsn: "998383", qty: 1, rate: 12000, gstRate: 18 },
        { description: "Printed album, 40 pages, premium cover", hsn: "998386", qty: 1, rate: 9000, gstRate: 18 },
      ],
      notes: "Booking advance of ₹30,000 received on 12 Aug. Balance payable before the event.",
    },
    blog: ["do-freelancers-need-gst-registration-india", "invoice-payment-terms-and-late-payments", "cgst-sgst-igst-when-each-applies"],
    related: ["video-editor", "event-planner", "graphic-designer"],
  },
  {
    slug: "content-writer",
    name: "Content Writer",
    title: "Content Writer Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free invoice template for freelance content writers and copywriters in India. Per-word and per-article lines, SAC 998399, GST and TDS notes. Download PDF.",
    h1: "GST invoice template for content writers",
    intro: [
      "Writers bill in more units than almost anyone: per word, per article, per project, per month. Clients also love to pay late and to deduct TDS. Your invoice has to make the unit obvious, because a client's accounts team will check \"1,500 words × ₹3\" against the brief far more carefully than \"Article – ₹4,500\".",
      "This template is set up for per-article billing with the word count shown, plus a retainer line. It uses SAC 998399 (other professional, technical and business services) at 18%, and the notes field carries your payment terms and a reminder about TDS certificates.",
    ],
    sac: [
      { code: "998399", label: "Other professional, technical and business services (content writing, copywriting)" },
      { code: "998361", label: "Advertising services, when writing is part of a campaign" },
      { code: "998395", label: "Translation and interpretation, if you localise content" },
    ],
    tips: [
      { title: "Print the word count and brief", text: "\"Blog post, 1,500 words, brief dated 3 Nov\" ties the invoice to what was ordered and ends arguments about whether a 1,200-word draft was acceptable." },
      { title: "Plan for TDS", text: "Companies often deduct 10% TDS under section 194J on professional fees. Ask for the TDS certificate (Form 16A) every quarter and reconcile it with Form 26AS before you file your return." },
      { title: "Invoice on delivery, not on publish", text: "Publication dates are the client's schedule, not yours. Write \"Payable within 15 days of delivery\" so your cash does not wait on their editorial calendar." },
      { title: "Keep ghostwriting terms visible", text: "If the client takes the byline and full rights, mention \"all rights transferred on payment\" in the notes. It protects both sides." },
    ],
    billing:
      "Per-word rates between ₹1 and ₹8 are common for web content, with higher per-article pricing for technical and long-form work. Monthly retainers (say, 8 articles a month) make cash flow predictable and are easy to invoice on the first working day.",
    faqs: [
      { q: "Do freelance writers need to charge GST?", a: "Only once aggregate turnover crosses ₹20 lakh in a financial year. Below that you can bill without GST. If your client is abroad and pays in foreign currency, those earnings count towards turnover but the supply can be zero-rated." },
      { q: "What is the right SAC code for content writing?", a: "There is no dedicated heading for writing, so most freelancers use 998399, other professional, technical and business services. Writers working inside advertising campaigns sometimes use 998361." },
      { q: "A client deducted TDS. Do I still charge GST on the full amount?", a: "Yes. TDS under the Income Tax Act is calculated on the amount before GST when GST is shown separately. The invoice should still carry GST on the full taxable value." },
    ],
    example: {
      sellerName: "Ananya Rao – Content & Copy",
      sellerAddress: "301, Jubilee Hills, Hyderabad 500033",
      sellerStateCode: "36",
      buyerName: "BrightPath EdTech Pvt Ltd",
      buyerAddress: "Sector 18, Gurugram 122015",
      buyerStateCode: "06",
      items: [
        { description: "Long-form blog articles, ~1,800 words each (Nov batch)", hsn: "998399", qty: 4, rate: 6500, gstRate: 18 },
        { description: "Landing page copy – 1 page, 2 revisions", hsn: "998399", qty: 1, rate: 8000, gstRate: 18 },
        { description: "Email nurture sequence (5 emails)", hsn: "998399", qty: 5, rate: 1800, gstRate: 18 },
      ],
      notes: "TDS (if applicable) to be deducted under section 194J. Please share Form 16A.",
    },
    blog: ["do-freelancers-need-gst-registration-india", "invoice-payment-terms-and-late-payments", "invoice-for-international-clients-lut-export-of-services"],
    related: ["translator", "social-media-manager", "seo-specialist"],
  },
  {
    slug: "consultant",
    name: "Consultant",
    title: "Consultant Invoice Template with GST (Free PDF) | BillBuddy",
    description:
      "Free GST invoice template for independent consultants: retainers, day rates and workshops with SAC 998311/998312, reverse charge and TDS notes.",
    h1: "GST invoice template for consultants",
    intro: [
      "Consultants sell judgement, and clients want to see what they bought. A vague invoice for \"Consulting services\" is the one most likely to be queried, delayed or sent back by a client's finance team. Specific scope, the period covered and the basis of billing (days, hours or retainer) make it far more likely to be paid on the first pass.",
      "This template is built around a monthly advisory retainer plus a one-off workshop, billed under SAC 998311 (management consulting) and 998312 (business consulting) at 18%. It leaves space for the engagement reference so the invoice can be matched to the signed proposal.",
    ],
    sac: [
      { code: "998311", label: "Management consulting and advisory services" },
      { code: "998312", label: "Business consulting services (strategy, operations, GTM)" },
      { code: "998313", label: "IT consulting and support" },
      { code: "999293", label: "Commercial training or coaching, for paid workshops" },
    ],
    tips: [
      { title: "Quote the engagement reference", text: "Put the proposal or SOW number in the description, for example \"Advisory retainer per SOW-2026-07\". Large clients route invoices by PO or SOW number." },
      { title: "State the period and basis", text: "\"October 2026 – 6 advisory days at ₹25,000 per day\" is easier to approve than a single lump sum. It also makes your time visible if the client later disputes scope." },
      { title: "Check who pays the tax", text: "If you advise a company and it is registered, GST is generally charged normally. But some specific services (like those by an advocate) fall under reverse charge, so confirm your category before billing." },
      { title: "Expenses on a separate line", text: "Flights, hotels and software you buy for the client should be a distinct, documented line, with GST shown if it applies." },
    ],
    billing:
      "Independent consultants typically bill a monthly retainer in advance, or a day rate for project work at the end of each month. Workshop and training fees are usually fixed per session. Whatever the basis, invoice at the same point every month so the client can budget for it.",
    faqs: [
      { q: "What GST rate applies to consulting services?", a: "Management and business consulting are taxed at 18%. If you are below the ₹20 lakh registration threshold and unregistered, you cannot charge GST at all and should issue a plain invoice." },
      { q: "Do I have to register for GST if I only have corporate clients?", a: "Yes, once your turnover crosses the threshold. Serving registered businesses does not change the threshold, but those clients will usually insist on a GSTIN so they can claim input tax credit." },
      { q: "Should I mention TDS on the invoice?", a: "It helps. Add a note that TDS under section 194J may be deducted and that you will need the certificate. It does not change how GST is calculated." },
    ],
    example: {
      sellerName: "Kiran Joshi Advisory",
      sellerAddress: "Office 12, Baner Road, Pune 411045",
      sellerStateCode: "27",
      buyerName: "NovaSteel Components Pvt Ltd",
      buyerAddress: "Industrial Area, Phase 2, Pimpri-Chinchwad 411018",
      buyerStateCode: "27",
      items: [
        { description: "Operations advisory retainer – October 2026 (SOW-2026-07)", hsn: "998312", qty: 1, rate: 90000, gstRate: 18 },
        { description: "Leadership workshop, full day, on-site", hsn: "999293", qty: 1, rate: 35000, gstRate: 18 },
      ],
      notes: "Travel expenses will be billed at actuals with receipts.",
    },
    blog: ["what-is-a-gst-invoice-mandatory-fields", "do-freelancers-need-gst-registration-india", "invoice-payment-terms-and-late-payments"],
    related: ["virtual-assistant", "tutor", "seo-specialist"],
  },
  {
    slug: "video-editor",
    name: "Video Editor",
    title: "Video Editor Invoice Template with GST (Free PDF) | BillBuddy",
    description:
      "Free GST invoice for freelance video editors and YouTube editors in India. Per-video, per-minute and reel pack lines with SAC 999613. Download PDF.",
    h1: "GST invoice template for video editors",
    intro: [
      "Video editors juggle three kinds of clients: YouTubers who pay per video, agencies who pay per project and brands who want monthly reel packs. All three want the same thing from an invoice, which is a clear match between the videos delivered and the amount charged.",
      "This template lists each deliverable with its duration, a separate line for revision rounds beyond the agreed limit, and a monthly reels pack. Post-production work is commonly billed under SAC 999613 at 18%, and the layout works equally well for Premiere, DaVinci Resolve or After Effects work.",
    ],
    sac: [
      { code: "999613", label: "Audiovisual post-production services (editing, colour, sound)" },
      { code: "999612", label: "Audiovisual production services, for shoot-and-edit packages" },
      { code: "998361", label: "Advertising services, for ad creatives and promos" },
    ],
    tips: [
      { title: "List each video with its length", text: "\"YouTube video, 12 min, with captions\" tells the client exactly what was delivered and makes it easy to reconcile against their publishing calendar." },
      { title: "Cap revisions in writing", text: "State included revision rounds on the invoice and bill extra rounds as an hourly line. Video revisions are the single biggest source of unpaid work for editors." },
      { title: "Charge for rush delivery", text: "A 24-hour turnaround is a different product. Add it as a percentage uplift line so the client sees it as a choice, not a surprise." },
      { title: "Mention asset licences", text: "Stock footage, music and fonts you buy for a project should be named. If the client reuses edits with your licensed music on another channel, you will want the record." },
    ],
    billing:
      "YouTube editors often price per finished minute or per video, brands buy monthly packs of reels or shorts, and agencies pay a project fee. A 50% advance on projects is normal, and recurring creators usually settle at the end of each month.",
    faqs: [
      { q: "Which SAC code should video editors use?", a: "Editing and other post-production work is generally billed under SAC 999613 (audiovisual post-production). Full shoot-and-edit packages sit closer to 999612. Both are taxed at 18%." },
      { q: "Do I charge GST to a YouTuber based abroad?", a: "If the YouTuber is outside India and pays you in foreign currency, the service can usually be treated as an export and zero-rated with an LUT. Keep the FIRC or bank advice as proof of payment." },
      { q: "Can I invoice every video separately?", a: "You can, but a monthly invoice listing every video is cleaner and means fewer GST documents to file. Just make sure the invoice is raised within the time limit after the service is complete." },
    ],
    example: {
      sellerName: "CutLoop Studios",
      sellerAddress: "A-17, Sector 62, Noida 201301",
      sellerStateCode: "09",
      buyerName: "Tech With Tara Media",
      buyerAddress: "Koramangala 5th Block, Bengaluru 560095",
      buyerStateCode: "29",
      items: [
        { description: "YouTube long-form edit, ~12 min, captions and thumbnails", hsn: "999613", qty: 6, rate: 4500, gstRate: 18 },
        { description: "Short-form reels pack (vertical, 30–45 s)", hsn: "999613", qty: 12, rate: 1200, gstRate: 18 },
        { description: "Extra revision round beyond agreed two (hourly)", hsn: "999613", qty: 3, rate: 800, gstRate: 18 },
      ],
      notes: "Delivery via shared drive. Source project files available on request at an additional fee.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "hsn-vs-sac-codes-practical-guide", "invoice-payment-terms-and-late-payments"],
    related: ["photographer", "voice-over-artist", "graphic-designer"],
  },
  {
    slug: "tutor",
    name: "Tutor",
    title: "Tutor & Coaching Fee Invoice Template with GST | BillBuddy",
    description:
      "Free invoice and fee receipt template for tutors, coaches and online teachers in India. Monthly batch fees, GST notes and UPI details. Download PDF.",
    h1: "Invoice template for tutors and coaching teachers",
    intro: [
      "Tutors have a different problem from most freelancers: dozens of small recurring payers instead of a few big ones. Parents pay monthly, sometimes by UPI at odd hours, and someone always asks for a receipt for a company reimbursement or a school fee claim. A simple, consistent invoice with the student, subject and month printed on it solves most of that.",
      "This template is built for monthly batch or one-to-one fees, with a UPI ID prominent for quick payment. GST is the first thing to check: an individual tutor below the ₹20 lakh threshold does not need to register or charge GST, while a registered coaching business bills commercial coaching under SAC 999293 at 18%.",
    ],
    sac: [
      { code: "999293", label: "Commercial training or coaching services" },
      { code: "999299", label: "Other education and training services n.e.c." },
    ],
    tips: [
      { title: "Name the student and the month", text: "\"Maths coaching – Class 10 – November 2026 – Aarav Shah\" is what a parent's employer or a tax-saving claim will ask for." },
      { title: "Check the threshold before adding GST", text: "If your turnover is under ₹20 lakh and you are not registered, leave GST at 0% and use a plain invoice or receipt. Charging GST without registration is not allowed." },
      { title: "Put your UPI ID front and centre", text: "Most tutor payments arrive via UPI. Having the ID on the invoice, plus the invoice number as the payment note, makes reconciling a long list of parents painless." },
      { title: "Say what a missed class means", text: "A one-line policy in the notes (\"Missed classes with under 6 hours' notice are billed\") is far easier to enforce when it was printed on every invoice." },
    ],
    billing:
      "Most tutors bill monthly in advance, either per session or as a fixed batch fee. Group batches, online courses and test-series packages are priced per course. Advance billing is the norm and protects you against cancelled months.",
    faqs: [
      { q: "Do tutors need GST registration?", a: "Only above ₹20 lakh aggregate annual turnover (₹10 lakh in a few north-eastern states). Most individual tutors stay below that and do not charge GST. A coaching institute or an online academy that crosses it must register and charge 18% on commercial coaching." },
      { q: "Are educational services exempt from GST?", a: "Services by a recognised educational institution to its students are largely exempt, but private coaching and commercial training are generally taxable. The exemption is narrow, so check with a professional if you are unsure." },
      { q: "Can I use this as a fee receipt?", a: "Yes. Fill in the student and the month, mark the date paid in the notes, and download the PDF. If you are unregistered, keep GST at 0% and avoid the words \"Tax Invoice\" in your notes." },
    ],
    example: {
      sellerName: "Sharma Maths Academy",
      sellerAddress: "C-45, Lajpat Nagar II, New Delhi 110024",
      sellerStateCode: "07",
      buyerName: "Mr. Vikram Shah (parent of Aarav Shah)",
      buyerAddress: "D-12, Greater Kailash I, New Delhi 110048",
      buyerStateCode: "07",
      items: [
        { description: "Class 10 Maths – weekday batch fee, November 2026", hsn: "999293", qty: 1, rate: 4500, gstRate: 18 },
        { description: "Board exam test series (6 papers)", hsn: "999293", qty: 1, rate: 1500, gstRate: 18 },
      ],
      notes: "Pay by UPI and mention the invoice number. Fees are non-refundable once the month begins.",
    },
    blog: ["do-freelancers-need-gst-registration-india", "invoice-payment-terms-and-late-payments", "what-is-a-gst-invoice-mandatory-fields"],
    related: ["consultant", "translator", "content-writer"],
  },
  {
    slug: "social-media-manager",
    name: "Social Media Manager",
    title: "Social Media Manager Invoice Template with GST | BillBuddy",
    description:
      "Free GST invoice template for social media managers and digital marketers: monthly retainers, ad spend pass-through and SAC 998361. Download as PDF.",
    h1: "GST invoice template for social media managers",
    intro: [
      "A social media manager's invoice has a trap that most templates ignore: ad spend. When you run paid campaigns, the client's money flows through your account to Meta or Google, and how you show it on the invoice decides whether you pay GST on rupees that were never yours.",
      "This template separates three things: your management retainer, creative production, and ad spend billed as a pass-through at actuals. Services are billed under SAC 998361 (advertising services) at 18%. The layout lets you attach the platform invoice for the pass-through so the client's auditor sees the full picture.",
    ],
    sac: [
      { code: "998361", label: "Advertising services (social media management, campaign management)" },
      { code: "998365", label: "Sale of internet advertising space, if you resell ad inventory" },
      { code: "998391", label: "Specialty design services, for creatives billed separately" },
    ],
    tips: [
      { title: "Keep ad spend off your fee", text: "Show ad spend as a separate reimbursement line with the platform's invoice attached. Meta and Google bill the client's account or yours, and the documentation decides who owes GST on it." },
      { title: "Define the retainer scope", text: "\"20 posts, 8 stories, 4 reels, weekly report\" on the invoice is a promise you can point to. Without it, retainers slowly grow." },
      { title: "Report with the invoice", text: "Attach a one-page monthly report. Clients who see results pay faster, and the invoice becomes an easy approval instead of a debate." },
      { title: "Bill ahead of the month", text: "Retainers should be invoiced at the start of the month they cover. Billing in arrears hands the client an automatic 30-day interest-free loan." },
    ],
    billing:
      "Monthly retainers dominate this trade, usually ₹15,000 to ₹1,50,000 depending on channels and volume. Paid media is billed as ad spend plus a management fee of 10–20%, or as a flat fee. The retainer is invoiced in advance and ad spend at actuals.",
    faqs: [
      { q: "How should I invoice ad spend on a GST invoice?", a: "Treat it as a pass-through only when you act as a pure agent: the platform bills the client's own ad account, you do not take title and you show the amount at actuals. If you buy the ads in your own name and resell, GST is generally due on the full amount." },
      { q: "What is the GST rate on social media management?", a: "Social media and digital marketing services are taxed at 18%. They are normally billed under SAC 998361." },
      { q: "Can I bill a foreign brand for managing their India pages?", a: "Often yes as an export of services, provided the client is outside India, the service is not provided within India for a recipient located there, and you receive payment in convertible foreign exchange. Take advice for each arrangement." },
    ],
    example: {
      sellerName: "Loop & Learn Digital",
      sellerAddress: "SCO 18, Sector 17, Chandigarh 160017",
      sellerStateCode: "04",
      buyerName: "UrbanBites Cloud Kitchens",
      buyerAddress: "MG Road, Gurugram 122002",
      buyerStateCode: "06",
      items: [
        { description: "Social media management retainer – November 2026 (20 posts, 8 stories, 4 reels)", hsn: "998361", qty: 1, rate: 38000, gstRate: 18 },
        { description: "Paid campaign management fee (15% of spend)", hsn: "998361", qty: 1, rate: 6000, gstRate: 18 },
        { description: "Reel shoot and production, half day", hsn: "998361", qty: 1, rate: 9000, gstRate: 18 },
      ],
      notes: "Ad spend of ₹40,000 is billed directly by Meta to the client's ad account and is not part of this invoice.",
    },
    blog: ["invoice-payment-terms-and-late-payments", "hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies"],
    related: ["seo-specialist", "content-writer", "graphic-designer", "digital-marketing-agency"],
  },
  {
    slug: "seo-specialist",
    name: "SEO Specialist",
    title: "SEO Specialist Invoice Template with GST (Free PDF) | BillBuddy",
    description:
      "Free GST invoice template for SEO freelancers and consultants: audits, monthly retainers and link-building lines with SAC 998361. Download PDF.",
    h1: "GST invoice template for SEO specialists",
    intro: [
      "SEO is billed in awkward units. There is a one-off audit, an ongoing retainer, sometimes content and links bought on the client's behalf, and results that take months to show. A client who is paying every month for an invisible improvement needs the invoice to show real, countable work.",
      "This template splits an engagement into an audit, a monthly retainer with a list of deliverables, and third-party costs such as tools or outreach. It uses SAC 998361 (advertising services) at 18%, which is the common home for digital marketing work, with consulting lines under 998312 where appropriate.",
    ],
    sac: [
      { code: "998361", label: "Advertising and digital marketing services (SEO retainers)" },
      { code: "998312", label: "Business consulting services, for strategy-only audits" },
      { code: "998313", label: "IT consulting and support, for technical SEO implementation" },
    ],
    tips: [
      { title: "Describe deliverables, not outcomes", text: "You control audits, fixes, pages and links, not Google's rankings. Write what was delivered (\"12 pages optimised, 8 links built, technical fixes\") and leave rank promises out of every document." },
      { title: "Separate the audit", text: "A one-time audit is a distinct supply from a retainer. Give it its own invoice or line so a client cannot treat it as month one of free ongoing work." },
      { title: "Show tool costs honestly", text: "Rank trackers and crawler licences are your cost of business. If you pass them through, say so, but do not call your own subscription a client expense unless the contract says it is." },
      { title: "Date the retainer period", text: "Print the month the retainer covers. When a client pauses and later resumes, dated invoices make the history unambiguous." },
    ],
    billing:
      "Audits are priced as one-off projects, ongoing SEO as a monthly retainer, and content or link work per piece. Minimum engagement periods of three to six months are common because results take time, and billing in advance keeps cash flow safe.",
    faqs: [
      { q: "Is SEO a taxable service under GST?", a: "Yes, SEO and digital marketing are taxable at 18%, typically under SAC 998361 for advertising services, once you are registered for GST." },
      { q: "Can I show link-building costs as a pass-through?", a: "Only if you buy on the client's behalf, with their authority, at cost and with supporting invoices. Otherwise it is part of your overall service and should be included in your fee and taxed with it." },
      { q: "How do I invoice an overseas agency that white-labels my work?", a: "That is typically an export of services when the agency is outside India and pays in foreign exchange. You can issue the invoice without IGST under LUT and report it as zero-rated in GSTR-1." },
    ],
    example: {
      sellerName: "Ranking Ridge Consulting",
      sellerAddress: "Plot 7, Vastrapur, Ahmedabad 380015",
      sellerStateCode: "24",
      buyerName: "CasaNova Furniture Pvt Ltd",
      buyerAddress: "Andheri West, Mumbai 400053",
      buyerStateCode: "27",
      items: [
        { description: "Technical SEO audit (site crawl, speed, indexing, schema)", hsn: "998312", qty: 1, rate: 25000, gstRate: 18 },
        { description: "SEO retainer – November 2026: 4 content pages, 6 links, monthly report", hsn: "998361", qty: 1, rate: 35000, gstRate: 18 },
        { description: "Keyword research tool licence share (at cost)", hsn: "998361", qty: 1, rate: 2500, gstRate: 18 },
      ],
      notes: "Retainer billed monthly in advance. Rankings are influenced by many factors outside our control.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "invoice-for-international-clients-lut-export-of-services", "invoice-payment-terms-and-late-payments"],
    related: ["social-media-manager", "content-writer", "web-developer", "digital-marketing-agency"],
  },
  {
    slug: "ui-ux-designer",
    name: "UI/UX Designer",
    title: "UI/UX Designer Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice template for UI/UX designers: research, wireframes, prototypes and design-system lines with SAC 998314. Download as a PDF.",
    h1: "GST invoice template for UI/UX designers",
    intro: [
      "UX work happens in phases (research, flows, wireframes, visual design, handoff), and clients often want to pay phase by phase. An invoice that mirrors those phases lets a product manager approve it without a call, because each line matches a deliverable they remember seeing in Figma.",
      "This template is built around a phased product design engagement, with a separate line for a design-system build and an hourly line for post-handoff support. It uses SAC 998314 (IT design and development services) at 18%, which most software-facing design work falls under.",
    ],
    sac: [
      { code: "998314", label: "IT design and development services (product, app and web UI/UX)" },
      { code: "998391", label: "Specialty design services, for non-software design" },
      { code: "998312", label: "Business consulting, for research-heavy strategy work" },
    ],
    tips: [
      { title: "Bill by phase", text: "Invoice discovery, wireframes and UI separately and tie each to a Figma link or file version. Phase-wise billing also aligns with how startups release budget." },
      { title: "Make handoff a line item", text: "Developer handoff, spec notes and design QA take real time. Listing them stops them being treated as free." },
      { title: "Separate the design system", text: "A component library is an asset the client will use for years. Price it on its own and note whether you are transferring ownership or licensing it." },
      { title: "Include research costs", text: "User-testing incentives and recruiting panels are real costs. Show them as at-cost lines with receipts when you advance them." },
    ],
    billing:
      "Product design is billed per phase on fixed scopes, by the day for embedded work with a product team, or as a monthly retainer for continuous design. Startups often prefer milestone invoices tied to sprint demos.",
    faqs: [
      { q: "Which SAC code applies to UI/UX design?", a: "Design of apps and websites is generally billed under SAC 998314, IT design and development services, at 18%. Non-digital specialty design, like print and packaging, falls under 998391." },
      { q: "Do I charge IGST or CGST+SGST for a client in another state?", a: "Another state means IGST, the same state means CGST plus SGST. For B2B services the place of supply is normally the location of the client as shown on their GSTIN. Use the client's registered address from the right GSTIN." },
      { q: "Should I mention who owns the Figma files?", a: "Yes. A short line such as \"Source files transferred on full payment\" or \"Licence for use within this product only\" on the invoice or notes clears up ownership before there's a dispute." },
    ],
    example: {
      sellerName: "Studio Tanvi Iyer",
      sellerAddress: "HSR Layout Sector 2, Bengaluru 560102",
      sellerStateCode: "29",
      buyerName: "Zenpay Fintech Solutions Pvt Ltd",
      buyerAddress: "BKC, Bandra East, Mumbai 400051",
      buyerStateCode: "27",
      items: [
        { description: "Phase 1 – User research and flows (12 interviews, synthesis)", hsn: "998314", qty: 1, rate: 55000, gstRate: 18 },
        { description: "Phase 2 – Wireframes and clickable prototype (22 screens)", hsn: "998314", qty: 1, rate: 70000, gstRate: 18 },
        { description: "Design system starter kit (Figma components)", hsn: "998314", qty: 1, rate: 30000, gstRate: 18 },
        { description: "Developer handoff support", hsn: "998314", qty: 8, rate: 1800, gstRate: 18 },
      ],
      notes: "Phase 3 (visual design) to be invoiced on approval of the prototype.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies", "invoice-for-international-clients-lut-export-of-services"],
    related: ["web-developer", "app-developer", "graphic-designer"],
  },
  {
    slug: "translator",
    name: "Translator",
    title: "Translator Invoice Template with GST (Free PDF) | BillBuddy",
    description:
      "Free GST invoice template for freelance translators and interpreters in India. Per-word, per-page and session lines with SAC 998395. Download PDF.",
    h1: "GST invoice template for translators and interpreters",
    intro: [
      "Translators price by units that other freelancers never see: source words, target words, pages, minutes of audio, hours of interpreting. Clients often want the invoice to repeat the unit and the language pair exactly as it was agreed, because translation agencies reconcile them against their own project sheets.",
      "This template lists each language pair with its word count and rate, plus lines for certified translation and for interpreting sessions. It uses SAC 998395 (translation and interpretation services) at 18%, and leaves room for a project code, which agencies and legal clients nearly always ask for.",
    ],
    sac: [
      { code: "998395", label: "Translation and interpretation services" },
      { code: "998399", label: "Other professional services, e.g. localisation consulting" },
    ],
    tips: [
      { title: "Print the language pair and word count", text: "\"English → Hindi, 4,200 source words\" ends any later debate about volume. Note whether the count was the source or the target text." },
      { title: "Price certification separately", text: "Certified or notarised translations carry responsibility and sometimes cost (stamp paper, notary fees). Show them as separate lines with receipts for out-of-pocket items." },
      { title: "Add a project code", text: "Agencies match invoices to project IDs. A missing code is the most common reason a translation invoice sits unpaid for weeks." },
      { title: "Mention a minimum fee", text: "Short documents cost the same time to set up as long ones. State a minimum charge on the invoice and in your rate card." },
    ],
    billing:
      "Per-word rates range from about ₹0.80 for common pairs to far higher for specialist or rare languages. Interpreters bill per hour or per half-day. Agencies often pay 30–60 days after invoice, so ask for terms in writing before starting.",
    faqs: [
      { q: "What is the SAC code for translation services?", a: "Translation and interpretation sit under SAC 998395, taxed at 18%. If you work through an agency, you still issue your own invoice to them under the same code." },
      { q: "Do I need GST if all my clients are agencies abroad?", a: "Your turnover from export of services counts toward the ₹20 lakh threshold, so you may need to register. After registering you can bill foreign clients without GST under a Letter of Undertaking." },
      { q: "Can I invoice in a foreign currency?", a: "Yes, but a tax invoice for GST purposes must show the value in rupees too. Add the exchange rate used and the date in the notes so the figures can be reproduced." },
    ],
    example: {
      sellerName: "Lingua Bridge Translations",
      sellerAddress: "22 Park Street, Kolkata 700016",
      sellerStateCode: "19",
      buyerName: "Orion Legal Services LLP",
      buyerAddress: "Connaught Place, New Delhi 110001",
      buyerStateCode: "07",
      items: [
        { description: "English → Bengali legal translation, 6,400 source words (Project OL-2291)", hsn: "998395", qty: 6400, rate: 1.6, gstRate: 18 },
        { description: "Certified translation fee, 3 documents", hsn: "998395", qty: 3, rate: 500, gstRate: 18 },
        { description: "Court-side interpreting, half-day", hsn: "998395", qty: 1, rate: 7000, gstRate: 18 },
      ],
      notes: "Minimum charge of ₹800 per document applies. Notary charges billed at actuals.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "hsn-vs-sac-codes-practical-guide", "do-freelancers-need-gst-registration-india"],
    related: ["content-writer", "voice-over-artist", "tutor"],
  },
  {
    slug: "voice-over-artist",
    name: "Voice-Over Artist",
    title: "Voice-Over Artist Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice template for voice-over artists and dubbing talent in India: per-finished-minute rates, usage and studio session lines. Download PDF.",
    h1: "GST invoice template for voice-over artists",
    intro: [
      "Voice work is paid for two different things, and a good invoice keeps them apart: the recording session (your time and studio) and the usage of the recording (where it plays, in which medium and for how long). A 30-second radio spot and a perpetual online licence are not the same product, and the price should differ.",
      "This template has a line for the session, a line for usage with the term written out, and an optional line for studio time if you record at a facility. Audio production services are commonly billed at 18%, and many artists use the audiovisual production heading, SAC 999612, with a note on usage.",
    ],
    sac: [
      { code: "999612", label: "Audiovisual production services (voice recording, dubbing)" },
      { code: "999613", label: "Audiovisual post-production services (audio editing, mastering)" },
      { code: "998361", label: "Advertising services, for commercial and ad voice work" },
    ],
    tips: [
      { title: "State the usage in the description", text: "\"Radio and online, India, 6 months, 30-second spot\" is the single most valuable line on a voice invoice. It defines what the client may do and when they must pay again." },
      { title: "Charge per finished minute", text: "Narration and e-learning pay per finished minute, not per hour in the booth. Record the final duration so the invoice matches the delivered audio." },
      { title: "Cover pick-ups", text: "Pick-ups after the first delivery are common. Allow one free round and bill the rest as a per-session fee." },
      { title: "Note studio costs", text: "If you rent a studio and the client pays, show the studio line separately with its own invoice attached so it is not mistaken for your fee." },
    ],
    billing:
      "Commercials and ads are priced per spot with usage terms and a buyout option. Narration, audiobooks and e-learning are priced per finished minute or per finished hour. Dubbing work is often per character or per session.",
    faqs: [
      { q: "Which SAC code should a voice-over artist use?", a: "There is no single code. Audio recording and dubbing are commonly billed under audiovisual production services (999612), and post-production under 999613. A CA can confirm which fits your arrangement." },
      { q: "Do I charge GST on royalties or repeat usage fees?", a: "Where payments are for a supply of services, GST applies at the applicable rate. Repeat usage fees from a registered business should appear on a tax invoice, even when the first fee has already been billed." },
      { q: "What if the client wants a buyout?", a: "Price it as a separate line and describe it clearly (\"All media, worldwide, perpetual\"). Buyouts are typically several times the standard session rate." },
    ],
    example: {
      sellerName: "Arjun Voiceworks",
      sellerAddress: "Versova, Andheri West, Mumbai 400061",
      sellerStateCode: "27",
      buyerName: "Frameshift Animation Pvt Ltd",
      buyerAddress: "Kondapur, Hyderabad 500084",
      buyerStateCode: "36",
      items: [
        { description: "Hindi narration, e-learning module 1 (22 finished minutes)", hsn: "999612", qty: 22, rate: 2200, gstRate: 18 },
        { description: "Usage licence: online, India, 12 months", hsn: "999612", qty: 1, rate: 15000, gstRate: 18 },
        { description: "Pick-up session, 30 minutes", hsn: "999613", qty: 1, rate: 2500, gstRate: 18 },
      ],
      notes: "Audio delivered as WAV 48 kHz / 24-bit. Usage beyond 12 months to be renewed at 40% of the original fee.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "invoice-payment-terms-and-late-payments", "invoice-for-international-clients-lut-export-of-services"],
    related: ["video-editor", "translator", "content-writer"],
  },
  {
    slug: "interior-designer",
    name: "Interior Designer",
    title: "Interior Designer Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice template for interior designers in India: design fees, site supervision and procurement lines with SAC 998391 and goods HSN. Download PDF.",
    h1: "GST invoice template for interior designers",
    intro: [
      "An interior designer's invoice is a mixed supply in disguise. Your design fee is a service, the furniture and fittings you buy are goods, and the site supervision and project management that bind them together are another service. Putting it all in one \"Interior project – ₹12,00,000\" line is the quickest way to get a GST query.",
      "This template separates design fees (SAC 998391, 18%), site supervision, and procured items with their own HSN codes and rates. That structure shows the client what they paid for, and gives you the right tax on each part. If you bill only your own design charges and the client buys materials directly, drop the goods lines.",
    ],
    sac: [
      { code: "998391", label: "Specialty design services including interior design" },
      { code: "998321", label: "Architectural services, if you also deliver architecture" },
      { code: "9403", label: "HSN for furniture, if you supply furniture as goods" },
      { code: "9405", label: "HSN for lighting fittings and fixtures" },
    ],
    tips: [
      { title: "Split services from goods", text: "Each supply has its own GST rate. Splitting them avoids charging the wrong rate on the wrong thing and makes input credit cleaner for business clients." },
      { title: "Bill design fees in stages", text: "Concept, detailed drawings and execution drawings each deserve a stage invoice. A client who pays at each stage will not hold back a large final payment." },
      { title: "Procurement margins need care", text: "If you buy for the client and charge a margin, the full resale value is your supply. If you earn a commission from vendors, the commission is a separate taxable service." },
      { title: "Attach vendor invoices to reimbursements", text: "Anything you pay on the client's behalf and bill at cost should be supported by the vendor's invoice in the client's name." },
    ],
    billing:
      "Interior designers bill either a percentage of project cost (typically 8–15%), a per-square-foot rate, or a fixed fee, paid in stages: booking, concept approval, drawings, execution and handover. Procurement is usually quoted separately.",
    faqs: [
      { q: "What GST rate applies to interior design services?", a: "Interior design and decoration fees are taxed at 18% under SAC 998391. Goods you supply, such as furniture or lighting, are taxed at their own rates based on HSN." },
      { q: "Is a design-and-supply contract treated as one supply?", a: "It can be treated as a composite or mixed supply, depending on how the work is contracted. The safer course for most freelancers is to show services and goods separately with the correct rates." },
      { q: "How do I invoice stage payments?", a: "Raise a tax invoice for each stage when the stage is complete or the advance is received, referencing the total contract value and the stage percentage in the description." },
    ],
    example: {
      sellerName: "Studio Ishani Interiors",
      sellerAddress: "Sector 15, Gurugram 122001",
      sellerStateCode: "06",
      buyerName: "Mr. & Mrs. Dhillon",
      buyerAddress: "Model Town, Ludhiana 141002",
      buyerStateCode: "03",
      items: [
        { description: "Interior design – concept and detailed drawings (stage 2 of 4)", hsn: "998391", qty: 1, rate: 120000, gstRate: 18 },
        { description: "Site supervision, 6 visits", hsn: "998391", qty: 6, rate: 4000, gstRate: 18 },
        { description: "Custom wardrobe unit, supplied (HSN 9403)", hsn: "9403", qty: 1, rate: 85000, gstRate: 18 },
      ],
      notes: "Stage 3 (execution drawings) to be invoiced on approval. Vendor invoices attached for reimbursements.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies", "invoice-payment-terms-and-late-payments"],
    related: ["graphic-designer", "event-planner", "photographer"],
  },
  {
    slug: "event-planner",
    name: "Event Planner",
    title: "Event Planner Invoice Template with GST (Free PDF) | BillBuddy",
    description:
      "Free GST invoice template for event planners and wedding planners in India: planning fees, vendor pass-throughs and advances with SAC 998596. Download PDF.",
    h1: "GST invoice template for event planners",
    intro: [
      "An event planner sits between the client and a dozen vendors. Caterers, decorators, venues and artists all want paying, and the client may pay you or the vendors directly. How the invoice shows that money decides which parts of it are your income, which is the part GST is charged on.",
      "This template separates your planning and coordination fee, vendor costs you pay and recover at actuals, and your own services such as on-site management. Event management is billed under SAC 998596 at 18%. The notes field is set up for the payment schedule, since event money arrives in stages.",
    ],
    sac: [
      { code: "998596", label: "Event planning, organisation and management services" },
      { code: "998383", label: "Event photography and videography, if you resell it" },
      { code: "997212", label: "Rental of commercial or event spaces, if you sublease the venue" },
    ],
    tips: [
      { title: "Decide how vendors are billed", text: "Either vendors invoice the client directly and you bill only your fee, or you buy and resell. The second route puts the full amount in your turnover. The first is cleaner for planners with large budgets." },
      { title: "Keep a payment schedule", text: "A 30/40/30 or 50/50 schedule printed on the invoice, with dates, makes every follow-up polite and factual." },
      { title: "Add a contingency line", text: "Events overrun. A clearly named contingency (say 5%) in the contract and on the invoice stops a surprise at the end." },
      { title: "Write the event date and venue", text: "These matter for GST place of supply and for the client's records. Print them near the top of the invoice." },
    ],
    billing:
      "Planners charge a flat fee, a percentage of total event budget (10–20%), or an hourly fee for smaller events. Advance payments of 30–50% at booking are standard, with the balance due before the event.",
    faqs: [
      { q: "What is the SAC code for event management?", a: "Event planning and management services are classified under SAC 998596, taxed at 18% GST." },
      { q: "Do I charge GST on the vendors' costs I pass on?", a: "If you act as a pure agent, with vendors invoicing the client directly or the costs shown at actuals with documents, they can be excluded. If you resell vendor services as your own, GST applies to the full value." },
      { q: "Where is the place of supply for an event in another state?", a: "For event services supplied to a registered person, place of supply is generally the location of the recipient. For services to unregistered persons, it is often the place of the event. Check both before choosing CGST+SGST or IGST." },
    ],
    example: {
      sellerName: "Utsav Events & Weddings",
      sellerAddress: "Malviya Nagar, Jaipur 302017",
      sellerStateCode: "08",
      buyerName: "Mehra Family Wedding",
      buyerAddress: "Vasant Vihar, New Delhi 110057",
      buyerStateCode: "07",
      items: [
        { description: "Wedding planning and coordination fee – 3 days (Udaipur, 14–16 Dec)", hsn: "998596", qty: 1, rate: 250000, gstRate: 18 },
        { description: "On-site management team, 3 days × 4 staff", hsn: "998596", qty: 12, rate: 2500, gstRate: 18 },
        { description: "Décor concept and supervision", hsn: "998596", qty: 1, rate: 60000, gstRate: 18 },
      ],
      notes: "Payment schedule: 40% booking (paid), 40% on 15 Nov, 20% on 5 Dec. Vendor invoices are addressed directly to the client.",
    },
    blog: ["invoice-payment-terms-and-late-payments", "cgst-sgst-igst-when-each-applies", "what-is-a-gst-invoice-mandatory-fields"],
    related: ["photographer", "interior-designer", "consultant"],
  },
  {
    slug: "virtual-assistant",
    name: "Virtual Assistant",
    title: "Virtual Assistant Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice template for virtual assistants and remote support freelancers in India: hourly blocks, monthly retainers and export billing. Download PDF.",
    h1: "GST invoice template for virtual assistants",
    intro: [
      "Virtual assistants often work for overseas founders, which brings two issues to the invoice at once: how to show hours (clients love timesheets) and how to treat GST on a foreign client. Getting the second wrong can mean paying 18% tax out of your own pocket on income that qualifies as an export.",
      "This template includes an hourly-block line, a retainer line and a place for the timesheet reference. Administrative and support services are generally billed at 18% under SAC 998599, and for clients outside India you can zero-rate the invoice under a Letter of Undertaking once you are GST-registered.",
    ],
    sac: [
      { code: "998599", label: "Other support services n.e.c. (admin, scheduling, data entry, research)" },
      { code: "998595", label: "Telephone-based support services, for call and inbox handling" },
      { code: "998313", label: "IT consulting and support, for tech-heavy assistance" },
    ],
    tips: [
      { title: "Attach the timesheet", text: "Hourly clients want to see where each hour went. A weekly summary attached to the invoice, with the invoice listing total hours and rate, avoids line-by-line queries." },
      { title: "Note the currency and rate", text: "For overseas clients, show the amount in their currency and the rupee equivalent at the day's rate. Record which rate source you used." },
      { title: "Quote a minimum monthly commitment", text: "A retainer of 40 hours a month at a fixed rate is steadier than invoicing whatever hours were used. Say whether unused hours roll over." },
      { title: "Use bank transfers that issue FIRC", text: "Platforms like wire transfers give you a foreign inward remittance certificate, which is the proof that your export income came in foreign exchange." },
    ],
    billing:
      "VAs bill hourly (₹300–₹1,200 an hour depending on skill) or on monthly retainers of fixed hours. Overseas clients typically pay in USD, GBP or AUD via bank transfer or platforms, usually monthly in arrears.",
    faqs: [
      { q: "Is a virtual assistant's work to a foreign client an export?", a: "Usually yes: when the recipient is outside India, the payment is in convertible foreign exchange, and the place of supply is outside India. It can then be zero-rated under LUT. Take advice if your client has an Indian presence." },
      { q: "What if I am not registered for GST?", a: "You can invoice without GST below the threshold, but note that export income counts toward ₹20 lakh. Many VAs register voluntarily to be able to zero-rate and claim refunds on input tax." },
      { q: "How should I show hourly billing?", a: "List the total hours as the quantity and your hourly rate as the rate, and refer to the attached timesheet. Keep the timesheet for your records for at least six years." },
    ],
    example: {
      sellerName: "Neha Bansal Virtual Support",
      sellerAddress: "Malviya Nagar, Jaipur 302017",
      sellerStateCode: "08",
      buyerName: "Sunrise Consulting Pvt Ltd",
      buyerAddress: "Salt Lake Sector V, Kolkata 700091",
      buyerStateCode: "19",
      items: [
        { description: "Executive assistance – scheduling, inbox, travel (hours as per timesheet)", hsn: "998599", qty: 60, rate: 600, gstRate: 18 },
        { description: "Market research report – competitor pricing", hsn: "998599", qty: 1, rate: 6000, gstRate: 18 },
      ],
      notes: "Timesheet for November attached. Retainer is 60 hours per month; unused hours do not roll over.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "do-freelancers-need-gst-registration-india", "invoice-payment-terms-and-late-payments"],
    related: ["consultant", "content-writer", "translator"],
  },
  {
    slug: "app-developer",
    name: "App Developer",
    title: "Mobile App Developer Invoice Template with GST (Free) | BillBuddy",
    description:
      "Free GST invoice template for freelance Android and iOS app developers: sprint billing, app store fees and maintenance with SAC 998314. Download PDF.",
    h1: "GST invoice template for app developers",
    intro: [
      "App projects are long, with releases, store reviews and bugs that appear the week after launch. Clients paying for months of development want an invoice that shows progress through sprints and releases, not just a single big number. Developers want the maintenance period after launch to be billed properly rather than quietly absorbed.",
      "This template is set up for sprint-based billing, a launch milestone and a post-launch maintenance line. App development is billed under SAC 998314 (IT design and development services) at 18%. App store developer fees and cloud costs are handled as separate lines so they never get lost inside the project fee.",
    ],
    sac: [
      { code: "998314", label: "IT design and development services (Android, iOS, cross-platform apps)" },
      { code: "998313", label: "IT consulting and support (maintenance and retainers)" },
      { code: "998315", label: "Hosting and IT infrastructure, when you resell backend infrastructure" },
    ],
    tips: [
      { title: "Tie billing to releases", text: "Invoice on build milestones, such as the internal alpha, beta and store release. Each is a clear, demonstrable event that the client can verify." },
      { title: "List store and cloud costs separately", text: "Apple and Google developer accounts, push services and cloud hosting should be on their own lines. If the client owns the accounts, make sure the contract says so." },
      { title: "Price the warranty window", text: "A 30-day bug-fix period after launch is common. Say it is included, and bill maintenance after that as a monthly line." },
      { title: "Name the platforms", text: "\"Android + iOS (Flutter)\" in the description tells everyone what was delivered, and later helps you scope upgrades and new OS support." },
    ],
    billing:
      "Typical arrangements are fixed-price with milestone payments (30/40/30), time-and-materials by the sprint, or monthly dedicated-developer retainers for long engagements. Maintenance is usually 10–20% of the build cost per year.",
    faqs: [
      { q: "What SAC code applies to mobile app development?", a: "Custom mobile app development falls under SAC 998314 at 18% GST. Maintenance and support are usually 998313." },
      { q: "Do I pay GST on app store revenue?", a: "That depends on the arrangement. If you earn from your own apps through app stores, the platforms handle GST on their side for Indian users, while you handle your own obligations. For client work, the client's invoice is what matters here." },
      { q: "Can I invoice in advance for the next sprint?", a: "Yes. GST is due when you receive the advance or issue the invoice, whichever is earlier, so issue the tax invoice for the sprint at the start and file it in that month's return." },
    ],
    example: {
      sellerName: "Appcraft Labs",
      sellerAddress: "Anna Nagar West, Chennai 600040",
      sellerStateCode: "33",
      buyerName: "FreshCart Retail Pvt Ltd",
      buyerAddress: "Whitefield, Bengaluru 560066",
      buyerStateCode: "29",
      items: [
        { description: "Android + iOS app (Flutter) – sprints 5 and 6, ordering and payments", hsn: "998314", qty: 2, rate: 95000, gstRate: 18 },
        { description: "App Store / Play Store release and review handling", hsn: "998314", qty: 1, rate: 15000, gstRate: 18 },
        { description: "Cloud hosting setup and CI pipeline", hsn: "998315", qty: 1, rate: 12000, gstRate: 18 },
      ],
      notes: "30-day post-launch bug-fix window included. Maintenance retainer to follow at ₹25,000 per month.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies", "invoice-for-international-clients-lut-export-of-services"],
    related: ["web-developer", "ui-ux-designer", "consultant", "international-freelancer"],
  },
  {
    slug: "international-freelancer",
    name: "International Freelancer",
    title: "Export Invoice Template for Freelancers (LUT GST) | BillBuddy",
    description:
      "Free GST export invoice template for Indian freelancers billing international clients. Includes 0% zero-rated GST, LUT ARN format, and foreign currency notes.",
    h1: "GST export invoice template for international freelancers",
    intro: [
      "Billing overseas clients from India under GST is fundamentally different from domestic invoicing. If you provide software engineering, design, consulting, writing, or other professional services to clients outside India and receive payment in convertible foreign exchange, your services qualify as an 'export of services' under Section 2(6) of the IGST Act.",
      "Exports are treated as zero-rated supplies under Section 16 of the IGST Act. By filing a Letter of Undertaking (LUT) online in Form GST RFD-11 on the GST portal before issuing invoices, you can bill foreign clients at 0% GST without paying integrated tax upfront or claiming refunds. This template is preconfigured for export invoices with mandatory LUT ARN declarations, foreign currency conversion notes, and SAC 998314/998399.",
    ],
    sac: [
      { code: "998314", label: "IT design and development services for overseas software clients" },
      { code: "998399", label: "Other professional, technical and business services delivered internationally" },
      { code: "998365", label: "Digital advertising, lead generation and marketing services for offshore brands" },
    ],
    tips: [
      { title: "File your LUT before raising invoices", text: "Submit Form GST RFD-11 on the GST portal at the start of each financial year. An active Letter of Undertaking allows you to export services at 0% GST without paying IGST upfront." },
      { title: "State the mandatory LUT export declaration", text: "Every export invoice must include: 'Supply meant for export under Letter of Undertaking (LUT) without payment of integrated tax' along with your LUT ARN and financial year." },
      { title: "Obtain FIRC or e-BRC for every payment", text: "To legally qualify as an export under Section 2(6) of IGST Act, payment must be received in convertible foreign currency. Obtain a Foreign Inward Remittance Certificate (FIRC) or electronic Bank Realisation Certificate (e-BRC) from your bank or payment platform." },
      { title: "Record foreign currency and exchange rates", text: "Invoices can show the foreign currency agreed with the client (USD, EUR, GBP), but your books and GST filings (GSTR-1 Table 6A) must record the INR equivalent using the RBI or CBIC exchange rate on the invoice date." },
    ],
    billing:
      "Indian freelancers billing international clients commonly quote in foreign currency (USD, EUR, GBP) on hourly, weekly, or fixed milestone terms via wire transfer, Wise, Payoneer, or Stripe. Invoices must show 0% GST under an active LUT ARN, and inward remittance certificates should be filed systematically for GST compliance.",
    faqs: [
      { q: "Do I need to charge GST to international clients?", a: "No, provided your services satisfy the five conditions of 'export of services' under Section 2(6) of the IGST Act and you have filed a Letter of Undertaking (LUT). Under an active LUT, the supply is zero-rated at 0% GST." },
      { q: "What mandatory text must appear on an export invoice under LUT?", a: "You must include the declaration: 'Supply meant for export under Letter of Undertaking (LUT) without payment of integrated tax' together with your LUT ARN and the applicable financial year." },
      { q: "Is GST registration mandatory for freelance service exports?", a: "If your aggregate turnover across all supplies (domestic + export) is under ₹20 lakh (₹10 lakh in special category states), GST registration is not mandatory. However, to file an LUT and issue zero-rated export invoices formally, you need a GSTIN." },
      { q: "How do I report export invoices in GSTR-1?", a: "Report export invoices under Table 6A (Exports) of GSTR-1, selecting 'Zero Rated (Without Payment of Tax)' and quoting the invoice number, shipping bill/LUT details, and taxable value in INR." },
    ],
    example: {
      sellerName: "Astra Digital Solutions",
      sellerAddress: "88, 4th Cross, Koramangala 4th Block, Bengaluru 560034",
      sellerStateCode: "29",
      buyerName: "Acme Cloud Technologies Inc.",
      buyerAddress: "Suite 400, 100 Montgomery St, San Francisco, CA 94104, USA",
      buyerStateCode: "",
      items: [
        { description: "Full-stack web application engineering – Sprint 14 & 15 (export under LUT)", hsn: "998314", qty: 1, rate: 125000, gstRate: 0 },
        { description: "Cloud infrastructure automation & CI/CD deployment", hsn: "998313", qty: 1, rate: 45000, gstRate: 0 },
      ],
      notes: "Supply meant for export under Letter of Undertaking (LUT ARN: AD290325004812F) without payment of integrated tax. Total invoice: USD 2,000 equivalent to INR 1,70,000 at exchange rate ₹85.00/USD.",
      terms: "Payment via wire transfer within 15 days of invoice date. Inward remittance via SWIFT / FIRC.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "hsn-vs-sac-codes-practical-guide", "do-freelancers-need-gst-registration-india"],
    related: ["web-developer", "app-developer", "ui-ux-designer", "digital-marketing-agency"],
  },
  {
    slug: "digital-marketing-agency",
    name: "Digital Marketing Agency",
    title: "GST Invoice Template for Digital Marketing Agencies | BillBuddy",
    description:
      "Free GST invoice template for digital marketing agencies in India. Pre-configured with SAC 998361 & 998365, monthly retainers, and media spend disbursements.",
    h1: "GST invoice template for digital marketing agencies",
    intro: [
      "Running a digital marketing agency in India involves diverse revenue models: monthly management retainers, performance marketing fees, search engine optimization projects, and substantial client ad spends on platforms like Google Ads and Meta Ads. Invoicing these services under GST requires clear distinctions between agency fee revenue and client media disbursements.",
      "Under GST, digital marketing and advertising services fall under SAC 998361 (advertising services) and SAC 998365 (internet advertising and lead generation), attracting 18% GST. If your agency pays client ad spend directly, handling that disbursement as a 'pure agent' under Rule 33 prevents ad budgets from inflating your taxable agency turnover. This template formats retainers and disbursements cleanly.",
    ],
    sac: [
      { code: "998361", label: "Advertising services, creative campaign strategy and brand marketing" },
      { code: "998365", label: "Internet advertising services, PPC management and paid media campaign execution" },
      { code: "998363", label: "Sale of advertising space or time in print or digital media (agency commission)" },
      { code: "998314", label: "Website conversion rate optimization (CRO) and landing page development" },
    ],
    tips: [
      { title: "Separate management retainers from ad spend", text: "Never combine agency management fees with client media spend into a single lump sum. Bill agency service fees with 18% GST and treat client platform ad spend as a separate line item or direct client billing." },
      { title: "Document pure agent status for pass-through spend", text: "If you pay Meta or Google ad spend on behalf of a client, fulfill all Rule 33 pure-agent conditions: maintain written client authorization, recover only exact costs, and supply original vendor tax invoices." },
      { title: "Clearly specify monthly campaign periods", text: "Always state the billing period covered by the retainer (e.g., 'Performance Marketing Retainer – November 2026') to ensure timely GSTR-1 matching and prevent input tax credit disputes." },
      { title: "Distinguish SEO and creative retainers", text: "Itemize creative asset production, copywriting, and technical SEO audits under separate line items so client accounting teams can properly reconcile SAC codes and deduct accurate TDS under Section 194J or 194C." },
    ],
    billing:
      "Digital marketing agencies in India typically bill clients on monthly retainers payable in advance or net-15, plus milestone fees for creative campaign launches. Ad spend is ideally billed directly to client credit cards or handled via pure agent escrow agreements. Corporate clients deduct TDS at 10% (under Section 194J for technical/professional services) or 2% (under Section 194C for advertising contracts).",
    faqs: [
      { q: "Which SAC code applies to digital marketing agencies?", a: "Digital marketing agencies primarily use SAC 998361 (advertising services) for creative strategy and overall campaigns, and SAC 998365 for internet advertising, PPC management, and lead generation. Both carry an 18% GST rate." },
      { q: "How should an agency handle client ad spend under GST?", a: "The safest method is having clients pay ad platforms (Google, Meta) directly with their own GSTIN. If the agency pays on the client's behalf, you must act as a 'pure agent' under Rule 33 of CGST Rules, billing actual expenses at cost without GST, supported by platform invoices." },
      { q: "What TDS rate applies to digital marketing invoices?", a: "Clients typically deduct TDS under Section 194C (advertising contracts) at 2% for companies/firms (1% for individuals) or under Section 194J (technical/professional services) at 10% (or 2% for technical services). Clarify TDS classification in your master services agreement." },
      { q: "Do agencies charge GST on social media influencer management?", a: "Yes. Agency management fees attract 18% GST. If the agency contracts influencers directly, input tax credit (ITC) on influencer invoices can be claimed against output GST charged to the client." },
    ],
    example: {
      sellerName: "Elevate Media & Growth Labs",
      sellerAddress: "502, Lotus Grandeur, Veera Desai Road, Andheri West, Mumbai 400053",
      sellerStateCode: "27",
      buyerName: "FinScale Technologies Pvt Ltd",
      buyerAddress: "9th Floor, Cyber City, Tower B, DLF Phase 2, Gurugram 122002",
      buyerStateCode: "06",
      items: [
        { description: "Monthly performance marketing & paid media management (Google & Meta Ads – Nov 2026)", hsn: "998365", qty: 1, rate: 75000, gstRate: 18 },
        { description: "Social media content creation & creative asset pack (20 deliverables)", hsn: "998361", qty: 1, rate: 45000, gstRate: 18 },
        { description: "SEO & conversion rate optimization technical sprint", hsn: "998314", qty: 1, rate: 30000, gstRate: 18 },
      ],
      notes: "Client ad spend on Meta & Google Ads is billed directly to client corporate card and excluded from taxable fee value. TDS deductible as applicable under Section 194C/194J.",
      terms: "Payment due within 15 days of invoice date. 18% IGST applicable for inter-state service supply.",
    },
    blog: ["hsn-vs-sac-codes-practical-guide", "cgst-sgst-igst-when-each-applies", "invoice-payment-terms-and-late-payments"],
    related: ["social-media-manager", "seo-specialist", "content-writer", "international-freelancer"],
  },
];

export const getProfession = (slug: string) => professions.find((p) => p.slug === slug);
