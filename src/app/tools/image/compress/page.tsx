import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";
import RelatedTools from "@/components/related-tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Image Online Free - Reduce Photo Size | FileFit",
  description: "Free online image compressor. Reduce JPG, PNG, and WebP file sizes instantly in your browser without uploading to a server.",
  alternates: { canonical: "/tools/image/compress" },
};

export default function CompressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FileFit Image Compressor",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free browser-based utility tool to compress and reduce image file sizes client-side."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        {/* Tool Workspace */}
        <div className="pt-8">
          <ImageWorkspace defaultMode="compress" />
        </div>

        {/* High-Quality Original Master Page Content */}
        <section className="max-w-4xl mx-auto px-4 mt-24 space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The Most Private Way to Compress Images Online</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Compressing photos should not require sacrificing your privacy. FileFit brings enterprise-grade image optimization directly to your local browser. No cloud servers, no data collection, just lightning-fast compression.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why Client-Side Compression?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Traditional online image compressors force you to upload your files to their servers. This uses your internet bandwidth, wastes time waiting for uploads and downloads, and most importantly, puts your personal photos at risk of being stored or leaked.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                FileFit flips this model upside down. We download the compression engine to your browser. Your images never leave your device.
              </p>
            </div>
            
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lossless vs. Lossy</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Our tool uses intelligent <strong>lossy compression</strong> for JPEG and WebP files. This means it removes microscopic color details that the human eye cannot perceive, drastically reducing the file size (often by 70% or more) without making the image look blurry or pixelated.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                For PNG files with transparency, we apply optimized compression to reduce the color palette while maintaining sharp edges.
              </p>
            </div>
          </div>

          <div className="border-t border-[#e9ecef] pt-12 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">How do I reduce my photo size to exactly 50KB or 100KB?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Simply use the "Target Size" slider in the workspace above. Our engine will use a dynamic binary search algorithm to iterate through different quality settings until it finds the exact compression ratio needed to hit your target file size perfectly.
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We currently support full client-side compression for JPG, JPEG, PNG, and WebP images. You can also upload a PDF to extract and compress its internal images!
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Is there a file size limit for uploads?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Because everything happens in your browser's memory, the only limit is your device's RAM. Most modern laptops and phones can easily handle compressing images up to 50MB directly in the browser without crashing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <RelatedTools currentTool="compress-image" />
        </div>
      </main>
      <Footer />
    </>
  );
}
