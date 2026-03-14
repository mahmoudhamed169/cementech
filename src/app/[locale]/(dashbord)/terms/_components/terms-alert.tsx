import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TermsAlert() {
  const t = useTranslations("termsPage.alert");

  return (
    <Alert className="border-yellow-400 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800 font-semibold">
        {t("title")}
      </AlertTitle>
      <AlertDescription className="text-yellow-700 space-y-1 mt-2">
        <p>• {t("point1")}</p>
        <p>• {t("point2")}</p>
      </AlertDescription>
    </Alert>
  );
}
