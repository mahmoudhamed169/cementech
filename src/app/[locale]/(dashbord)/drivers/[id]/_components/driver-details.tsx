"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FormInputField from "@/src/components/shared/form-input-field";
import DriverStatusBadge, {
  DriverStatus,
} from "../../_components/driver-status-badge";
import LoadingStatusBadge, {
  LoadingStatus,
} from "../../_components/loading-status-badge";
import DocumentStatusBadge, {
  DocumentStatus,
} from "../../_components/document-status-badge";
import { DriverProfile } from "@/src/lib/types/driver";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { User, ZoomIn, X } from "lucide-react";
import { useState } from "react";

export default function DriverDetails({ driver }: { driver: DriverProfile }) {
  const t = useTranslations("driverPage.driverDetails");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        {/* صورة السائق */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 md:w-40">
          <div
            className="relative w-36 h-36 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-gray-50 group cursor-pointer"
            onClick={() => driver.personal_photo && setIsOpen(true)}
          >
            {driver.personal_photo ? (
              <>
                <Image
                  src={driver.personal_photo}
                  alt={driver.driver_name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-300" />
              </div>
            )}
          </div>

          <span className="text-sm font-semibold text-gray-800">
            {driver.driver_name}
          </span>
          <DriverStatusBadge status={driver.driver_status as DriverStatus} />

          {/* رقم الهوية تحت الصورة بدون label */}
          {driver.national_id && (
            <span className="text-xs text-gray-500 text-center">
              {driver.national_id}
            </span>
          )}
        </div>

        {/* بيانات السائق */}
        <FieldGroup className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          <FormInputField
            id="user-id"
            label={t("driverId")}
            value={driver.code}
            readOnly
          />
          <FormInputField
            id="full-name"
            label={t("fullName")}
            value={driver.driver_name}
            readOnly
          />
          <FormInputField
            id="phone-number"
            label={t("phoneNumber")}
            value={driver.phone ? driver.phone : t("notAvailable")}
            readOnly
          />

          <Field>
            <FieldLabel>{t("status")}</FieldLabel>
            <div className="flex items-center gap-2 mt-1">
              <LoadingStatusBadge
                status={driver.driver_request_status as LoadingStatus}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel>{t("documentStatus")}</FieldLabel>
            <div className="mt-1">
              <DocumentStatusBadge
                status={driver.document_verify as DocumentStatus}
              />
            </div>
          </Field>

          <FormInputField
            id="national-id"
            label={t("nationalId")}
            value={driver.national_id ?? t("notAvailable")}
            readOnly
          />

          <FormInputField
            id="plate-number"
            label={t("plateNumber")}
            value={`${driver.car_plate_number || ""} - ${driver.car_plate_character || ""}`}
            readOnly
          />

          <FormInputField
            id="plate-number"
            label={t("carCapacity")}
            value={`${driver.car_hold_capacity || ""} ${t("ton")}`}
            readOnly
          />

          <FormInputField
            id="joining-date"
            label={t("joiningDate")}
            value={new Date(driver.created_at).toISOString().split("T")[0]}
            readOnly
          />
        </FieldGroup>
      </div>

      {/* Modal */}
      {isOpen && driver.personal_photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={driver.personal_photo}
                alt={driver.driver_name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-white text-sm font-medium mt-3">
              {driver.driver_name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
