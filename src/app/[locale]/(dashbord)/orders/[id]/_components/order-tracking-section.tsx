// app/orders/_components/order-tracking-section.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useOrderTracking } from "../_hooks/use-order-tracking";
import { OrderData } from "@/src/lib/services/orders/spacific-order";
import { useTranslations } from "next-intl";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

// ─── Status config ────────────────────────────────────────────────────────────

const TRACKING_STATUSES = ["delivery", "قيد التوصيل", "جاري التوصيل"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatLastSeen(iso: string, t: ReturnType<typeof useTranslations>) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 30) return t("tracking.lastSeen.now");
  if (diff < 60) return t("tracking.lastSeen.seconds", { count: diff });
  if (diff < 3600)
    return t("tracking.lastSeen.minutes", { count: Math.floor(diff / 60) });
  return t("tracking.lastSeen.hours", { count: Math.floor(diff / 3600) });
}

function makeDriverIcon(name: string, isLive: boolean) {
  const L = require("leaflet"); // eslint-disable-line
  const initials = name
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bg = isLive ? "#16a34a" : "#9ca3af";
  const border = isLive ? "#15803d" : "#6b7280";

  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="52" viewBox="0 0 42 52">
      <circle cx="21" cy="19" r="18" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
      <text x="21" y="24" text-anchor="middle" font-family="system-ui" font-size="12"
            font-weight="600" fill="#fff">${initials}</text>
      <polygon points="21,50 12,34 30,34" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
    </svg>`,
    className: "",
    iconSize: [42, 52],
    iconAnchor: [21, 52],
    popupAnchor: [0, -54],
  });
}

function makeCustomerIcon() {
  const L = require("leaflet"); // eslint-disable-line
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <circle cx="18" cy="16" r="15" fill="#dc2626" stroke="#b91c1c" stroke-width="1.5"/>
      <text x="18" y="21" text-anchor="middle" font-family="system-ui" font-size="16" fill="#fff">📍</text>
      <polygon points="18,42 10,30 26,30" fill="#dc2626" stroke="#b91c1c" stroke-width="1.5"/>
    </svg>`,
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -46],
  });
}

// ─── Inner map ────────────────────────────────────────────────────────────────

function LiveMap({
  drivers,
  positions,
  customerLat,
  customerLng,
  addressTitle,
  t,
}: {
  drivers: ReturnType<typeof useOrderTracking>["drivers"];
  positions: ReturnType<typeof useOrderTracking>["positions"];
  customerLat: number;
  customerLng: number;
  addressTitle: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const { useMap } = require("react-leaflet"); // eslint-disable-line
  const map = useMap();

  const driverCoords = useMemo(
    () =>
      Object.values(positions).map((p) => [p.lat, p.lng] as [number, number]),
    [positions],
  );

  useEffect(() => {
    const L = require("leaflet"); // eslint-disable-line
    const allCoords: [number, number][] = [
      [customerLat, customerLng],
      ...driverCoords,
    ];

    if (allCoords.length === 1) {
      map.flyTo(allCoords[0], 14, { duration: 1.2 });
    } else {
      map.flyToBounds(L.latLngBounds(allCoords), {
        padding: [60, 60],
        duration: 1.2,
      });
    }
  }, [driverCoords, customerLat, customerLng, map]);

  return (
    <>
      <Marker position={[customerLat, customerLng]} icon={makeCustomerIcon()}>
        <Popup>
          <div className="text-sm space-y-1 min-w-[140px]">
            <p className="font-semibold text-gray-900">
              {t("tracking.customerLocation")}
            </p>
            <p className="text-gray-500 text-xs">{addressTitle}</p>
          </div>
        </Popup>
      </Marker>

      {drivers.map((driver) => {
        const pos = positions[driver.driver_id];
        if (!pos) return null;
        return (
          <Marker
            key={driver.driver_id}
            position={[pos.lat, pos.lng]}
            icon={makeDriverIcon(driver.driver_name, true)}
          >
            <Popup>
              <div className="text-sm space-y-1 min-w-[150px]">
                <p className="font-semibold text-gray-900">
                  {driver.driver_name}
                </p>
                <p className="text-gray-500">{driver.code}</p>
                <p className="text-gray-500">{driver.phone}</p>
                <p className="text-xs text-gray-400 pt-1">
                  {formatLastSeen(pos.timestamp, t)}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({
  live,
  total,
  t,
}: {
  live: number;
  total: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const isActive = live > 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
        isActive
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-gray-100 text-gray-500 border border-gray-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
        }`}
      />
      {isActive
        ? t("tracking.badge.live", { live, total })
        : t("tracking.badge.waiting")}
    </span>
  );
}

// ─── Driver sidebar card ──────────────────────────────────────────────────────

function DriverCard({
  name,
  code,
  phone,
  isLive,
  lastSeen,
  t,
}: {
  name: string;
  code: string;
  phone: string;
  isLive: boolean;
  lastSeen?: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 transition-colors ${
        isLive ? "bg-green-50/60" : "bg-white"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${
          isLive ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500">{code}</p>
      </div>

      <div className="text-right shrink-0 space-y-1">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
            isLive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLive ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {isLive ? t("tracking.driver.live") : t("tracking.driver.offline")}
        </span>
        {lastSeen && <p className="text-[10px] text-gray-400">{lastSeen}</p>}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface Props {
  order: OrderData;
}

export default function OrderTrackingSection({ order }: Props) {
  const t = useTranslations("orders");

  const shouldTrack = TRACKING_STATUSES.includes(order.order_status);

  const customerLat = parseFloat(order.address_lat);
  const customerLng = parseFloat(order.address_lng);
  const hasCustomerLocation = !isNaN(customerLat) && !isNaN(customerLng);

  const { drivers, positions, liveDrivers, isLoading, isError } =
    useOrderTracking(String(order.id), shouldTrack);

  if (!shouldTrack) return null;

  const defaultCenter: [number, number] = hasCustomerLocation
    ? [customerLat, customerLng]
    : [24.7136, 46.6753];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-base font-semibold text-gray-900">
            {t("tracking.title")}
          </h2>
          <p className="text-xs text-gray-500">{t("tracking.subtitle")}</p>
        </div>
        {!isLoading && !isError && (
          <StatusBadge live={liveDrivers.length} total={drivers.length} t={t} />
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="h-[420px] rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
          <p className="text-sm text-gray-400">{t("tracking.loading")}</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="h-24 rounded-2xl border border-red-100 bg-red-50 flex items-center justify-center">
          <p className="text-sm text-red-500">{t("tracking.error")}</p>
        </div>
      )}

      {/* No drivers */}
      {!isLoading && !isError && drivers.length === 0 && (
        <div className="h-24 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
          <p className="text-sm text-gray-400">{t("tracking.noDrivers")}</p>
        </div>
      )}

      {/* Map + sidebar */}
      {!isLoading && !isError && drivers.length > 0 && (
        <div className="flex gap-0 rounded-2xl border border-gray-100 overflow-hidden h-[420px]">
          {/* Sidebar */}
          <div className="w-56 shrink-0 border-r border-gray-100 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-medium text-gray-500">
                {t("tracking.driverCount", { count: drivers.length })}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {drivers.map((driver) => {
                const pos = positions[driver.driver_id];
                return (
                  <DriverCard
                    key={driver.driver_id}
                    name={driver.driver_name}
                    code={driver.code}
                    phone={driver.phone}
                    isLive={Boolean(pos)}
                    lastSeen={
                      pos ? formatLastSeen(pos.timestamp, t) : undefined
                    }
                    t={t}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                <span className="text-[11px] text-gray-500">
                  {t("tracking.legend.driver")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                <span className="text-[11px] text-gray-500">
                  {t("tracking.legend.customer")}
                </span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              center={defaultCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hasCustomerLocation && (
                <LiveMap
                  drivers={drivers}
                  positions={positions}
                  customerLat={customerLat}
                  customerLng={customerLng}
                  addressTitle={order.address_title}
                  t={t}
                />
              )}
            </MapContainer>

            {/* Overlay: waiting for driver location */}
            {liveDrivers.length === 0 && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-[400] pointer-events-none">
                <div className="text-center space-y-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mx-auto" />
                  <p className="text-xs text-gray-500">
                    {t("tracking.waitingLocation")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
