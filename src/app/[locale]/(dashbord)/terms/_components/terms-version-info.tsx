import { useTranslations } from "next-intl";
import { TermsPolicy } from "../_types/terms.types";
import { CalendarIcon } from "lucide-react";

interface TermsVersionInfoProps {
  policy: TermsPolicy | undefined;
}

export default function TermsVersionInfo({ policy }: TermsVersionInfoProps) {
  const t = useTranslations("termsPage.version");

  if (!policy) return null;

  const formattedDate = new Date(policy.updated_at).toLocaleDateString(
    "ar-EG",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  );

  return (
    <div className="border border-gray-300 rounded-xl p-4 space-y-4 bg-white">
      <span className="text-sm font-semibold">{t("title")}</span>

      <div className="space-y-3 mt-4">
        {/* رقم الإصدار */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">{t("number")}</span>
          <p className="text-sm font-bold">{policy.version}</p>
        </div>

        {/* آخر تحديث */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">
            {t("lastUpdated")}
          </span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3 text-[#155DFC]" />
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>

        {/* تم التحديث بواسطة */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">
            {t("updatedBy")}
          </span>
          <p className="text-sm">{policy.admin_name ?? t("system")}</p>
        </div>

        {/* الحالة */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">{t("status")}</span>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                policy.status === "published" ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                policy.status === "published"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {t(policy.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
