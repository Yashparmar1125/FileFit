import Header from "@/components/header";
import Footer from "@/components/footer";
import RemoveBgWorkspace from "@/components/remove-bg-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Background from Image Online Free | FileFit",
  description: "Free online background remover. Erase and remove backgrounds from images instantly in your browser securely.",
  alternates: { canonical: "/tools/image/remove-bg" },
};

export default function RemoveBgPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Background Remover",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to remove backgrounds from images client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <RemoveBgWorkspace />
        <RelatedTools currentTool="remove-bg" />
      </main>
      <Footer />
    </>
  );
}
