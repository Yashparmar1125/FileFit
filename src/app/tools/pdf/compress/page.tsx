import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF Online Free - Reduce PDF File Size | FileFit",
  description: "Free online PDF compressor. Reduce PDF file sizes instantly in your browser without uploading to a server.",
  alternates: { canonical: "/tools/pdf/compress" },
};

export default function PdfCompressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit PDF Compressor",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to compress and reduce PDF file sizes securely client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <PdfWorkspace defaultMode="compress" />
        <RelatedTools currentTool="compress-pdf" />
      </main>
      <Footer />
    </>
  );
}
