export type TermsStatus = "published" | "draft";

export type TermsTarget = "customer" | "driver";

export type TermsPolicyType = "privacy_policy" | "terms_conditions";

export interface TermsPolicy {
  id: string;
  type: TermsPolicyType;
  target: TermsTarget;
  version: string;
  status: TermsStatus;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  admin_name: string | null;
}

export interface TermsApiResponse {
  success: boolean;
  message: string;
  data: TermsPolicy[];
}
