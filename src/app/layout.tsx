import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";

// import { suwannaphum } from "../font";
import "./globals.css";

import { Suwannaphum } from "next/font/google";
import NavbarPage from "@/components/Navbar/NavbarPage";

export const suwannaphum = Suwannaphum({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-suwannaphum",
  display: "swap",
  subsets: ["khmer"],
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suwannaphum.className} bg-background_color`}>
        <StoreProvider>
          <NavbarPage />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
