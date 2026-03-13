"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DeliveryZoneRow from "./delivery-zone-row";
import AddZoneButton from "./add-zone-button";
import EmptyZones from "./empty-zones";
import ZoneModal from "./zone-modal";

export type DeliveryZone = {
  id: string;
  name: string;
  radius: number;
  lat: number;
  lng: number;
  enabled: boolean;
};

const defaultZones: DeliveryZone[] = [
  {
    id: "1",
    name: "الرياض - حي الجوف",
    radius: 10,
    lat: 24.6084,
    lng: 46.6594,
    enabled: true,
  },
  {
    id: "2",
    name: "الرياض - حي الزرقاء",
    radius: 15,
    lat: 24.7136,
    lng: 46.6753,
    enabled: false,
  },
  {
    id: "3",
    name: "الرياض - حي الوادي",
    radius: 20,
    lat: 24.6877,
    lng: 46.7219,
    enabled: true,
  },
];

export default function DeliveryLocationsTab() {
  const t = useTranslations("settingsPage.tabs.delivery");
  const [zones, setZones] = useState<DeliveryZone[]>(defaultZones);
  const [modalOpen, setModalOpen] = useState(false);
  const [editZone, setEditZone] = useState<DeliveryZone | undefined>();

  const handleToggle = (id: string, value: boolean) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, enabled: value } : z)),
    );
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
    setZones((prev) =>
      prev.find((z) => z.id === zone.id)
        ? prev.map((z) => (z.id === zone.id ? zone : z))
        : [...prev, zone],
    );
  };

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
