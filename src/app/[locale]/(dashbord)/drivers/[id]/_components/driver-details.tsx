import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FormInputField from "@/src/components/shared/form-input-field";
import DriverStatusBadge from "../../_components/driver-status-badge";
import LoadingStatusBadge from "../../_components/loading-status-badge";
import DocumentStatusBadge from "../../_components/document-status-badge";

import { DriverProfile } from "@/src/lib/types/driver";

export default function DriverDetails({ driver }: { driver: DriverProfile }) {
  return (
    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
      <FormInputField
        id="user-id"
        label="رقم السائق (ID)"
        value={driver.id}
        readOnly
      />
      <FormInputField
        id="full-name"
        label="الاسم الكامل"
        value={driver.driver_name}
      />
      <FormInputField
        id="phone-number"
        label="رقم الجوال"
        value={driver.phone ? driver.phone : "غير متوفر"}
        readOnly
      />

      <Field>
        <FieldLabel htmlFor="status">الحالة </FieldLabel>
        <div className="flex ">
          <div className="w-14">
            <DriverStatusBadge status="available" />
          </div>
          <div className="min-w-14">
            <LoadingStatusBadge status="unloaded" />
          </div>
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="status">حالة الوثائق </FieldLabel>

        <div className="w-14">
          <DocumentStatusBadge status={driver.document_verify} />
        </div>
      </Field>

      <Field></Field>

      <FormInputField
        id="plate-number"
        label="رقم لوحة السيارة"
        value={`${driver.car_plate_number || ""} - ${driver.car_plate_character || ""}`}
      />

      <FormInputField
        id="joining-date"
        label="  تاريخ الانضمام"
        value={new Date(driver.created_at).toISOString().split("T")[0]} // تحويل التاريخ إلى صيغة YYYY-MM-DD
        type="date"
      />
    </FieldGroup>
  );
}
