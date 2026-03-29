"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ZoneMap from "../shared/zone-map";
import { ZoneFormData } from "../use-zone-modal";

type Props = {
  formData: ZoneFormData;
  onUpdate: <K extends keyof ZoneFormData>(
    key: K,
    value: ZoneFormData[K],
  ) => void;
};

export default function StepSettings({ formData, onUpdate }: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal.stepSettings");

  return (
    <div className="space-y-4">
      <div className="text-start">
        <h3 className="text-lg font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("zoneName")}</Label>
            <Input
              value={formData.name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder={t("zoneNamePlaceholder")}
            />
          </div>

          <div className="space-y-3">
            <Label>
              {t("radius")} ({t("km")})
            </Label>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>1 {t("km")}</span>
              <span className="text-base font-bold text-gray-700">
                {formData.radius} {t("km")}
              </span>
              <span>100 {t("km")}</span>
            </div>

            <Slider
              min={1}
              max={100}
              step={1}
              value={[formData.radius]}
              onValueChange={([val]) => onUpdate("radius", val)}
              className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-blue-200 [&>.relative>span:first-child]:bg-gray-100 [&_.absolute]:bg-gradient-to-r [&_.absolute]:from-blue-400 [&_.absolute]:to-blue-600"
            />
          </div>

          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
            {t("coverageNote", { radius: formData.radius })}
          </div>
        </div>

        {/* Map Preview */}
        <div className="space-y-2">
          <Label>{t("mapPreview")}</Label>
          <ZoneMap
            lat={formData.lat}
            lng={formData.lng}
            radius={formData.radius}
            readonly
          />
        </div>
      </div>
    </div>
  );
}
