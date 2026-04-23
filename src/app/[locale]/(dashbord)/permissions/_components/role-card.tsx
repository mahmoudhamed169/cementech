import { Users, Lock, Pencil, Trash2 } from "lucide-react";
import PagesModal from "./pages-card-modal";
import { RoleDetails } from "./role-details";
import { Permission } from "@/src/lib/services/permissions/get-permissions";
import { RolePermissionsModal } from "./role-permissions";
import { DeletePermissionDialog } from "./delete-permission-dialog";
import { usePermissionsStore } from "@/src/store/permissionsStore";

interface RoleCardProps {
  title: string;
  description: string;
  assignedCount: number;
  pages: string[];
  allPages: string[];
  extraCount?: number;
  isProtected?: boolean;
  variant?: "default" | "primary";
  permission: Permission;
}

export const colors = (p: boolean) => ({
  card: p
    ? "bg-[#FEFCE8] border-2 border-[#FFDF20] shadow-[0_2px_16px_0_rgba(255,223,32,0.10)]"
    : "bg-white border border-[#F0F1F3] shadow-[0_2px_12px_0_rgba(16,24,40,0.06)]",
  dot: p ? "bg-[#FFDF20]" : "bg-[#E5E7EB]",
  badge: p
    ? "bg-[#FEF9C3] text-[#92400E]"
    : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]",
  divider: p ? "bg-[#FDE047]/50" : "bg-[#F1F5F9]",
  icon: p ? "bg-[#FEF9C3]" : "bg-[#F8FAFC]",
  iconClr: p ? "text-[#92400E]" : "text-[#64748B]",
  count: p ? "text-[#78350F]" : "text-[#0F172A]",
  label: p ? "text-[#B45309]" : "text-[#CBD5E1]",
  tag: p
    ? "bg-[#FEF9C3] text-[#713F12]"
    : "bg-[#F8FAFC] text-[#475569] border border-[#F1F5F9]",
  more: p
    ? "bg-[#FFDF20] text-[#78350F] hover:bg-[#FCD34D]"
    : "bg-[#0F172A] text-white hover:bg-[#1E293B]",
});

export default function RoleCard({
  title,
  description,
  assignedCount,
  pages,
  allPages,
  extraCount = 0,
  isProtected = false,
  variant = "default",
  permission,
}: RoleCardProps) {
  const p = variant === "primary";
  const c = colors(p);
  const can = usePermissionsStore((s) => s.can);

  const canEdit   = can("management_permission", "PATCH");
  const canDelete = can("management_permission", "DELETE");

  return (
    <div dir="rtl" style={{ fontFamily: "Tajawal, sans-serif" }} className="w-full h-full">
      <div className={`relative w-full h-full flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.card}`}>
        <div className={`absolute top-5 left-5 w-2 h-2 rounded-full ${c.dot}`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="space-y-1">
            {p && (
              <span className="inline-flex items-center bg-[#FFDF20] text-[#78350F] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                النظام
              </span>
            )}
            <h2 className="text-[#0F172A] font-bold text-xl">{title}</h2>
            <p className="text-[#94A3B8] text-sm">{description}</p>
          </div>

          {isProtected && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${c.badge}`}>
              <Lock size={11} /> محمي
            </div>
          )}
        </div>

        <div className={`h-px mb-5 ${c.divider}`} />

        {/* Assigned */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${c.icon}`}>
            <Users size={16} className={c.iconClr} />
          </div>
          <div>
            <p className="text-[#94A3B8] text-[11px] font-medium">المشرفون المعينون</p>
            <p className={`text-sm font-bold ${c.count}`}>{assignedCount} مشرفين</p>
          </div>
        </div>

        <div className={`h-px mb-4 ${c.divider}`} />

        {/* Pages */}
        <div className="mt-auto space-y-5">
          <div>
            <p className={`text-[11px] font-semibold mb-3 tracking-wider uppercase ${c.label}`}>
              الصفحات المتاحة
            </p>
            <div className="flex flex-wrap gap-2">
              {pages.map((page, i) => (
                <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-lg ${c.tag}`}>
                  {page}
                </span>
              ))}
              {extraCount > 0 && (
                <PagesModal title={title} pages={allPages} c={c} extraCount={extraCount} permission={permission} />
              )}
            </div>
          </div>

          <div className={`h-px ${c.divider}`} />

          {p ? (
            <RoleDetails title={title} description={description} permission={permission} />
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <RoleDetails title={title} description={description} permission={permission} />
              </div>

              {/* تعديل — PATCH */}
              {canEdit && (
                <RolePermissionsModal
                  permissionId={permission.id}
                  initialData={permission}
                  trigger={
                    <button className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <Pencil size={14} />
                    </button>
                  }
                />
              )}

              {/* حذف — DELETE */}
              {canDelete && (
                <DeletePermissionDialog
                  permissionId={permission.id}
                  permissionName={title}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}