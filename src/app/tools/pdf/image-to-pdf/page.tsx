import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Image to PDF Online Free - JPG, PNG to PDF | FileFit",
  description: "Free online Image to PDF converter. Convert JPG, PNG, and WebP images to PDF securely in your browser without uploading to a server.",
  alternates: { canonical: "/tools/pdf/image-to-pdf" },
};

export default function ImageToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image to PDF Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to convert JPG, PNG, and WebP images to PDF securely client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <PdfWorkspace defaultMode="convert" />
        <RelatedTools currentTool="image-to-pdf" />
      </main>
      <Footer />
    </>
  );
}
