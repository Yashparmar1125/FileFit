import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FileFit — Resize, Compress & Format Files Online Free",
    template: "%s | FileFit",
  },
  description:
    "Compress images, resize photos, clean signatures, and optimize PDFs to exact upload requirements. 100% client-side — your files never leave your device.",
  metadataBase: new URL("https://filefit.online"),
  applicationName: "FileFit",
  keywords: [
    "compress image", "resize image", "compress PDF", "merge PDF",
    "passport photo", "signature resize", "file compressor", "image to PDF",
    "SSC photo resize", "UPSC photo format", "IBPS form photo",
  ],
  authors: [{ name: "FileFit" }],
  creator: "FileFit",
  publisher: "FileFit",
  openGraph: {
    type: "website",
    siteName: "FileFit",
    title: "FileFit — Resize, Compress & Format Files Online Free",
    description:
      "Compress images, resize photos, clean signatures, and optimize PDFs — 100% free & private.",
    url: "https://filefit.online",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@filefit",
    title: "FileFit — Resize, Compress & Format Files Online Free",
    description:
      "Compress images, resize photos, clean signatures, and optimize PDFs — 100% free & private.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/filefit-icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/filefit-icon-192.png",
    shortcut: "/favicon.ico",
  },
  alternates: { canonical: "https://filefit.online" },
};

/* JSON-LD structured data */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://filefit.online/#website",
      name: "FileFit",
      url: "https://filefit.online",
      description:
        "Free online tools to compress, resize, convert and format images, PDFs and signatures.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://filefit.online/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://filefit.online/#organization",
      name: "FileFit",
      url: "https://filefit.online",
      logo: {
        "@type": "ImageObject",
        url: "https://filefit.online/filefit_logo.svg",
        width: 690,
        height: 350,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full`}>
      <head>
        {/* JSON-LD: WebSite + Organization — tells Google the brand name is "FileFit" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Explicit icon tags — Google favicon crawler needs these */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/filefit-icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/filefit-icon-192.png" />
        <meta name="application-name" content="FileFit" />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-[#0F0F0F]"
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <NextTopLoader color="#FF5C2E" height={3} showSpinner={false} />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXX"}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
