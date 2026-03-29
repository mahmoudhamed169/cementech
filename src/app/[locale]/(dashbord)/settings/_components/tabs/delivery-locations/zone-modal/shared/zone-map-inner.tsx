"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  lat: number;
  lng: number;
  radius?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  readonly?: boolean;
  fullWidth?: boolean;
};

function generateCirclePoints(
  lat: number,
  lng: number,
  radiusMeters: number,
  points: number
): L.LatLngTuple[] {
  const earthRadius = 6371000;
  const result: L.LatLngTuple[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
    const newLng = lng + (dx / (earthRadius * Math.cos((lat * Math.PI) / 180))) * (180 / Math.PI);
    result.push([newLat, newLng]);
  }
  return result;
}

export default function ZoneMapInner({
  lat,
  lng,
  radius,
  onLocationSelect,
  readonly = false,
  fullWidth = false,
}: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const overlayRef = useRef<L.Layer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultLat = lat || 24.6084;
  const defaultLng = lng || 46.6594;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([defaultLat, defaultLng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    mapRef.current = map;

    if (!readonly) {
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelect?.(lat, lng);
      });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;

    const customIcon = L.divIcon({
      className: "",
      html: `<div style="
        width: 32px; height: 32px;
        background: #2563eb;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(37,99,235,0.4);
      "></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);
    }

    if (!radius) {
      mapRef.current.setView([lat, lng], 13);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (!mapRef.current || !lat || !lng || !radius) return;

    if (overlayRef.current) {
      mapRef.current.removeLayer(overlayRef.current);
    }

    const outerBounds: L.LatLngTuple[] = [
      [-90, -180], [-90, 180], [90, 180], [90, -180],
    ];
    const circlePoints = generateCirclePoints(lat, lng, radius * 1000, 64);

    const overlay = L.polygon([outerBounds, circlePoints], {
      color: "transparent",
      fillColor: "#000",
      fillOpacity: 0.35,
      stroke: false,
    }).addTo(mapRef.current);

    overlayRef.current = overlay;

    // Zoom to fit the circle
    const radiusDeg = (radius * 1000) / 111320;
    const bounds = L.latLngBounds(
      [lat - radiusDeg * 1.5, lng - radiusDeg * 1.5],
      [lat + radiusDeg * 1.5, lng + radiusDeg * 1.5]
    );
    mapRef.current.fitBounds(bounds);
  }, [lat, lng, radius]);

  return (
    <div
      ref={containerRef}
      style={{ height: fullWidth ? "380px" : "256px", width: "100%" }}
      className="rounded-xl overflow-hidden border border-gray-200 z-0"
    />
  );
}