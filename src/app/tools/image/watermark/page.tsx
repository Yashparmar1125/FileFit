import Header from "@/components/header";
import Footer from "@/components/footer";
import WatermarkWorkspace from "@/components/watermark-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Watermark to Image Online Free - Protect Photos | FileFit",
  description: "Free online image watermarker. Add text or logo watermarks to your images securely in your browser without uploading.",
  alternates: { canonical: "/tools/image/watermark" },
};

export default function WatermarkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Watermarker",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to add text or logo watermarks to images client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <WatermarkWorkspace />
        <RelatedTools currentTool="watermark" />
      </main>
      <Footer />
    </>
  );
}
