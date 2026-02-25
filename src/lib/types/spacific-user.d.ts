// -------------------------
// Customer Types
// -------------------------
export interface CustomerProfile {
  id: string;
  customer_type: string; // "individual"
  user_id: string;
  customer_name: string;
  customer_industry: string;
  tax_number: string;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerUser {
  id: string;
  phone: string;
  code: string;
  name: string;
  permissions_id: string | null;
  role: "customer";
  verified: boolean;
  is_blocked: boolean;
  OTPTransactionId: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
  customer_profile: CustomerProfile;
}

// -------------------------
// Driver Types
// -------------------------
export interface DriverProfile {
  id: string;
  user_id: string;
  driver_name: string;
  residence_location: string;
  personal_photo: string;
  driver_license_front: string;
  driver_license_back: string;
  national_id_front: string;
  national_id_back: string;
  car_type: string;
  car_hold_capacity: number;
  car_plate_number: string;
  car_plate_character: string;
  car_owner: string;
  car_owner_company_name: string | null;
  car_license: string;
  car_insurance: string;
  status: string;
  document_verify: string;
  current_request_id: string | null;
  current_order_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DriverUser {
  id: string;
  phone: string;
  code: string;
  name: string;
  permissions_id: string | null;
  role: "driver";
  verified: boolean;
  is_blocked: boolean;
  OTPTransactionId: string | null;
  company_name?: string | null;
  created_at: string;
  updated_at: string;
  status: string;
  document_verify: string;
  total_delivered_orders: number;
  driver_profile: DriverProfile;
}

// -------------------------
// Generic API Response
// -------------------------
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// -------------------------
// Customer API Response
// -------------------------
export type CustomerApiResponse = ApiResponse<CustomerUser>;

// -------------------------
// Driver API Response
// -------------------------
export type DriverApiResponse = ApiResponse<DriverUser>;
