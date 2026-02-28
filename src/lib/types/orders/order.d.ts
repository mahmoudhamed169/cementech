

interface Driver {
  id: string;
  driver_name: string;
  code: string;
  phone: string;
}

export interface Order {
  id: string;
  code: string;

  payment_method: string;
  payment_method_id: "credit_card" | "tabby" | "tamara" | "apple_pay";
  payment_type: string;
  payment_transaction_id: string;

  customer_id: string;
  address_id: string;
  product_id: string;

  product_name: string;
  factory_name: string;

  address_name: string | null;
  address_title: string;

  order_status: "all" | "under_review" | "approved" | "rejected" | "delivery";

  quantity: number;
  truck_quantity: number;
  total: number;

  created_at: string; // ISO date string

  has_drivers: boolean;
  drivers: Driver[];

  customer_name: string | null;
  phone: string;
}

/* =========================
   Pagination
========================= */

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/* =========================
   Generic API Response
========================= */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

/* =========================
   Specific Response Type
========================= */

export type OrdersResponse = ApiResponse<Order[]>;
