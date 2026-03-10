import Image from "next/image";
import logoImage from "@/public/images/logo.webp";
import logoImage2 from "@/public/images/logo2.webp";

export default function Logo({
  type = "light",
  width = 208,
  height = 60,
}: {
  type?: "dark" | "light";
  width?: number;
  height?: number;
}) {
  return (
    <div className="w-full h-26 p-6 flex justify-center items-center">
      {type === "light" ? (
        <Image src={logoImage} alt="Logo" width={width} height={height} />
      ) : (
        <Image src={logoImage2} alt="Logo" width={width} height={height} />
      )}
    </div>
  );
}
