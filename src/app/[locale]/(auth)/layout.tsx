import AuthImage from "@/public/images/auth.webp";
import Image from "next/image";

export default function authlayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex">
      <div className="w-[45%] ">{children}</div>
      <div className="relative w-[55%]">
        <Image src={AuthImage} alt="auth" fill className="object-cover" />
      </div>
    </main>
  );
}
