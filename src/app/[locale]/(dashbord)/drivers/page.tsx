import DriversList from "./_components/drivers-list";

type DriverStatus = "free" | "offline" | "pending" | "blocked";
type LoadingStatus = "loaded" | "not loaded" | "pending";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    driverStatus?: DriverStatus; // ✅
    loadingStatus?: LoadingStatus; // ✅
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page, limit, search, driverStatus, loadingStatus } =
    await searchParams;

  return (
    <DriversList
      page={page ? Number(page) : 1}
      limit={limit ? Number(limit) : 10}
      search={search}
      driverStatus={driverStatus} // ✅
      loadingStatus={loadingStatus} // ✅
    />
  );
}
