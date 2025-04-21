import HomePageComponent from "@/components/home/HomePageComponent";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "CAM-02 APP - Support Khmer Local Products",
    description: "Discover CAM-02 APP, your platform to order quality products and agricultural goods made by Khmer children, with easy QR payments and a vibrant community.",
    openGraph: {
        title: "CAM-02 APP - Support Khmer Local Products",
        description: "Discover CAM-02 APP, your platform to order quality products and agricultural goods made by Khmer children, with easy QR payments and a vibrant community.",
        siteName: "CAM-02 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/a1de1f7f-d61e-4741-8bbc-347c9f34e4e1.jpg",
                alt: "CAM-02 APP - Promoting Khmer Children’s Products",
            },
        ],
    },
};


export default function Page() {

    return (
        <HomePageComponent/>
    )
}