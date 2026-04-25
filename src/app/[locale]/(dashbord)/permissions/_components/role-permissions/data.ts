import { HttpMethod } from "@/src/lib/services/permissions/get-permissions";

export interface Page {
  id: string;
  label: string;
}

export interface PageGroup {
  groupId: string;
  groupLabel: string;
  pages: Page[];
}

export type Permission = "preview" | "create" | "edit" | "delete";

export const PERMISSIONS: { key: Permission }[] = [
  { key: "preview" },
  { key: "create" },
  { key: "edit" },
  { key: "delete" },
];

export type PagePermissions = Record<Permission, boolean>;
export type SelectedPermissions = Record<string, PagePermissions>;

export const DEFAULT_PAGE_PERMISSIONS: PagePermissions = {
  preview: true,
  create: false,
  edit: false,
  delete: false,
};

export const LOCKED_PAGES: Record<string, PagePermissions> = {
  notifications: {
    preview: true,
    create: false,
    edit: true,
    delete: true,
  },
};

export const LOCKED_PAGE_IDS: string[] = Object.keys(LOCKED_PAGES);

export const LOCKED_FIXED_PERMISSIONS: Record<string, Permission[]> = {
  notifications: ["preview", "edit", "delete"],
};

export const LOCKED_HIDDEN_PERMISSIONS: Record<string, Permission[]> = {};

export const PAGE_GROUPS: PageGroup[] = [
  {
    groupId: "general",
    groupLabel: "general",
    pages: [{ id: "home", label: "home" }],
  },
  {
    groupId: "operations",
    groupLabel: "operations",
    pages: [
      { id: "orders", label: "orders" },
      { id: "users", label: "users" },
      { id: "drivers", label: "drivers" },
      { id: "loadingRequests", label: "loadingRequests" },
    ],
  },
  {
    groupId: "finance",
    groupLabel: "finance",
    pages: [
      { id: "payments", label: "payments" },
      { id: "invoices", label: "invoices" },
    ],
  },
  {
    groupId: "management",
    groupLabel: "management",
    pages: [
      { id: "permissions", label: "permissions" },
      { id: "supervisors", label: "supervisors" },
      { id: "suppliers", label: "suppliers" },
    ],
  },
  {
    groupId: "other",
    groupLabel: "other",
    pages: [
      { id: "notifications", label: "notifications" },
      { id: "terms", label: "terms" },
      { id: "settings", label: "settings" },
    ],
  },
];

export const PAGE_ID_TO_PERMISSION_KEY: Record<string, string> = {
  home: "home_permission",
  orders: "order_permission",
  drivers: "driver_permission",
  loadingRequests: "loading_request_permission",
  users: "user_permission",
  payments: "payment_permission",
  invoices: "invoice_permission",
  notifications: "notification_permission",
  permissions: "management_permission",
  supervisors: "supervisor_permission",
  suppliers: "supplier_permission",
  terms: "terms_permission",
  settings: "setting_permission",
};

export const PERMISSION_TO_HTTP: Record<Permission, HttpMethod> = {
  preview: "GET",
  create: "POST",
  edit: "PATCH",
  delete: "DELETE",
};
