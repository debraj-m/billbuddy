import { Document, Font, Image, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { formatDate, type TemplateId } from "@/lib/invoice";
import type { InvoiceView } from "@/lib/invoiceView";
import { formatINR } from "@/lib/words";

let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  fontsRegistered = true;
  Font.register({
    family: "NotoSans",
    fonts: [
      { src: "/fonts/NotoSans-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/NotoSans-Bold.ttf", fontWeight: 700 },
    ],
  });
  Font.register({
    family: "NotoSerif",
    fonts: [
      { src: "/fonts/NotoSerif-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/NotoSerif-Bold.ttf", fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((w) => [w]);
}

const THEMES: Record<TemplateId, { font: string; accent: string; headBg: string; headFg: string; rule: string }> = {
  classic: { font: "NotoSerif", accent: "#111111", headBg: "#f0f0f0", headFg: "#111111", rule: "#111111" },
  modern: { font: "NotoSans", accent: "#4f46e5", headBg: "#4f46e5", headFg: "#ffffff", rule: "#e5e7eb" },
  minimal: { font: "NotoSans", accent: "#111111", headBg: "#ffffff", headFg: "#111111", rule: "#d4d4d8" },
};

function InvoiceDoc({ view }: { view: InvoiceView }) {
  const { inv, intra, lines, totals, words, hasDiscount, hasHsn } = view;
  const t = THEMES[inv.template];
  const isModern = inv.template === "modern";
  const isMinimal = inv.template === "minimal";
  const isClassic = inv.template === "classic";

  // Column widths in percent; description takes the remainder.
  const cols = { n: 4, hsn: hasHsn ? 11 : 0, qty: 7, rate: 12, disc: hasDiscount ? 8 : 0, taxable: 13, gst: 7, amt: 13 };
  const desc = 100 - Object.values(cols).reduce((a, b) => a + b, 0);
  const w = (p: number) => ({ width: `${p}%` });

  const s = StyleSheet.create({
    page: { fontFamily: t.font, fontSize: 9, color: "#111", padding: isModern ? 0 : 36, lineHeight: 1.35 },
    frame: isClassic ? { borderWidth: 1.5, borderColor: "#111", borderStyle: "solid", padding: 24, flexGrow: 1 } : { flexGrow: 1 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: isModern ? 36 : 0,
      paddingTop: isModern ? 30 : 0,
      paddingBottom: isModern ? 20 : 14,
      backgroundColor: isModern ? t.accent : undefined,
      color: isModern ? "#fff" : "#111",
      borderBottomWidth: isModern ? 0 : isClassic ? 1.5 : 0.75,
      borderBottomColor: t.rule,
      borderBottomStyle: "solid",
      marginBottom: isModern ? 0 : 16,
    },
    body: { paddingHorizontal: isModern ? 36 : 0, paddingTop: isModern ? 20 : 0 },
    label: { fontSize: 7.5, fontWeight: 700, color: t.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
    trow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: t.rule, borderBottomStyle: "solid", paddingVertical: 5, paddingHorizontal: 4 },
    thead: {
      flexDirection: "row",
      backgroundColor: t.headBg,
      color: t.headFg,
      paddingVertical: 5,
      paddingHorizontal: 4,
      borderBottomWidth: isMinimal ? 1.2 : 0,
      borderBottomColor: "#111",
      borderBottomStyle: "solid",
    },
    th: { fontSize: 7.5, fontWeight: 700, textTransform: "uppercase" },
    r: { textAlign: "right" },
  });

  const party = (label: string, rows: (string | false | undefined)[]) => {
    const [first, ...rest] = rows.filter(Boolean) as string[];
    return (
      <View key={label} style={{ flex: 1 }}>
        <Text style={s.label}>{label}</Text>
        <Text style={{ fontWeight: 700, fontSize: 10.5 }}>{first}</Text>
        {rest.map((r, i) => (
          <Text key={i} style={{ color: "#444" }}>
            {r}
          </Text>
        ))}
      </View>
    );
  };

  const row = (label: string, value: string) => (
    <View key={label} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 }}>
      <Text style={{ color: "#555" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );

  const bankFilled = Object.values(inv.bank).some((v) => v.trim());

  return (
    <Document title={`Invoice ${inv.number}`} author={inv.seller.name || "BillBuddy"} creator="BillBuddy" producer="BillBuddy">
      <Page size="A4" style={s.page}>
        <View style={s.frame}>
          <View style={s.header}>
            <View style={{ flexDirection: "row", alignItems: "center", maxWidth: "60%" }}>
              {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
              {inv.seller.logo ? <Image src={inv.seller.logo} style={{ height: 40, maxWidth: 90, objectFit: "contain", marginRight: 10 }} /> : null}
              <View>
                <Text style={{ fontSize: 15, fontWeight: 700 }}>{inv.seller.name || "Your business name"}</Text>
                {inv.seller.gstin ? <Text style={{ fontSize: 8, opacity: 0.85 }}>GSTIN: {inv.seller.gstin.toUpperCase()}</Text> : null}
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: isMinimal ? 17 : 13, fontWeight: 700, letterSpacing: isMinimal ? 0 : 1.2, textTransform: isMinimal ? "none" : "uppercase" }}>Tax Invoice</Text>
              <Text style={{ marginTop: 4 }}>No. {inv.number}</Text>
              <Text>Date: {formatDate(inv.date)}</Text>
              {inv.dueDate ? <Text>Due: {formatDate(inv.dueDate)}</Text> : null}
            </View>
          </View>

          <View style={s.body}>
            <View style={{ flexDirection: "row", gap: 24, marginBottom: 16 }}>
              {party("From", [
                  inv.seller.name || "Your business name",
                  inv.seller.address,
                  view.sellerState && `State: ${view.sellerState} (${inv.seller.stateCode})`,
                  inv.seller.pan && `PAN: ${inv.seller.pan.toUpperCase()}`,
                  [inv.seller.email, inv.seller.phone].filter(Boolean).join("  |  "),
                ])}
              {party("Bill to", [
                  inv.buyer.name || "Client name",
                  inv.buyer.address,
                  inv.buyer.gstin && `GSTIN: ${inv.buyer.gstin.toUpperCase()}`,
                  view.buyerState && `Place of supply: ${view.buyerState} (${inv.buyer.stateCode})`,
                  inv.buyer.email,
                ])}
            </View>

            <View style={isClassic ? { borderWidth: 0.75, borderColor: "#111", borderStyle: "solid" } : undefined}>
              <View style={s.thead} fixed>
                <Text style={[s.th, w(cols.n)]}>#</Text>
                <Text style={[s.th, w(desc)]}>Description</Text>
                {hasHsn ? <Text style={[s.th, w(cols.hsn)]}>HSN/SAC</Text> : null}
                <Text style={[s.th, s.r, w(cols.qty)]}>Qty</Text>
                <Text style={[s.th, s.r, w(cols.rate)]}>Rate</Text>
                {hasDiscount ? <Text style={[s.th, s.r, w(cols.disc)]}>Disc %</Text> : null}
                <Text style={[s.th, s.r, w(cols.taxable)]}>Taxable</Text>
                <Text style={[s.th, s.r, w(cols.gst)]}>GST</Text>
                <Text style={[s.th, s.r, w(cols.amt)]}>Amount</Text>
              </View>
              {inv.items.map((it, i) => (
                <View key={it.id} style={s.trow} wrap={false}>
                  <Text style={w(cols.n)}>{i + 1}</Text>
                  <Text style={[w(desc), { paddingRight: 6 }]}>{it.description || "-"}</Text>
                  {hasHsn ? <Text style={w(cols.hsn)}>{it.hsn}</Text> : null}
                  <Text style={[s.r, w(cols.qty)]}>{String(it.qty)}</Text>
                  <Text style={[s.r, w(cols.rate)]}>{formatINR(Number(it.rate) || 0)}</Text>
                  {hasDiscount ? <Text style={[s.r, w(cols.disc)]}>{String(Number(it.discount) || 0)}</Text> : null}
                  <Text style={[s.r, w(cols.taxable)]}>{formatINR(lines[i].taxable)}</Text>
                  <Text style={[s.r, w(cols.gst)]}>{it.gstRate}%</Text>
                  <Text style={[s.r, w(cols.amt)]}>{formatINR(lines[i].total)}</Text>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "row", gap: 24, marginTop: 14 }} wrap={false}>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Amount in words</Text>
                <Text style={{ fontWeight: 700 }}>{words}</Text>
                {totals.totalTax > 0 ? (
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: t.rule, borderBottomStyle: "solid", paddingBottom: 2 }}>
                      <Text style={[{ width: "22%", fontSize: 7.5, color: "#555" }]}>GST slab</Text>
                      <Text style={[s.r, { width: intra ? "30%" : "40%", fontSize: 7.5, color: "#555" }]}>Taxable</Text>
                      {intra ? (
                        <>
                          <Text style={[s.r, { width: "24%", fontSize: 7.5, color: "#555" }]}>CGST</Text>
                          <Text style={[s.r, { width: "24%", fontSize: 7.5, color: "#555" }]}>SGST</Text>
                        </>
                      ) : (
                        <Text style={[s.r, { width: "38%", fontSize: 7.5, color: "#555" }]}>IGST</Text>
                      )}
                    </View>
                    {totals.bySlab.map((sl) => (
                      <View key={sl.rate} style={{ flexDirection: "row", paddingTop: 2 }}>
                        <Text style={{ width: "22%", fontSize: 8 }}>{sl.rate}%</Text>
                        <Text style={[s.r, { width: intra ? "30%" : "40%", fontSize: 8 }]}>{formatINR(sl.taxable)}</Text>
                        {intra ? (
                          <>
                            <Text style={[s.r, { width: "24%", fontSize: 8 }]}>{formatINR(sl.cgst)}</Text>
                            <Text style={[s.r, { width: "24%", fontSize: 8 }]}>{formatINR(sl.sgst)}</Text>
                          </>
                        ) : (
                          <Text style={[s.r, { width: "38%", fontSize: 8 }]}>{formatINR(sl.igst)}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
              <View style={{ width: 200 }}>
                {row("Subtotal", formatINR(totals.subtotal))}
                {totals.discount > 0 ? row("Discount", `- ${formatINR(totals.discount)}`) : null}
                {row("Taxable value", formatINR(totals.taxable))}
                {intra ? (
                  <>
                    {row("CGST", formatINR(totals.cgst))}
                    {row("SGST", formatINR(totals.sgst))}
                  </>
                ) : (
                  row("IGST", formatINR(totals.igst))
                )}
                {totals.roundOff !== 0 ? row("Round off", formatINR(totals.roundOff)) : null}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 4,
                    paddingVertical: 7,
                    paddingHorizontal: isMinimal ? 0 : 8,
                    backgroundColor: isMinimal ? undefined : isModern ? t.accent : "#111",
                    color: isMinimal ? "#111" : "#fff",
                    borderTopWidth: isMinimal ? 1.2 : 0,
                    borderTopColor: "#111",
                    borderTopStyle: "solid",
                  }}
                >
                  <Text style={{ fontWeight: 700, fontSize: 11 }}>Total</Text>
                  <Text style={{ fontWeight: 700, fontSize: 11 }}>₹{formatINR(totals.grandTotal)}</Text>
                </View>
              </View>
            </View>

            {bankFilled || inv.upi ? (
              <View style={{ marginTop: 18 }} wrap={false}>
                <Text style={s.label}>Payment details</Text>
                {inv.bank.accountName ? <Text>Account name: {inv.bank.accountName}</Text> : null}
                {inv.bank.bankName ? <Text>Bank: {inv.bank.bankName}</Text> : null}
                {inv.bank.accountNumber ? <Text>Account no: {inv.bank.accountNumber}</Text> : null}
                {inv.bank.ifsc ? <Text>IFSC: {inv.bank.ifsc.toUpperCase()}</Text> : null}
                {inv.upi ? <Text>UPI: {inv.upi}</Text> : null}
              </View>
            ) : null}

            {inv.notes || inv.terms ? (
              <View style={{ marginTop: 14, color: "#444" }} wrap={false}>
                {inv.notes ? (
                  <Text style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: 700, color: "#111" }}>Notes: </Text>
                    {inv.notes}
                  </Text>
                ) : null}
                {inv.terms ? (
                  <Text>
                    <Text style={{ fontWeight: 700, color: "#111" }}>Terms: </Text>
                    {inv.terms}
                  </Text>
                ) : null}
              </View>
            ) : null}

            <Text style={{ marginTop: 22, textAlign: "center", fontSize: 7.5, color: "#888" }}>This is a computer generated invoice.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function renderInvoicePdf(view: InvoiceView): Promise<Blob> {
  registerFonts();
  return pdf(<InvoiceDoc view={view} />).toBlob();
}
