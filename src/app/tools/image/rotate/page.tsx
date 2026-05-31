import Header from "@/components/header";
import Footer from "@/components/footer";
import RotateWorkspace from "@/components/rotate-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate Image Online Free - Flip & Turn Photos | FileFit",
  description: "Free online image rotator. Flip, rotate, and adjust JPG, PNG, and WebP images instantly in your browser without uploading to a server.",
  alternates: { canonical: "/tools/image/rotate" },
};

export default function RotatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Rotator",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to rotate and flip images client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <RotateWorkspace />
        <RelatedTools currentTool="rotate" />
      </main>
      <Footer />
    </>
  );
}
