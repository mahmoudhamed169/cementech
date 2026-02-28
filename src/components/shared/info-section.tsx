import { Link } from "@/src/i18n/navigation";
import { ExternalLink, Navigation } from "lucide-react";
import React from "react";

type InfoItem = {
  label: string;
  value: React.ReactNode;
};

export default function InfoSection({
  title,
  items,
  trackingUrl,
}: {
  title: string;
  items: InfoItem[];
  trackingUrl?: string;
}) {
  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">{title}</h2>

      <div className="my-2.5  flex flex-col gap-2.5 text-[#364153]">
        {items.map((item, index) => (
          <div className="flex gap-3" key={index}>
            <span className="font-bold">{item.label} :</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      {trackingUrl && (
        <Link href={trackingUrl as any} className="text-[#155DFC] flex gap-2">
          <Navigation />
          <span className=" underline">تتبع الطلب على الخريطة</span>
        </Link>
      )}
    </div>
  );
}
