interface Driver {
  id: string;
  driver_name: string;
  code: string;
  phone: string;
}

interface DriversCount {
  pending: number;
  accepted: number;
  rejected: number;
  delivered: number;
  total_assigned: number;
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

  order_status:
    | "all"
    | "under_review"
    | "in_preparation"
    | "delivery"
    | "deliverd"
    | "canceled";

  quantity: number;
  truck_quantity: number;
  total: number;

  created_at: string;
  updated_at: string;

  has_drivers: boolean;
  drivers: Driver[];
  drivers_counts: DriversCount; // ✅ الجديد

  invoice_id: string;
  invoice_status: string;
  invoice: {
    id: string;
    qr_token: string;
  };

  customer_name: string | null;
  phone: string;
}
