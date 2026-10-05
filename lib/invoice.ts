export type TemplateId = "classic" | "modern" | "minimal";

export const TEMPLATES: { id: TemplateId; label: string; blurb: string }[] = [
  { id: "classic", label: "Classic", blurb: "Serif, boxed table, traditional" },
  { id: "modern", label: "Modern", blurb: "Colour header band, clean sans" },
  { id: "minimal", label: "Minimal", blurb: "Airy, hairline rules, no fills" },
];

export interface LineItem {
  id: string;
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  discount: number;
  gstRate: number;
}

export interface Invoice {
  template: TemplateId;
  number: string;
  date: string; // yyyy-mm-dd
  dueDate: string;
  seller: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
    stateCode: string;
    email: string;
    phone: string;
    logo: string; // data URL, optional
  };
  buyer: {
    name: string;
    address: string;
    gstin: string;
    stateCode: string;
    email: string;
  };
  items: LineItem[];
  notes: string;
  terms: string;
  bank: { accountName: string; accountNumber: string; ifsc: string; bankName: string };
  upi: string;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const todayISO = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

export const blankItem = (): LineItem => ({ id: uid(), description: "", hsn: "", qty: 1, rate: 0, discount: 0, gstRate: 18 });

export const defaultInvoice = (): Invoice => ({
  template: "modern",
  number: "INV-001",
  date: todayISO(),
  dueDate: todayISO(15),
  seller: { name: "", address: "", gstin: "", pan: "", stateCode: "", email: "", phone: "", logo: "" },
  buyer: { name: "", address: "", gstin: "", stateCode: "", email: "" },
  items: [blankItem()],
  notes: "",
  terms: "Payment due within 15 days of invoice date.",
  bank: { accountName: "", accountNumber: "", ifsc: "", bankName: "" },
  upi: "",
});

export const isIntraState = (inv: Pick<Invoice, "seller" | "buyer">) =>
  !!inv.seller.stateCode && inv.seller.stateCode === inv.buyer.stateCode;

export const formatDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

/** Bump trailing digits: INV-009 -> INV-010, 2025/26/12 -> 2025/26/13 */
export const nextInvoiceNumber = (n: string) => {
  const m = n.match(/^(.*?)(\d+)(\D*)$/);
  if (!m) return `${n || "INV"}-2`;
  const next = String(Number(m[2]) + 1).padStart(m[2].length, "0");
  return `${m[1]}${next}${m[3]}`;
};

const KEY = "billbuddy:draft:v1";

export function loadDraft(): Invoice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Invoice>;
    const base = defaultInvoice();
    return {
      ...base,
      ...parsed,
      seller: { ...base.seller, ...parsed.seller },
      buyer: { ...base.buyer, ...parsed.buyer },
      bank: { ...base.bank, ...parsed.bank },
      items: parsed.items?.length ? parsed.items : base.items,
    };
  } catch {
    return null;
  }
}

export function saveDraft(inv: Invoice): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(inv));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export interface ExampleInvoice {
  sellerName: string;
  sellerAddress: string;
  sellerStateCode: string;
  buyerName: string;
  buyerAddress: string;
  buyerStateCode: string;
  items: { description: string; hsn: string; qty: number; rate: number; discount?: number; gstRate: number }[];
  notes?: string;
  terms?: string;
}

export function invoiceFromExample(ex: ExampleInvoice, template: TemplateId = "modern"): Invoice {
  const base = defaultInvoice();
  return {
    ...base,
    template,
    number: "INV-2026-014",
    seller: { ...base.seller, name: ex.sellerName, address: ex.sellerAddress, stateCode: ex.sellerStateCode, email: "billing@example.com" },
    buyer: { ...base.buyer, name: ex.buyerName, address: ex.buyerAddress, stateCode: ex.buyerStateCode },
    items: ex.items.map((i) => ({ id: uid(), description: i.description, hsn: i.hsn, qty: i.qty, rate: i.rate, discount: i.discount ?? 0, gstRate: i.gstRate })),
    notes: ex.notes ?? "",
    terms: ex.terms ?? base.terms,
    bank: { accountName: ex.sellerName, accountNumber: "1234567890", ifsc: "HDFC0001234", bankName: "HDFC Bank" },
    upi: "yourname@okhdfcbank",
  };
}
