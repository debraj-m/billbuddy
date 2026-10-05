import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const title = (req.nextUrl.searchParams.get("title") || "Free GST Invoice Generator").slice(0, 120);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#fff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>B</div>
          BillBuddy
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.9 }}>Free · No sign-up · Private PDF invoices for India</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
