import Header from "@/components/header";
import Footer from "@/components/footer";
import AdsPlaceholder from "@/components/ads-placeholder";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import ToolsDirectory from "@/components/tools-directory";

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is FileFit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FileFit is a free, 100% client-side web utility that resizes, compresses, and formats PDFs, images, and signatures entirely in your browser. Files are never uploaded to a cloud server."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe and secure on FileFit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely. FileFit processes your passport scans, IDs, and signatures using your local machine's memory. No copies are sent to any server, ensuring 100% data privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Is FileFit really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. FileFit has no subscriptions, no premium tiers, and requires no account. It is fully supported by non-intrusive display ads."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-1 bg-white">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-bone bg-grid-pattern border-b-2 border-[#0F0F0F] py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-bone-dark text-xs font-semibold mb-6 shadow-sm group"
              style={{ color: "#FF5C2E" }}
            >
              <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C2E] opacity-40"></span>
                <Lock className="relative inline-flex h-3.5 w-3.5" />
              </div>
              100% Client-Side — Files Never Leave Your Device
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F0F0F] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.04em" }}
            >
              Compress PDFs, Resize Images &{" "}
              <span className="bg-[#FF5C2E] text-white px-2 lg:px-3 py-1 rounded shadow-brutal inline-block mt-2">Format Documents Free</span>
            </h1>
            
            <h2 
              className="text-xl sm:text-2xl font-bold text-[#555] mb-5"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.01em" }}
            >
              Secure, 100% local file converter
            </h2>

            <p className="text-[#888] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Compress PDFs, resize photos, optimize signatures, and prepare official documents to exact sizes in seconds.
              No logins. No uploads. No cost.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/tools/image/compress"
                className="group w-full sm:w-auto px-8 py-3.5 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-brutal shadow-brutal-hover bg-[#FF5C2E]"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                Compress Image
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools/pdf/compress"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0F0F0F] rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-brutal shadow-brutal-hover"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                Compress PDF
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-[#888] font-medium animate-stagger">
              {[
                { icon: Shield, label: "No file uploads" },
                { icon: Zap, label: "Under 10 seconds" },
                { icon: Lock, label: "Zero data stored" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 hover:text-[#0F0F0F] transition-colors cursor-default">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ad slot ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <AdsPlaceholder format="leaderboard" slot="home-top-ad" />
        </div>

        {/* ── Tools directory ──────────────────────────────── */}
        <ToolsDirectory />

        {/* ── Mid ad ───────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <AdsPlaceholder format="auto" slot="home-middle-ad" />
        </div>

        {/* ── SEO copy ─────────────────────────────────────── */}
        <section className="bg-bone bg-grid-pattern border-t-2 border-[#0F0F0F] py-20 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F0F0F]"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.04em" }}
              >
                Built for <span className="text-white bg-[#0F0F0F] px-2 py-0.5 rounded shadow-[4px_4px_0px_#FF5C2E]">Speed & Privacy</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-stagger">
              {/* Card 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#0F0F0F] shadow-brutal flex flex-col h-full hover:-translate-y-1 hover:shadow-brutal-hover transition-transform">
                <div className="w-12 h-12 bg-bone border-2 border-[#0F0F0F] rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#FF5C2E] shrink-0">
                  <Shield className="h-6 w-6 text-[#0F0F0F]" />
                </div>
                <h3
                  className="text-[#0F0F0F] text-xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
                >
                  What is FileFit?
                </h3>
                <p className="text-[#555] text-sm leading-relaxed flex-1">
                  FileFit is a free, 100% client-side web utility that resizes, compresses, and formats PDFs, images, and signatures. Unlike traditional tools, it processes files locally in your browser, ensuring maximum privacy since data never touches a cloud server.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#0F0F0F] shadow-brutal flex flex-col h-full hover:-translate-y-1 hover:shadow-brutal-hover transition-transform">
                <div className="w-12 h-12 bg-[#fff4f0] border-2 border-[#0F0F0F] rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_#FF5C2E] shrink-0">
                  <Lock className="h-6 w-6 text-[#FF5C2E]" />
                </div>
                <h3
                  className="text-[#0F0F0F] text-xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
                >
                  How it processes files
                </h3>
                <p className="text-[#555] text-sm leading-relaxed flex-1">
                  FileFit leverages modern HTML5 Canvas, native Web Cryptography, and compiled WASM PDF engines directly inside your browser. Because your files are never uploaded to a server, your personal data and scanned IDs remain 100% private.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0F0F0F] p-6 sm:p-8 rounded-2xl border-2 border-[#0F0F0F] shadow-[6px_6px_0px_#FF5C2E] flex flex-col h-full hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-[#1f1f1f] border-2 border-[#333] rounded-xl flex items-center justify-center mb-6 shrink-0">
                  <Zap className="h-6 w-6 text-[#FF5C2E]" />
                </div>
                <h3
                  className="text-white text-xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
                >
                  Why resize for exams?
                </h3>
                <p className="text-[#aaa] text-sm leading-relaxed flex-1">
                  Recruitment portals (like SSC, UPSC, IBPS) have strict limits on file uploads to conserve database storage. They usually restrict photos to 20–50KB and signatures to 10–20KB. FileFit is pre-configured with these exact guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
