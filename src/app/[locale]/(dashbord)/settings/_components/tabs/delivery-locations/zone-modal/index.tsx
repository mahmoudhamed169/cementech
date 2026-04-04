"use client";

"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { DeliveryZone } from "../index"; // ✅ ضيف الـ import ده

import ModalFooter from "./shared/modal-footer";
import { useZoneModal } from "./use-zone-modal";
import StepIndicator from "./shared/step-indicator";
import StepLocation from "./steps/step-location";
import StepSettings from "./steps/step-settings";
import StepReview from "./steps/step-review";
import { useAddDeliveryLocation } from "../../../../_hooks/delivery/use-add-delivery-location";
import { useUpdateDeliveryLocation } from "../../../../_hooks/delivery/use-update-delivery-location";

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

  const { mutateAsync: addZone, isPending: isAdding } =
    useAddDeliveryLocation();
  const { mutateAsync: updateZone, isPending: isUpdating } =
    useUpdateDeliveryLocation();

  const isPending = isAdding || isUpdating;

  const handleSave = async () => {
    try {
      if (isEdit) {
        const res = await updateZone({
          id: zone!.id,
          input: {
            name_ar: formData.name_ar,
            name_en: formData.name_en,
            lat: formData.lat,
            lng: formData.lng,
            radius: formData.radius,
            is_active: zone!.enabled,
          },
        });

        onSave({
          id: res.data.id,
          name_ar: res.data.name_ar,
          name_en: res.data.name_en,
          radius: res.data.radius,
          lat: res.data.lat,
          lng: res.data.lng,
          enabled: res.data.is_active,
        });
      } else {
        const res = await addZone({
          name_ar: formData.name_ar,
          name_en: formData.name_en,
          lat: formData.lat,
          lng: formData.lng,
          radius: formData.radius,
        });

        onSave({
          id: res.data.id,
          name_ar: res.data.name_ar,
          name_en: res.data.name_en,
          radius: res.data.radius,
          lat: res.data.lat,
          lng: res.data.lng,
          enabled: res.data.is_active,
        });
      }

      onClose();
    } catch {
      // toast handled in hook
    }
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
          isPending={isPending}
          onNext={next}
          onBack={back}
          onCancel={onClose}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
