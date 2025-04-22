import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suwannaphum } from "next/font/google";

const suwannaphum = Suwannaphum({
    weight: ["100", "300", "400", "700", "900"],
    variable: "--font-suwannaphum",
    display: "swap",
    subsets: ["khmer"],
});

export const metadata: Metadata = {
    title: "Auth - CAM-O2 APP",
    description: "Join CAM-O2 APP to login, register, and access a seamless platform for ordering quality Khmer products, exclusive discounts, and community engagement.",
    icons: {
        icon: "/new-logo-o2.png",
    },
    openGraph: {
        title: "Auth - CAM-02 APP",
        description: "Join CAM-O2 APP to login, register, and access a seamless platform for ordering quality Khmer products, exclusive discounts, and community engagement.",
        siteName: "CAM-02 APP",
        images: [
            {
                url: "https://cam-o2-api.shop/storage/uploads/76434377-7e43-4865-9a09-866f7668ec0b.jpg",
                alt: "CAM-02 APP Authentication",
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
        <body className={`${suwannaphum.className} bg-background_color`}>
        <main className="w-full">
            {children}
            <Toaster position={"top-left"}/>
        </main>
        </body>
        </html>
    );
}