export interface DeliveryLocation {
  id: string;
  name_ar: string;
  name_en: string;
  lat: number;
  lng: number;
  radius: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DeliveryLocationsResponse {
  success: boolean;
  message: string;
  data: DeliveryLocation[];
}
