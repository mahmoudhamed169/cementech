export interface Ad {
  id: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdsResponse {
  success: boolean;
  message: string;
  data: Ad[];
}

export interface AddAdResponse {
  success: boolean;
  message: string;
  data: Ad;
}

export interface DeleteAdResponse {
  success: boolean;
  message: string;
}