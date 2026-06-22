import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";
import SignatureWorkspace from "@/components/signature-workspace";
import PdfWorkspace from "@/components/pdf-workspace";
import AdsPlaceholder from "@/components/ads-placeholder";
import DOCUMENTS_DATA from "@/data/document-requirements.json";
import { notFound } from "next/navigation";
import { Info, Sparkles, Shield, ChevronLeft, FileCode, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface RouteParams {
  params: Promise<{ document: string }>;
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { document: docSlug } = await params;
  const doc = DOCUMENTS_DATA.find((d) => d.slug === docSlug);
  if (!doc) return {};

  return {
    title: `Resize & Format Photo for ${doc.name} Online | FileFit`,
    description: `Resize and crop photo for ${doc.name} application. Lock dimensions to ${doc.widthPx || "custom"}x${doc.heightPx || "custom"}px, aspect ratio to ${doc.aspectRatio || "free"}, and compress size under ${doc.maxSizeKb}KB.`,
    alternates: {
      canonical: `/documents/${docSlug}`,
    },
    robots: { index: false },
  };
}

export async function generateStaticParams() {
  return DOCUMENTS_DATA.map((doc) => ({
    document: doc.slug,
  }));
}

export default async function DocumentPage({ params }: RouteParams) {
  const { document: docSlug } = await params;
  const doc = DOCUMENTS_DATA.find((d) => d.slug === docSlug);

  if (!doc) {
    notFound();
  }

  const isPdf = docSlug.includes("scan") || docSlug.includes("pdf");
  const isSig = docSlug.includes("signature") || docSlug.includes("sig");

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": `How to resize and format file for ${doc.name}`,
        "description": `Step-by-step instructions to scale, crop, and compress files to meet the official ${doc.name} specifications.`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Select scan or photo file",
            "text": `Upload your original file (JPG, PNG, or PDF). The workspace limits target size strictly under ${doc.maxSizeKb}KB.`
          },
          {
            "@type": "HowToStep",
            "name": "Crop to aspect ratio",
            "text": doc.aspectRatio
              ? `Lock aspect ratios to ${doc.aspectRatio} to match standard requirements.`
              : "Adjust image borders or select crop limits in the canvas."
          },
          {
            "@type": "HowToStep",
            "name": "Process and Download",
            "text": "Click Process to let the local browser engine compile parameters and trigger direct download."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the maximum file size allowed for a ${doc.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The maximum upload limit for ${doc.name} is ${doc.maxSizeKb}KB. FileFit will dynamically compress the file to stay strictly below this limit.`
            }
          },
          {
            "@type": "Question",
            "name": "Are my document uploads private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. FileFit performs all file operations client-side in browser memory. Your private documents are never sent to a cloud server or stored."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors mb-6 group font-medium">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Tools
          </Link>

          <AdsPlaceholder format="leaderboard" slot="doc-top-banner" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            {/* Guidelines Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <FileCode className="h-3 w-3" />
                    Official Document Preset
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    {doc.name} Formatter
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Automatically format, crop, and compress files to meet the official {doc.name} online upload limits.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e9ecef] bg-[#f8f9fa] p-4 space-y-3">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Target Specs</span>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div className="text-gray-500">Output:</div>
                    <div className="text-gray-800 font-semibold text-right">{isPdf ? "PDF" : "JPEG/JPG"}</div>
                    <div className="text-gray-500">Size limit:</div>
                    <div className="text-brand-500 font-bold text-right">Under {doc.maxSizeKb} KB</div>
                    {!isPdf && doc.widthPx && (
                      <>
                        <div className="text-gray-500">Dimensions:</div>
                        <div className="text-gray-800 font-semibold text-right">{doc.widthPx}×{doc.heightPx} px</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    Instructions
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {doc.instructions.map((line, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-gray-800 text-xs font-semibold">100% Secure Processing</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    Documents often contain extremely sensitive records. FileFit does all conversions client-side. Nothing is uploaded.
                  </p>
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="lg:col-span-8">
              <div className="panel p-6">
                {isPdf ? (
                  <PdfWorkspace defaultMode="compress" defaultTargetKb={doc.maxSizeKb} />
                ) : isSig ? (
                  <SignatureWorkspace defaultMode="compress" defaultTargetKb={doc.maxSizeKb} />
                ) : (
                  <ImageWorkspace defaultMode="compress" defaultTargetKb={doc.maxSizeKb} defaultFormat="image/jpeg" />
                )}
              </div>
            </div>
          </div>

          {/* Comprehensive SEO Content Section for AdSense Value */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-10">
            {/* Guide Section 1 */}
            <div className="space-y-4">
              <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight">The Complete Guide to {doc.name} Upload Guidelines</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                When applying for visa forms, ID renewals (like Aadhaar, PAN card, driving licenses), or university admissions, you must upload scanned documents that strictly fit specified dimensions and file size boundaries. Government portals and institutional websites are notoriously strict; if your file is even one kilobyte over the limit, the upload will fail.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                FileFit solves this by running custom image interpolation and document optimization directly in your browser. We ensure your document maintains maximum readability and layout integrity while perfectly fitting under the exact {doc.maxSizeKb}KB threshold required for a successful {doc.name} submission.
              </p>
            </div>

            {/* Guide Section 2 */}
            <div className="bg-[#fafafa] border border-[#e9ecef] p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="text-gray-900 text-xl font-bold">Step-by-Step: Formatting Your {doc.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Upload Your Document</h4>
                  <p className="text-sm text-gray-600">Scan or photograph your physical document and load it into the workspace. Ensure there is good lighting and no glare.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Verify Guidelines</h4>
                  <p className="text-sm text-gray-600">The tool is pre-configured with the exact official specs for a {doc.name}, taking the guesswork out of the process.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">3. Auto-Formatting</h4>
                  <p className="text-sm text-gray-600">Simply click process, and the tool will auto-crop, scale, and compress the file to meet the strict limits.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4. Download & Submit</h4>
                  <p className="text-sm text-gray-600">Download the finalized file and upload it straight to your application portal without fear of rejection.</p>
                </div>
              </div>
            </div>

            {/* Expanded FAQ */}
            <div className="space-y-6">
              <h3 className="text-gray-900 text-xl sm:text-2xl font-bold flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-brand-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: `What is the exact maximum file size allowed for a ${doc.name}?`,
                    a: `The maximum official upload limit for a ${doc.name} is ${doc.maxSizeKb}KB. FileFit will dynamically compress your uploaded file to stay strictly below this limit so it will be accepted by the portal.`,
                  },
                  {
                    q: "Are my sensitive identity documents private and secure?",
                    a: "Yes, 100% secure. Documents like passports, ID cards, and tax forms contain highly sensitive data. FileFit performs all file cropping and compression entirely client-side, right in your device's browser memory. Your private documents are never sent to a cloud server or stored anywhere.",
                  },
                  {
                    q: "What if my original scan is too blurry after compression?",
                    a: "If your file must be compressed significantly to hit the limit, you may notice some quality loss. For the best outcome, start with a highly illuminated, clear original photograph or use a flatbed scanner. Our intelligent scaling algorithm prioritizes text readability over background resolution.",
                  },
                  {
                    q: "Which file format should I use?",
                    a: `Most government and visa portals require either a JPEG or PDF. Our tool is configured to output the exact format required by the official guidelines for a ${doc.name}.`,
                  }
                ].map(({ q, a }) => (
                  <div key={q} className="p-5 rounded-xl border border-[#e9ecef] bg-white shadow-sm space-y-2 hover:shadow-md transition-shadow">
                    <h4 className="text-gray-900 text-base font-semibold">{q}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#e9ecef]">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Explore Related Document Presets</span>
              <div className="flex flex-wrap gap-2">
                {DOCUMENTS_DATA.filter(d => d.slug !== docSlug).map((d) => (
                  <Link
                    key={d.slug}
                    href={`/documents/${d.slug}`}
                    className="px-3 py-1.5 rounded-xl border border-[#dee2e6] hover:border-brand-300 hover:bg-brand-50 bg-white text-xs text-gray-600 hover:text-brand-600 transition-all font-medium"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <AdsPlaceholder format="horizontal" slot="doc-bottom-banner" />
        </div>
      </main>

      <Footer />
    </>
  );
}
