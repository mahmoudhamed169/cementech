import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FormInputField from "@/src/components/shared/form-input-field";
import DriverStatusBadge from "../../_components/driver-status-badge";
import LoadingStatusBadge from "../../_components/loading-status-badge";
import DocumentStatusBadge from "../../_components/document-status-badge";

export default function DriverDetails() {
  return (
    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
      <FormInputField
        id="user-id"
        label="رقم السائق (ID)"
        value="123456789"
        readOnly
      />
      <FormInputField
        id="full-name"
        label="الاسم الكامل"
        value="أحمد محمد أحمد"
      />
      <FormInputField id="phone-number" label="رقم الجوال" value="0501234567" />

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
          <DocumentStatusBadge status="approved" />
        </div>
      </Field>

      <Field></Field>

      <FormInputField
        id="plate-number"
        label="رقم لوحة السيارة"
        value="  س ع 1234 "
      />

      <FormInputField
        id="joining-date"
        label="  تاريخ الانضمام"
        value="2023-01-15"
        type="date"
      />
    </FieldGroup>
  );
}
