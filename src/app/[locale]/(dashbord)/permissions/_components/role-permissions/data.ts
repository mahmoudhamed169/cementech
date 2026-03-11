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
