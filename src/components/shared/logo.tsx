import Image from "next/image";
import logoImage from "@/public/images/logo.webp";
import logoImage2 from "@/public/images/logo2.webp";

export default function Logo({ type = "light" }: { type?: "dark" | "light" }) {
  return (
    <div className="w-full h-26 p-6 flex justify-center items-center">
      {type === "light" ? (
        <Image src={logoImage} alt="Logo" width={208} height={60} />
      ) : (
        <Image src={logoImage2} alt="Logo" width={208} height={60} />
      )}
    </div>
  );
}
