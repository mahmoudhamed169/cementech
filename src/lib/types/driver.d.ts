export interface DriverProfileResponse {
  success: boolean;
  message: string;
  data: DriverProfile;
}

export interface DriverProfile {
  id: string;
  user_id: string;
  driver_name: string;
  residence_location: string;
  phone?: string;

  personal_photo: string;
  driver_license_front: string;
  driver_license_back: string;
  national_id_front: string;
  national_id_back: string;

  car_type: "cement_truck" | string;
  car_hold_capacity: number;
  car_plate_number: string;
  car_plate_character: string;

  car_owner: "driver" | "company" | string;
  car_owner_company_name: string | null;

  car_license: string;
  car_insurance: string;

  status: "online" | "offline" | string;
  driver_status: "pending" | "approved" | "rejected" | string;
  driver_request_status: "not loaded" | "loaded" | string;

  // may come as "approved" or "accepted" from backend
  document_verify: "pending" | "approved" | "accepted" | "rejected";

  current_request_id: string | null;
  request: DriverRequest;

  current_order_id: string | null;
  order: any | null;

  total_delivered_orders: number;

  created_at: string;
  updated_at: string;

  stats: DriverStats;
}

export interface DriverRequest {
  id: string | null;
  code: string | null;
  product_id: string | null;
  quantity: number | null;

  lat: number | null;
  lng: number | null;

  location_en: string | null;
  location_ar: string | null;

  trip_certificate: string | null;
  laying_command: string | null;

  request_status_en: string | null;
  request_status_ar: string | null;

  driver_id: string | null;

  loaded_at: string | null;
  created_at: string | null;
  updated_at: string | null;

  factory_name: string | null;
  product_name: string | null;
}

export interface DriverStats {
  totalOrders: number;
  totalPaid: number;
  lastOrderDate: string | null;
}
