import HomePageComponent from "@/components/home/HomePageComponent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home - CAM-02 APP",
    description: " CAM-02 APP, your go-to platform for discovering and ordering high-quality Khmer products, exclusive discounts, and seamless QR payments, all while supporting local communities.",
    openGraph: {
        title: "Home - CAM-02 APP",
        description: " CAM-02 APP, your go-to platform for discovering and ordering high-quality Khmer products, exclusive discounts, and seamless QR payments, all while supporting local communities.",
        siteName: "CAM-02 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/76434377-7e43-4865-9a09-866f7668ec0b.jpg",
                alt: "CAM-02 APP",
            },
        ],
    },
};

export default function Page() {
    return (
        <HomePageComponent/>
    )
}