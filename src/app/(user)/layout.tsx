import type {Metadata} from "next";
import "@/app/globals.css";
import {Suwannaphum} from "next/font/google";
import NavbarPage from "@/components/Navbar/NavbarPage";
import {Toaster} from "@/components/ui/sonner";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import FloatButton from "@/components/home/FloatButton";
import BannerComponent from "@/components/BannerComponent";

const suwannaphum = Suwannaphum({
    weight: ["100", "300", "400", "700", "900"],
    variable: "--font-suwannaphum",
    display: "swap",
    subsets: ["khmer"],
});

export const metadata: Metadata = {
    title: "CAM-O2 APP ",
    description: "CAM-O2 APP is a vibrant platform to shop high-quality Khmer products, make seamless payments, support local farmers, promote sustainable agriculture, and empower users to create and explore blogs.",
    icons: {
        icon: "/new-logo-o2.png",
    },
    openGraph: {
        title: "CAM-O2 APP ",
        description: "CAM-O2 APP is a vibrant platform to shop high-quality Khmer products, make seamless payments, support local farmers, promote sustainable agriculture, and empower users to create and explore blogs.",
        siteName: "CAM-O2 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/76434377-7e43-4865-9a09-866f7668ec0b.jpg",
                alt: "CAM-O2 APP ",
            },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/manifest.json"/>
        </head>
        <body className={`${suwannaphum.className} bg-background_color`}>
        <BannerComponent/>
        <NavbarPage/>
        <main className="w-full">
            <TooltipProvider>
                {children}
                <FloatButton/>
            </TooltipProvider>
            <Toaster position="top-center"/>
        </main>
        </body>
        </html>
    );
}