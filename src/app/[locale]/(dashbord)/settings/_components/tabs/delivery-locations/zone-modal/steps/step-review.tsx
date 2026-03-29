"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import ZoneMap from "../shared/zone-map";
import { ZoneFormData } from "../use-zone-modal";

type Props = {
  formData: ZoneFormData;
};

export default function StepReview({ formData }: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal.stepReview");

  return (
    <div className="space-y-4">
      <div className="text-start">
        <h3 className="text-lg font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Map */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{t("mapPreview")}</p>
          <ZoneMap
            lat={formData.lat}
            lng={formData.lng}
            radius={formData.radius}
            readonly
          />
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-700">{t("summary")}</p>

          <div className="space-y-3">
            <div className="border-b border-gray-100 pb-2">
              <p className="text-xs text-gray-400">{t("zoneName")}</p>
              <p className="text-sm font-medium text-gray-800">
                {formData.name}
              </p>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <p className="text-xs text-gray-400">{t("location")}</p>
              <p className="text-sm font-medium text-gray-800">
                {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
              </p>
              <p className="text-xs text-gray-400">
                {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
              </p>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <p className="text-xs text-gray-400">{t("radius")}</p>
              <p className="text-2xl font-bold text-gray-800">
                {formData.radius} {t("km")}
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700 flex items-center gap-2">
            <Check size={16} />
            {t("readyToSave")}
          </div>
        </div>
      </div>
    </div>
  );
}
