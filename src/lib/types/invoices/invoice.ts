export interface Invoice {
  id: string;
  code: string;
  order_id: string | null;
  order_code: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  total_amount: number;
  created_at: string;
}

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
}
