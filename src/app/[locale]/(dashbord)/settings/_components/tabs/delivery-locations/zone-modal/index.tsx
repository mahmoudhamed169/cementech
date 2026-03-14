"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useZoneModal } from "./use-zone-modal";
import StepIndicator from "./shared/step-indicator";
import ModalFooter from "./shared/modal-footer";
import StepLocation from "./steps/step-location";
import StepSettings from "./steps/step-settings";
import StepReview from "./steps/step-review";
import { DeliveryZone } from "../index";

type Props = {
  mode: "add" | "edit";
  zone?: DeliveryZone;
  open: boolean;
  onClose: () => void;
  onSave: (data: DeliveryZone) => void;
};

export default function ZoneModal({
  mode,
  zone,
  open,
  onClose,
  onSave,
}: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal");
  const {
    step,
    formData,
    isEdit,
    totalSteps,
    next,
    back,
    updateField,
    isStepValid,
  } = useZoneModal({ mode, zone });

  const handleSave = () => {
    onSave({
      id: zone?.id ?? crypto.randomUUID(),
      name: formData.name,
      radius: formData.radius,
      lat: formData.lat,
      lng: formData.lng,
      enabled: zone?.enabled ?? true,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl bg-white border-0">
        <DialogHeader>
          <StepIndicator currentStep={step} totalSteps={totalSteps} />
        </DialogHeader>

        <div className="py-2">
          {step === 1 && (
            <StepLocation
              formData={formData}
              onLocationSelect={(lat, lng) => {
                updateField("lat", lat);
                updateField("lng", lng);
              }}
            />
          )}
          {step === 2 && (
            <StepSettings formData={formData} onUpdate={updateField} />
          )}
          {step === 3 && <StepReview formData={formData} />}
        </div>

        <ModalFooter
          step={step}
          totalSteps={totalSteps}
          isStepValid={isStepValid(step)}
          isEdit={isEdit}
          onNext={next}
          onBack={back}
          onCancel={onClose}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
