export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface Permissions {
  id: string;
  is_admin: boolean;
  home_permission: HttpMethod[];
  order_permission: HttpMethod[];
  driver_permission: HttpMethod[];
  loading_request_permission: HttpMethod[];
  user_permission: HttpMethod[];
  payment_permission: HttpMethod[];
  invoice_permission: HttpMethod[];
  notification_permission: HttpMethod[];
  management_permission: HttpMethod[];
  supervisor_permission: HttpMethod[];
  supplier_permission: HttpMethod[];
  terms_permission: HttpMethod[];
  setting_permission: HttpMethod[];
  name_en: string;
  name_ar: string;
}

// كل الـ keys اللي ممكن تتفحص عليها
export type PermissionKey = keyof Pick<
  Permissions,
  | "home_permission"
  | "order_permission"
  | "driver_permission"
  | "loading_request_permission"
  | "user_permission"
  | "payment_permission"
  | "invoice_permission"
  | "notification_permission"
  | "management_permission"
  | "supervisor_permission"
  | "supplier_permission"
  | "terms_permission"
  | "setting_permission"
>;
