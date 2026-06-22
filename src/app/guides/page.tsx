import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "FileFit Guides & Articles - Learn About Digital Privacy & Optimization",
  description: "Read our comprehensive guides on client-side privacy, image compression, and formatting documents for government portals.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const guides = [
    {
      title: "The Ultimate Guide to Client-Side File Privacy",
      slug: "client-side-privacy",
      excerpt: "Why you should never upload your passport or sensitive IDs to a random cloud server, and how local WASM technology fixes this.",
      icon: Shield,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Formatting Documents for Indian Government Portals",
      slug: "indian-government-portals",
      excerpt: "A complete breakdown of the strict photo and signature requirements for UPSC, SSC, IBPS, and Aadhaar, and how to meet them.",
      icon: Globe,
      color: "text-[#FF5C2E]",
      bg: "bg-[#fff4f0]",
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <section className="bg-bone bg-grid-pattern border-b-2 border-[#0F0F0F] py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F0F0F] mb-4"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.04em" }}
            >
              Guides & <span className="bg-[#FF5C2E] text-white px-2 lg:px-3 py-1 rounded shadow-brutal inline-block mt-2">Articles</span>
            </h1>
            <p className="text-[#888] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Learn how to protect your digital identity and perfectly format your files for the web.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 sm:p-8 rounded-2xl border-2 border-[#0F0F0F] shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-transform bg-white"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 border-[#0F0F0F] shrink-0 shadow-[2px_2px_0px_#0F0F0F] ${guide.bg}`}>
                  <guide.icon className={`h-8 w-8 ${guide.color}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#FF5C2E] transition-colors">{guide.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{guide.excerpt}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-[#FF5C2E] font-bold text-sm">
                  Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
