import PageTitleWithBack from "../../users/[id]/_components/page-title-with-back";
import DriverDetails from "./_components/driver-details";
import DriverStats from "./_components/driver-state";
import DriverDocumentsSection from "./_components/driver-documents-section";
import { fetchDriver } from "@/src/lib/services/driver-profile";
import { DriverProfile } from "@/src/lib/types/driver";
import DriverActions from "./_components/driver-actions";

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;

  const driver: DriverProfile = await fetchDriver(id);

  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <PageTitleWithBack title="بيانات السائق" backHref="/drivers" />

      {/* DRIVER DETAILS */}
      <DriverDetails driver={driver} />

      {/* DRIVER STATS */}
      <DriverStats
        totalOrderCount={driver.stats.totalOrders}
        totalPaid={driver.stats.totalPaid}
        lastOrderDate={
          driver.stats.lastOrderDate
            ? new Date(driver.stats.lastOrderDate).toLocaleDateString(
                "ar-EG",
                {},
              )
            : "لا توجد طلبات بعد"
        }
      />

      {/* بيانات التحميل */}

      {/* DRIVER DOCUMENTS */}
      <DriverDocumentsSection
        documentVerifyStatus={driver.document_verify}
        driverNationalIdFront={driver.national_id_front}
        driverNationalIdBack={driver.national_id_back}
        driverLicenseFront={driver.driver_license_front}
        driverLicenseBack={driver.driver_license_back}
        carLicense={driver.car_license}
        carInsurance={driver.car_insurance}
      />

      {/*  driver actions */}
      <DriverActions driver={driver} />

      {/*  */}
    </main>
  );
}
