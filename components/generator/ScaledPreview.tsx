"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./InvoicePreview";

/** Scales the fixed-width (A4) invoice down to fit its container. */
export function ScaledPreview({ children, label = "Invoice preview" }: { children: ReactNode; label?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(PREVIEW_HEIGHT);

  useEffect(() => {
    const el = outer.current;
    const inn = inner.current;
    if (!el || !inn) return;
    const update = () => {
      const s = Math.min(1, el.clientWidth / PREVIEW_WIDTH);
      setScale(s);
      setHeight(inn.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(inn);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height }} role="img" aria-label={label}>
      <div ref={inner} style={{ width: PREVIEW_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
