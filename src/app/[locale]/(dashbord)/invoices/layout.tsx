import React from "react";
import InvoicesHeader from "./_components/invoices-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <InvoicesHeader />
      {children}
    </main>
  );
}
