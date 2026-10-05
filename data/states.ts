import type { ExampleInvoice } from "@/lib/invoice";
import type { Faq } from "@/lib/seo";

export interface StateGuide {
  slug: string;
  name: string;
  /** GST state code, which is also the first two digits of every GSTIN from the state */
  code: string;
  hubs: string[];
  /** a neighbouring or commonly-billed state used for the inter-state example */
  partner: { name: string; code: string };
  title: string;
  description: string;
  intro: string[];
  /** state-specific points that matter when invoicing */
  localPoints: { title: string; text: string }[];
  faqs: Faq[];
  example: ExampleInvoice;
  blog: string[];
}

export const stateGuides: StateGuide[] = [
  {
    slug: "maharashtra",
    name: "Maharashtra",
    code: "27",
    hubs: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    partner: { name: "Gujarat", code: "24" },
    title: "GST Invoice Format for Maharashtra (State Code 27) | BillBuddy",
    description:
      "GST invoice format for Maharashtra freelancers: state code 27, CGST+SGST vs IGST for Mumbai and Pune sellers, mandatory fields and a free generator.",
    intro: [
      "Maharashtra is where most Indian head offices live, which makes it the state where invoicing mistakes are most expensive. If you work from Pune or Nashik but your client is a Mumbai company, you are in the same state and charge CGST plus SGST. If that same company contracts you through its Bengaluru branch, the supply is inter-state and the right tax is IGST.",
      "Every GSTIN issued in Maharashtra begins with 27, and that two-digit prefix is what both you and your client's accounts team will use to decide the tax split. This page shows a ready-to-edit GST invoice for a Maharashtra seller, with the place-of-supply logic worked through for a Mumbai and an Ahmedabad client.",
    ],
    localPoints: [
      { title: "Which GSTIN do you bill?", text: "Large Mumbai companies often hold GSTINs in many states. For B2B services, bill the GSTIN of the office that placed the order, because that registration decides place of supply and whether CGST+SGST or IGST applies." },
      { title: "Mumbai clients, Pune seller", text: "Same state, so the tax is split into CGST and SGST (9% + 9% at the 18% slab). Both halves go to the Maharashtra government, which is why the buyer's state must match yours." },
      { title: "Registered office vs. service location", text: "The address printed on the client's GSTIN certificate is what counts for B2B services, not the building where you sit with the team. Ask for the certificate before issuing the first invoice." },
      { title: "Keep the 27 prefix visible", text: "Printing your full GSTIN with the 27 prefix at the top lets a client verify the registered state at a glance, and it is a mandatory field on a tax invoice anyway." },
    ],
    faqs: [
      { q: "What is the GST state code for Maharashtra?", a: "Maharashtra's GST state code is 27. Every Maharashtra GSTIN starts with 27, followed by the 10-character PAN of the taxpayer." },
      { q: "I'm in Pune and my client is in Mumbai. Do I charge IGST?", a: "No. Both are in Maharashtra, so it is an intra-state supply and you charge CGST and SGST at half the GST rate each." },
      { q: "My client is in Mumbai but the work is for their Delhi office. What tax applies?", a: "For B2B services, tax follows the location of the recipient on the invoice. If you invoice the Delhi GSTIN, you charge IGST. If you invoice the Mumbai GSTIN, you charge CGST+SGST. Raise the invoice to the entity that contracted and will pay." },
    ],
    example: {
      sellerName: "Sahyadri Digital Services",
      sellerAddress: "Office 4, Kothrud, Pune 411038",
      sellerStateCode: "27",
      buyerName: "Marine Line Logistics Pvt Ltd",
      buyerAddress: "Fort, Mumbai 400001",
      buyerStateCode: "27",
      items: [
        { description: "Website redesign – milestone 1", hsn: "998314", qty: 1, rate: 75000, gstRate: 18 },
        { description: "Annual maintenance retainer", hsn: "998313", qty: 1, rate: 24000, gstRate: 18 },
      ],
      notes: "Same-state supply: CGST + SGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "what-is-a-gst-invoice-mandatory-fields"],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    code: "29",
    hubs: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
    partner: { name: "Tamil Nadu", code: "33" },
    title: "GST Invoice Format for Karnataka (State Code 29) | BillBuddy",
    description:
      "GST invoice format for Karnataka freelancers in Bengaluru: state code 29, IGST on clients in Maharashtra or Tamil Nadu, SEZ rules and a free PDF tool.",
    intro: [
      "Bengaluru is full of freelancers and small studios selling services to clients in every other state, and most of those sales are inter-state. A Bengaluru developer billing a Mumbai start-up charges IGST, not CGST plus SGST, and the invoice needs to say so clearly. Only when the client is also registered in Karnataka does the tax split into CGST and SGST.",
      "Karnataka's GST state code is 29, so every GSTIN registered in the state starts with those digits. This guide walks through the Karnataka invoice with a Chennai client, so you can see exactly how IGST is shown, and what to change when the client is in Mysuru instead.",
    ],
    localPoints: [
      { title: "Most Bengaluru invoices are IGST", text: "Because many clients headquarter outside Karnataka, expect inter-state billing to be the norm. The invoice shows a single IGST line at the full rate (18% for most services) instead of two halves." },
      { title: "Start-ups with several GSTINs", text: "Funded start-ups often register in multiple states as they scale. Check which GSTIN the contract names. Billing the wrong one can force a credit note and a fresh invoice." },
      { title: "SEZ and STPI clients", text: "Supplies to a Special Economic Zone unit are treated as inter-state supplies and carry IGST, or can be zero-rated with a Letter of Undertaking, even if the SEZ sits in Karnataka. Confirm the client's SEZ endorsement." },
      { title: "Overseas clients are common", text: "Many Bengaluru freelancers bill US and UK customers. That is usually an export of services and can be zero-rated under LUT, but only once you hold a GST registration." },
    ],
    faqs: [
      { q: "What is the GST state code for Karnataka?", a: "Karnataka's code is 29. GSTINs issued in the state begin with 29." },
      { q: "I'm in Bengaluru and my client is in Chennai. Which tax applies?", a: "IGST, because Karnataka and Tamil Nadu are different states. Charge the full applicable rate as IGST and show it in a single line." },
      { q: "My client is a Bengaluru-based SEZ unit. Is it intra-state?", a: "No. Supply to an SEZ developer or unit is treated as an inter-state supply even when the SEZ is in the same state, so IGST (or zero-rating under LUT) applies." },
    ],
    example: {
      sellerName: "Bagmane Interactive Studio",
      sellerAddress: "HSR Layout, Bengaluru 560102",
      sellerStateCode: "29",
      buyerName: "Madras Textiles Exports Pvt Ltd",
      buyerAddress: "T. Nagar, Chennai 600017",
      buyerStateCode: "33",
      items: [
        { description: "Product catalogue web app – build phase 2", hsn: "998314", qty: 1, rate: 140000, gstRate: 18 },
        { description: "Hosting and CDN setup", hsn: "998315", qty: 1, rate: 8000, gstRate: 18 },
      ],
      notes: "Inter-state supply: IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "invoice-for-international-clients-lut-export-of-services"],
  },
  {
    slug: "delhi",
    name: "Delhi",
    code: "07",
    hubs: ["New Delhi", "South Delhi", "Dwarka", "Rohini"],
    partner: { name: "Haryana", code: "06" },
    title: "GST Invoice Format for Delhi (State Code 07) | BillBuddy",
    description:
      "GST invoice format for Delhi freelancers and small businesses: state code 07, CGST+SGST within Delhi, IGST for Gurugram and Noida. Free PDF generator.",
    intro: [
      "Delhi's tricky feature is geography. A freelancer in South Delhi can have clients in Gurugram, Noida and Faridabad, all within a short drive but each in a different state for GST purposes. A Delhi seller invoicing a Gurugram company is making an inter-state supply and must charge IGST, even though the client is a twenty-minute drive away.",
      "Delhi's GST state code is 07, and GSTINs issued here start with 07. The example on this page shows a Delhi seller billing a Haryana client with IGST applied, so the NCR boundary issue is visible on the actual invoice.",
    ],
    localPoints: [
      { title: "NCR means three states", text: "Delhi, Haryana (Gurugram, Faridabad) and Uttar Pradesh (Noida, Ghaziabad) are separate states under GST. A client's postal address in the \"NCR\" tells you nothing; their GSTIN prefix (07, 06 or 09) does." },
      { title: "Delhi has a legislature", text: "Delhi charges CGST and SGST like other states. Union territories without a legislature charge UTGST instead, which is why Chandigarh and Ladakh invoices look different." },
      { title: "Government and PSU clients", text: "Ministries and PSUs often insist on an invoice with the exact GSTIN of the paying office and a purchase-order number. Keep both on the invoice to avoid payment delays." },
      { title: "Many unregistered clients", text: "Small traders and individuals in Delhi may not have a GSTIN. That does not change the tax on a taxable service, but it does change place of supply rules for some services." },
    ],
    faqs: [
      { q: "What is Delhi's GST state code?", a: "The GST state code for Delhi is 07. All Delhi-registered GSTINs begin with 07." },
      { q: "I'm in Delhi and my client is in Gurugram. Is it CGST+SGST?", a: "No. Gurugram is in Haryana, so it is an inter-state supply and you charge IGST. Only clients with an address and GSTIN in Delhi qualify for CGST+SGST." },
      { q: "Do I charge UTGST in Delhi?", a: "No. Delhi is a union territory with a legislature, so CGST and SGST apply. UTGST is for union territories without legislatures, such as Chandigarh, Ladakh and Lakshadweep." },
    ],
    example: {
      sellerName: "Capital Creative Works",
      sellerAddress: "Hauz Khas, New Delhi 110016",
      sellerStateCode: "07",
      buyerName: "Millennium Fintech Pvt Ltd",
      buyerAddress: "Cyber City, Gurugram 122002",
      buyerStateCode: "06",
      items: [
        { description: "Brand refresh and pitch deck design", hsn: "998391", qty: 1, rate: 85000, gstRate: 18 },
        { description: "Explainer animation, 60 seconds", hsn: "999613", qty: 1, rate: 40000, gstRate: 18 },
      ],
      notes: "Delhi to Haryana: inter-state supply, IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "do-freelancers-need-gst-registration-india"],
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    code: "33",
    hubs: ["Chennai", "Coimbatore", "Madurai", "Tiruppur"],
    partner: { name: "Kerala", code: "32" },
    title: "GST Invoice Format for Tamil Nadu (State Code 33) | BillBuddy",
    description:
      "GST invoice format for Tamil Nadu sellers: state code 33, CGST+SGST for Chennai and Coimbatore, IGST to Kerala and Karnataka, and a free PDF generator.",
    intro: [
      "Tamil Nadu's economy is unusually spread out. Chennai runs services and IT, Coimbatore and Tiruppur run manufacturing and textiles, and Madurai supports a large regional trade. A freelancer serving small manufacturers often has clients who are micro or small enterprises, which makes payment timing as much a part of the invoice as the tax.",
      "Every GSTIN registered in Tamil Nadu starts with 33. This page covers the intra-state invoice (Chennai to Coimbatore, where CGST and SGST apply) with a note on payment terms for MSME clients. It also shows what changes when the client sits in neighbouring Kerala or Karnataka.",
    ],
    localPoints: [
      { title: "Intra-state is the common case", text: "With a large base of local manufacturers, much Tamil Nadu billing stays within the state. Expect CGST and SGST, each at half the total rate, shown as two lines." },
      { title: "MSME clients and the 45-day rule", text: "If your client is a micro or small enterprise buying services from you, the Income Tax Act's section 43B(h) pushes them to pay within 45 days to claim a deduction. Mention your payment terms and their Udyam number if relevant." },
      { title: "Textile and export clients", text: "Tiruppur and Coimbatore firms often export. They may ask you to quote taxes carefully so they can claim input credit, so keep the HSN/SAC code and their exact GSTIN on every invoice." },
      { title: "Local-language invoices", text: "You can write the description in Tamil, but keep the mandatory fields (GSTIN, HSN/SAC, tax lines, totals) in English or numerals that tax officers can read." },
    ],
    faqs: [
      { q: "What is the GST state code for Tamil Nadu?", a: "Tamil Nadu is state code 33, so every GSTIN registered in the state begins with 33." },
      { q: "I'm in Chennai and my client is in Coimbatore. Which GST applies?", a: "Both are in Tamil Nadu, so CGST and SGST apply, each at half the rate. At the 18% slab that is 9% CGST plus 9% SGST." },
      { q: "Does my MSME client have to pay me within 45 days?", a: "If you are the supplier and the client is a registered micro or small enterprise, the 45-day timeline in section 43B(h) of the Income Tax Act affects when the buyer can claim the expense. It is a tax deduction rule rather than a collection mechanism, but it motivates quicker payment." },
    ],
    example: {
      sellerName: "Kaveri Design & Print",
      sellerAddress: "Adyar, Chennai 600020",
      sellerStateCode: "33",
      buyerName: "Kongu Spinning Mills Pvt Ltd",
      buyerAddress: "Avinashi Road, Coimbatore 641018",
      buyerStateCode: "33",
      items: [
        { description: "Annual report design, 64 pages", hsn: "998391", qty: 1, rate: 95000, gstRate: 18 },
        { description: "Stationery set design (letterhead, card, envelope)", hsn: "998391", qty: 1, rate: 18000, gstRate: 18 },
      ],
      notes: "Payment due within 30 days of invoice date.",
    },
    blog: ["invoice-payment-terms-and-late-payments", "cgst-sgst-igst-when-each-applies"],
  },
  {
    slug: "telangana",
    name: "Telangana",
    code: "36",
    hubs: ["Hyderabad", "Secunderabad", "Warangal", "Karimnagar"],
    partner: { name: "Andhra Pradesh", code: "37" },
    title: "GST Invoice Format for Telangana (State Code 36) | BillBuddy",
    description:
      "GST invoice format for Telangana: state code 36, Hyderabad IT and startup invoicing, IGST to Andhra Pradesh clients, and how not to confuse codes 36 and 37.",
    intro: [
      "Hyderabad's HITEC City and Gachibowli generate an enormous amount of small-business software, design and consulting work. Telangana's own history leaves a trap for invoices, though: the state was split from Andhra Pradesh in 2014, and the two now have different GST codes, 36 for Telangana and 37 for Andhra Pradesh.",
      "A Hyderabad freelancer billing a Vijayawada client is making an inter-state supply and must charge IGST. A Hyderabad freelancer billing a Warangal client charges CGST and SGST. This page shows the Telangana to Andhra Pradesh case with IGST so the difference is visible, and lists what to check on your client's GSTIN before sending it.",
    ],
    localPoints: [
      { title: "36 is Telangana, 37 is Andhra", text: "Check the first two digits of the client's GSTIN. A company with a Hyderabad address but a GSTIN starting 37 is registered in Andhra Pradesh, and the supply would be inter-state." },
      { title: "Older GST documents", text: "Some old documents and templates show Andhra Pradesh's pre-split code, 28. Active GSTINs in Andhra Pradesh now start with 37, so avoid copying code 28 from a legacy invoice." },
      { title: "Start-up client invoices", text: "Funded start-ups in Hyderabad often ask for payment against a monthly purchase order. Put the PO number and the billing period on the invoice to avoid a hold in their accounts payable cycle." },
      { title: "SEZ and IT park clients", text: "If your client is a unit in an SEZ, supply is inter-state for GST purposes and IGST or zero-rating under LUT applies, even when the park is minutes from your home." },
    ],
    faqs: [
      { q: "What is the GST state code for Telangana?", a: "Telangana's GST state code is 36. Andhra Pradesh uses 37, and its older code 28 is no longer in use for new registrations." },
      { q: "I'm in Hyderabad and the client is in Vijayawada. IGST or CGST+SGST?", a: "IGST. Vijayawada is in Andhra Pradesh, which is a different state from Telangana for GST purposes." },
      { q: "How do I confirm my client's state?", a: "Look at the first two digits of their GSTIN, then check the state name against the code. The GST portal's taxpayer search will confirm the registered address in seconds." },
    ],
    example: {
      sellerName: "Charminar Code Works",
      sellerAddress: "Gachibowli, Hyderabad 500032",
      sellerStateCode: "36",
      buyerName: "Krishna Agro Tech Pvt Ltd",
      buyerAddress: "Benz Circle, Vijayawada 520010",
      buyerStateCode: "37",
      items: [
        { description: "Farmer app – backend API development (sprint 3)", hsn: "998314", qty: 1, rate: 110000, gstRate: 18 },
        { description: "Admin dashboard UI", hsn: "998314", qty: 1, rate: 45000, gstRate: 18 },
      ],
      notes: "Telangana to Andhra Pradesh: inter-state supply, IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "what-is-a-gst-invoice-mandatory-fields"],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    code: "24",
    hubs: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    partner: { name: "Maharashtra", code: "27" },
    title: "GST Invoice Format for Gujarat (State Code 24) | BillBuddy",
    description:
      "GST invoice format for Gujarat sellers and traders: state code 24, Ahmedabad and Surat invoicing, GIFT City rules and IGST to Mumbai. Free generator.",
    intro: [
      "Gujarat is a trading state, and invoicing here is dominated by small firms selling both goods and services, often to buyers who are themselves registered traders. For them, an invoice is also a purchase record: the buyer needs your GSTIN, the right HSN or SAC code and the right split of tax to claim input credit without a fuss.",
      "Gujarat's GST state code is 24. A seller in Surat billing an Ahmedabad customer charges CGST and SGST; billing a Mumbai customer is IGST. Gujarat has one special wrinkle worth knowing about: GIFT City in Gandhinagar is a Special Economic Zone, so supplies to units there are treated as inter-state even though they are inside Gujarat.",
    ],
    localPoints: [
      { title: "GIFT City is not an ordinary client", text: "Services to a unit in GIFT City (an SEZ) are inter-state supplies. Charge IGST or, with an LUT, zero-rate it, instead of the CGST+SGST you would use for a normal Gandhinagar client." },
      { title: "Goods and services together", text: "Many Gujarat sellers supply both. Show goods with HSN codes and services with SAC codes on separate lines so each carries the right rate." },
      { title: "Trader clients need exact details", text: "Small traders claim input credit from your invoice. A wrong GSTIN digit or a missing HSN code can block their claim, which is the fastest way to lose a repeat customer." },
      { title: "Surat's textile ecosystem", text: "Job-work and service invoices for textile units follow their own GST rules and rates. If you provide such services, confirm the applicable rate before assuming 18%." },
    ],
    faqs: [
      { q: "What is Gujarat's GST state code?", a: "Gujarat is state code 24. GSTINs registered in the state start with 24." },
      { q: "Is a supply to GIFT City in Gandhinagar intra-state?", a: "No. GIFT City is a Special Economic Zone, and supplies to SEZ units are treated as inter-state. IGST applies unless the supply is zero-rated under LUT." },
      { q: "I'm in Ahmedabad and my client is in Surat. CGST+SGST?", a: "Yes. Both cities are in Gujarat, so it is an intra-state supply and the tax is split equally into CGST and SGST." },
    ],
    example: {
      sellerName: "Sabarmati Brand Studio",
      sellerAddress: "CG Road, Ahmedabad 380009",
      sellerStateCode: "24",
      buyerName: "Deccan Pharma Packaging Pvt Ltd",
      buyerAddress: "Andheri East, Mumbai 400069",
      buyerStateCode: "27",
      items: [
        { description: "Packaging design – 6 SKUs, print-ready files", hsn: "998391", qty: 6, rate: 14000, gstRate: 18 },
        { description: "Brand guideline document", hsn: "998391", qty: 1, rate: 22000, gstRate: 18 },
      ],
      notes: "Gujarat to Maharashtra: inter-state supply, IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "hsn-vs-sac-codes-practical-guide"],
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    code: "19",
    hubs: ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
    partner: { name: "Odisha", code: "21" },
    title: "GST Invoice Format for West Bengal (State Code 19) | BillBuddy",
    description:
      "GST invoice format for West Bengal: state code 19, Kolkata freelancer invoicing, CGST+SGST within the state, IGST to Odisha and Assam. Free generator.",
    intro: [
      "Kolkata has a long tradition of publishing, translation, design and professional services, and many of its freelancers sell to clients in the eastern and north-eastern states. That makes inter-state billing a routine event for a West Bengal seller, not the exception.",
      "West Bengal's GST state code is 19. A Kolkata seller billing a Siliguri client charges CGST and SGST; billing a Bhubaneswar client means IGST. The example on this page shows the Odisha case, and explains how to document it so the client's accounts team can claim credit on the first try.",
    ],
    localPoints: [
      { title: "Eastern and north-east clients", text: "Odisha, Jharkhand, Bihar and Assam all have separate state codes (21, 20, 10 and 18). Billing any of them from Kolkata is an inter-state supply and needs IGST." },
      { title: "Lower thresholds in a few states", text: "A few north-eastern states, such as Manipur, Mizoram, Nagaland and Tripura, have a lower ₹10 lakh registration threshold for services. That affects whether a small client there has a GSTIN at all, so ask before assuming." },
      { title: "Publishers and agencies", text: "Kolkata's publishing houses and agencies often pay by purchase order and in batches. Quote your PAN and bank details clearly, and put the PO number on the invoice." },
      { title: "Bilingual descriptions", text: "Descriptions in Bengali are fine, but keep GSTIN, HSN/SAC code, taxable value and tax lines in English and numerals so they are verifiable by any tax officer." },
    ],
    faqs: [
      { q: "What is the GST state code for West Bengal?", a: "West Bengal's GST state code is 19. GSTINs registered in the state begin with 19." },
      { q: "I'm in Kolkata and my client is in Bhubaneswar. Which tax?", a: "IGST. Bhubaneswar is in Odisha, which is a different state from West Bengal, so the supply is inter-state." },
      { q: "What if my client is in a special category state?", a: "The tax rules for the supply are the same, but a few states have a lower registration threshold (₹10 lakh for services), so small clients there may be registered earlier. Ask whether they hold a GSTIN, and use it on the invoice if they do." },
    ],
    example: {
      sellerName: "Hooghly Language Services",
      sellerAddress: "Ballygunge, Kolkata 700019",
      sellerStateCode: "19",
      buyerName: "Konark Educational Publishers",
      buyerAddress: "Saheed Nagar, Bhubaneswar 751007",
      buyerStateCode: "21",
      items: [
        { description: "English to Odia textbook translation, 18,000 words", hsn: "998395", qty: 18000, rate: 1.4, gstRate: 18 },
        { description: "Proofreading and typesetting review", hsn: "998399", qty: 1, rate: 9000, gstRate: 18 },
      ],
      notes: "West Bengal to Odisha: inter-state supply, IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "do-freelancers-need-gst-registration-india"],
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    code: "09",
    hubs: ["Noida", "Lucknow", "Kanpur", "Ghaziabad", "Varanasi"],
    partner: { name: "Delhi", code: "07" },
    title: "GST Invoice Format for Uttar Pradesh (State Code 09) | BillBuddy",
    description:
      "GST invoice format for Uttar Pradesh sellers: state code 09, Noida and Lucknow freelancer invoicing, IGST to Delhi clients, and free PDF generator.",
    intro: [
      "Noida and Ghaziabad make Uttar Pradesh a large part of the Delhi NCR economy, and a freelancer in Sector 62 may spend all day with Delhi clients while still being a UP seller for GST. That means almost every NCR invoice from Noida is inter-state: IGST, not CGST plus SGST.",
      "Uttar Pradesh's GST state code is 09, and it is easy to confuse with Uttarakhand, which is 05 and was carved out of UP in 2000. This page shows a Noida seller billing a Delhi client with IGST, explains where the confusion comes from and what to check on your client's GSTIN to avoid it.",
    ],
    localPoints: [
      { title: "Noida to Delhi is inter-state", text: "The two cities are adjacent, but GST follows state lines. A Noida freelancer billing a Delhi client charges IGST at the full rate. A Noida freelancer billing a Lucknow client uses CGST and SGST." },
      { title: "09 is not 05", text: "Uttar Pradesh is 09 and Uttarakhand is 05. Dehradun and Haridwar clients are in Uttarakhand, so the supply from Lucknow to Dehradun is inter-state even though the states were once the same." },
      { title: "A very large state means many small clients", text: "UP has a big base of small traders and proprietors. Many have no GSTIN, so check before assuming. Unregistered clients get an ordinary tax invoice from you, without a buyer GSTIN." },
      { title: "Government work and e-invoicing", text: "UP departments and large enterprises sometimes require e-invoicing from suppliers above the turnover limit. Most freelancers are below it, but check if you work for a large corporate vendor." },
    ],
    faqs: [
      { q: "What is Uttar Pradesh's GST state code?", a: "The code is 09. All Uttar Pradesh GSTINs start with 09, while Uttarakhand's start with 05." },
      { q: "I'm in Noida and my client is in Delhi. Do I charge CGST+SGST?", a: "No. Delhi is a different state, so it is an inter-state supply and IGST applies." },
      { q: "Do small Uttar Pradesh clients without a GSTIN change my invoice?", a: "The invoice can omit the buyer's GSTIN, but you still charge GST on the supply at the applicable rate. For supplies to unregistered customers within UP, charge CGST and SGST." },
    ],
    example: {
      sellerName: "Gomti Software Solutions",
      sellerAddress: "Sector 62, Noida 201309",
      sellerStateCode: "09",
      buyerName: "Raisina Hospitality Pvt Ltd",
      buyerAddress: "Connaught Place, New Delhi 110001",
      buyerStateCode: "07",
      items: [
        { description: "Hotel booking portal – module development", hsn: "998314", qty: 1, rate: 125000, gstRate: 18 },
        { description: "Payment gateway integration", hsn: "998314", qty: 1, rate: 20000, gstRate: 18 },
      ],
      notes: "Uttar Pradesh to Delhi: inter-state supply, IGST applied.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "what-is-a-gst-invoice-mandatory-fields"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    code: "32",
    hubs: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    partner: { name: "Tamil Nadu", code: "33" },
    title: "GST Invoice Format for Kerala (State Code 32) | BillBuddy",
    description:
      "GST invoice format for Kerala freelancers: state code 32, Kochi and Trivandrum invoicing, Gulf client export rules, IGST to Tamil Nadu. Free tool.",
    intro: [
      "Kerala has a distinctive client mix: a strong local services economy in Kochi and Thiruvananthapuram, and a large diaspora in the Gulf, the UK and North America. A Kerala freelancer is therefore likely to be billing both domestic clients and foreign ones, and the two cases need completely different invoices.",
      "Kerala's GST state code is 32. For a domestic client in another state, such as Tamil Nadu, you charge IGST. For a client abroad paying in foreign exchange, the supply is usually an export of services and can be invoiced without GST under a Letter of Undertaking. This page shows the domestic invoice, with notes on switching to an export invoice.",
    ],
    localPoints: [
      { title: "Gulf and NRI clients", text: "Services to clients outside India, paid in convertible foreign exchange, are generally exports and zero-rated under LUT. The recipient needs to be outside India and the place of supply must also be outside India." },
      { title: "Individuals abroad", text: "Billing an individual NRI who has an Indian address or a presence in India needs a closer look. The place of supply rules can treat the supply as a domestic one." },
      { title: "Tourism and hospitality", text: "Kerala's tourism businesses are frequent clients for photographers, designers and marketers. Hotels may be registered in several places, so check which GSTIN the contract uses." },
      { title: "Always state the state code", text: "Printing the Kerala code 32 next to your state name on the invoice helps clients in neighbouring Tamil Nadu and Karnataka check, at a glance, that IGST is the right tax." },
    ],
    faqs: [
      { q: "What is Kerala's GST state code?", a: "Kerala is state code 32. GSTINs registered in the state begin with 32." },
      { q: "I'm in Kochi and the client is in Dubai. Do I charge GST?", a: "Usually not. If the client is outside India, the service is supplied outside India and you receive payment in convertible foreign exchange, it is an export of services and can be zero-rated under LUT. You need a GST registration to use the LUT route." },
      { q: "My client is in Chennai. Which tax?", a: "IGST. Chennai is in Tamil Nadu, which is a different state from Kerala, so the supply is inter-state." },
    ],
    example: {
      sellerName: "Backwater Visuals",
      sellerAddress: "Panampilly Nagar, Kochi 682036",
      sellerStateCode: "32",
      buyerName: "Marina Bay Resorts Pvt Ltd",
      buyerAddress: "Mylapore, Chennai 600004",
      buyerStateCode: "33",
      items: [
        { description: "Resort photography – 2-day shoot, 120 edited images", hsn: "998382", qty: 1, rate: 70000, gstRate: 18 },
        { description: "Drone aerial video, 3 minutes edited", hsn: "999613", qty: 1, rate: 35000, gstRate: 18 },
      ],
      notes: "Kerala to Tamil Nadu: inter-state supply, IGST applied.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "cgst-sgst-igst-when-each-applies"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    code: "08",
    hubs: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    partner: { name: "Delhi", code: "07" },
    title: "GST Invoice Format for Rajasthan (State Code 08) | BillBuddy",
    description:
      "GST invoice format for Rajasthan: state code 08, Jaipur freelancer invoicing, CGST+SGST within the state, IGST to Delhi clients. Free PDF generator.",
    intro: [
      "Jaipur, Jodhpur and Udaipur run on tourism, handicrafts, destination weddings and a growing remote-work scene. Photographers, planners, designers and marketers in these cities often do work that is physically in Rajasthan for clients who live in Delhi, Mumbai or abroad. That makes place of supply the main question on a Rajasthan invoice.",
      "Rajasthan's GST state code is 08. For services to a registered business, the place of supply is usually where the client is located, not where you did the work. A Jaipur planner billing a Delhi company for a Udaipur event therefore charges IGST. The example here walks through that case with the event details on the invoice.",
    ],
    localPoints: [
      { title: "Destination weddings and events", text: "For event services to an unregistered client, place of supply can be the location of the event. For registered clients, it follows the client. Check which one applies before choosing the tax type." },
      { title: "Tourism sector clients", text: "Hotels, resorts and travel companies are regular customers. Ask for the GSTIN of the specific entity that will pay, since groups commonly operate through several registered companies." },
      { title: "Handicraft exporters", text: "Rajasthan exporters can ask for invoices that suit export documentation. Keep descriptions precise and consistent with their shipping documents." },
      { title: "Seasonal income", text: "Many Rajasthan professionals have lumpy seasonal income. Track turnover against the ₹20 lakh threshold month by month, because a busy wedding season can push you over it sooner than expected." },
    ],
    faqs: [
      { q: "What is Rajasthan's GST state code?", a: "Rajasthan's GST state code is 08. GSTINs issued there start with 08." },
      { q: "I'm in Jaipur and the client is in Delhi but the event is in Udaipur. What tax applies?", a: "If the client is a registered business in Delhi, the place of supply is generally Delhi, so IGST applies. If the client is an unregistered individual, the place of supply may be the event venue in Rajasthan, making it CGST+SGST. Confirm the client's registration." },
      { q: "Do I need to register if I only work in wedding season?", a: "Registration depends on annual turnover, not on how many months you work. If you cross ₹20 lakh in a financial year, you must register, however the money was earned." },
    ],
    example: {
      sellerName: "Pink City Photography",
      sellerAddress: "Civil Lines, Jaipur 302006",
      sellerStateCode: "08",
      buyerName: "Aravali Celebrations Pvt Ltd",
      buyerAddress: "Saket, New Delhi 110017",
      buyerStateCode: "07",
      items: [
        { description: "Destination wedding photography, Udaipur, 3 days", hsn: "998383", qty: 3, rate: 45000, gstRate: 18 },
        { description: "Pre-wedding shoot at City Palace", hsn: "998381", qty: 1, rate: 35000, gstRate: 18 },
      ],
      notes: "Registered client in Delhi: IGST applied. Event held in Udaipur on 14–16 Dec.",
    },
    blog: ["cgst-sgst-igst-when-each-applies", "do-freelancers-need-gst-registration-india"],
  },
  {
    slug: "haryana",
    name: "Haryana",
    code: "06",
    hubs: ["Gurugram", "Faridabad", "Panipat", "Ambala"],
    partner: { name: "Delhi", code: "07" },
    title: "GST Invoice Format for Haryana (State Code 06) | BillBuddy",
    description:
      "GST invoice format for Haryana: state code 06, Gurugram and Faridabad invoicing, IGST on Delhi clients, corporate vendor onboarding. Free generator.",
    intro: [
      "Gurugram is a corporate city. Consulting firms, call centres, fintechs and Fortune 500 offices sit side by side, and vendors who work with them quickly learn that large companies have strict vendor onboarding and invoice checks. A GST invoice that is slightly off is more likely to be rejected here than anywhere else.",
      "Haryana's GST state code is 06. A Gurugram freelancer billing a Gurugram company charges CGST and SGST, while billing a Delhi company is inter-state and carries IGST. The example below shows the corporate case, including a PO number and the details that a Gurugram accounts payable team will look for.",
    ],
    localPoints: [
      { title: "Corporate vendor onboarding", text: "Large Gurugram clients typically want your PAN, GSTIN, bank proof and a cancelled cheque before they pay anything. Having a clean invoice template saves a round of rejections." },
      { title: "Purchase-order matching", text: "Put the PO number, PO date and a clear description on the invoice. Three-way matching (PO, goods receipt, invoice) is standard, and a missing PO number is the most common reason invoices bounce." },
      { title: "NCR boundary", text: "Gurugram and Faridabad sit right next to Delhi, but Delhi is state code 07, not 06. An invoice to a Delhi office is IGST, even when the client's HQ is a Gurugram building." },
      { title: "Check for e-invoicing", text: "If your turnover is above the e-invoicing threshold, your invoice needs an IRN and a QR code from the e-invoice portal. Most freelancers are under it, but a growing studio may not be." },
    ],
    faqs: [
      { q: "What is Haryana's GST state code?", a: "Haryana's GST state code is 06. All GSTINs from the state begin with 06." },
      { q: "I'm in Gurugram and my client is in Delhi. Which GST?", a: "IGST. Delhi (07) is a different state from Haryana (06), so the supply is inter-state." },
      { q: "Why do large Gurugram companies reject GST invoices?", a: "The most common reasons are an incorrect or missing buyer GSTIN, a missing PO number, a wrong state of supply and mismatched SAC codes. Matching these to the vendor master record avoids almost all rejections." },
    ],
    example: {
      sellerName: "Aravalli Advisory",
      sellerAddress: "Sector 29, Gurugram 122001",
      sellerStateCode: "06",
      buyerName: "Helix Business Services Pvt Ltd",
      buyerAddress: "Udyog Vihar Phase 4, Gurugram 122015",
      buyerStateCode: "06",
      items: [
        { description: "Process improvement advisory – October 2026 (PO 4500129871)", hsn: "998312", qty: 1, rate: 120000, gstRate: 18 },
        { description: "Team workshop, 1 day", hsn: "999293", qty: 1, rate: 30000, gstRate: 18 },
      ],
      notes: "PO 4500129871 dated 01 Oct 2026. Same-state supply: CGST + SGST applied.",
    },
    blog: ["what-is-a-gst-invoice-mandatory-fields", "invoice-payment-terms-and-late-payments"],
  },
  {
    slug: "goa",
    name: "Goa",
    code: "30",
    hubs: ["Panaji", "Margao", "Mapusa", "Vasco da Gama"],
    partner: { name: "Maharashtra", code: "27" },
    title: "GST Invoice Format for Goa (State Code 30) | BillBuddy",
    description:
      "GST invoice format for Goa: state code 30, freelancer, hospitality and remote-worker invoicing, IGST to Maharashtra and Karnataka clients. Free PDF generator.",
    intro: [
      "Goa has become a base for remote workers, digital nomads and small studios that pair beach life with clients in Mumbai, Bengaluru and abroad. It also has a thriving hospitality and event economy, which makes photographers, DJs and planners regular sellers. Because Goa is small, nearly every client of a Goa freelancer is in another state.",
      "Goa's GST state code is 30. Inter-state billing is the default, so IGST is the tax you'll apply most often. This page shows an invoice from a Panaji seller to a Mumbai client with IGST, and explains how to handle the occasional local client within Goa, where CGST and SGST apply instead.",
    ],
    localPoints: [
      { title: "Most Goa invoices are IGST", text: "With a small local market, a freelancer's best clients are typically in Maharashtra, Karnataka or abroad. Make IGST your default and switch to CGST+SGST only for Goa-based buyers." },
      { title: "Seasonal tourism income", text: "Hospitality-linked work peaks from October to March. Track your running turnover during the season so you register on time if you are approaching the ₹20 lakh threshold." },
      { title: "Remote workers and international clients", text: "A remote worker based in Goa billing an overseas client has an export of services, which can be zero-rated under LUT. You need a registration and a bank account that issues foreign inward remittance advices." },
      { title: "Events, music and entertainment", text: "Performers, DJs and event service providers have their own SAC headings, and some entertainment services carry different rates. Check the right code for your services rather than defaulting to 18%." },
    ],
    faqs: [
      { q: "What is Goa's GST state code?", a: "Goa's GST state code is 30. GSTINs registered in Goa start with 30." },
      { q: "I'm in Panaji and my client is in Mumbai. Which tax?", a: "IGST, as Maharashtra is a different state from Goa. The invoice should show one IGST line at the full rate." },
      { q: "Do I charge GST on work for a client in Goa?", a: "Yes, if you are registered and the service is taxable. Within Goa you charge CGST and SGST at half the rate each. Below the registration threshold you can issue an invoice without GST." },
    ],
    example: {
      sellerName: "Sunset Cove Creative",
      sellerAddress: "Fontainhas, Panaji 403001",
      sellerStateCode: "30",
      buyerName: "Bandra Brews Hospitality LLP",
      buyerAddress: "Bandra West, Mumbai 400050",
      buyerStateCode: "27",
      items: [
        { description: "Restaurant rebrand: identity, menu design, signage files", hsn: "998391", qty: 1, rate: 90000, gstRate: 18 },
        { description: "Launch campaign photography, 1 day", hsn: "998382", qty: 1, rate: 28000, gstRate: 18 },
      ],
      notes: "Goa to Maharashtra: inter-state supply, IGST applied.",
    },
    blog: ["invoice-for-international-clients-lut-export-of-services", "do-freelancers-need-gst-registration-india"],
  },
];

export const getStateGuide = (slug: string) => stateGuides.find((s) => s.slug === slug);
