import DriverDocumentItem from "./driver-document-item";

interface Props {
  // You can pass any props you need here, such as driver ID to fetch documents
  driverNationalIdFront: string;
  driverNationalIdBack: string;
  driverLicenseFront: string;
  driverLicenseBack: string;
  carLicense: string;
  carInsurance: string;
  documentVerifyStatus: string; // e.g., "approved", "pending", "rejected"
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
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">الوثائق</h4>

      <div className="space-y-2">
        <DriverDocumentItem
          title="الإقامة - الهوية"
          status={documentVerifyStatus}
          link={driverNationalIdFront}
        />

        <DriverDocumentItem
          title="رخصة القيادة"
          status={documentVerifyStatus}
          link={driverLicenseFront}
        />

        <DriverDocumentItem
          title="استمارة المركبة"
          status={documentVerifyStatus}
          link={carLicense}
        />
        <DriverDocumentItem
          title=" وثيقة التامين"
          status={documentVerifyStatus}
          link={carInsurance}
        />
      </div>
    </div>
  );
}
