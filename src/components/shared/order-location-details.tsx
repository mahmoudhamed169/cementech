import { MapPin } from "lucide-react";

type LocationDetail = {
  title: string;
  address: string;
  iconColor?: string; // لون الأيقونة
  iconBgColor?: string; // لون الخلفية
};

export default function OrderLocationDetails({
  title,
  locations,
}: {
  title: string;
  locations: LocationDetail[];
}) {
  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">{title}</h2>

      <div className="mt-2 flex justify-around">
        {locations.map((loc, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: loc.iconBgColor ?? "#DCFCE7" }}
            >
              <MapPin
                size={16}
                className="stroke-current"
                style={{ color: loc.iconColor ?? "#00A63E" }}
              />
            </div>
            <div>
              <h6 className="text-[#101828]">{loc.title}</h6>
              <p className="text-[#4A5565]">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
