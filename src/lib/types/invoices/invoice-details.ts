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
  raw_response: string | null;
  created_at: string;
}

export interface Driver {
  id: string;
  name: string;
  plate_number: string;
  arrival_time: string;
}

export interface InvoiceDetails {
  id: string;
  code: string;
  total_amount: number;
  created_at: string;
  order_id: string;
  order_code: string;
  order_date: string;
  customer_name: string;
  company_name: string | null;
  customer_phone: string;
  customer_tax_number: string | null;
  customer_id_display: string;
  address_title: string;
  address_name: string;
  product_name: string;
  product_price: number;
  factory_name: string;
  factory_address: string;
  quantity: number;
  truck_quantity: number;
  extra_fees: ExtraFee[];
  qr_token: string;
  is_verified: boolean;
  verified_at: string | null;
  order_total: number;
  payment_type: string;
  has_drivers: boolean;
  transactions: Transaction[];
  drivers: Driver[];
}

export interface InvoiceDetailsResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: InvoiceDetails;
  };
}
