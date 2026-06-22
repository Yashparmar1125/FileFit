import Header from "@/components/header";
import Footer from "@/components/footer";
import ExamToolWidget from "./exam-widget";
import AdsPlaceholder from "@/components/ads-placeholder";
import EXAMS_DATA from "@/data/exam-requirements.json";
import { notFound } from "next/navigation";
import { Info, Sparkles, Shield, ChevronLeft, Calendar, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface RouteParams {
  params: Promise<{ exam: string }>;
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { exam: examSlug } = await params;
  const exam = EXAMS_DATA.find((e) => e.slug === examSlug);
  if (!exam) return {};

  return {
    title: `Resize Photo & Signature for ${exam.name} Application Online | FileFit`,
    description: `Resizer for ${exam.name} online form upload rules. Scale photo to ${exam.photoWidth}x${exam.photoHeight}px (under ${exam.photoMaxKb}KB) and signature to ${exam.sigWidth}x${exam.sigHeight}px (under ${exam.sigMaxKb}KB).`,
    alternates: {
      canonical: `/exams/${examSlug}`,
    },
    robots: { index: false },
  };
}

export async function generateStaticParams() {
  return EXAMS_DATA.map((exam) => ({
    exam: exam.slug,
  }));
}

export default async function ExamPage({ params }: RouteParams) {
  const { exam: examSlug } = await params;
  const exam = EXAMS_DATA.find((e) => e.slug === examSlug);

  if (!exam) {
    notFound();
  }

  // JSON-LD dynamic Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": `How to resize photo and signature for ${exam.name} application form`,
        "description": `Step-by-step guide to format candidate passport photo and signature to meet the official ${exam.name} guidelines.`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Upload Candidate Photograph",
            "text": `Select your passport photo scan. The resizer automatically crops and compresses the output strictly between ${exam.photoMinKb}KB and ${exam.photoMaxKb}KB in JPG format.`
          },
          {
            "@type": "HowToStep",
            "name": "Upload Scanned Signature",
            "text": `Upload your scanned signature. Use our background cleaner to remove gray shadows, and format to exactly ${exam.sigWidth}x${exam.sigHeight}px (under ${exam.sigMaxKb}KB).`
          },
          {
            "@type": "HowToStep",
            "name": "Download compliant files",
            "text": "Click Process and let the browser compile the optimized files. Download and upload them directly to the portal."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What are the exact photo and signature dimensions for ${exam.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Photograph dimensions must be ${exam.photoWidth} x ${exam.photoHeight} pixels (size ${exam.photoMinKb}KB to ${exam.photoMaxKb}KB). Signature dimensions must be ${exam.sigWidth} x ${exam.sigHeight} pixels (size ${exam.sigMinKb}KB to ${exam.sigMaxKb}KB).`
            }
          },
          {
            "@type": "Question",
            "name": "Does the signature resizer support background cleaning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Scanned signatures on white paper often have gray camera shadows. Our tool cleans background noise, makes it pure white or transparent, and rescales it to the required dimensions."
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

          <AdsPlaceholder format="leaderboard" slot="exam-top-banner" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            {/* Guidelines Left */}
            <div className="lg:col-span-5 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <Calendar className="h-3 w-3" />
                    Exam Preset
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    {exam.name} Upload Resizer
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Pre-configured to format both photo and signature to official {exam.name} upload requirements.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e9ecef] bg-[#f8f9fa] p-4 space-y-3">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Target Constraints</span>
                  <div className="space-y-2.5 text-xs">
                    <div className="pb-2.5 border-b border-[#e9ecef]">
                      <p className="text-gray-800 font-semibold mb-0.5">Candidate Photograph</p>
                      <p className="text-gray-500">{exam.photoWidth} × {exam.photoHeight} px · {exam.photoMinKb}–{exam.photoMaxKb} KB</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold mb-0.5">Scanned Signature</p>
                      <p className="text-gray-500">{exam.sigWidth} × {exam.sigHeight} px · {exam.sigMinKb}–{exam.sigMaxKb} KB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    Portal Guidelines
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {exam.instructions.map((line, idx) => (
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
                  <h4 className="text-gray-800 text-xs font-semibold">Processed Client-Side</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    No copies of your photo or signature are sent to any server.
                  </p>
                </div>
              </div>
            </div>

            {/* Widget */}
            <div className="lg:col-span-7">
              <ExamToolWidget exam={exam} />
            </div>
          </div>

          {/* Comprehensive SEO Content Section for AdSense Value */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-10">
            {/* Guide Section 1 */}
            <div className="space-y-4">
              <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight">Complete Guide to {exam.name} Form Upload Requirements</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Applying for competitive exams like {exam.name} requires candidates to upload scanned files (such as passport photos, thumb impressions, and signatures) that strictly match specified resolution boundaries and file weight limits.
                If the file sizes do not fit within the very narrow range, the online application form will outright reject the upload.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Using generic image resizers often leads to blurry photos or signatures that fail to meet these specific pixel dimension rules. FileFit pre-populates the exact official constraints so you can crop your signature scan, whiten paper backgrounds, resize your face portrait, and generate perfectly compliant files in seconds without any technical hassle.
              </p>
            </div>

            {/* Guide Section 2 */}
            <div className="bg-[#fafafa] border border-[#e9ecef] p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="text-gray-900 text-xl font-bold">Step-by-Step: Formatting Files for {exam.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Check Requirements</h4>
                  <p className="text-sm text-gray-600">Review the target constraints loaded above. Ensure your source image has a light background (for photos) or black/blue ink (for signatures).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Upload & Crop</h4>
                  <p className="text-sm text-gray-600">Upload your image into the workspace. The crop tool is automatically locked to the required aspect ratio for {exam.name}.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">3. Clean Signatures</h4>
                  <p className="text-sm text-gray-600">If processing a signature, use the threshold slider to remove dark shadows and create a pure white background.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4. Download</h4>
                  <p className="text-sm text-gray-600">The file is processed instantly and downloaded entirely offline, ensuring maximum privacy for your personal identity details.</p>
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
                    q: `What are the exact photo and signature dimensions required for the ${exam.name} form?`,
                    a: `The official requirements state: Photograph dimensions must be strictly ${exam.photoWidth} × ${exam.photoHeight} px, with a file size between ${exam.photoMinKb}KB and ${exam.photoMaxKb}KB. The scanned Signature dimensions must be ${exam.sigWidth} × ${exam.sigHeight} px, with a file size between ${exam.sigMinKb}KB and ${exam.sigMaxKb}KB.`,
                  },
                  {
                    q: "Does the signature resizer support background cleaning?",
                    a: "Yes. Scanned signatures on white paper often have gray camera shadows that look unprofessional and use up valuable file data. Our built-in tool cleans background noise, transforms it to pure white, and rescales it to the required dimensions while darkening the ink.",
                  },
                  {
                    q: "Why is the exam portal saying my file is invalid?",
                    a: "Exam portals are very strict. This error usually occurs if your file is either out of the required dimension bounds (width/height in pixels), out of the required file size bounds (KB), or saved in the wrong file format (e.g., PNG instead of JPG). Our tool guarantees all three rules are met perfectly.",
                  },
                  {
                    q: "Is it safe to upload my photo and signature?",
                    a: "Yes. In fact, FileFit never actually uploads your files to any external server. All cropping, resizing, and compression happens securely right inside your web browser using HTML5 Canvas. Your sensitive candidate identity remains entirely private.",
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
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Explore Related Exam Presets</span>
              <div className="flex flex-wrap gap-2">
                {EXAMS_DATA.filter(e => e.slug !== examSlug).map((e) => (
                  <Link
                    key={e.slug}
                    href={`/exams/${e.slug}`}
                    className="px-3 py-1.5 rounded-xl border border-[#dee2e6] hover:border-brand-300 hover:bg-brand-50 bg-white text-xs text-gray-600 hover:text-brand-600 transition-all font-medium"
                  >
                    {e.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <AdsPlaceholder format="horizontal" slot="exam-bottom-banner" />
        </div>
      </main>

      <Footer />
    </>
  );
}
