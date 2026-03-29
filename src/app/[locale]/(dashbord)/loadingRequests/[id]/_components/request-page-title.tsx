"use client";

import { useTranslations } from "next-intl";
import PageTitleWithBack from "../../../users/[id]/_components/page-title-with-back";

interface RequestPageTitleProps {
  requestCode?: string;
}

export default function RequestPageTitle({
  requestCode,
}: RequestPageTitleProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage");

  return (
    <PageTitleWithBack
      title={
        requestCode
          ? `${t("requestNumber")} - #${requestCode}`
          : t("requestDetails")
      }
      backHref="/loadingRequests"
    />
  );
}
