export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  lat: string;
  lng: string;
  code: string;
  contact_number: string;
  is_active: boolean;
  products: Product[];
  created_at: string;
  updated_at: string;
}

export interface FactoriesResponse {
  success: boolean;
  message: string;
  data: Factory[];
}
