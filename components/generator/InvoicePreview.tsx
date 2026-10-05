/* eslint-disable @next/next/no-img-element -- logo is a user-supplied data URL */
import type { CSSProperties } from "react";
import { formatINR } from "@/lib/words";
import { formatDate, type TemplateId } from "@/lib/invoice";
import type { InvoiceView } from "@/lib/invoiceView";

const THEMES: Record<
  TemplateId,
  { font: string; accent: string; headBg: string; headFg: string; rule: string }
> = {
  classic: { font: "Georgia, 'Times New Roman', serif", accent: "#111111", headBg: "#f0f0f0", headFg: "#111", rule: "#111" },
  modern: { font: "var(--font-body), system-ui, sans-serif", accent: "#0f766e", headBg: "#0f766e", headFg: "#fff", rule: "#e5e7eb" },
  minimal: { font: "var(--font-body), system-ui, sans-serif", accent: "#111111", headBg: "transparent", headFg: "#111", rule: "#d4d4d8" },
};

export const PREVIEW_WIDTH = 794;
export const PREVIEW_HEIGHT = 1123;

function Party({ label, lines, accent }: { label: string; lines: (string | false | undefined)[]; accent: string }) {
  const [first, ...rest] = lines.filter(Boolean) as string[];
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: accent, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 14 }}>{first || "—"}</div>
      {rest.map((l, i) => (
        <div key={i} style={{ fontSize: 11.5, color: "#444", whiteSpace: "pre-line", lineHeight: 1.45 }}>
          {l}
        </div>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
      <span style={{ color: "#555" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function InvoicePreview({ view }: { view: InvoiceView }) {
  const { inv, intra, lines, totals, words, hasDiscount, hasHsn } = view;
  const t = THEMES[inv.template];
  const isModern = inv.template === "modern";
  const isMinimal = inv.template === "minimal";
  const cell: CSSProperties = { padding: "8px 8px", fontSize: 11.5, verticalAlign: "top", borderBottom: `1px solid ${t.rule}` };
  const th: CSSProperties = {
    ...cell,
    background: t.headBg,
    color: t.headFg,
    fontWeight: 700,
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    borderBottom: isMinimal ? "1.5px solid #111" : cell.borderBottom,
  };
  const num: CSSProperties = { textAlign: "right", whiteSpace: "nowrap" };
  const slabCell: CSSProperties = { padding: "3px 4px", borderBottom: `1px solid ${t.rule}` };
  const bankFilled = Object.values(inv.bank).some((v) => v.trim());

  return (
    <div
      style={{
        width: PREVIEW_WIDTH,
        minHeight: PREVIEW_HEIGHT,
        background: "#fff",
        color: "#111",
        fontFamily: t.font,
        padding: isModern ? 0 : 48,
        boxSizing: "border-box",
        border: inv.template === "classic" ? "2px solid #111" : undefined,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
          padding: isModern ? "40px 48px 28px" : "0 0 20px",
          background: isModern ? t.accent : undefined,
          color: isModern ? "#fff" : undefined,
          borderBottom: inv.template === "classic" ? "2px solid #111" : isMinimal ? `1px solid ${t.rule}` : undefined,
          marginBottom: isModern ? 0 : 24,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
          {inv.seller.logo && <img src={inv.seller.logo} alt="" style={{ maxHeight: 56, maxWidth: 120, objectFit: "contain" }} />}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{inv.seller.name || "Your business name"}</div>
            {inv.seller.gstin && <div style={{ fontSize: 11, opacity: 0.85 }}>GSTIN: {inv.seller.gstin.toUpperCase()}</div>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: isMinimal ? 22 : 18, fontWeight: 700, letterSpacing: 1.5, textTransform: isMinimal ? "none" : "uppercase" }}>
            Tax Invoice
          </div>
          <div style={{ fontSize: 11.5, marginTop: 6 }}>No. <b>{inv.number || "—"}</b></div>
          <div style={{ fontSize: 11.5 }}>Date: {formatDate(inv.date)}</div>
          {inv.dueDate && <div style={{ fontSize: 11.5 }}>Due: {formatDate(inv.dueDate)}</div>}
        </div>
      </header>

      <div style={{ padding: isModern ? "28px 48px 48px" : 0 }}>
        <div style={{ display: "flex", gap: 32, marginBottom: 22 }}>
          <Party
            accent={t.accent}
            label="From"
            lines={[
              inv.seller.name || "Your business name",
              inv.seller.address,
              view.sellerState && `State: ${view.sellerState} (${inv.seller.stateCode})`,
              inv.seller.pan && `PAN: ${inv.seller.pan.toUpperCase()}`,
              [inv.seller.email, inv.seller.phone].filter(Boolean).join(" · "),
            ]}
          />
          <Party
            accent={t.accent}
            label="Bill to"
            lines={[
              inv.buyer.name || "Client name",
              inv.buyer.address,
              inv.buyer.gstin && `GSTIN: ${inv.buyer.gstin.toUpperCase()}`,
              view.buyerState && `Place of supply: ${view.buyerState} (${inv.buyer.stateCode})`,
              inv.buyer.email,
            ]}
          />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...th, width: 28 }}>#</th>
              <th style={{ ...th, textAlign: "left" }}>Description</th>
              {hasHsn && <th style={{ ...th, textAlign: "left" }}>HSN/SAC</th>}
              <th style={{ ...th, ...num }}>Qty</th>
              <th style={{ ...th, ...num }}>Rate</th>
              {hasDiscount && <th style={{ ...th, ...num }}>Disc %</th>}
              <th style={{ ...th, ...num }}>Taxable</th>
              <th style={{ ...th, ...num }}>GST</th>
              <th style={{ ...th, ...num }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.items.map((it, i) => {
              const l = lines[i];
              return (
                <tr key={it.id}>
                  <td style={cell}>{i + 1}</td>
                  <td style={{ ...cell, whiteSpace: "pre-line" }}>{it.description || <span style={{ color: "#999" }}>Item description</span>}</td>
                  {hasHsn && <td style={cell}>{it.hsn}</td>}
                  <td style={{ ...cell, ...num }}>{it.qty}</td>
                  <td style={{ ...cell, ...num }}>{formatINR(Number(it.rate) || 0)}</td>
                  {hasDiscount && <td style={{ ...cell, ...num }}>{Number(it.discount) || 0}</td>}
                  <td style={{ ...cell, ...num }}>{formatINR(l.taxable)}</td>
                  <td style={{ ...cell, ...num }}>{it.gstRate}%</td>
                  <td style={{ ...cell, ...num }}>{formatINR(l.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display: "flex", gap: 32, marginTop: 18, alignItems: "flex-start" }}>
          <div style={{ flex: 1, fontSize: 11.5 }}>
            <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: t.accent, fontWeight: 700 }}>Amount in words</div>
            <div style={{ fontWeight: 600, marginTop: 3, lineHeight: 1.4 }}>{words}</div>
            {totals.totalTax > 0 && (
              <table style={{ borderCollapse: "collapse", marginTop: 14, fontSize: 10.5, width: "100%" }}>
                <thead>
                  <tr style={{ color: "#555" }}>
                    <th style={{ ...slabCell, textAlign: "left" }}>GST slab</th>
                    <th style={{ ...slabCell, ...num }}>Taxable</th>
                    {intra ? (
                      <>
                        <th style={{ ...slabCell, ...num }}>CGST</th>
                        <th style={{ ...slabCell, ...num }}>SGST</th>
                      </>
                    ) : (
                      <th style={{ ...slabCell, ...num }}>IGST</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {totals.bySlab.map((s) => (
                    <tr key={s.rate}>
                      <td style={{ padding: "3px 4px" }}>{s.rate}%</td>
                      <td style={{ ...num, padding: "3px 4px" }}>{formatINR(s.taxable)}</td>
                      {intra ? (
                        <>
                          <td style={{ ...num, padding: "3px 4px" }}>{formatINR(s.cgst)}</td>
                          <td style={{ ...num, padding: "3px 4px" }}>{formatINR(s.sgst)}</td>
                        </>
                      ) : (
                        <td style={{ ...num, padding: "3px 4px" }}>{formatINR(s.igst)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div style={{ width: 280, fontSize: 12 }}>
            <Row label="Subtotal" value={formatINR(totals.subtotal)} />
            {totals.discount > 0 && <Row label="Discount" value={`- ${formatINR(totals.discount)}`} />}
            <Row label="Taxable value" value={formatINR(totals.taxable)} />
            {intra ? (
              <>
                <Row label="CGST" value={formatINR(totals.cgst)} />
                <Row label="SGST" value={formatINR(totals.sgst)} />
              </>
            ) : (
              <Row label="IGST" value={formatINR(totals.igst)} />
            )}
            {totals.roundOff !== 0 && <Row label="Round off" value={formatINR(totals.roundOff)} />}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
                padding: isMinimal ? "9px 0" : "9px 10px",
                fontWeight: 700,
                fontSize: 15,
                background: isMinimal ? "transparent" : isModern ? t.accent : "#111",
                color: isMinimal ? "#111" : "#fff",
                borderTop: isMinimal ? "1.5px solid #111" : undefined,
              }}
            >
              <span>Total</span>
              <span>₹{formatINR(totals.grandTotal)}</span>
            </div>
          </div>
        </div>

        {(bankFilled || inv.upi) && (
          <div style={{ marginTop: 26, fontSize: 11.5, lineHeight: 1.5 }}>
            <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: t.accent, fontWeight: 700, marginBottom: 3 }}>Payment details</div>
            {inv.bank.accountName && <div>Account name: {inv.bank.accountName}</div>}
            {inv.bank.bankName && <div>Bank: {inv.bank.bankName}</div>}
            {inv.bank.accountNumber && <div>Account no: {inv.bank.accountNumber}</div>}
            {inv.bank.ifsc && <div>IFSC: {inv.bank.ifsc.toUpperCase()}</div>}
            {inv.upi && <div>UPI: {inv.upi}</div>}
          </div>
        )}

        {(inv.notes || inv.terms) && (
          <div style={{ marginTop: 18, fontSize: 11, color: "#444", lineHeight: 1.5 }}>
            {inv.notes && (
              <p style={{ margin: "0 0 6px", whiteSpace: "pre-line" }}>
                <b style={{ color: "#111" }}>Notes: </b>
                {inv.notes}
              </p>
            )}
            {inv.terms && (
              <p style={{ margin: 0, whiteSpace: "pre-line" }}>
                <b style={{ color: "#111" }}>Terms: </b>
                {inv.terms}
              </p>
            )}
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: "center", fontSize: 10, color: "#888" }}>This is a computer generated invoice.</div>
      </div>
    </div>
  );
}
