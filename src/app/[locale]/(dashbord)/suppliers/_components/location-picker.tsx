"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, LocateFixed } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface LocationPickerProps {
  value?: { lat: number; lng: number };
  onChange: (val: { lat: number; lng: number }) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const t = useTranslations("suppliersPage.addFactory.fields.location");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isLocating, setIsLocating] = useState(false);

  const defaultCenter = value ?? { lat: 24.7136, lng: 46.6753 };

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [defaultCenter.lat, defaultCenter.lng],
        zoom: 12,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 20,
      }).addTo(map);

      L.control.zoom({ position: "bottomleft" }).addTo(map);

      const marker = L.marker([defaultCenter.lat, defaultCenter.lng], {
        draggable: true,
      }).addTo(map);

      marker.on("dragend", () => {
        const { lat, lng } = marker.getLatLng();
        onChange({ lat, lng });
      });

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChange({ lat, lng });
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      alert(t("noGeolocation"));
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        markerRef.current?.setLatLng([lat, lng]);
        mapInstanceRef.current?.flyTo([lat, lng], 15, { duration: 1.5 });
        onChange({ lat, lng });
        setIsLocating(false);
      },
      () => {
        alert(t("geolocationError"));
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-6 w-full">
      <div className="relative w-[65%] m-auto">
        <div
          ref={mapRef}
          style={{ height: "220px", width: "100%" }}
          className="rounded-2xl overflow-hidden border border-[#D1D5DC]"
        />

        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={isLocating}
          className="absolute top-3 left-3 z-[999] flex items-center gap-1.5 bg-white text-[#364153] text-xs font-medium px-3 py-1.5 rounded-lg shadow-md hover:bg-gray-50 transition-all disabled:opacity-60"
        >
          <LocateFixed
            size={14}
            className={
              isLocating ? "animate-spin text-[#00A63E]" : "text-[#00A63E]"
            }
          />
          {isLocating ? t("locating") : t("currentLocation")}
        </button>
      </div>

      <button
        type="button"
        dir="ltr"
        className="flex items-center justify-between w-[65%] mx-auto px-3 py-2.5 bg-[#F9FAFB] rounded-xl text-sm hover:border-[#101828] transition-all duration-200"
        onClick={() => {
          mapInstanceRef.current?.once("click", (e: any) => {
            const { lat, lng } = e.latlng;
            markerRef.current?.setLatLng([lat, lng]);
            onChange({ lat, lng });
          });
        }}
      >
        <span className="text-[#9AA3AF] flex gap-2 items-center">
          <MapPin size={16} className="stroke-red-600" />
          {value
            ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}`
            : t("placeholder")}
        </span>
        {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}
