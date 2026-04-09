import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Control, useController } from "react-hook-form";
import { SupervisorFormValues } from "./schema";
import { usePermissions } from "../../_hooks/use-permissions";

interface Props {
  control: Control<SupervisorFormValues>;
}

export default function SupervisorsRoles({ control }: Props) {
  const t = useTranslations("supervisorsPage.form");
  const locale = useLocale();
  const { permissions, isLoading, error } = usePermissions();

  const { field, fieldState } = useController({
    name: "roles",
    control,
  });

  const toggleRole = (key: string) => {
    const current = field.value ?? [];
    const updated = current.includes(key) ? [] : [key];
    field.onChange(updated);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A5565]">{t("rolesLabel")}</p>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <Loader2 className="w-7 h-7 animate-spin text-[#00A63E]" />
          <p className="text-sm text-gray-500">
            {t("loadingRoles") || "Loading roles..."}
          </p>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Roles */}
      {!isLoading && !error && (
        <div className="grid grid-cols-2 gap-3">
          {permissions.map((permission) => {
            const isChecked = field.value?.includes(permission.id) ?? false;
            const label =
              locale === "ar" ? permission.name_ar : permission.name_en;

            return (
              <button
                type="button"
                key={permission.id}
                onClick={() => toggleRole(permission.id)}
                className={cn(
                  "group flex items-center justify-between w-full px-4 py-3 rounded-xl border text-right transition-all duration-200 cursor-pointer",
                  isChecked
                    ? "bg-[#F0FDF4] border-[#00A63E] shadow-[0_0_0_1px_#00A63E]"
                    : "bg-white border-[#E5E7EB] hover:border-[#D1FAE5] hover:bg-[#F9FAFB]",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isChecked ? "text-[#00A63E]" : "text-[#374151]",
                  )}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200 flex-shrink-0",
                    isChecked
                      ? "bg-[#00A63E] border-[#00A63E]"
                      : "bg-white border-[#D1D5DC] group-hover:border-[#00A63E]",
                  )}
                >
                  {isChecked && (
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {fieldState.error && (
        <p className="text-xs text-red-500">{t(fieldState.error.message!)}</p>
      )}
    </div>
  );
}
