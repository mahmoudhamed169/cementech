import React from "react";
import LoadingRequestHeader from "./_components/loading-header-page";
import LoadingRequestStatistics from "./_components/loading-request-statistics";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <LoadingRequestHeader />
      <LoadingRequestStatistics />
      {children}
    </main>
  );
}
