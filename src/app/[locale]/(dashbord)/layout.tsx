import Header from "@/src/components/shared/header";
import Sidebar from "@/src/components/shared/sidebar";
import { authOptions } from "@/src/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/src/i18n/routing";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${defaultLocale}/login`);
  }

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ms-64 bg-zinc-100 min-h-screen">
        <Header />
        {children}
      </div>
    </main>
  );
}
