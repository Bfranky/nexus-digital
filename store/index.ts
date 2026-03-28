"use client";
import { create } from "zustand";
import { createClient } from "@/lib/supabase";
import type { Business, BusinessStatus } from "@/types";

interface Store {
  businesses:  Business[];
  loading:     boolean;
  fetched:     boolean;   // ← key: true after first successful fetch
  search:      string;
  statusFilter: BusinessStatus | "all";

  // Actions
  fetch:       () => Promise<void>;   // call once — skips if already fetched
  refresh:     () => Promise<void>;   // force re-fetch from Supabase
  set:         (b: Business[]) => void;
  add:         (b: Business) => void;
  update:      (id: string, data: Partial<Business>) => void;
  remove:      (id: string) => void;
  setLoading:  (v: boolean) => void;
  setSearch:   (v: string) => void;
  setStatusFilter: (v: BusinessStatus | "all") => void;

  // Derived
  filtered: () => Business[];
  stats: () => {
    total: number; contacted: number; replied: number;
    paid: number; completed: number; revenue: number; pending: number;
  };
}

export const useStore = create<Store>((setState, get) => ({
  businesses:   [],
  loading:      false,
  fetched:      false,
  search:       "",
  statusFilter: "all",

  // ── Fetch once ───────────────────────────────────────────────────────────
  fetch: async () => {
    // Already have data — skip the network call entirely
    if (get().fetched) return;
    setState({ loading: true });
    try {
      const { data, error } = await createClient()
        .from("businesses")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setState({ businesses: (data as Business[]) ?? [], fetched: true });
    } catch (e) {
      console.error("Supabase fetch error:", e);
    } finally {
      setState({ loading: false });
    }
  },

  // ── Force re-fetch (e.g. after import) ───────────────────────────────────
  refresh: async () => {
    setState({ loading: true, fetched: false });
    try {
      const { data, error } = await createClient()
        .from("businesses")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setState({ businesses: (data as Business[]) ?? [], fetched: true });
    } catch (e) {
      console.error("Supabase refresh error:", e);
    } finally {
      setState({ loading: false });
    }
  },

  // ── Local mutations (instant, no loading) ────────────────────────────────
  set:    (b) => setState({ businesses: b, fetched: true }),
  add:    (b) => setState(s => ({ businesses: [b, ...s.businesses] })),
  update: (id, data) => setState(s => ({
    businesses: s.businesses.map(b =>
      b.id === id ? { ...b, ...data, updated_at: new Date().toISOString() } : b
    ),
  })),
  remove: (id) => setState(s => ({
    businesses: s.businesses.filter(b => b.id !== id),
  })),
  setLoading:      (v) => setState({ loading: v }),
  setSearch:       (v) => setState({ search: v }),
  setStatusFilter: (v) => setState({ statusFilter: v }),

  // ── Derived ───────────────────────────────────────────────────────────────
  filtered: () => {
    const { businesses, search, statusFilter } = get();
    return businesses.filter(b => {
      const q = search.toLowerCase();
      const matchQ = !q || b.name.toLowerCase().includes(q) || (b.category ?? "").toLowerCase().includes(q);
      const matchS = statusFilter === "all" || b.status === statusFilter;
      return matchQ && matchS;
    });
  },

  stats: () => {
    const { businesses } = get();
    return {
      total:     businesses.length,
      contacted: businesses.filter(b => b.status !== "not_contacted").length,
      replied:   businesses.filter(b => b.whatsapp_replied).length,
      paid:      businesses.filter(b => b.payment_status === "paid").length,
      completed: businesses.filter(b => b.status === "completed").length,
      revenue:   businesses.reduce((s, b) => s + (b.amount_paid ?? 0), 0),
      pending:   businesses.reduce((s, b) => s + (b.payment_status !== "paid" ? (b.amount_quoted ?? 0) : 0), 0),
    };
  },
}));