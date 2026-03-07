import Logo from "@/src/components/shared/logo";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="mt-24">
        <Logo type="dark" width={290} height={85} />
      </div>
      {children}
    </div>
  );
}
