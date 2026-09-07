import Image from "next/image";
import site from "@config/site.json";
import { assetPath } from "@/lib/paths";

export function LabLogo({
  className = "",
  priority = false,
  variant = "blue",
}: {
  className?: string;
  priority?: boolean;
  variant?: "blue" | "black";
}) {
  const logo = variant === "black" ? site.lab.headerFooterLogo : site.lab.logo;
  return (
    <Image
      src={assetPath(logo.src)}
      width={logo.width}
      height={logo.height}
      alt="RLC — Robot Learning and Control"
      className={`lab-logo ${className}`}
      priority={priority}
    />
  );
}
