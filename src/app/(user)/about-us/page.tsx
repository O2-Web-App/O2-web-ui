import AboutUsComponent from "@/components/about-us/AboutUsComponent";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "About Us - CAM-02 APP",
    description: "Learn about CAM-02 APP, a platform dedicated to promoting quality products made by Khmer children, empowering local communities, and fostering creativity.",
    openGraph: {
        title: "About Us - CAM-02 APP",
        description: "Learn about CAM-02 APP, a platform dedicated to promoting quality products made by Khmer children, empowering local communities, and fostering creativity.",
        siteName: "CAM-02 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/a1de1f7f-d61e-4741-8bbc-347c9f34e4e1.jpg",
                alt: "CAM-02 APP - Empowering Khmer Communities",
            },
        ],
    },
};


export default function AboutUsPage() {


    return (
        <AboutUsComponent/>
    );
}