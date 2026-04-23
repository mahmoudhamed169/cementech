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

export const PERMISSIONS: { key: Permission; label: string }[] = [
  { key: "preview", label: "معاينة" },
  { key: "create", label: "إنشاء" },
  { key: "edit", label: "تعديل" },
  { key: "delete", label: "حذف" },
];

export type PagePermissions = Record<Permission, boolean>;
export type SelectedPermissions = Record<string, PagePermissions>;

export const DEFAULT_PAGE_PERMISSIONS: PagePermissions = {
  preview: true,
  create: false,
  edit: false,
  delete: false,
};

// الصفحات المقفلة: دايماً موجودة في كل دور ولا يمكن حذفها
export const LOCKED_PAGES: Record<string, PagePermissions> = {
  notifications: {
    preview: true,
    create: false, // القيمة الافتراضية — قابلة للتغيير
    edit: true,
    delete: true,
  },
};

// مصفوفة بـ IDs الصفحات المقفلة للاستخدام مع includes()
export const LOCKED_PAGE_IDS: string[] = Object.keys(LOCKED_PAGES);

// الصلاحيات المقفلة لكل صفحة (لا يمكن تغييرها)
// notifications: preview + edit + delete مقفلة، create حرة
export const LOCKED_FIXED_PERMISSIONS: Record<string, Permission[]> = {
  notifications: ["preview", "edit", "delete"],
};

// لا يوجد صلاحيات مخفية — كل الأعمدة تظهر
export const LOCKED_HIDDEN_PERMISSIONS: Record<string, Permission[]> = {};

export const PAGE_GROUPS: PageGroup[] = [
  {
    groupId: "general",
    groupLabel: "الصفحات العامة",
    pages: [{ id: "home", label: "الصفحة الرئيسية" }],
  },
  {
    groupId: "operations",
    groupLabel: "صفحات العمليات",
    pages: [
      { id: "orders", label: "إدارة الطلبات" },
      { id: "users", label: "إدارة المستخدمين" },
      { id: "drivers", label: "السائقين" },
      { id: "loadingRequests", label: "طلبات التحميل" },
    ],
  },
  {
    groupId: "finance",
    groupLabel: "صفحات المالية",
    pages: [
      { id: "payments", label: "المدفوعات" },
      { id: "invoices", label: "الفواتير" },
    ],
  },
  {
    groupId: "management",
    groupLabel: "الإدارة",
    pages: [
      { id: "permissions", label: "الإدارة والصلاحيات" },
      { id: "supervisors", label: "إدارة المشرفين" },
      { id: "suppliers", label: "المصانع والمنتجات" },
    ],
  },
  {
    groupId: "other",
    groupLabel: "أخرى",
    pages: [
      { id: "notifications", label: "الإشعارات" },
      { id: "terms", label: "الشروط والأحكام" },
      { id: "settings", label: "الإعدادات" },
    ],
  },
];

/*
{
  "name": "",
  "description": "",
  "home_permission": ["GET"],           // الصفحة الرئيسية
  "order_permission": ["GET"],          // إدارة الطلبات
  "driver_permission": ["GET"],         // السائقين
  "loading_request_permission": ["GET"],// طلبات التحميل
  "user_permission": ["GET"],           // إدارة المستخدمين
  "payment_permission": ["GET"],        // المدفوعات
  "invoice_permission": ["GET"],        // الفواتير
  "notification_permission": ["GET"],   // الإشعارات
  "management_permission": ["GET"],     // الإدارة والصلاحيات
  "supervisor_permission": ["GET"],     // إدارة المشرفين
  "supplier_permission": ["GET"],       // المصانع والمنتجات
  "terms_permission": ["GET"],          // الشروط والأحكام
  "setting_permission": ["GET"]         // الإعدادات
}
*/

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