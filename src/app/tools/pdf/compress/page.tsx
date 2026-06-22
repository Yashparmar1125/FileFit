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
        {/* Tool Workspace */}
        <div className="pt-8">
          <PdfWorkspace defaultMode="compress" />
        </div>

        {/* High-Quality Original Master Page Content */}
        <section className="max-w-4xl mx-auto px-4 mt-24 space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The Most Secure PDF Compressor for Sensitive Documents</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              PDFs often contain your most private information—bank statements, legal contracts, and personal IDs. FileFit shrinks your PDF file size entirely within your browser, ensuring zero data leakage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How We Protect Your PDFs</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                When you use standard online PDF tools, you are forced to upload your confidential files to their corporate cloud servers. You have no idea how long they store your documents or who has access to them.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                FileFit operates completely differently. Using WebAssembly (WASM), we parse and compress your PDF locally in your device's memory. Your bank statements and tax returns never touch an external server.
              </p>
            </div>
            
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart PDF Optimization</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                What makes a PDF heavy? It's rarely the text. The file size bloat usually comes from unoptimized embedded images, scanned pages, and duplicate font subsets.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our algorithm dives into the internal structure of your PDF. It selectively compresses the embedded raster images and strips out unnecessary metadata, drastically reducing the file size while keeping vector text completely sharp and legible.
              </p>
            </div>
          </div>

          <div className="border-t border-[#e9ecef] pt-12 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Will the text in my PDF become blurry?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  No. If your PDF was created digitally (like exporting from Word or Google Docs), the text is stored as vector graphics. Our compressor does not touch vector data, meaning your text will remain infinitely scalable and crystal clear, no matter how much the file is compressed.
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Can I hit an exact target size like 100KB?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes. Using the target size slider in the workspace above, you can specify exactly how small the final PDF needs to be. The local engine will iteratively adjust the internal image compression ratios until it hits your exact requirement—perfect for government portal uploads.
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Does this work for scanned PDF documents?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes, it is highly effective for scanned documents. Since scanned PDFs are essentially just a collection of images wrapped in a PDF container, our tool will aggressively optimize those images to reduce the overall file weight without making the scan unreadable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <RelatedTools currentTool="compress-pdf" />
        </div>
      </main>
      <Footer />
    </>
  );
}
