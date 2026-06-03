import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";
import AdsPlaceholder from "@/components/ads-placeholder";
import PHOTO_SIZES_DATA from "@/data/photo-sizes.json";
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
    title: `Compress Image to Under ${formattedSize} Online Free | FileFit`,
    description: `Easily resize and compress your photo or image to exactly under ${formattedSize} in your browser. Fast, free, and secure processing.`,
    alternates: { canonical: `/photo-size/${size}` },
    robots: { index: false },
  };
}

export const dynamicParams = true;

export default async function PhotoSizePage({ params }: RouteParams) {
  const { size } = await params;
  const sizeObj = PHOTO_SIZES_DATA.find((item) => item.size === size);
  if (!sizeObj) notFound();

  const sizeNum = sizeObj.targetSizeKb;
  const formattedSize = size.toUpperCase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `FileFit Image Compressor to ${formattedSize}`,
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Free browser-based utility tool to resize and compress images under ${formattedSize} client-side.`,
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Will my image quality decrease when compressing to ${formattedSize}?`,
            "acceptedAnswer": { "@type": "Answer", "text": `FileFit utilizes a smart dynamic binary search algorithm on the HTML5 Canvas API. It optimizes the resolution scale and JPEG compression parameters iteratively to match the target ${formattedSize} threshold while preserving maximum visual clarity.` },
          },
          {
            "@type": "Question",
            "name": "Is my uploaded photograph safe and secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely. FileFit operates entirely client-side using JavaScript. Your files never cross the network and stay 100% private on your machine." },
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

          <AdsPlaceholder format="leaderboard" slot="photo-size-top" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="h-3 w-3" />
                    Target Size Preset
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Compress Image to {formattedSize}
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Format and scale image sizes to stay strictly under the {formattedSize} file size limit for government exam uploads and visa portals.
                  </p>
                </div>

                <div className="space-y-2 border-t border-[#e9ecef] pt-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    How it works
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {[
                      "Drag and drop your JPEG, PNG, or WebP photo into the workspace.",
                      "Adjust output dimensions if required or keep them on default auto-scale.",
                      `Our in-browser compression engine will compile and trigger download under ${formattedSize}.`,
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
                  <h4 className="text-gray-800 text-xs font-semibold">100% Private Sandbox</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    FileFit does not store files. Your passport scans, marksheets, and photos are processed in local memory.
                  </p>
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="lg:col-span-8">
              <div className="panel p-6">
                <ImageWorkspace defaultMode="compress" defaultTargetKb={sizeNum} />
              </div>
            </div>
          </div>

          {/* SEO section */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-8">
            <div className="space-y-3">
              <h2 className="text-gray-900 text-xl sm:text-2xl font-bold">Why compress images to under {formattedSize}?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Many online application portals, including government recruitments (SSC, UPSC, State PSCs), banking boards, and academic admission setups, restrict the maximum upload size of candidate photographs to {formattedSize}.
                Our tool dynamically scales down resolution density and JPEG macroblock values so that your image is resized to under {formattedSize} while remaining clean, crisp, and readable.
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
                    q: `Will my image quality decrease when compressing to ${formattedSize}?`,
                    a: `FileFit utilizes a smart dynamic binary search algorithm on the HTML5 Canvas API. It optimizes the resolution scale and JPEG compression parameters iteratively to match the target ${formattedSize} threshold while preserving maximum visual clarity and contrast.`,
                  },
                  {
                    q: "Is my uploaded photograph safe and secure?",
                    a: "Yes, completely. Unlike other online image resizers that upload files to cloud servers, FileFit operates entirely client-side using JavaScript. Your files never cross the network and stay 100% private on your machine.",
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
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Related Photo Sizes</span>
              <div className="flex flex-wrap gap-2">
                {PHOTO_SIZES_DATA.filter(item => item.size !== size).slice(0, 10).map((item) => (
                  <Link
                    key={item.size}
                    href={`/photo-size/${item.size}`}
                    className="px-3 py-1.5 rounded-xl border border-[#dee2e6] hover:border-brand-300 hover:bg-brand-50 bg-white text-xs text-gray-600 hover:text-brand-600 transition-all font-medium uppercase"
                  >
                    {item.size.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <AdsPlaceholder format="horizontal" slot="photo-size-bottom" />
        </div>
      </main>

      <Footer />
    </>
  );
}
