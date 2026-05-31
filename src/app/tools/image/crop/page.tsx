import Header from "@/components/header";
import Footer from "@/components/footer";
import CropWorkspace from "@/components/crop-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Image Online Free - Trim Photo Edges | FileFit",
  description: "Free online image cropper. Trim, crop, and cut JPG, PNG, and WebP images easily in your browser without uploading to a server.",
  alternates: { canonical: "/tools/image/crop" },
};

export default function CropPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Cropper",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to crop and trim images client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <CropWorkspace />
        <RelatedTools currentTool="crop" />
      </main>
      <Footer />
    </>
  );
}
