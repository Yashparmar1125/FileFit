import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online Free - Extract Pages from PDF | FileFit",
  description: "Free online PDF splitter. Extract pages or split PDF files securely in your browser without uploading to a server.",
  alternates: { canonical: "/tools/pdf/split" },
};

export default function PdfSplitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit PDF Splitter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to extract pages or split PDF files securely client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <PdfWorkspace defaultMode="split" />
        <RelatedTools currentTool="split-pdf" />
      </main>
      <Footer />
    </>
  );
}
