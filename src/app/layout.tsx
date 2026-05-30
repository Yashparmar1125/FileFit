import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FileFit — Resize, Compress & Format Files Online Free",
  description:
    "Compress images, resize photos, clean signatures, and optimize PDFs to exact upload requirements. 100% client-side — your files never leave your device.",
  metadataBase: new URL("https://filefit.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full`}>
      <body
        className="min-h-full flex flex-col bg-white text-[#0F0F0F]"
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
