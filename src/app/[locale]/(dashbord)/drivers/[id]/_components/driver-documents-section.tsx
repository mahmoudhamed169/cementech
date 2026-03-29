"use client";
import DriverDocumentItem, { DocumentStatus } from "./driver-document-item";
import { useTranslations } from "next-intl";

interface Props {
  driverNationalIdFront: string;
  driverNationalIdBack: string;
  driverLicenseFront: string;
  driverLicenseBack: string;
  carLicense: string;
  carInsurance: string;
  documentVerifyStatus: DocumentStatus;
}

export default function DriverDocumentsSection(props: Props) {
  const {
    driverNationalIdFront,
    driverNationalIdBack,
    driverLicenseFront,
    driverLicenseBack,
    carLicense,
    carInsurance,
    documentVerifyStatus,
  } = props;

  const t = useTranslations("driverPage.driverDocuments");

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">{t("title")}</h4>

      <div className="space-y-2">
        <DriverDocumentItem
          title={t("nationalId")}
          status={documentVerifyStatus}
          link={driverNationalIdFront}
        />

        <DriverDocumentItem
          title={t("driverLicense")}
          status={documentVerifyStatus}
          link={driverLicenseFront}
        />

        <DriverDocumentItem
          title={t("carLicense")}
          status={documentVerifyStatus}
          link={carLicense}
        />

        <DriverDocumentItem
          title={t("carInsurance")}
          status={documentVerifyStatus}
          link={carInsurance}
        />
      </div>
    </div>
  );
}
