import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";
import AdsPlaceholder from "@/components/ads-placeholder";
import RelatedTools from "@/components/related-tools";
import { ChevronLeft, Shield, Info, User } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Passport Photo Maker & Resizer Free | FileFit",
  description:
    "Crop, resize, and compress photo to standard Indian passport photo dimensions (3.5 x 4.5 cm) or US size (2x2 inches) online in seconds.",
};

export default function PassportPhotoPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors mb-6 group font-medium">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Tools
          </Link>

          <AdsPlaceholder format="leaderboard" slot="passport-top-banner" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-5">
              <div className="panel p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-3">
                    <User className="h-3 w-3" />
                    Passport Size Maker
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Passport Photo Resizer
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Crop, adjust aspect ratio, and compress candidate photos to standard Indian passport size (3.5×4.5cm) or US size (2×2 inches).
                  </p>
                </div>

                <div className="rounded-xl border border-[#e9ecef] bg-[#f8f9fa] p-4 space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Standard Presets</span>
                  {[
                    ["Indian standard", "3.5 × 4.5 cm"],
                    ["US standard", "2 × 2 inches (51×51mm)"],
                    ["File size", "Under 100 KB"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{label}:</span>
                      <span className="text-gray-800 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <Info className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    Photo Guidelines
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {[
                      "Take photo facing straight under good lighting.",
                      "Background must be plain light or white.",
                      "Select Aspect Lock \"3:4\" on the options sidebar.",
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
                  <h4 className="text-gray-800 text-xs font-semibold">Safe Browser Sandbox</h4>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">
                    Passport photographs are sensitive. The conversion process is handled in JavaScript inside your browser. No files leave your device.
                  </p>
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="lg:col-span-8">
              <div className="panel p-6">
                <ImageWorkspace defaultMode="compress" defaultTargetKb={100} />
              </div>
            </div>
          </div>

          <AdsPlaceholder format="horizontal" slot="passport-bottom-banner" />
          <RelatedTools currentTool="passport" />
        </div>
      </main>

      <Footer />
    </>
  );
}
