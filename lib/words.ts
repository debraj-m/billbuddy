const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
  "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function belowThousand(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(`${ONES[Math.floor(n / 100)]} Hundred`);
    n %= 100;
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : ""));
  } else if (n > 0) {
    parts.push(ONES[n]);
  }
  return parts.join(" ");
}

/** Whole number to words using the Indian system (thousand, lakh, crore). */
export function integerToIndianWords(n: number): string {
  if (n === 0) return "Zero";
  const units: [number, string][] = [
    [10000000, "Crore"],
    [100000, "Lakh"],
    [1000, "Thousand"],
  ];
  const parts: string[] = [];
  let rest = n;
  for (const [size, label] of units) {
    if (rest >= size) {
      const count = Math.floor(rest / size);
      // Crores can exceed 99, so recurse for the count (e.g. 120 Crore).
      parts.push(`${count >= 100 && size === 10000000 ? integerToIndianWords(count) : belowThousand(count)} ${label}`);
      rest %= size;
    }
  }
  if (rest > 0) parts.push(belowThousand(rest));
  return parts.join(" ");
}

/** e.g. 123456.5 -> "Rupees One Lakh Twenty Three Thousand Four Hundred Fifty Six and Fifty Paise Only" */
export function amountInWords(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const totalPaise = Math.round(safe * 100);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  if (rupees === 0 && paise > 0) return `${integerToIndianWords(paise)} Paise Only`;
  let out = `Rupees ${integerToIndianWords(rupees)}`;
  if (paise > 0) out += ` and ${integerToIndianWords(paise)} Paise`;
  return `${out} Only`;
}

/** Indian digit grouping: 1234567.8 -> "12,34,567.80" */
export function formatINR(n: number, withSymbol = false): string {
  const s = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    Number.isFinite(n) ? n : 0,
  );
  return withSymbol ? `₹${s}` : s;
}
