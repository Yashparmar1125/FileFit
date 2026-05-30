import Header from "@/components/header";
import Footer from "@/components/footer";
import SignatureWorkspace from "@/components/signature-workspace";
import AdsPlaceholder from "@/components/ads-placeholder";
import SIG_SIZES_DATA from "@/data/signature-sizes.json";
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
    title: `Compress Signature to Under ${formattedSize} Online | FileFit`,
    description: `Resize, crop, and compress your signature scan to strictly under ${formattedSize} in your browser. Fast, free background cleaning tool.`,
    alternates: { canonical: `/signature-size/${size}` },
  };
}

export const dynamicParams = true;

export default async function SignatureSizePage({ params }: RouteParams) {
  const { size } = await params;
  const sizeObj = SIG_SIZES_DATA.find((item) => item.size === size);
  if (!sizeObj) notFound();

  const sizeNum = sizeObj.targetSizeKb;
  const formattedSize = size.toUpperCase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `FileFit Signature Cleaner and Resizer to ${formattedSize}`,
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Free online tool to crop, remove shadows, clean background, and compress signatures under ${formattedSize} locally.`,
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the signature background cleaner work?",
            "acceptedAnswer": { "@type": "Answer", "text": "The signature cleaner analyzes the brightness values (RGB) of every pixel. It applies a high-pass threshold slider, transforming off-white paper and dark shadows into pure white or transparent space, while preserving and darkening ink lines." },
          },
          {
            "@type": "Question",
            "name": `How do I crop and compress a signature under ${formattedSize}?`,
            "acceptedAnswer": { "@type": "Answer", "text": `Simply upload a photo of your signature. Use the crop option to select the bounding box of your signature. Then, slide the threshold to whiten the background and click process. The tool automatically rescales and compresses the image to stay strictly under ${formattedSize}.` },
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

          <AdsPlaceholder format="leaderboard" slot="sig-size-top" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            <div className="lg:col-span-4 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="h-3 w-3" />
                    Signature Workspace
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Compress Signature to {formattedSize}
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Crop margin white space, remove camera shadows, and optimize the scanned signature file size under the {formattedSize} limit.
                  </p>
                </div>

                <div className="space-y-2 border-t border-[#e9ecef] pt-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    Instructions
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {[
                      "Upload your signature image (blue or black ink on white paper).",
                      "Adjust the slider to clear gray shadows.",
                      `The browser will compile and download the signature under ${formattedSize}.`,
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
                  <h4 className="text-gray-800 text-xs font-semibold">Processed Locally</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    Signature images are sensitive items of identity. FileFit operates strictly client-side to ensure privacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="panel p-6">
                <SignatureWorkspace defaultMode="compress" defaultTargetKb={sizeNum} />
              </div>
            </div>
          </div>

          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-8">
            <div className="space-y-3">
              <h2 className="text-gray-900 text-xl sm:text-2xl font-bold">Why compress signature scans to under {formattedSize}?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Government entrance exams, bank applications, and visa portals enforce a strict file limit for candidate signature uploads, which is commonly required to be under {formattedSize}.
                Our signature cleaning tool whitens background noise, trims empty margins, and rescales the file to fit the required {formattedSize} limit.
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
                    q: "How does the signature background cleaner work?",
                    a: "The signature cleaner analyzes the brightness values (RGB) of every pixel. It applies a high-pass threshold slider, transforming off-white paper and dark shadows into pure white or transparent space, while preserving and darkening ink lines.",
                  },
                  {
                    q: `How do I crop and compress a signature under ${formattedSize}?`,
                    a: `Simply upload a photo of your signature. Use the crop option to select the bounding box of your signature. Then, slide the threshold to whiten the background and click process. The tool automatically rescales and compresses the image to stay strictly under ${formattedSize}.`,
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
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Related Signature Sizes</span>
              <div className="flex flex-wrap gap-2">
                {SIG_SIZES_DATA.filter(item => item.size !== size).map((item) => (
                  <Link
                    key={item.size}
                    href={`/signature-size/${item.size}`}
                    className="px-3 py-1.5 rounded-xl border border-[#dee2e6] hover:border-brand-300 hover:bg-brand-50 bg-white text-xs text-gray-600 hover:text-brand-600 transition-all font-medium uppercase"
                  >
                    {item.size.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <AdsPlaceholder format="horizontal" slot="sig-size-bottom" />
        </div>
      </main>

      <Footer />
    </>
  );
}
