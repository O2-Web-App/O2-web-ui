import AboutUsComponent from "@/components/about-us/AboutUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - CAM-02 APP",
    description: "Discover CAM-02 APP, a platform committed to sustainable agriculture, empowering Khmer farmers, and promoting high-quality local products while fostering community development and environmental sustainability.",
    openGraph: {
        title: "About Us - CAM-02 APP",
        description: "Discover CAM-02 APP, a platform committed to sustainable agriculture, empowering Khmer farmers, and promoting high-quality local products while fostering community development and environmental sustainability.",
        siteName: "CAM-02 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/76434377-7e43-4865-9a09-866f7668ec0b.jpg",
                alt: "CAM-02 APP - About Us",
            },
        ],
    },
};

export default function AboutUsPage() {
    return (
        <AboutUsComponent/>
    );
}