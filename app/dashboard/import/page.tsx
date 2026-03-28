"use client";
import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type RowStatus = "pending" | "saving" | "saved" | "duplicate" | "error";

interface ImportRow {
  _id:      string;
  _status:  RowStatus;
  _error?:  string;
  name:     string;
  category: string;
  phone:    string;
  whatsapp: string;
  address:  string;
  website:  string;
  rating:   string;
  reviews:  string;
  hours:    string;
  notes:    string;
  maps_url: string;
}

type DataField = Exclude<keyof ImportRow, "_id" | "_status" | "_error">;

// ─────────────────────────────────────────────────────────────────────────────
// DUAL-MODE PARSER
// Mode A: labelled format  →  "Name: Foo\nPhone: 0809..."
// Mode B: raw Maps text    →  "Foo\n4.8 (312 reviews)\nSalon..."
// ─────────────────────────────────────────────────────────────────────────────

function isLabelledFormat(text: string): boolean {
  // If the block contains "Name:" or "Phone:" or "Rating:" it's labelled
  return /^\s*(name|phone|rating|address|category|hours|website|email)\s*:/im.test(text);
}

// ── Mode A: parse "Key: Value" lines ─────────────────────────────────────────
function parseLabelledBlock(text: string): Omit<ImportRow, "_id" | "_status" | "_error"> {
  const r: Omit<ImportRow, "_id" | "_status" | "_error"> = {
    name:"", category:"", phone:"", whatsapp:"",
    address:"", website:"", rating:"", reviews:"",
    hours:"", notes:"", maps_url:"",
  };

  // Split on newlines OR on capital-letter label boundaries (handles single-line pastes)
  // e.g. "Name: FooCategory: Bar" → split before each "Keyword:"
  const normalised = text
    // Insert newline before each recognised label that's glued to previous content
    .replace(/(Name|Category|Rating|Address|Phone|Hours|Services|Menu|Ownership|Location|Website|Email|Description)\s*:/g, "\n$1:")
    .trim();

  const lines = normalised.split("\n").map(l => l.trim()).filter(Boolean);
  const noteLines: string[] = [];

  for (const line of lines) {
    // Match  "Key: value"  or  "Key : value"
    const m = line.match(/^([A-Za-z ]+?)\s*:\s*(.+)$/);
    if (!m) {
      // No label — treat as a note
      if (line.length > 2) noteLines.push(line);
      continue;
    }

    const key   = m[1].trim().toLowerCase();
    const value = m[2].trim();

    if (/^name/.test(key))                     { r.name = value; continue; }
    if (/^categor/.test(key))                  { r.category = value; continue; }
    if (/^phone|^tel|^mobile|^contact/.test(key)) {
      r.phone = r.whatsapp = value; continue;
    }
    if (/^address|^location$/.test(key))       { r.address = value; continue; }
    if (/^website|^web|^url/.test(key))        { r.website = value; continue; }
    if (/^email/.test(key))                    { noteLines.push(`Email: ${value}`); continue; }
    if (/^hour|^time|^open/.test(key))         { r.hours = value; continue; }

    if (/^rating/.test(key)) {
      // value like "4.9 (34 reviews)" or "4.9" or "4.9/5"
      const num = value.match(/([1-5][.,\d]+)/);
      if (num) r.rating = num[1].replace(",", ".");
      const rev = value.match(/([\d,]+)\s*(reviews?|ratings?)/i);
      if (rev) r.reviews = rev[1].replace(/,/g, "");
      continue;
    }

    if (/^service|^menu|^highlight|^feature|^ownership|^description|^about/.test(key)) {
      noteLines.push(`${m[1]}: ${value}`); continue;
    }

    // Location Code / Plus Code — skip
    if (/^location code|^plus code/.test(key)) continue;

    // Everything else → notes
    noteLines.push(line);
  }

  r.notes = noteLines.join(" · ");
  return r;
}

// ── Mode B: raw Google Maps text (line-by-line detection) ────────────────────
function parseRawBlock(text: string): Omit<ImportRow, "_id" | "_status" | "_error"> {
  const clean = text.replace(/[\u200b\u200c\u200d\ufeff]/g, "").trim();
  const lines  = clean.split("\n").map(l => l.trim()).filter(Boolean);

  const r: Omit<ImportRow, "_id" | "_status" | "_error"> = {
    name:"", category:"", phone:"", whatsapp:"",
    address:"", website:"", rating:"", reviews:"",
    hours:"", notes:"", maps_url:"",
  };

  if (!lines.length) return r;
  r.name = lines[0];

  const used = new Set<number>();

  const isPhone = (s: string) =>
    /^[+\d(][\d\s\-().+]{5,18}\d$/.test(s) &&
    s.replace(/\D/g,"").length >= 7 &&
    s.replace(/\D/g,"").length <= 15;

  const isMapsUrl  = (s: string) => /google\.com\/maps|goo\.gl|maps\.app/i.test(s);
  const isUrl      = (s: string) => /^https?:\/\//i.test(s);
  const isWww      = (s: string) => /^www\./i.test(s);
  const isPlusCode = (s: string) => /^[A-Z0-9]{4,6}\+[A-Z0-9]{2,4}/i.test(s);
  const isRating   = (s: string) => /^[1-5][.,]\d(\s|$)/.test(s);
  const isReview   = (s: string) => /([\d,]+)\s*(reviews?|ratings?)/i.test(s);
  const isHours    = (s: string) => /^(open|closed|closes?|opens?|\d{1,2}:\d{2}|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)/i.test(s);
  const isCat      = (s: string) => /restaurant|salon|hotel|pharmacy|clinic|hospital|school|church|mosque|bakery|supermarket|market|gym|spa|bank|cafe|coffee|bar|pub|lounge|dealer|agency|store|shop|fashion|tech|law|real estate|auto|mechanic|barber|beauty|boutique|petrol|eatery|fast food|buka/i.test(s);
  const isAddr     = (s: string) => /street|road|avenue|close|drive|crescent|way|lane|estate|island|mainland|\bvi\b|lekki|ikeja|yaba|surulere|abuja|\bph\b|port harcourt|kano|ibadan|lagos|nigeria/i.test(s);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (isPlusCode(line))                              { used.add(i); continue; }
    if (isUrl(line) && isMapsUrl(line) && !r.maps_url){ r.maps_url = line; used.add(i); continue; }
    if (isUrl(line) && !isMapsUrl(line) && !r.website){ r.website  = line; used.add(i); continue; }
    if (isWww(line) && !r.website)                    { r.website  = "https://"+line; used.add(i); continue; }
    if (isPhone(line) && !r.phone)                    { r.phone = r.whatsapp = line; used.add(i); continue; }
    if (isRating(line) && !r.rating) {
      const n = line.match(/([1-5][.,]\d)/); if (n) r.rating = n[1].replace(",",".");
      const v = line.match(/([\d,]+)\s*(reviews?|ratings?)/i); if (v && !r.reviews) r.reviews = v[1].replace(/,/g,"");
      used.add(i); continue;
    }
    if (isReview(line) && !r.reviews && !isRating(line)) {
      const v = line.match(/([\d,]+)/); if (v) { r.reviews = v[1].replace(/,/g,""); used.add(i); continue; }
    }
    if (isHours(line) && !r.hours) { r.hours = line; used.add(i); continue; }
  }
  for (let i = 1; i < lines.length; i++) {
    if (used.has(i)) continue;
    const line = lines[i];
    if (isCat(line) && !r.category && line.length < 80) { r.category = line; used.add(i); continue; }
    if (!r.address && isAddr(line) && line.length > 4)   { r.address  = line; used.add(i); continue; }
  }
  if (!r.address) {
    let best = "", bi = -1;
    for (let i = 1; i < lines.length; i++) {
      if (used.has(i)) continue;
      const l = lines[i];
      if (/\d/.test(l) && l.length > best.length && l.length < 140) { best = l; bi = i; }
    }
    if (bi !== -1) { r.address = best; used.add(bi); }
  }
  if (!r.category) {
    for (let i = 1; i < lines.length; i++) {
      if (used.has(i)) continue;
      const l = lines[i];
      if (l.length >= 3 && l.length < 70 && !/^\d+$/.test(l)) { r.category = l; used.add(i); break; }
    }
  }
  const extra: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!used.has(i) && lines[i].length > 2) extra.push(lines[i]);
  }
  r.notes = extra.join(" · ");
  return r;
}

// ── Main entry — auto-detect format ──────────────────────────────────────────
function parseBlock(text: string): Omit<ImportRow, "_id" | "_status" | "_error"> {
  return isLabelledFormat(text) ? parseLabelledBlock(text) : parseRawBlock(text);
}

function parsePaste(raw: string): ImportRow[] {
  // Support both blank-line separation and also single-block pastes
  const blocks = raw.split(/\n{2,}/).map(b => b.trim()).filter(b => b.length > 2);
  // If only one block but it looks like multiple businesses glued together
  // (contains multiple "Name:" labels), split on "Name:"
  const expanded: string[] = [];
  for (const block of blocks) {
    const nameCount = (block.match(/\bName\s*:/gi) || []).length;
    if (nameCount > 1) {
      // Split on each "Name:" occurrence
      const parts = block.split(/(?=\bName\s*:)/i).map(p => p.trim()).filter(Boolean);
      expanded.push(...parts);
    } else {
      expanded.push(block);
    }
  }
  return expanded.map((block, i) => ({
    ...parseBlock(block),
    _id:     `row_${Date.now()}_${i}`,
    _status: "pending" as RowStatus,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Column config
// ─────────────────────────────────────────────────────────────────────────────

const COLS: { key: DataField; label: string; icon: string; width: number; mono?: boolean }[] = [
  { key:"name",     label:"Business Name", icon:"🏢", width:185 },
  { key:"category", label:"Category",      icon:"🏷", width:138 },
  { key:"phone",    label:"Phone",         icon:"📞", width:152, mono:true },
  { key:"address",  label:"Address",       icon:"📍", width:195 },
  { key:"rating",   label:"Rating",        icon:"⭐", width:70,  mono:true },
  { key:"reviews",  label:"Reviews",       icon:"💬", width:82,  mono:true },
  { key:"hours",    label:"Hours",         icon:"🕐", width:155 },
  { key:"website",  label:"Website",       icon:"🌐", width:175 },
  { key:"notes",    label:"Notes",         icon:"📝", width:200 },
];

const STATUS_CFG: Record<RowStatus, {label:string; bg:string; color:string; border:string}> = {
  pending:   { label:"Pending",   bg:"rgba(255,255,255,0.04)", color:"#6b6b90", border:"rgba(255,255,255,0.08)" },
  saving:    { label:"Saving…",   bg:"rgba(99,102,241,0.1)",  color:"#818cf8", border:"rgba(99,102,241,0.3)"   },
  saved:     { label:"✓ Saved",   bg:"rgba(34,197,94,0.1)",   color:"#4ade80", border:"rgba(34,197,94,0.28)"   },
  duplicate: { label:"Duplicate", bg:"rgba(245,158,11,0.1)", color:"#fbbf24", border:"rgba(245,158,11,0.28)"  },
  error:     { label:"Error",     bg:"rgba(239,68,68,0.1)",  color:"#f87171", border:"rgba(239,68,68,0.28)"   },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function EditCell({ value, onChange, width, mono }: {
  value:string; onChange:(v:string)=>void; width:number; mono?:boolean;
}) {
  const [f, setF] = useState(false);
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      placeholder="—"
      style={{
        width:width-18, padding:"5px 8px",
        background: f ? "rgba(99,102,241,0.09)" : "transparent",
        border:`1px solid ${f ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.06)"}`,
        borderRadius:6,
        color: value ? "var(--text)" : "#44445a",
        fontSize:"0.775rem",
        fontFamily: mono ? "monospace" : "inherit",
        outline:"none", transition:"all 0.15s", display:"block",
      }}
    />
  );
}

function FormatBadge({ text }: { text: string }) {
  if (!text.trim()) return null;
  const isLabelled = isLabelledFormat(text);
  return (
    <span style={{
      fontSize:"0.72rem", padding:"3px 10px", borderRadius:7,
      background: isLabelled ? "rgba(34,197,94,0.1)" : "rgba(99,102,241,0.1)",
      color:      isLabelled ? "#4ade80"            : "#818cf8",
      border:`1px solid ${isLabelled ? "rgba(34,197,94,0.25)" : "rgba(99,102,241,0.25)"}`,
      fontWeight:600,
    }}>
      {isLabelled ? "✓ Labelled format detected" : "📄 Raw Maps text detected"}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ImportPage() {
  const [raw,        setRaw]        = useState("");
  const [rows,       setRows]       = useState<ImportRow[]>([]);
  const [stage,      setStage]      = useState<"paste" | "review">("paste");
  const [busy,       setBusy]       = useState(false);
  const [connStatus, setConnStatus] = useState<"idle"|"checking"|"ok"|"fail">("idle");
  const [connError,  setConnError]  = useState("");
  const taRef                       = useRef<HTMLTextAreaElement>(null);

  // ── Helpers ──
  const patch      = (id: string, p: Partial<ImportRow>) =>
    setRows(prev => prev.map(r => r._id === id ? { ...r, ...p } : r));
  const updateCell = (id: string, key: DataField, val: string) => patch(id, { [key]: val });
  const removeRow  = (id: string) => setRows(prev => prev.filter(r => r._id !== id));
  const clearAll   = () => {
    setRaw(""); setRows([]); setStage("paste"); setConnStatus("idle");
    setTimeout(() => taRef.current?.focus(), 50);
  };

  // ── Test connection before anything else ──
  const checkConnection = async () => {
    setConnStatus("checking");
    const { testConnection } = await import("@/lib/supabase");
    const result = await testConnection();
    if (result.ok) {
      setConnStatus("ok");
      setConnError("");
    } else {
      setConnStatus("fail");
      setConnError(result.error ?? "Cannot reach database");
    }
    return result.ok;
  };

  // ── Parse ──
  const handleParse = () => {
    const parsed = parsePaste(raw);
    if (!parsed.length) return;
    setRows(parsed);
    setStage("review");
  };

  // ── Save one row ──
  const saveRow = async (row: ImportRow) => {
    if (!row.name.trim()) {
      patch(row._id, { _status: "error", _error: "Business name is required" });
      return;
    }

    patch(row._id, { _status: "saving" });

    const { createClient } = await import("@/lib/supabase");
    const sb = createClient();

    const extras = [
      row.rating  ? `Rating: ${row.rating}★` : "",
      row.reviews ? `${row.reviews} reviews`  : "",
      row.hours   ? `Hours: ${row.hours}`      : "",
    ].filter(Boolean).join(" · ");
    const notesStr = [row.notes, extras].filter(Boolean).join(" · ") || null;

    try {
      const { error } = await sb.from("businesses").insert({
        name:            row.name.trim(),
        category:        row.category  || null,
        phone:           row.phone     || null,
        whatsapp:        row.whatsapp  || null,
        address:         row.address   || null,
        website:         row.website   || null,
        google_maps_url: row.maps_url  || null,
        notes:           notesStr,
        status:              "not_contacted",
        whatsapp_replied:    false,
        payment_status:      "pending",
        services_requested:  [],
        project_progress:    0,
      });

      if (error) {
        // Friendly error messages
        let msg = error.message;
        if (error.code === "23505")           msg = "Duplicate — already saved";
        else if (error.code === "42501")      msg = "Permission denied — check Supabase RLS";
        else if (error.code === "PGRST116")   msg = "Table not found — run the SQL schema";
        else if (msg.includes("fetch"))       msg = "Network error — check your internet";
        else if (msg.includes("JWT"))         msg = "Auth error — check your ANON KEY in .env.local";
        patch(row._id, { _status: "error", _error: msg });
        return;
      }

      patch(row._id, { _status: "saved" });

      // Also add to Zustand store so dashboard reflects it instantly
      const { useStore } = await import("@/store");
      const store = useStore.getState();
      if (store.fetched) {
        store.refresh(); // re-sync store
      }

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      const friendly =
        msg.includes("Failed to fetch") ? "Cannot reach Supabase — check your URL in .env.local" :
        msg.includes("NetworkError")    ? "Network error — check your internet connection" :
        msg;
      patch(row._id, { _status: "error", _error: friendly });
    }
  };

  // ── Save all pending rows ──
  const saveAll = async () => {
    // Test connection first
    const ok = await checkConnection();
    if (!ok) return; // stop — connection error shown

    setBusy(true);
    const pending = rows.filter(r => r._status === "pending");
    // Save in parallel batches of 3 for speed
    for (let i = 0; i < pending.length; i += 3) {
      await Promise.all(pending.slice(i, i + 3).map(row => saveRow(row)));
    }
    setBusy(false);
  };

  const counts = {
    total:     rows.length,
    pending:   rows.filter(r => r._status === "pending").length,
    saved:     rows.filter(r => r._status === "saved").length,
    duplicate: rows.filter(r => r._status === "duplicate").length,
    error:     rows.filter(r => r._status === "error").length,
  };

  const pill = (bg: string, color: string, border: string) => ({
    padding:"4px 11px", borderRadius:99, fontSize:"0.76rem",
    fontWeight:600 as const, background:bg, color,
    border:`1px solid ${border}`,
  });

  return (
    <div style={{ paddingBottom:60 }}>

      {/* Header */}
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.55rem", color:"#fff", letterSpacing:"-0.02em" }}>
          Import from Google Maps
        </h1>
        <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", marginTop:5 }}>
          Paste copied text — every field is extracted automatically into a table, one row per business.
        </p>
      </div>

      {/* Connection status banner */}
      {connStatus === "checking" && (
        <div style={{ marginBottom:16, padding:"12px 16px", borderRadius:12, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", fontSize:"0.85rem", color:"#818cf8" }}>
          ⏳ Testing connection to database…
        </div>
      )}
      {connStatus === "fail" && (
        <div style={{ marginBottom:16, padding:"14px 18px", borderRadius:12, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", color:"#f87171" }}>
          <div style={{ fontWeight:700, marginBottom:6, fontSize:"0.9rem" }}>❌ Cannot connect to database</div>
          <div style={{ fontSize:"0.82rem", lineHeight:1.6 }}>{connError}</div>
          <div style={{ fontSize:"0.78rem", color:"rgba(248,113,113,0.75)", marginTop:8 }}>
            Check: 1) .env.local has correct SUPABASE_URL and ANON_KEY &nbsp;·&nbsp;
            2) Supabase project is not paused &nbsp;·&nbsp;
            3) SQL schema has been run &nbsp;·&nbsp;
            4) RLS is disabled on the businesses table (or you're signed in)
          </div>
          <button onClick={checkConnection} style={{ marginTop:10, padding:"6px 14px", borderRadius:8, background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", cursor:"pointer", fontSize:"0.8rem", fontFamily:"inherit" }}>
            Retry Connection
          </button>
        </div>
      )}
      {connStatus === "ok" && (
        <div style={{ marginBottom:16, padding:"10px 16px", borderRadius:12, background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.2)", fontSize:"0.82rem", color:"#4ade80" }}>
          ✓ Connected to database
        </div>
      )}

      {/* How-to */}
      <div style={{ background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:14, padding:"14px 18px", marginBottom:22 }}>
        <p style={{ fontWeight:700, color:"#818cf8", fontSize:"0.8rem", marginBottom:10 }}>📌 How to copy a business from Google Maps</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))", gap:10 }}>
          {[
            { n:"1", t:"Open Google Maps in your browser" },
            { n:"2", t:"Click on any business to open its side panel" },
            { n:"3", t:"Click inside the panel → Ctrl+A → Ctrl+C to copy" },
            { n:"4", t:"Paste below. Multiple businesses = blank line between each" },
          ].map(({ n, t }) => (
            <div key={n} style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
              <span style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, background:"rgba(99,102,241,0.2)", border:"1px solid rgba(99,102,241,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", fontWeight:800, color:"#818cf8" }}>{n}</span>
              <p style={{ fontSize:"0.78rem", color:"var(--text-muted)", lineHeight:1.55 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Format guide */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:14, marginBottom:22 }}>
        <div style={{ background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:14, padding:"14px 16px" }}>
          <p style={{ fontWeight:700, color:"#818cf8", fontSize:"0.8rem", marginBottom:8 }}>✅ Format A — Labelled</p>
          <pre style={{ fontFamily:"monospace", fontSize:"0.72rem", color:"var(--text-muted)", lineHeight:1.7, margin:0, whiteSpace:"pre-wrap" }}>{`Name: Chizzychops & Grillz\nCategory: Restaurant\nRating: 4.9 (34 reviews)\nPhone: 0809 494 6923\nAddress: Santos Estate, Lagos\nHours: Open, closes 8 PM`}</pre>
        </div>
        <div style={{ background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:14, padding:"14px 16px" }}>
          <p style={{ fontWeight:700, color:"#818cf8", fontSize:"0.8rem", marginBottom:8 }}>✅ Format B — Raw Maps text</p>
          <pre style={{ fontFamily:"monospace", fontSize:"0.72rem", color:"var(--text-muted)", lineHeight:1.7, margin:0, whiteSpace:"pre-wrap" }}>{`Elegance Salon & Spa\n4.8 (312 reviews)\nBeauty salon\n14 Admiralty Way, Lekki\n+234 803 123 4567\nOpen · Closes 8 pm`}</pre>
        </div>
      </div>

      {/* ══ PASTE STAGE ══ */}
      {stage === "paste" && (
        <div className="glass" style={{ borderRadius:16, padding:22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <label style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--text-muted)" }}>
              Paste business info here
            </label>
            <FormatBadge text={raw} />
          </div>
          <textarea
            ref={taRef}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            rows={14}
            placeholder={"Name: Chizzychops & Grillz\nCategory: Restaurant\nRating: 4.9 (34 reviews)\nPhone: 0809 494 6923\nAddress: Santos Estate, Lagos\nHours: Open, closes 8 PM\n\n--- or paste raw Maps text ---\n\nElegance Salon\n4.8 (312 reviews)\n14 Admiralty Way, Lekki\n+234 803 123 4567"}
            style={{ width:"100%", padding:"12px 14px", background:"var(--bg-raised)", border:"1px solid var(--border)", borderRadius:12, color:"var(--text)", fontSize:"0.82rem", fontFamily:"monospace", lineHeight:1.8, outline:"none", resize:"vertical", transition:"border-color 0.18s" }}
            onFocus={e  => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
            onBlur={e   => (e.target.style.borderColor = "var(--border)")}
          />
          <div style={{ display:"flex", gap:10, marginTop:14, alignItems:"center" }}>
            <button className="btn-primary" onClick={handleParse} disabled={!raw.trim()}>✨ Extract to Table</button>
            <button className="btn-ghost"   onClick={() => setRaw("")} disabled={!raw}>Clear</button>
            <span style={{ marginLeft:"auto", fontSize:"0.74rem", color:"var(--text-muted)" }}>Blank line between businesses</span>
          </div>
        </div>
      )}

      {/* ══ TABLE STAGE ══ */}
      {stage === "review" && (
        <>
          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:14 }}>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap", alignItems:"center" }}>
              <span style={pill("rgba(255,255,255,0.06)", "var(--text-muted)", "var(--border)")}><strong style={{ color:"#fff" }}>{counts.total}</strong>&nbsp;businesses</span>
              {counts.saved     > 0 && <span style={pill("rgba(34,197,94,0.1)",   "#4ade80", "rgba(34,197,94,0.25)")}>✓ {counts.saved} saved</span>}
              {counts.duplicate > 0 && <span style={pill("rgba(245,158,11,0.1)", "#fbbf24", "rgba(245,158,11,0.25)")}>⚠ {counts.duplicate} duplicate</span>}
              {counts.error     > 0 && <span style={pill("rgba(239,68,68,0.1)",  "#f87171", "rgba(239,68,68,0.25)")}>✕ {counts.error} failed</span>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-ghost" onClick={clearAll}>← Start Over</button>
              <button className="btn-ghost" onClick={() => setStage("paste")} style={{ borderColor:"rgba(99,102,241,0.3)", color:"#818cf8" }}>+ Paste More</button>
              <button className="btn-primary" onClick={saveAll} disabled={busy || counts.pending === 0}>
                {busy ? "Saving…" : `💾 Save All (${counts.pending})`}
              </button>
            </div>
          </div>

          <div style={{ marginBottom:12, padding:"10px 14px", borderRadius:10, background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.15)", fontSize:"0.78rem", color:"var(--text-muted)" }}>
            💡 Click any cell to edit before saving. If a row shows Error, hover the status badge to see the reason.
          </div>

          {/* Table */}
          <div style={{ overflowX:"auto", borderRadius:16 }}>
            <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
              <table style={{ borderCollapse:"collapse", tableLayout:"fixed" }}>
                <thead>
                  <tr style={{ background:"var(--bg-raised)" }}>
                    <th style={{ width:115, padding:"11px 14px", fontSize:"0.67rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--text-muted)", textAlign:"left", borderBottom:"1px solid var(--border)", position:"sticky", left:0, background:"var(--bg-raised)", zIndex:3 }}>Status</th>
                    {COLS.map(c => (
                      <th key={c.key} style={{ width:c.width, padding:"11px 12px", fontSize:"0.67rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--text-muted)", textAlign:"left", borderBottom:"1px solid var(--border)", whiteSpace:"nowrap" }}>
                        {c.icon} {c.label}
                      </th>
                    ))}
                    <th style={{ width:100, padding:"11px 12px", fontSize:"0.67rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"var(--text-muted)", textAlign:"left", borderBottom:"1px solid var(--border)" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => {
                    const ss      = STATUS_CFG[row._status];
                    const isSaved = row._status === "saved";
                    const accent  =
                      row._status === "saved"     ? "#22c55e" :
                      row._status === "error"     ? "#ef4444" :
                      row._status === "duplicate" ? "#f59e0b" :
                      row._status === "saving"    ? "#6366f1" : "transparent";
                    const evenBg   = idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)";
                    const stickyBg = idx % 2 === 0 ? "var(--bg-card)" : "rgba(18,18,35,0.98)";
                    return (
                      <tr key={row._id} style={{ borderBottom:"1px solid var(--border)", borderLeft:`3px solid ${accent}`, background:evenBg, opacity:isSaved ? 0.58 : 1, transition:"opacity 0.3s" }}>
                        {/* Status */}
                        <td style={{ padding:"9px 12px", verticalAlign:"middle", position:"sticky", left:0, zIndex:1, background:stickyBg }}>
                          <span
                            style={{ display:"inline-block", padding:"3px 9px", borderRadius:99, fontSize:"0.68rem", fontWeight:700, whiteSpace:"nowrap", background:ss.bg, color:ss.color, border:`1px solid ${ss.border}`, cursor:row._error?"help":"default" }}
                            title={row._error}
                          >
                            {row._status === "saving"  ? "⏳ Saving…" :
                             row._status === "saved"    ? "✓ Saved"    :
                             row._status === "duplicate"? "⚠ Duplicate":
                             row._status === "error"    ? `✕ ${row._error?.slice(0,22) ?? "Error"}` :
                             "○ Pending"}
                          </span>
                        </td>
                        {/* Data cells */}
                        {COLS.map(col => (
                          <td key={col.key} style={{ padding:"7px 6px", verticalAlign:"middle" }}>
                            {isSaved ? (
                              <span style={{ display:"block", padding:"5px 8px", fontSize:"0.775rem", color:row[col.key] ? "var(--text)" : "#44445a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:col.width - 16 }} title={row[col.key]}>
                                {col.key === "rating" && row.rating ? `${row.rating} ★` : (row[col.key] || "—")}
                              </span>
                            ) : (
                              <EditCell
                                value={col.key === "rating" && row.rating ? `${row.rating} ★` : row[col.key]}
                                onChange={v => { const clean = col.key === "rating" ? v.replace(/\s*★+\s*$/, "").trim() : v; updateCell(row._id, col.key, clean); }}
                                width={col.width} mono={col.mono}
                              />
                            )}
                          </td>
                        ))}
                        {/* Actions */}
                        <td style={{ padding:"7px 10px", verticalAlign:"middle" }}>
                          <div style={{ display:"flex", gap:6 }}>
                            {(row._status === "pending" || row._status === "error") && (
                              <button
                                onClick={() => saveRow(row)}
                                style={{ padding:"4px 11px", borderRadius:7, cursor:"pointer", fontSize:"0.73rem", fontWeight:600, fontFamily:"inherit", background:"rgba(99,102,241,0.1)", color:"#818cf8", border:"1px solid rgba(99,102,241,0.28)", transition:"all 0.15s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.2)"}
                                onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
                              >
                                {row._status === "error" ? "Retry" : "Save"}
                              </button>
                            )}
                            {!isSaved && (
                              <button
                                onClick={() => removeRow(row._id)}
                                title="Remove"
                                style={{ padding:"4px 8px", borderRadius:7, cursor:"pointer", background:"transparent", fontFamily:"inherit", border:"1px solid var(--border)", color:"var(--text-muted)", fontSize:"0.8rem", transition:"all 0.15s" }}
                                onMouseEnter={e => { e.currentTarget.style.color="#f87171"; e.currentTarget.style.borderColor="rgba(239,68,68,0.35)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color="var(--text-muted)"; e.currentTarget.style.borderColor="var(--border)"; }}
                              >✕</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* All done */}
          {counts.pending === 0 && counts.saved > 0 && (
            <div style={{ marginTop:16, padding:"14px 20px", borderRadius:12, background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.22)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <span style={{ color:"#4ade80", fontWeight:700, fontSize:"0.9rem" }}>
                🎉 {counts.saved} business{counts.saved > 1 ? "es" : ""} saved to database
              </span>
              <button className="btn-ghost" onClick={clearAll} style={{ fontSize:"0.8rem" }}>Import More</button>
            </div>
          )}

          {/* Error summary */}
          {counts.error > 0 && counts.pending === 0 && (
            <div style={{ marginTop:12, padding:"14px 18px", borderRadius:12, background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)" }}>
              <p style={{ color:"#f87171", fontWeight:700, fontSize:"0.875rem", marginBottom:8 }}>❌ {counts.error} row{counts.error>1?"s":""} failed to save</p>
              <p style={{ color:"rgba(248,113,113,0.75)", fontSize:"0.8rem", lineHeight:1.6 }}>
                Hover the red status badge on each failed row to see the exact error.<br/>
                Common fixes: check your Supabase URL/key in .env.local · make sure the SQL schema was run · disable RLS on the businesses table.
              </p>
              <button onClick={saveAll} className="btn-ghost" style={{ marginTop:10, fontSize:"0.8rem", borderColor:"rgba(239,68,68,0.3)", color:"#f87171" }}>
                Retry All Failed
              </button>
            </div>
          )}

          {counts.pending > 0 && (
            <div style={{ marginTop:16, display:"flex", justifyContent:"flex-end", gap:8 }}>
              <button className="btn-ghost" onClick={clearAll}>Start Over</button>
              <button className="btn-primary" onClick={saveAll} disabled={busy}>
                {busy ? "Saving…" : `💾 Save ${counts.pending} to Database`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}