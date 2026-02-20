import DriverDocumentItem from "./driver-document-item";

export default function DriverDocumentsSection() {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">الوثائق</h4>

      <div className="space-y-2">
        <DriverDocumentItem
          title="الإقامة - الهوية"
          status="approved"
        
        />

        <DriverDocumentItem title="رخصة القيادة" status="approved" />

        <DriverDocumentItem title="استمارة المركبة" status="approved" />
        <DriverDocumentItem title=" وثيقة التامين" status="approved" />
      </div>
    </div>
  );
}
