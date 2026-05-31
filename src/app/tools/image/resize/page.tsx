import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online Free - Change Photo Dimensions | FileFit",
  description: "Free online image resizer. Change image dimensions, scale JPG, PNG, and WebP files instantly in your browser without uploading to a server.",
  alternates: { canonical: "/tools/image/resize" },
};

export default function ResizePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Resizer",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to resize images and change dimensions client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <ImageWorkspace defaultMode="resize" />
        <RelatedTools currentTool="resize-image" />
      </main>
      <Footer />
    </>
  );
}
