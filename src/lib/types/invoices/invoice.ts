// Base fields مشتركة
interface BaseInvoice {
  id: string;
  code: string;
  total_amount: number;
  created_at: string;
}

// orders
export interface OrderInvoice extends BaseInvoice {
  order_id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
}

// requests
export interface RequestInvoice extends BaseInvoice {
  request_id: string;
  request_code: string;
  driver_name: string;
  driver_phone: string;
}

export type Invoice = OrderInvoice | RequestInvoice;

export interface InvoicesResponse {
  success: boolean;
  message: string;
  data: {
    invoices: Invoice[];
    total: number;
  };
}

export interface GetInvoicesParams {
  page?: number;
  limit?: number;
  search?: string;
  invoiceType?: "orders" | "requests";
}

// Type guards
export function isOrderInvoice(invoice: Invoice): invoice is OrderInvoice {
  return "order_id" in invoice;
}

export function isRequestInvoice(invoice: Invoice): invoice is RequestInvoice {
  return "request_id" in invoice;
}
