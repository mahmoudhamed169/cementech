import PageTitleWithBack from "../../users/[id]/_components/page-title-with-back";
import DriverDetails from "./_components/driver-details";
import DriverStats from "./_components/driver-state";
import DriverDocumentsSection from "./_components/driver-documents-section";
import { fetchDriver } from "@/src/lib/services/spacific-user";
import { DriverUser } from "@/src/lib/types/spacific-user";

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  console.log("ID:", id);

  const driver: DriverUser = await fetchDriver(id);

  console.log(driver);
  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <PageTitleWithBack title="بيانات السائق" backHref="/drivers" />

      {/* DRIVER DETAILS */}
      <DriverDetails driver={driver} />

      {/* DRIVER STATS */}
      <DriverStats
        totalOrderCount={driver.total_delivered_orders}
        totalPaid={1250}
        lastOrderDate="2025-01-24"
      />

      {/* بيانات التحميل */}

      {/* DRIVER DOCUMENTS */}
      <DriverDocumentsSection  documentVerifyStatus={driver.driver_profile.document_verify} driverNationalIdFront={driver.driver_profile.national_id_front} driverNationalIdBack={driver.driver_profile.national_id_back} driverLicenseFront={driver.driver_profile.driver_license_front} driverLicenseBack={driver.driver_profile.driver_license_back} carLicense={driver.driver_profile.car_license} carInsurance={driver.driver_profile.car_insurance}/>

      {/*  */}
    </main>
  );
}
