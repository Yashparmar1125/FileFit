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

          {/* Comprehensive SEO Content Section for AdSense Value */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#e9ecef] space-y-10">
            {/* Guide Section 1 */}
            <div className="space-y-4">
              <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight">The Ultimate Guide to Compressing Images to {formattedSize}</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                If you are applying for a government exam (like SSC, UPSC, or state-level boards), submitting a college admission form, or filling out a visa application online, you have likely encountered strict file size limitations. Many of these portals have legacy systems that restrict the maximum upload size of candidate photographs to exactly <strong>{formattedSize}</strong> or less.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our free {formattedSize} photo compressor is designed specifically to solve this problem. It dynamically scales down the resolution density and adjusts JPEG macroblock values so that your image is perfectly resized to fit within the {formattedSize} constraint, while ensuring your face remains clean, crisp, and fully readable for the reviewers.
              </p>
            </div>

            {/* Guide Section 2 */}
            <div className="bg-[#fafafa] border border-[#e9ecef] p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="text-gray-900 text-xl font-bold">Step-by-Step: How to Resize Your Photo to {formattedSize}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Select Your Image</h4>
                  <p className="text-sm text-gray-600">Click the upload area or simply drag and drop your source photograph (JPG, PNG, or WebP). Make sure the lighting on your face is clear.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Let the Engine Work</h4>
                  <p className="text-sm text-gray-600">Our client-side WebAssembly engine will automatically calculate the best compression ratio to hit the {formattedSize} target without destroying quality.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">3. Preview the Result</h4>
                  <p className="text-sm text-gray-600">Check the preview to ensure your facial features are still recognizable. You can adjust the quality slider manually if needed.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4. Download Securely</h4>
                  <p className="text-sm text-gray-600">Click download. The newly compressed {formattedSize} file is saved directly to your device. No server uploads are ever involved!</p>
                </div>
              </div>
            </div>

            {/* Expanded FAQ */}
            <div className="space-y-6">
              <h3 className="text-gray-900 text-xl sm:text-2xl font-bold flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-brand-500" />
                Frequently Asked Questions about {formattedSize} Compression
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: `Will my image quality decrease drastically when compressing to ${formattedSize}?`,
                    a: `While reducing a file size to ${formattedSize} requires removing some image data, FileFit utilizes a smart dynamic binary search algorithm on the HTML5 Canvas API. It optimizes the resolution scale iteratively. This means it only compresses exactly as much as needed to hit the ${formattedSize} threshold, preserving maximum visual clarity and preventing the image from looking "pixelated" or "blocky."`,
                  },
                  {
                    q: "Is my uploaded photograph safe from identity theft?",
                    a: "Absolutely. Security is our primary feature. Unlike other online image resizers that upload your sensitive personal photos to remote cloud servers (where they might be stored or leaked), FileFit operates 100% client-side. The processing happens entirely within your web browser's local memory. Your files never cross the internet.",
                  },
                  {
                    q: `What if my image is already smaller than ${formattedSize}?`,
                    a: `If you upload an image that is already below the ${formattedSize} limit, our tool will notify you. We will not compress it further unnecessarily, preserving its original quality. You can simply download it as-is or use our crop tool to adjust the dimensions without worrying about the file size.`,
                  },
                  {
                    q: "Can I use this tool on my mobile phone?",
                    a: "Yes! Our compression engine is highly optimized and runs perfectly on modern mobile browsers (Chrome, Safari, Firefox). You can take a selfie or a photo of your physical passport photo with your phone's camera, upload it directly here, and shrink it to the required size in seconds.",
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
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Explore Related Target Sizes</span>
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
