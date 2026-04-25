import DriverDetails from "./_components/driver-details";
import DriverStats from "./_components/driver-state";
import DriverDocumentsSection from "./_components/driver-documents-section";
import { fetchDriver } from "@/src/lib/services/driver-profile";
import { DriverProfile } from "@/src/lib/types/driver";
import DriverActions from "./_components/driver-actions";
import UserOrders from "../../users/[id]/_components/user-order";
import { getTranslations } from "next-intl/server";
import DriverPageTitle from "./_components/DriverPageTitle";

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  const driver: DriverProfile = await fetchDriver(id);
  const t = await getTranslations("driverPage");

  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <DriverPageTitle />
      {/* DRIVER DETAILS */}
      <DriverDetails driver={driver} />
      {/* DRIVER STATS */}
      <DriverStats
        totalOrderCount={driver.stats.totalOrders}
        totalPaid={driver.stats.totalPaid}
        lastOrderDate={
          driver.stats.lastOrderDate ? new Date(driver.stats.lastOrderDate) : ""
        }
        noOrdersText={t("driverStats.noOrders")}
      />
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
      {driver.document_verify !== "rejected" &&
        driver.document_verify !== "pending" && (
          <UserOrders
            userId={id}
            page={page ? Number(page) : 1}
            systemScreen="driver_permission"
          />
        )}
      {driver.document_verify !== "rejected" && (
        <DriverActions driver={driver} />
      )}
    </main>
  );
}
