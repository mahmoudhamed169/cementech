import Image from "next/image";
import logoImage from "@/public/images/logo.webp";

export default function Logo() {
  return (
    <div className="w-full h-26 p-6 flex justify-center items-center">
      <Image src={logoImage} alt="Logo" width={208} height={60} />
    </div>
  );
}
