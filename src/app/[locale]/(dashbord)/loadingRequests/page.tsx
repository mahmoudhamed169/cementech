import LoadingRequestHeader from "./_components/loading-header-page";
import LoadingReqList from "./_components/loading-req-list";
import LoadingRequestStatistics from "./_components/loading-request-statistics";

export default function page() {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <LoadingRequestHeader />
      <LoadingRequestStatistics />
      <LoadingReqList />
    </main>
  );
}
