"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DeliveryZoneRow from "./delivery-zone-row";
import AddZoneButton from "./add-zone-button";
import EmptyZones from "./empty-zones";
import ZoneModal from "./zone-modal";
import { useDeliveryLocations } from "../../../_hooks/delivery/use-delivery-locations";
import { Loader2 } from "lucide-react";

export type DeliveryZone = {
  id: string;
  name_ar: string;
  name_en: string;
  radius: number;
  lat: number;
  lng: number;
  enabled: boolean;
};

export default function DeliveryLocationsTab() {
  const t = useTranslations("settingsPage.tabs.delivery");

  const { data, isLoading, isError } = useDeliveryLocations();

  const zones: DeliveryZone[] = (data?.data ?? []).map((loc) => ({
    id: loc.id,
    name_ar: loc.name_ar,
    name_en: loc.name_en,
    radius: loc.radius,
    lat: loc.lat,
    lng: loc.lng,
    enabled: loc.is_active,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [editZone, setEditZone] = useState<DeliveryZone | undefined>();

  const handleToggle = (id: string, value: boolean) => {
    // TODO: PATCH API call
  };

  const handleAdd = () => {
    setEditZone(undefined);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditZone(zones.find((z) => z.id === id));
    setModalOpen(true);
  };

  const handleSave = (zone: DeliveryZone) => {
    // TODO: invalidate query
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-start">
            <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
            <p className="text-sm text-gray-500">{t("subtitle")}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 size={28} className="text-gray-400 animate-spin" />{" "}
          <p className="text-sm text-gray-400">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-start">
            <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
            <p className="text-sm text-gray-500">{t("subtitle")}</p>
          </div>
        </div>
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center text-sm text-red-500">
          {t("errorLoading")}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="text-start">
          <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <AddZoneButton label={t("addZone")} onClick={handleAdd} />
      </div>

      {zones.length === 0 ? (
        <EmptyZones onAdd={handleAdd} />
      ) : (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-100">
            <span>{t("table.zone")}</span>
            <span className="text-center">{t("table.radius")}</span>
            <span className="text-center">{t("table.status")}</span>
            <span className="text-end">{t("table.actions")}</span>
          </div>

          {zones.map((zone) => (
            <DeliveryZoneRow
              key={zone.id}
              zone={zone}
              editLabel={t("edit")}
              onToggle={(val) => handleToggle(zone.id, val)}
              onEdit={() => handleEdit(zone.id)}
            />
          ))}
        </div>
      )}

      <ZoneModal
        mode={editZone ? "edit" : "add"}
        zone={editZone}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
