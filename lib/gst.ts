export interface IndianState {
  code: string; // GST state code, two digits
  name: string;
}

export const INDIAN_STATES: IndianState[] = [
  { code: "01", name: "Jammu & Kashmir" },
  { code: "02", name: "Himachal Pradesh" },
  { code: "03", name: "Punjab" },
  { code: "04", name: "Chandigarh" },
  { code: "05", name: "Uttarakhand" },
  { code: "06", name: "Haryana" },
  { code: "07", name: "Delhi" },
  { code: "08", name: "Rajasthan" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "10", name: "Bihar" },
  { code: "11", name: "Sikkim" },
  { code: "12", name: "Arunachal Pradesh" },
  { code: "13", name: "Nagaland" },
  { code: "14", name: "Manipur" },
  { code: "15", name: "Mizoram" },
  { code: "16", name: "Tripura" },
  { code: "17", name: "Meghalaya" },
  { code: "18", name: "Assam" },
  { code: "19", name: "West Bengal" },
  { code: "20", name: "Jharkhand" },
  { code: "21", name: "Odisha" },
  { code: "22", name: "Chhattisgarh" },
  { code: "23", name: "Madhya Pradesh" },
  { code: "24", name: "Gujarat" },
  { code: "26", name: "Dadra & Nagar Haveli and Daman & Diu" },
  { code: "27", name: "Maharashtra" },
  { code: "29", name: "Karnataka" },
  { code: "30", name: "Goa" },
  { code: "31", name: "Lakshadweep" },
  { code: "32", name: "Kerala" },
  { code: "33", name: "Tamil Nadu" },
  { code: "34", name: "Puducherry" },
  { code: "35", name: "Andaman & Nicobar Islands" },
  { code: "36", name: "Telangana" },
  { code: "37", name: "Andhra Pradesh" },
  { code: "38", name: "Ladakh" },
];

export const stateName = (code: string) => INDIAN_STATES.find((s) => s.code === code)?.name ?? "";

// 12% and 28% are kept for older invoices; 40% is the slab added in the 2025 GST rate rationalisation.
export const GST_RATES = [0, 5, 12, 18, 28, 40] as const;

/** 15 characters: 2 digit state code, 10 char PAN, entity number, 'Z', checksum. */
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const normalizeId = (v: string) => v.replace(/\s+/g, "").toUpperCase();

/** Returns an error message, or null when valid. Empty input is valid unless `required`. */
export function validateGstin(raw: string, required = false): string | null {
  const v = normalizeId(raw);
  if (!v) return required ? "GSTIN is required" : null;
  if (v.length !== 15) return `GSTIN must be 15 characters (you entered ${v.length})`;
  if (!GSTIN_RE.test(v)) return "Invalid GSTIN format. Expected like 27ABCDE1234F1Z5";
  if (!INDIAN_STATES.some((s) => s.code === v.slice(0, 2))) return "GSTIN starts with an unknown state code";
  return null;
}

export function validatePan(raw: string): string | null {
  const v = normalizeId(raw);
  if (!v) return null;
  return PAN_RE.test(v) ? null : "PAN must be 10 characters like ABCDE1234F";
}

export const stateFromGstin = (gstin: string): string | null => {
  const v = normalizeId(gstin);
  return validateGstin(v) === null && v.length === 15 ? v.slice(0, 2) : null;
};

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface TaxLineInput {
  qty: number;
  rate: number;
  /** discount in percent */
  discount: number;
  gstRate: number;
}

export interface TaxLine {
  gross: number;
  discountAmount: number;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

export function calcLine(item: TaxLineInput, intraState: boolean): TaxLine {
  const qty = Math.max(0, Number(item.qty) || 0);
  const rate = Math.max(0, Number(item.rate) || 0);
  const disc = Math.min(100, Math.max(0, Number(item.discount) || 0));
  const gross = round2(qty * rate);
  const discountAmount = round2((gross * disc) / 100);
  const taxable = round2(gross - discountAmount);
  const gst = Math.max(0, Number(item.gstRate) || 0);
  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  if (intraState) {
    cgst = round2((taxable * gst) / 200);
    sgst = cgst;
  } else {
    igst = round2((taxable * gst) / 100);
  }
  return { gross, discountAmount, taxable, cgst, sgst, igst, total: round2(taxable + cgst + sgst + igst) };
}

export interface Totals {
  subtotal: number;
  discount: number;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  roundOff: number;
  grandTotal: number;
  /** tax split by GST slab, for the tax summary table */
  bySlab: { rate: number; taxable: number; cgst: number; sgst: number; igst: number }[];
}

export function calcTotals(items: TaxLineInput[], intraState: boolean): { lines: TaxLine[]; totals: Totals } {
  const lines = items.map((i) => calcLine(i, intraState));
  const sum = (f: (l: TaxLine) => number) => round2(lines.reduce((a, l) => a + f(l), 0));
  const slabs = new Map<number, { rate: number; taxable: number; cgst: number; sgst: number; igst: number }>();
  lines.forEach((l, idx) => {
    const rate = Number(items[idx].gstRate) || 0;
    const s = slabs.get(rate) ?? { rate, taxable: 0, cgst: 0, sgst: 0, igst: 0 };
    s.taxable = round2(s.taxable + l.taxable);
    s.cgst = round2(s.cgst + l.cgst);
    s.sgst = round2(s.sgst + l.sgst);
    s.igst = round2(s.igst + l.igst);
    slabs.set(rate, s);
  });
  const taxable = sum((l) => l.taxable);
  const cgst = sum((l) => l.cgst);
  const sgst = sum((l) => l.sgst);
  const igst = sum((l) => l.igst);
  const exact = round2(taxable + cgst + sgst + igst);
  const grandTotal = Math.round(exact);
  return {
    lines,
    totals: {
      subtotal: sum((l) => l.gross),
      discount: sum((l) => l.discountAmount),
      taxable,
      cgst,
      sgst,
      igst,
      totalTax: round2(cgst + sgst + igst),
      roundOff: round2(grandTotal - exact),
      grandTotal,
      bySlab: [...slabs.values()].sort((a, b) => a.rate - b.rate),
    },
  };
}
