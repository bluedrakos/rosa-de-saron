import type { Metadata } from "next";
import { Outfit, Inter, New_Amsterdam, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const newAmsterdam = New_Amsterdam({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400", // New Amsterdam usually has limited weights
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iglesia App", // TODO: Fetch from Strapi later
  description: "Bienvenido a nuestra iglesia",
  icons: {
    icon: "/assets/svg/logo-white.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${inter.variable} ${newAmsterdam.variable} ${openSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
