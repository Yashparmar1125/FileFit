import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free - Combine PDFs Securely | FileFit",
  description: "Free online PDF merger. Combine multiple PDF files securely in your browser without uploading to a server.",
  alternates: { canonical: "/tools/pdf/merge" },
};

export default function PdfMergePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit PDF Merger",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to combine multiple PDF files securely client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <PdfWorkspace defaultMode="merge" />
        <RelatedTools currentTool="merge-pdf" />
      </main>
      <Footer />
    </>
  );
}
