"use client";
import { usePathname } from "next/navigation";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useRouter } from "next/navigation";
export default function BannerComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const isRender = pathname === "/success-payment" || pathname === "/verify";
  return (
    <div
      onClick={() => router.push("/pwa")}
      className=" bg-accent w-full text-center underline h-[35px] flex items-center justify-center text-white  cursor-pointer"
    >
      <SparklesText className="text-body">
        {" "}
        Introduce To PWA Feature
      </SparklesText>
    </div>
  );
}
