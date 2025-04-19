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
                url: "https://cam02app.com//storage/uploads/50095dd3-2263-4f69-b7e5-515b8cbfef7e.jpg",
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