import AuthImage from "@/public/images/auth.webp";
import Image from "next/image";
import { authOptions } from "@/src/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/src/i18n/routing";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${defaultLocale}`);
  }

  return (
    <main className="min-h-screen flex">
      <div className="w-[45%]">{children}</div>
      <div className="relative w-[55%]">
        <Image src={AuthImage} alt="auth" fill className="object-cover" />
      </div>
    </main>
  );
}
