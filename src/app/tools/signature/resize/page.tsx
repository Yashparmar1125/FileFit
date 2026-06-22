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
        {/* Tool Workspace */}
        <div className="pt-8">
          <SignatureWorkspace defaultMode="resize" />
        </div>

        {/* High-Quality Original Master Page Content */}
        <section className="max-w-4xl mx-auto px-4 mt-24 space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Format Your Signature for Online Portals</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Uploading a scanned signature to a job application or government portal is notoriously frustrating. The dimensions are always wrong, the background is gray, or the file size is too big. FileFit fixes all of this instantly, entirely in your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fixing Aspect Ratios</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Most online application forms (like UPSC, SSC, or IBPS) require signatures to be in a very specific rectangular aspect ratio (e.g., 140x60 pixels). If you upload a square photo of your signature, their system will stretch and distort it, which can lead to application rejection.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our workspace allows you to crop and resize your signature perfectly into the required aspect ratio before compressing the file size.
              </p>
            </div>
            
            <div className="bg-[#fafafa] p-8 rounded-2xl border-2 border-[#e9ecef] shadow-[4px_4px_0px_#f1f3f5]">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enhancing Contrast</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                When you take a photo of your signature on a piece of paper, the paper often looks gray or blue due to poor lighting. Reviewers need a clean, black-on-white signature to verify your identity.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Using our built-in image filters, you can adjust the contrast and brightness of your signature to wash out the gray background and make the ink pop, ensuring it looks like a professional digital scan.
              </p>
            </div>
          </div>

          <div className="border-t border-[#e9ecef] pt-12 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Why was my signature rejected by the portal?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Usually, signatures are rejected for three reasons: 1) The file size is over the limit (e.g., &gt; 20KB). 2) The physical dimensions (width x height) don't match the portal's strict requirements. 3) The image is too blurry or the ink is illegible against a dark background. Our tool allows you to fix all three issues simultaneously.
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">How do I remove the background from my signature?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  While we don't have a "magic background eraser" that makes the image transparent, you can achieve a perfect white background by using the contrast and brightness sliders in our tool. Push the contrast high and the brightness up until the paper turns pure white.
                </p>
              </div>

              <div className="p-6 border border-[#e9ecef] rounded-xl hover:shadow-md transition-shadow bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Is my signature uploaded to your servers?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Never. A signature is a highly sensitive piece of identity data that can be used for forgery. FileFit processes your image entirely within your own browser's memory using HTML5 Canvas. We have no servers to upload it to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <RelatedTools currentTool="resize-signature" />
        </div>
      </main>
      <Footer />
    </>
  );
}
