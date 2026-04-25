"use client";

import { useTranslations } from "next-intl";
import PageTitleWithBack from "../../../users/[id]/_components/page-title-with-back";

export default function DriverPageTitle() {
  const t = useTranslations("driverPage.driverDetails");

  return <PageTitleWithBack title={t("title")} backHref="/drivers" />;
}
