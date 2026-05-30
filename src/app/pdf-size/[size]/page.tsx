import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";
import AdsPlaceholder from "@/components/ads-placeholder";
import PDF_SIZES_DATA from "@/data/pdf-sizes.json";
import { ChevronLeft, Sparkles, Shield, Info, HelpCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface RouteParams {
  params: Promise<{ size: string }>;
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { size } = await params;
  const formattedSize = size.toUpperCase();
  return {
    title: `Compress PDF to Under ${formattedSize} Online Free | FileFit`,
    description: `Shrink and optimize your PDF files to strictly under ${formattedSize} in your browser. Maintain document layout and readability.`,
    alternates: { canonical: `/pdf-size/${size}` },
  };
}

export const dynamicParams = true;

export default async function PdfSizePage({ params }: RouteParams) {
  const { size } = await params;
  const sizeObj = PDF_SIZES_DATA.find((item) => item.size === size);
  if (!sizeObj) notFound();

  const sizeNum = sizeObj.targetSizeKb;
  const formattedSize = size.toUpperCase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `FileFit PDF Compressor to ${formattedSize}`,
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Free browser-based utility to shrink PDF document size under ${formattedSize} client-side.`,
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How can I compress a PDF to under ${formattedSize} without losing text clarity?`,
            "acceptedAnswer": { "@type": "Answer", "text": "FileFit's engine targets high-resolution image objects within the PDF while leaving vector text structures intact. If the file is still too large, it dynamically scales the resolution to ensure it meets the target limit." },
          },
          {
            "@type": "Question",
            "name": "Are my confidential PDF documents safe from being leaked?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Processing is handled locally in JavaScript inside your browser sandbox. Your PDF files are never uploaded to our servers." },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors mb-6 group font-medium">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Tools
          </Link>

          <AdsPlaceholder format="leaderboard" slot="pdf-size-top" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            <div className="lg:col-span-4 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="h-3 w-3" />
                    PDF Optimizer
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Compress PDF to {formattedSize}
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Reduce and optimize PDF file sizes dynamically under the {formattedSize} threshold directly in your web browser.
                  </p>
                </div>

                <div className="space-y-2 border-t border-[#e9ecef] pt-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    How it works
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {[
                      "Upload your PDF file (resume, marksheet, certificate).",
                      "The browser renders and compresses pages locally.",
                      `Download the optimized PDF under ${formattedSize} instantly.`,
                    ].map((item) => (
                      <li key={item} className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-gray-800 text-xs font-semibold">Zero Server Storage</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    PDFs can contain private financial or personal records. We process files entirely in browser memory.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="panel p-6">
                <PdfWorkspace defaultMode="compress" defaultTargetKb={sizeNum} />
              </div>
            </div>
          </div>

          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-8">
            <div className="space-y-3">
              <h2 className="text-gray-900 text-xl sm:text-2xl font-bold">Why compress PDF documents to under {formattedSize}?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Many online application systems, especially government forms (like UPSC, Income Tax portals, and bank websites), impose strict limits on PDF uploads. Resumes, marksheets, and certificate scans are often restricted to stay under {formattedSize}.
                Our local PDF compressor scales down the size under {formattedSize} while keeping the text completely readable.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-gray-900 text-lg font-bold flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    q: `How can I compress a PDF to under ${formattedSize} without losing text clarity?`,
                    a: "FileFit's engine targets high-resolution image objects within the PDF while leaving vector text structures intact. If the file is still too large, it dynamically scales the resolution to ensure it meets the target limit.",
                  },
                  {
                    q: "Are my confidential PDF documents safe from being leaked?",
                    a: "Absolutely. Processing is handled locally in JavaScript inside your browser sandbox. Unlike other sites, your PDF files are never uploaded to our servers.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="p-5 rounded-xl border border-[#e9ecef] bg-[#fafafa] space-y-1.5">
                    <h4 className="text-gray-800 text-sm font-semibold">{q}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Related PDF Sizes</span>
              <div className="flex flex-wrap gap-2">
                {PDF_SIZES_DATA.filter(item => item.size !== size).map((item) => (
                  <Link
                    key={item.size}
                    href={`/pdf-size/${item.size}`}
                    className="px-3 py-1.5 rounded-xl border border-[#dee2e6] hover:border-brand-300 hover:bg-brand-50 bg-white text-xs text-gray-600 hover:text-brand-600 transition-all font-medium uppercase"
                  >
                    {item.size.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <AdsPlaceholder format="horizontal" slot="pdf-size-bottom" />
        </div>
      </main>

      <Footer />
    </>
  );
}
