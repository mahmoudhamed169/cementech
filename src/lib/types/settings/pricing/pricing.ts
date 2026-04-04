export interface PricingData {
  id: string;
  key: string;
  kilometric_price: number;
  commission_percentage: number;
  cancellation_fee: number;
  bank_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface PricingResponse {
  success: boolean;
  message: string;
  data: PricingData;
}

export interface UpdatePricingInput {
  kilometric_price: number;
  commission_percentage: number;
  cancellation_fee: number;
  bank_percentage: number;
}
