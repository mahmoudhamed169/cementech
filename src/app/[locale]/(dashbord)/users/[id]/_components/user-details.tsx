import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormInputField from "@/src/components/shared/form-input-field";
import { UserStatusBadge } from "../../_components/user-status-badge";
import { Form } from "radix-ui";

export default function UserDetails() {
  return (
    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
      <FormInputField
        id="user-id"
        label="رقم المستخدم (ID)"
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
        <div className="w-14">
          <UserStatusBadge status="active" />
        </div>
      </Field>

      <FormInputField
        id="organization-name"
        label="اسم المؤسسة"
        value="شركة الأسمنت العربية"
      />
      <FormInputField
        id="email"
        label="تاريخ الانضمام "
        value="2024-01-15"
        type="date"
      />
    </FieldGroup>
  );
}
