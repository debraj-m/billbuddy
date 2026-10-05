import { calcTotals, stateName, type TaxLine, type Totals } from "./gst";
import { isIntraState, type Invoice } from "./invoice";
import { amountInWords } from "./words";

export interface InvoiceView {
  inv: Invoice;
  intra: boolean;
  lines: TaxLine[];
  totals: Totals;
  words: string;
  sellerState: string;
  buyerState: string;
  hasDiscount: boolean;
  hasHsn: boolean;
  upiLink: string;
}

export function buildView(inv: Invoice): InvoiceView {
  const intra = isIntraState(inv);
  const { lines, totals } = calcTotals(inv.items, intra);
  const upi = inv.upi.trim();
  return {
    inv,
    intra,
    lines,
    totals,
    words: amountInWords(totals.grandTotal),
    sellerState: stateName(inv.seller.stateCode),
    buyerState: stateName(inv.buyer.stateCode),
    hasDiscount: inv.items.some((i) => Number(i.discount) > 0),
    hasHsn: inv.items.some((i) => i.hsn.trim()),
    upiLink: upi
      ? `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(inv.seller.name)}&am=${totals.grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(inv.number)}`
      : "",
  };
}
