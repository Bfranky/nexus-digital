// All the data shapes used across the app

export type BusinessStatus =
  | "not_contacted"
  | "contacted"
  | "replied_whatsapp"
  | "interested"
  | "negotiating"
  | "paid"
  | "project_in_progress"
  | "completed";

export type PaymentStatus = "pending" | "paid" | "overdue";

export interface Business {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  category: string | null;
  website: string | null;
  google_maps_url: string | null;
  notes: string | null;
  status: BusinessStatus;
  whatsapp_replied: boolean;
  payment_status: PaymentStatus;
  services_requested: string[];
  project_demo_url: string | null;
  project_live_url: string | null;
  project_progress: number;
  amount_quoted: number | null;
  amount_paid: number | null;
  payment_date: string | null;
}

// For the import/paste page
export interface ParsedBusiness {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  category: string;
  website: string;
  google_maps_url: string;
  notes: string;
}

export type ImportRowStatus = "pending" | "saving" | "saved" | "duplicate" | "error";

export interface ImportRow extends ParsedBusiness {
  _id: string;          // local only, not in DB
  _status: ImportRowStatus;
  _error?: string;
}
