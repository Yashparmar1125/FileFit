import Header from "@/components/header";
import Footer from "@/components/footer";
import SignatureWorkspace from "@/components/signature-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Signature Online Free - Adjust Digital Signature Size | FileFit",
  description: "Free online signature resizer. Resize and adjust your digital signatures perfectly in your browser securely without uploading.",
  alternates: { canonical: "/tools/signature/resize" },
};

export default function SigResizePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Signature Resizer",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to resize digital signatures securely client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <SignatureWorkspace defaultMode="resize" />
        <RelatedTools currentTool="resize-signature" />
      </main>
      <Footer />
    </>
  );
}
