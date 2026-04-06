// types/requests/request.ts

export interface Request {
  id: string;
  code: string;
  product_id: string;
  quantity: number;
  location: string;
  product_name: string;
  factory_name: string;
  trip_certificate: string;
  laying_command: string;
  request_type: "with_data" | "without_data";
  lat: string;
  lng: string;
  request_status: string;
  driver_id: string;
  driver_name: string;
  phone_number: string;
  car_plates: string;
  created_at: string;
  updated_at: string;
  loaded_at: string | null;
}

export interface RequestsMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface RequestsResponse {
  success: boolean;
  message: string;
  data: Request[];
  meta: RequestsMeta;
}
