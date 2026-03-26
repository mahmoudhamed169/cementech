// loadingRequests/[id]/page.tsx
import {
  getRequestById,
  RequestData,
  RequestResponse,
} from "@/src/lib/services/loading-requests/getRequestById";
import { cookies } from "next/headers";
import RequestPageTitle from "./_components/request-page-title";
import RequestStatusCell from "./_components/request-status-cell";
import RequestInfoSection from "./_components/request-info-section";
import RequestLocationSection from "./_components/request-location-section";
import RequestLogsSection from "./_components/request-logs-section";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let request: RequestData | null = null;

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  try {
    const response: RequestResponse = await getRequestById(id, locale);
    if (response.success) {
      request = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch request:", error);
  }

  if (!request)
    return (
      <div className="p-6 space-y-6 bg-white rounded-2xl min-h-screen">
        <RequestPageTitle />
      </div>
    );

  return (
    <div className="p-6 space-y-10 bg-white rounded-2xl min-h-screen">
      <RequestPageTitle requestCode={request.code} />
      <RequestStatusCell status={request.request_status} />
      <RequestInfoSection request={request} />
      <RequestLocationSection request={request} />
      <RequestLogsSection logs={request.logs} />
    </div>
  );
}
