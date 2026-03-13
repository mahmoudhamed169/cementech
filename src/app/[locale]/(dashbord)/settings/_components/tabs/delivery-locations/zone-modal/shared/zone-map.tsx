"use client";

import dynamic from "next/dynamic";

type Props = {
  lat: number;
  lng: number;
  radius?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  readonly?: boolean;
  fullWidth?: boolean;
};

const ZoneMapInner = dynamic(() => import("./zone-map-inner"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "256px", width: "100%" }}
      className="rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center"
    >
      <p className="text-sm text-gray-400">جاري تحميل الخريطة...</p>
    </div>
  ),
});

export default function ZoneMap(props: Props) {
  return <ZoneMapInner {...props} />;
}