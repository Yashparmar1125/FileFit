import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Formatting Documents for Indian Government Portals | FileFit",
  description: "A complete breakdown of the strict photo and signature requirements for UPSC, SSC, IBPS, and Aadhaar, and how to meet them easily.",
  alternates: { canonical: "/guides/indian-government-portals" },
};

export default function GovtPortalsGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <div className="max-w-3xl mx-auto px-4 mt-8">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors mb-8 font-medium group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Guides
          </Link>

          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#FF5C2E] prose-table:border-collapse">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6" style={{ letterSpacing: "-0.03em" }}>
              Formatting Documents for Indian Government Portals
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              Navigating the strict file upload constraints for UPSC, SSC, and IBPS exams.
            </p>

            <h2>The Legacy System Problem</h2>
            <p>
              If you have ever applied for a government job in India through portals like UPSC, SSC, or IBPS, you know the frustration. You fill out a 4-page form perfectly, only to get stuck on the final "Upload Documents" step because your passport photo is "too large" or your signature is "invalid dimensions."
            </p>
            <p>
              Why are these rules so strict? Government portals process millions of applications simultaneously. To save on server storage costs and database load, they utilize legacy IT systems that strictly enforce minuscule file sizes—often requiring photos to be under 50KB and signatures under 20KB.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 flex gap-3">
              <Info className="h-6 w-6 text-blue-600 shrink-0" />
              <p className="text-sm text-blue-900 m-0 leading-relaxed">
                <strong>Pro Tip:</strong> Never compress your photo by taking a screenshot of it on your phone! This degrades the quality drastically and can lead to your application being rejected due to "unrecognizable facial features." Use a proper iterative compressor instead.
              </p>
            </div>

            <h2>Common Requirements by Portal</h2>
            <p>Here is a quick reference guide for the most common Indian examination and recruitment portals:</p>

            <div className="overflow-x-auto not-prose border border-gray-200 rounded-xl my-8">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Portal / Exam</th>
                    <th className="px-6 py-3">Photograph Rules</th>
                    <th className="px-6 py-3">Signature Rules</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-bold text-gray-900">UPSC</td>
                    <td className="px-6 py-4">20KB to 300KB<br/>Min: 350x350px</td>
                    <td className="px-6 py-4">20KB to 300KB<br/>Min: 350x350px</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">SSC (CGL/CHSL)</td>
                    <td className="px-6 py-4">20KB to 50KB<br/>JPEG format only</td>
                    <td className="px-6 py-4">10KB to 20KB<br/>140x60px dimensions</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-bold text-gray-900">IBPS (Banking)</td>
                    <td className="px-6 py-4">20KB to 50KB<br/>200x230px preferred</td>
                    <td className="px-6 py-4">10KB to 20KB<br/>140x60px, Black ink</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">RRB (Railways)</td>
                    <td className="px-6 py-4">20KB to 50KB</td>
                    <td className="px-6 py-4">10KB to 40KB</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>How to Format Your Signature Correctly</h2>
            <p>
              Signatures are the #1 cause of application rejection. Follow these steps to ensure yours is accepted:
            </p>
            <ol>
              <li><strong>Use black ink:</strong> Many scanners wash out blue ink. Always sign on plain white paper (no lines) using a thick black pen.</li>
              <li><strong>Crop tightly:</strong> Use a crop tool to remove all the empty white space around the signature. The final image should be a wide rectangle, not a square.</li>
              <li><strong>Check the DPI:</strong> While most web tools ignore DPI, ensuring your scan is at least 200 DPI before compressing will retain the ink details.</li>
            </ol>

            <hr className="my-10" />
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center not-prose border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fix your exam documents right now</h3>
              <div className="flex justify-center gap-4">
                <Link href="/tools/image/compress" className="bg-[#FF5C2E] text-white px-6 py-3 rounded-xl font-bold shadow-brutal hover:-translate-y-0.5 transition-transform">
                  Compress Photo to 50KB
                </Link>
                <Link href="/tools/signature/resize" className="bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold shadow-brutal hover:-translate-y-0.5 transition-transform">
                  Format Signature perfectly
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
