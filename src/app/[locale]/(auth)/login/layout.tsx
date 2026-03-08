import Logo from "@/src/components/shared/logo";
import { authOptions } from "@/src/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center gap-24">
      <div className="mt-24">
        <Logo type="dark" width={290} height={85} />
      </div>
      {children}
    </div>
  );
}
