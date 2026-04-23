"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CirclePlus, Shield } from "lucide-react";
import { PageGroupSection } from "./PageGroupSection";
import { PermissionsTable } from "./PermissionsTable";
import {
  PAGE_GROUPS,
  DEFAULT_PAGE_PERMISSIONS,
  LOCKED_PAGES,
  LOCKED_PAGE_IDS,
  Permission,
  SelectedPermissions,
  PAGE_ID_TO_PERMISSION_KEY,
  PERMISSION_TO_HTTP,
  LOCKED_FIXED_PERMISSIONS,
} from "./data";
import { useCreatePermission, useUpdatePermission } from "./_hooks";
import { CreatePermissionSchema } from "./_schema";
import { Permission as PermissionType } from "@/src/lib/services/permissions/get-permissions";

const PAGE_LABELS: Record<string, string> = Object.fromEntries(
  PAGE_GROUPS.flatMap((g) => g.pages.map((p) => [p.id, p.label])),
);

// الـ state الافتراضي للصفحات المقفولة
const LOCKED_INITIAL_STATE = {
  selectedPages: new Set<string>(LOCKED_PAGE_IDS),
  permissions: { ...LOCKED_PAGES } as SelectedPermissions,
};

function permissionToState(permission: PermissionType) {
  const selectedPages = new Set<string>();
  const permissions: SelectedPermissions = {};

  Object.entries(PAGE_ID_TO_PERMISSION_KEY).forEach(([pageId, permKey]) => {
    const methods = permission[permKey as keyof PermissionType] as string[];
    if (Array.isArray(methods) && methods.length > 0) {
      selectedPages.add(pageId);
      permissions[pageId] = {
        preview: methods.includes("GET"),
        create: methods.includes("POST"),
        edit: methods.includes("PATCH"),
        delete: methods.includes("DELETE"),
      };
    }
  });

  // نضمن دايماً وجود الصفحات المقفولة بقيمها الثابتة
  LOCKED_PAGE_IDS.forEach((pageId) => {
    selectedPages.add(pageId);
    permissions[pageId] = { ...LOCKED_PAGES[pageId] };
  });

  return { selectedPages, permissions };
}

function stateToPayload(
  nameAr: string,
  nameEn: string,
  descAr: string,
  descEn: string,
  selectedPages: Set<string>,
  permissions: SelectedPermissions,
): CreatePermissionSchema {
  const payload: CreatePermissionSchema = {
    name_ar: nameAr,
    name_en: nameEn,
    description_ar: descAr,
    description_en: descEn,
    home_permission: [],
    order_permission: [],
    driver_permission: [],
    loading_request_permission: [],
    user_permission: [],
    payment_permission: [],
    invoice_permission: [],
    notification_permission: [],
    management_permission: [],
    supervisor_permission: [],
    supplier_permission: [],
    terms_permission: [],
    setting_permission: [],
  };

  selectedPages.forEach((pageId) => {
    const permKey = PAGE_ID_TO_PERMISSION_KEY[
      pageId
    ] as keyof CreatePermissionSchema;

    // الصفحات المقفولة: نرسل قيمها الثابتة دايماً
    const perms =
      LOCKED_PAGES[pageId] ?? permissions[pageId] ?? DEFAULT_PAGE_PERMISSIONS;
    const methods: string[] = [];

    (Object.keys(PERMISSION_TO_HTTP) as Permission[]).forEach((p) => {
      if (perms[p]) methods.push(PERMISSION_TO_HTTP[p]);
    });

    (payload as Record<string, unknown>)[permKey] = methods;
  });

  return payload;
}

interface RolePermissionsModalProps {
  permissionId?: string;
  initialData?: PermissionType;
  trigger?: React.ReactNode;
}

export function RolePermissionsModal({
  permissionId,
  initialData,
  trigger,
}: RolePermissionsModalProps) {
  const isEdit = !!permissionId;
  const [open, setOpen] = useState(false);

  const getInitialState = () => {
    if (isEdit && initialData) return permissionToState(initialData);
    return {
      selectedPages: new Set<string>(LOCKED_PAGE_IDS),
      permissions: { ...LOCKED_PAGES } as SelectedPermissions,
    };
  };

  const [nameAr, setNameAr] = useState(initialData?.name_ar ?? "");
  const [nameEn, setNameEn] = useState(initialData?.name_en ?? "");
  const [descAr, setDescAr] = useState(initialData?.description_ar ?? "");
  const [descEn, setDescEn] = useState(initialData?.description_en ?? "");
  const [selectedPages, setSelectedPages] = useState<Set<string>>(
    () => getInitialState().selectedPages,
  );
  const [permissions, setPermissions] = useState<SelectedPermissions>(
    () => getInitialState().permissions,
  );

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        setNameAr(initialData.name_ar);
        setNameEn(initialData.name_en);
        setDescAr(initialData.description_ar);
        setDescEn(initialData.description_en);
        const { selectedPages: sp, permissions: perms } =
          permissionToState(initialData);
        setSelectedPages(sp);
        setPermissions(perms);
      } else {
        // create mode: نبدأ بالصفحات المقفولة فقط
        setSelectedPages(new Set<string>(LOCKED_PAGE_IDS));
        setPermissions({ ...LOCKED_PAGES } as SelectedPermissions);
      }
    }
  }, [open]);

  const createMutation = useCreatePermission(() => setOpen(false));
  const updateMutation = useUpdatePermission(permissionId ?? "", () =>
    setOpen(false),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const togglePage = (id: string) => {
    // الصفحات المقفولة لا تُشال أبداً
    if (LOCKED_PAGE_IDS.includes(id)) return;

    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // إزالة الصفحة وحذف بيانات permissions الخاصة بها
        next.delete(id);
        setPermissions((p) => {
          const updated = { ...p };
          delete updated[id];
          return updated;
        });
      } else {
        next.add(id);
        setPermissions((p) => ({
          ...p,
          // لما تُضاف صفحة جديدة، GET يكون مفعّل افتراضياً
          [id]: p[id] ?? { ...DEFAULT_PAGE_PERMISSIONS },
        }));
      }
      return next;
    });
  };

  const togglePermission = (pageId: string, permission: Permission) => {
    // الصفحات المقفولة: لا يمكن تغيير أي permission
    if (LOCKED_FIXED_PERMISSIONS[pageId]?.includes(permission)) return;

    if (permission === "preview") {
      // لو حاول يشيل GET → نشيل الصفحة بالكامل
      togglePage(pageId);
      return;
    }

    setPermissions((prev) => ({
      ...prev,
      [pageId]: {
        ...(prev[pageId] ?? DEFAULT_PAGE_PERMISSIONS),
        [permission]: !(prev[pageId] ?? DEFAULT_PAGE_PERMISSIONS)[permission],
      },
    }));
  };

  const handleSubmit = () => {
    const payload = stateToPayload(
      nameAr,
      nameEn,
      descAr,
      descEn,
      selectedPages,
      permissions,
    );
    if (isEdit) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val && !isEdit) {
      setNameAr("");
      setNameEn("");
      setDescAr("");
      setDescEn("");
      // نرجع للحالة الافتراضية مع الصفحات المقفولة
      setSelectedPages(new Set<string>(LOCKED_PAGE_IDS));
      setPermissions({ ...LOCKED_PAGES } as SelectedPermissions);
    }
  };

  // نحسب totalSelected بدون الصفحات المقفولة عشان المؤشر يكون أوضح
  const lockedCount = LOCKED_PAGE_IDS.length;
  const totalSelected = selectedPages.size;
  const totalPages = PAGE_GROUPS.reduce((acc, g) => acc + g.pages.length, 0);

  // الفورم صالح: الاسمين مكتوبين + فيه صفحة مختارة (غير الـ locked)
  const isValid =
    nameAr.trim() !== "" &&
    nameEn.trim() !== "" &&
    selectedPages.size > lockedCount;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2">
            <CirclePlus />
            إنشاء دور جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-5xl bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="border-b border-[#F3F4F6] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#DCFCE7]">
              <Shield className="w-5 h-5 text-[#00A63E]" />
            </div>
            <div>
              <DialogTitle className="text-[#101828] text-lg font-bold">
                {isEdit ? "تعديل الدور" : "إنشاء دور جديد"}
              </DialogTitle>
              <p className="text-xs text-[#6B7280] mt-0.5">
                حدد الصلاحيات المناسبة لهذا الدور
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-1 py-2 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                اسم الدور (عربي) <span className="text-red-500">*</span>
              </label>
              <Input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثل: مدير مبيعات"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                اسم الدور (إنجليزي) <span className="text-red-500">*</span>
              </label>
              <Input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Sales Manager"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                الوصف (عربي)
              </label>
              <Input
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                placeholder="وصف مختصر للدور"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                الوصف (إنجليزي)
              </label>
              <Input
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="Brief role description"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
          </div>

          {/* Page Selector */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-semibold text-[#101828]">
                حدد الصفحات التي يمكن الوصول إليها
              </h5>
              <span className="text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-lg">
                {totalSelected} / {totalPages} صفحة
              </span>
            </div>
            {PAGE_GROUPS.map((group) => (
              <PageGroupSection
                key={group.groupId}
                group={group}
                selectedPages={selectedPages}
                onToggle={togglePage}
              />
            ))}
          </div>

          {/* Permissions Table */}
          {totalSelected > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-[#101828] mb-3">
                تفاصيل الصلاحيات
              </h5>
              <PermissionsTable
                selectedPages={selectedPages}
                pageLabels={PAGE_LABELS}
                permissions={permissions}
                onToggle={togglePermission}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isPending}
            className={cn(
              "rounded-xl px-8 transition-all duration-200 flex-1",
              isValid && !isPending
                ? "bg-[#00A63E] hover:bg-[#008F35] text-white shadow-sm"
                : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed",
            )}
          >
            {isPending ? (
              "جاري الحفظ..."
            ) : (
              <>
                {isEdit ? "حفظ التعديلات" : "إنشاء الدور"}
                {totalSelected > lockedCount && (
                  <span className="mr-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-md">
                    {totalSelected}
                  </span>
                )}
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="rounded-xl border-[#D1D5DC] text-[#374151] hover:bg-[#F9FAFB] px-6 flex-1"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
