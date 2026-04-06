// invoice-details.ts

export interface ExtraFee {
  id: string;
  name_en: string;
  name_ar: string;
  amount: number;
  fee_type: string;
}

export interface Transaction {
  id: string;
  invoice_id: string;
  provider: string;
  amount: number;
  status: string;
  paymob_transaction_id: string | null;
  created_at: string;
}

export interface InvoiceDetails {
  id: string;
  code: string;
  order_id: string;
  request_id: string | null;
  total_amount: number;
  extra_fees: ExtraFee[];
  qr_token: string;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecipientDetails {
  id: string;
  customer_type: string;
  user_id: string;
  customer_name: string;
  customer_industry: string | null;
  tax_number: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
  phone: string;
}

export interface OrderDetails {
  id: string;
  code: string;
  payment_type: string;
  quantity: number;
  total: number;
  platform_fee: number;
  bank_fee: number;
  delivery_fee: number;
  truck_quantity: number;
  order_status_en: string;
  order_status_ar: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Factory {
  id: string;
  name: string;
  address: string;
  contact_number: string;
}

export interface Shipment {
  id: string;
  name: string;
  plate_number: string;
  arrival_time: string;
}

export interface PaymentSummary {
  payment_type: string;
  price_per_ton: number;
  total_product: number;
  total_delivery: number;
  total_platform_fee: number;
  total_bank_fee: number;
  extra_fees: ExtraFee[];
  grand_total: number;
  initial_amount: number;
  remaining_amount: number;
  total_paid: number;
  total_pending: number;
  balance_due: number;
}

export interface Payment {
  summary: PaymentSummary;
  transactions: Transaction[];
}

export interface InvoiceResponseData {
  invoice_details: InvoiceDetails;
  recipient_details: RecipientDetails;
  order_details: OrderDetails;
  product: Product;
  factory: Factory;
  shipments: Shipment[];
  payment: Payment;
}

export interface InvoiceDetailsResponse {
  success: boolean;
  message: string;
  data: InvoiceResponseData;
}
