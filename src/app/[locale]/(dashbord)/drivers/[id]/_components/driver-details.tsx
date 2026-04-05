"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FormInputField from "@/src/components/shared/form-input-field";
import DriverStatusBadge, {
  DriverStatus,
} from "../../_components/driver-status-badge";
import LoadingStatusBadge, { LoadingStatus } from "../../_components/loading-status-badge";
import DocumentStatusBadge, { DocumentStatus } from "../../_components/document-status-badge";
import { DriverProfile } from "@/src/lib/types/driver";
import { useTranslations } from "next-intl";

export default function DriverDetails({ driver }: { driver: DriverProfile }) {
  const t = useTranslations("driverPage.driverDetails");

  return (
    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
      <FormInputField
        id="user-id"
        label={t("driverId")}
        value={driver.id}
        readOnly
      />
      <FormInputField
        id="full-name"
        label={t("fullName")}
        value={driver.driver_name}
      />
      <FormInputField
        id="phone-number"
        label={t("phoneNumber")}
        value={driver.phone ? driver.phone : t("notAvailable")}
        readOnly
      />

      <Field>
        <FieldLabel htmlFor="status">{t("status")}</FieldLabel>
        <div className="flex">
          <div className="w-20">
            <DriverStatusBadge
              status={driver.driver_status as DriverStatus}
            />{" "}
          </div>
          <div className="min-w-14">
            <LoadingStatusBadge status={driver.driver_request_status as LoadingStatus} />
          </div>
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="status">{t("documentStatus")}</FieldLabel>
        <div className="w-14">
          <DocumentStatusBadge status={driver.document_verify as DocumentStatus} />
        </div>
      </Field>

      <Field></Field>

      <FormInputField
        id="plate-number"
        label={t("plateNumber")}
        value={`${driver.car_plate_number || ""} - ${driver.car_plate_character || ""}`}
      />

      <FormInputField
        id="joining-date"
        label={t("joiningDate")}
        value={new Date(driver.created_at).toISOString().split("T")[0]}
        type="date"
      />
    </FieldGroup>
  );
}
