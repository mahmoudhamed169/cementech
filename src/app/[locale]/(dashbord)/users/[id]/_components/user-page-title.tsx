"use client";
import { useTranslations } from "next-intl";
import PageTitleWithBack from "./page-title-with-back";

export default function UserPageTitle() {
  const t = useTranslations("userPage.userDetails");
  return <PageTitleWithBack title={t("pageTitle")} backHref="/users" />;
}
