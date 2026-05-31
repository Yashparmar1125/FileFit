import Header from "@/components/header";
import Footer from "@/components/footer";
import UpscaleWorkspace from "@/components/upscale-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upscale Image Online Free - Increase Photo Resolution | FileFit",
  description: "Free online image upscaler. Increase image resolution and enhance quality instantly in your browser without uploading to a server.",
  alternates: { canonical: "/tools/image/upscale" },
};

export default function UpscalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Upscaler",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to upscale images and increase resolution client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <UpscaleWorkspace />
        <RelatedTools currentTool="upscale" />
      </main>
      <Footer />
    </>
  );
}
