import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BusinessStatus } from "@/types";

// ── className helper ──────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Status metadata ───────────────────────────────────────────────────────────
export const STATUS_META: Record<BusinessStatus, { label: string; color: string; dot: string }> = {
  not_contacted:       { label: "Not Contacted",       color: "background:rgba(239,68,68,0.12);color:#f87171;border-color:rgba(239,68,68,0.25)",     dot: "#f87171" },
  contacted:           { label: "Contacted",            color: "background:rgba(59,130,246,0.12);color:#60a5fa;border-color:rgba(59,130,246,0.25)",    dot: "#60a5fa" },
  replied_whatsapp:    { label: "Replied on WhatsApp",  color: "background:rgba(34,197,94,0.12);color:#4ade80;border-color:rgba(34,197,94,0.25)",     dot: "#4ade80" },
  interested:          { label: "Interested",           color: "background:rgba(245,158,11,0.12);color:#fbbf24;border-color:rgba(245,158,11,0.25)",    dot: "#fbbf24" },
  negotiating:         { label: "Negotiating",          color: "background:rgba(249,115,22,0.12);color:#fb923c;border-color:rgba(249,115,22,0.25)",    dot: "#fb923c" },
  paid:                { label: "Paid",                 color: "background:rgba(34,197,94,0.12);color:#4ade80;border-color:rgba(34,197,94,0.25)",     dot: "#4ade80" },
  project_in_progress: { label: "In Progress",          color: "background:rgba(99,102,241,0.12);color:#818cf8;border-color:rgba(99,102,241,0.25)",    dot: "#818cf8" },
  completed:           { label: "Completed",            color: "background:rgba(34,197,94,0.15);color:#22c55e;border-color:rgba(34,197,94,0.3)",      dot: "#22c55e" },
};

export const STATUS_ORDER: BusinessStatus[] = [
  "not_contacted","contacted","replied_whatsapp","interested",
  "negotiating","paid","project_in_progress","completed",
];

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatMoney(n: number | null | undefined): string {
  if (!n) return "—";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

export function formatDate(s: string | null | undefined): string {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function timeAgo(s: string): string {
  const diff = Math.floor((Date.now() - new Date(s).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

// ── Google Maps text parser ───────────────────────────────────────────────────
export function parseMapsPaste(raw: string) {
  const blocks = raw.split(/\n{2,}/).map(b => b.trim()).filter(b => b.length > 2);
  return blocks.map(block => {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    const result = { name:"", address:"", phone:"", whatsapp:"", category:"", website:"", google_maps_url:"", notes:"" };
    if (!lines.length) return null;
    result.name = lines[0];
    for (const line of lines.slice(1)) {
      if (/^\+?[\d\s\-().]{7,18}$/.test(line) && !result.phone) {
        result.phone = result.whatsapp = line.trim();
      } else if (/^https?:\/\//i.test(line)) {
        if (line.includes("google.com/maps") || line.includes("goo.gl")) result.google_maps_url = line;
        else result.website = line;
      } else if (/★|☆|\d\.\d|\(\d+\s*review/i.test(line)) {
        result.notes += (result.notes ? " · " : "") + line;
      } else if (
        !result.address && line.length > 8 &&
        /\d|street|road|avenue|close|drive|island|lagos|abuja|ph|lekki|ikeja|yaba|vi\b/i.test(line)
      ) {
        result.address = line;
      } else if (!result.category && line.length < 60 && /salon|restaurant|hotel|pharmacy|clinic|dealer|gym|bakery|store|shop|cafe|school|church|tech|law|fashion|real estate|auto/i.test(line)) {
        result.category = line;
      } else if (line.length > 2) {
        result.notes += (result.notes ? " · " : "") + line;
      }
    }
    return result.name ? result : null;
  }).filter(Boolean);
}
