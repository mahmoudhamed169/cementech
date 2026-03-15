"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FormInputField from "@/src/components/shared/form-input-field";
import { UserStatusBadge } from "../../_components/user-status-badge";

import { useTranslations } from "next-intl";
import { CustomerProfileData } from "@/src/lib/services/users/user-profile";

export default function UserDetails({ user }: { user: CustomerProfileData }) {
  const t = useTranslations("userPage.userDetails");

  return (
    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
      <FormInputField
        id="user-id"
        label={t("userId")}
        value={user.code}
        readOnly
      />

      <FormInputField
        id="full-name"
        label={t("fullName")}
        value={user.customer_name}
        readOnly
      />

      <FormInputField
        id="phone-number"
        label={t("phoneNumber")}
        value={user.phone}
        readOnly
      />

      <Field>
        <FieldLabel htmlFor="status">{t("status")}</FieldLabel>
        <div className="w-14">
          <UserStatusBadge status={user.status} />
        </div>
      </Field>

      <FormInputField
        id="organization-name"
        label={t("companyName")}
        value={user.company_name ?? t("notAvailable")}
        readOnly
      />

      <FormInputField
        id="joining-date"
        label={t("joiningDate")}
        value={new Date(user.created_at).toISOString().split("T")[0]}
        type="date"
        readOnly
      />
    </FieldGroup>
  );
}
