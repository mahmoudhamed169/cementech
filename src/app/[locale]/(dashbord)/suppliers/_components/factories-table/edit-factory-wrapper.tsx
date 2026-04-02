import { getLocale } from "next-intl/server";
import FactoryDialog from "../factory-dialog";
import { getFactoryById } from "@/src/lib/services/factories/get-factory";
import { SquarePen } from "lucide-react";

interface EditFactoryWrapperProps {
  id: string;
}

export default async function EditFactoryWrapper({
  id,
}: EditFactoryWrapperProps) {
  const locale = await getLocale();
  const { data } = await getFactoryById(id);

  const defaultValues = {
    nameAr: data.name_ar,
    nameEn: data.name_en,
    locationAr: data.location_ar,
    locationEn: data.location_en,
    phone: data.contact_number,
    status: data.is_active,
    location:
      data.lat && data.lng
        ? { lat: Number(data.lat), lng: Number(data.lng) }
        : undefined,
    products: data.products.map((p) => ({
      nameAr: p.name_ar,
      nameEn: p.name_en,
      price: String(p.price),
      driver_price: String(p.driver_price),
      isActive: true,
    })),
  };

  return (
    <FactoryDialog
      mode="edit"
      factoryId={data.id}
      defaultValues={defaultValues}
      trigger={
        <button className="group p-2 rounded-xl transition-all duration-200 hover:bg-blue-50">
          <SquarePen
            size={18}
            className="text-[#9AA3AF] group-hover:text-blue-500 transition-colors duration-200"
          />
        </button>
      }
    />
  );
}
