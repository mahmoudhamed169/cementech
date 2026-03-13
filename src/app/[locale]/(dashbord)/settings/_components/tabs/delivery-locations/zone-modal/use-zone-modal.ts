import { useState } from "react";
import { DeliveryZone } from "../index";

export type ZoneFormData = {
  name: string;
  radius: number;
  lat: number;
  lng: number;
};

type Props = {
  mode: "add" | "edit";
  zone?: DeliveryZone;
};

export function useZoneModal({ mode, zone }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ZoneFormData>({
    name: zone?.name ?? "",
    radius: zone?.radius ?? 10,
    lat: zone?.lat ?? 0,
    lng: zone?.lng ?? 0,
  });

  const isEdit = mode === "edit";
  const totalSteps = 3;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const updateField = <K extends keyof ZoneFormData>(
    key: K,
    value: ZoneFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isStepValid = (currentStep: number) => {
    if (currentStep === 1) return formData.lat !== 0 && formData.lng !== 0;
    if (currentStep === 2)
      return formData.name.trim() !== "" && formData.radius > 0;
    return true;
  };

  return {
    step,
    formData,
    isEdit,
    totalSteps,
    next,
    back,
    updateField,
    isStepValid,
  };
}
