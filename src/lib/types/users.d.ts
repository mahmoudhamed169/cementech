// types/users.ts
export interface Driver {
  id: string;
  phone: string;
  code: string;
  name: string;
  status: "free" | "busy";
  document_verify: "accepted" | "pending" | "rejected";
  driver_request_status: "loaded" | "not loaded" | "pending";
  driver_status: "free" | "offline" | "pending" | "blocked";
  total_delivered_orders: number;
  role: "driver";
  verified: boolean;
  is_blocked: boolean;
  OTPTransactionId: string | null;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  phone: string;
  code: string;
  name: string;
  order_count: number;
  total_payments: number;
  company_name: string | null;
  status: "active" | "inactive" | "blocked";
  role: "customer";
  verified: boolean;
  is_blocked: boolean;
  OTPTransactionId: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiUserResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export type User = Driver | Customer;

