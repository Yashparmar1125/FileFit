import Header from "@/components/header";
import Footer from "@/components/footer";
import BlurFaceWorkspace from "@/components/blur-face-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blur Faces in Photos Online Free - Anonymize Images | FileFit",
  description: "Free online face blur tool. Automatically detect and blur faces in photos securely in your browser without uploading.",
  alternates: { canonical: "/tools/image/blur-face" },
};

export default function BlurFacePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Face Blur Tool",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to automatically detect and blur faces in photos client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <BlurFaceWorkspace />
        <RelatedTools currentTool="blur-face" />
      </main>
      <Footer />
    </>
  );
}
