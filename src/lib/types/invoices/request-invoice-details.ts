// @/src/lib/types/invoices/request-invoice-details.ts

export interface RequestInvoiceTransaction {
  id: string;
  invoice_id: string;
  provider: string;
  amount: number;
  status: string;
  paymob_transaction_id: string;
  created_at: string;
}

export interface RequestInvoiceDetails {
  id: string;
  code: string;
  order_id: null;
  request_id: string;
  total_amount: number;
  extra_fees: string[];
  qr_token: string;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RequestDetails {
  id: string;
  code: string;
  product_id: string;
  quantity: number;
  lat: string | null;
  lng: string | null;
  location_en: string | null;
  location_ar: string | null;
  trip_certificate: string | null;
  laying_command: string | null;
  request_status_en: string;
  request_status_ar: string;
  driver_id: string;
  loaded_at: string | null;
  created_at: string;
  updated_at: string;
  request_type: string;
}

export interface RequestInvoiceDriver {
  id: string;
  user_id: string;
  driver_name: string;
  residence_location: string;
  location_lat: string;
  location_lng: string;
  personal_photo: string;
  driver_license_front: string;
  national_id_front: string;
  national_id: string;
  car_type: string;
  car_hold_capacity: number;
  car_plate_number: string;
  car_plate_character: string;
  employment_type: string;
  company_name: string | null;
  car_license: string;
  car_insurance: string;
  status: string;
  document_verify: string;
  current_request_id: string;
  current_order_id: string | null;
  created_at: string;
  updated_at: string;
  phone: string;
}

export interface RequestInvoicePayment {
  transactions: RequestInvoiceTransaction[];
}

export interface RequestInvoiceData {
  invoice_details: RequestInvoiceDetails;
  request_details: RequestDetails;
  driver: RequestInvoiceDriver;
  payment: RequestInvoicePayment;
}

export interface RequestInvoiceDetailsResponse {
  success: boolean;
  message: string;
  data: RequestInvoiceData;
}
