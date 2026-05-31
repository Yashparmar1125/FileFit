"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import AdsPlaceholder from "@/components/ads-placeholder";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  Shield,
  Zap,
  Lock,
} from "lucide-react";

interface ToolItem {
  name: string;
  description: string;
  category: "image" | "signature" | "pdf" | "preset";
  link: string;
  badge?: string;
  iconColor: string;
  iconBg: string;
}

const TOOLS_LIST: ToolItem[] = [
  // Image
  { name: "Resize Image", description: "Adjust image width & height pixel dimensions in seconds.", category: "image", link: "/tools/image/resize", iconColor: "#3b82f6", iconBg: "#eff6ff" },
  { name: "Compress Image", description: "Shrink image file size (under 20KB, 50KB, 100KB) with quality retention.", category: "image", link: "/tools/image/compress", iconColor: "#3b82f6", iconBg: "#eff6ff", badge: "Popular" },
  { name: "Convert PNG / JPG", description: "Instantly convert between PNG and JPG formats client-side.", category: "image", link: "/tools/image/jpg-to-png", iconColor: "#3b82f6", iconBg: "#eff6ff" },
  // Signature
  { name: "Resize Signature", description: "Rescale scanned signature photos to meet entrance exam constraints.", category: "signature", link: "/tools/signature/resize", iconColor: "#8b5cf6", iconBg: "#f5f3ff" },
  { name: "Signature Cleaner", description: "Remove dark gray shadows from signature scans, turning paper white or transparent.", category: "signature", link: "/tools/signature/crop", iconColor: "#8b5cf6", iconBg: "#f5f3ff", badge: "Smart" },
  // PDF
  { name: "Compress PDF", description: "Reduce PDF file size to under 100KB, 200KB or custom limits in the browser.", category: "pdf", link: "/tools/pdf/compress", iconColor: "#FF5C2E", iconBg: "#fff4f0", badge: "Advanced" },
  { name: "Merge PDF", description: "Merge multiple PDF documents into a single compiled file securely.", category: "pdf", link: "/tools/pdf/merge", iconColor: "#FF5C2E", iconBg: "#fff4f0" },
  { name: "Split PDF", description: "Extract specific page ranges from a PDF document into a new file.", category: "pdf", link: "/tools/pdf/split", iconColor: "#FF5C2E", iconBg: "#fff4f0" },
  { name: "Image to PDF", description: "Convert photos or scanned images into a clean single PDF file.", category: "pdf", link: "/tools/pdf/image-to-pdf", iconColor: "#FF5C2E", iconBg: "#fff4f0" },
  // Presets
  { name: "SSC Resizer", description: "Format candidate photo (20–50KB) and signature (10–20KB) for SSC exams.", category: "preset", link: "/exams/ssc-cgl", iconColor: "#10b981", iconBg: "#ecfdf5" },
  { name: "UPSC Formatter", description: "Format UPSC photo and signature to square aspect ratio (20–300KB).", category: "preset", link: "/exams/upsc-ias", iconColor: "#10b981", iconBg: "#ecfdf5" },
  { name: "IBPS Banking Forms", description: "Format photo (20–50KB) and signature (10–20KB) for banking applications.", category: "preset", link: "/exams/ibps-po", iconColor: "#10b981", iconBg: "#ecfdf5" },
  { name: "Passport Photo Maker", description: "Crop and scale photos to standard Indian passport sizes (3.5×4.5cm).", category: "preset", link: "/passport-photo", iconColor: "#10b981", iconBg: "#ecfdf5" },
  { name: "PAN Card Formatter", description: "NSDL/UTI photo (2.5×3.5cm) and signature size formatting.", category: "preset", link: "/documents/pan-card-photo", iconColor: "#10b981", iconBg: "#ecfdf5" },
  { name: "Visa Photo Resizer", description: "Adjust aspect ratios for USA Visa (2×2 inches), UK, and Schengen Visas.", category: "preset", link: "/documents/visa-usa", iconColor: "#10b981", iconBg: "#ecfdf5" },
];

const CATEGORIES = [
  { key: "all", label: "All Tools" },
  { key: "image", label: "Image" },
  { key: "signature", label: "Signature" },
  { key: "pdf", label: "PDF" },
  { key: "preset", label: "Form Presets" },
] as const;

type Category = (typeof CATEGORIES)[number]["key"];

function ToolIcon({ name }: { name: string }) {
  switch (name) {
    case "Resize Image":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="14" y="13" width="16" height="19" rx="3" fill="#FF5C2E"/>
          <path d="M18 21h8M18 24.5h5" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" opacity={0.35}/>
          <path d="M20 19l2-2 2 2M20 27l2 2 2-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Compress Image":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="16" y="16" width="20" height="20" rx="4" fill="#FF5C2E"/>
          <path d="M26 22l-3 3-3-3M26 28l-3-3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Convert PNG / JPG":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="7" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="18" y="12" width="20" height="24" rx="4" fill="#FF5C2E"/>
          <path d="M23 21h10M23 25h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
          <path d="M17 21.5l3 0M17.5 20l2.5 1.5-2.5 1.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}/>
        </svg>
      );
    case "Resize Signature":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M26 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Signature Cleaner":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M26 30l2 2 2-2M26 34l2-2 2 2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity={0.9}/>
          <rect x="28" y="27" width="4" height="1.5" rx={0.75} fill="#fff" opacity={0.6}/>
        </svg>
      );
    case "Compress PDF":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M27 28v5M24.5 31l2.5 2.5 2.5-2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Merge PDF":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="5" y="8" width="18" height="23" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5" opacity={0.6}/>
          <rect x="12" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <path d="M17 13h10M17 17h10M17 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="20" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M24 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Split PDF":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="9" y1="18" x2="29" y2="18" stroke="#FF5C2E" strokeWidth="1.5" strokeDasharray="3 2"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M22 30l5-4M22 30l5 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "Image to PDF":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="7" y="6" width="20" height="22" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="8" y="8" width="16" height="11" rx="2" fill="#ccc" opacity={0.5}/>
          <path d="M11 22l3 3 3-3" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "SSC Resizer":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="14" y="3" width="10" height="6" rx="2" fill="#F5F0E8" stroke="#ccc" strokeWidth="1"/>
          <path d="M13 16h12M13 20h9M13 24h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <text x="27" y="33" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">SSC</text>
        </svg>
      );
    case "UPSC Formatter":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <circle cx="19" cy="16" r="5" fill="#ddd"/>
          <path d="M13 25c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <text x="27" y="33" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">UPSC</text>
        </svg>
      );
    case "IBPS Banking Forms":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="14" y="3" width="10" height="6" rx="2" fill="#F5F0E8" stroke="#ccc" strokeWidth="1"/>
          <rect x="13" y="13" width="6" height="8" rx="1.5" fill="#ddd"/>
          <path d="M21 15h6M21 18h4M13 24h12" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <text x="27" y="33" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">IBPS</text>
        </svg>
      );
    case "Passport Photo Maker":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <circle cx="19" cy="15" r="5" fill="#ddd"/>
          <path d="M12 27c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "PAN Card Formatter":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="9" width="26" height="18" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <rect x="10" y="12" width="7" height="9" rx="1.5" fill="#ddd"/>
          <path d="M20 14h8M20 17h6M20 20h7" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
          <text x="30" y="33" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">PAN</text>
        </svg>
      );
    case "Visa Photo Resizer":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="9" width="26" height="18" rx="4" fill="#F5F0E8" stroke="#E8E2D8" strokeWidth="0.5"/>
          <circle cx="15" cy="17" r="4.5" fill="#ddd"/>
          <path d="M21 13h9M21 17h7M21 21h8" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
          <path d="M26 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

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

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
    const matchCat = activeCategory === "all" || tool.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-1 bg-white">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-bone border-b border-bone-dark py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-bone-dark text-xs font-semibold mb-6 shadow-sm"
              style={{ color: "#FF5C2E" }}
            >
              <Lock className="h-3.5 w-3.5" />
              100% Client-Side — Files Never Leave Your Device
            </div>

            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-3 leading-tight"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.03em" }}
            >
              Compress PDFs, Resize Images &{" "}
              <span className="text-gradient-brand">Format Documents Free</span>
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

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link
                href="/tools/image/compress"
                className="w-full sm:w-auto px-7 py-3 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                style={{ background: "#FF5C2E", fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#E04820")}
                onMouseLeave={e => (e.currentTarget.style.background = "#FF5C2E")}
              >
                Compress Image
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/pdf/compress"
                className="w-full sm:w-auto px-7 py-3 bg-white border border-bone-dark hover:border-[#FF5C2E] hover:bg-[#fff4f0] text-[#0F0F0F] rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                Compress PDF
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-[#888] font-medium">
              {[
                { icon: Shield, label: "No file uploads" },
                { icon: Zap, label: "Under 10 seconds" },
                { icon: Lock, label: "Zero data stored" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Search + tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aaa] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-bone-dark bg-white focus:outline-none text-sm text-[#0F0F0F] placeholder-[#aaa] transition-all"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                onFocus={e => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,92,46,0.1)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--color-bone-dark)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-bone border border-bone-dark overflow-x-auto shrink-0 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    background: activeCategory === cat.key ? "#ffffff" : "transparent",
                    color: activeCategory === cat.key ? "#FF5C2E" : "#888",
                    boxShadow: activeCategory === cat.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    border: activeCategory === cat.key ? "1px solid var(--color-bone-dark)" : "1px solid transparent",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tool cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => {
              return (
                <Link key={tool.link} href={tool.link} className="tool-card p-5 flex flex-col gap-4 group">
                  <div className="flex items-start justify-between">
                    <div className="transition-transform group-hover:scale-105">
                      <ToolIcon name={tool.name} />
                    </div>
                    {tool.badge && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                        style={{ background: "#fff4f0", color: "#FF5C2E", borderColor: "#ffd0c0" }}
                      >
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      className="text-[#0F0F0F] text-sm font-semibold mb-1 group-hover:text-[#FF5C2E] transition-colors"
                      style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-[#888] text-xs leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#aaa] group-hover:text-[#FF5C2E] transition-colors mt-auto">
                    Use Tool
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#aaa] text-sm">No tools found. Try a different search.</p>
            </div>
          )}
        </section>

        {/* ── Mid ad ───────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <AdsPlaceholder format="auto" slot="home-middle-ad" />
        </div>

        {/* ── SEO copy ─────────────────────────────────────── */}
        <section className="bg-bone border-t border-bone-dark py-14 px-4">
          <div className="max-w-4xl mx-auto text-[#888] text-sm leading-relaxed">
            <h2
              className="text-[#0F0F0F] text-xl sm:text-2xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
            >
              What is FileFit?
            </h2>
            <p className="mb-8">
              FileFit is a free, 100% client-side web utility that resizes, compresses, and formats PDFs, images, and signatures. Unlike traditional tools, it processes files locally in your browser using HTML5 Canvas and WebAssembly, ensuring maximum privacy since data never touches a cloud server.
            </p>

            <h2
              className="text-[#0F0F0F] text-xl sm:text-2xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
            >
              How does FileFit process files?
            </h2>
            <p className="mb-4">
              Unlike traditional file compression websites, FileFit leverages modern HTML5 Canvas, the native Web Cryptography API, and compiled WASM PDF engines directly inside your browser.
              When you select a document or image, your machine processes the bytes locally. Because your files are never uploaded to a cloud server, your personal data, scanned IDs, passport photographs, and signatures remain 100% private.
            </p>
            <h3
              className="text-[#0F0F0F] text-base font-semibold mb-2 mt-6"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              Why resize images for exams?
            </h3>
            <p>
              Most recruitment and educational portals (such as Staff Selection Commission, Union Public Service Commission, and banking recruitment portals) have strict limits on file uploads to conserve database storage. They usually restrict photos to 20KB–50KB and signatures to 10KB–20KB.
              FileFit is pre-configured with these portal guidelines, making resizing as simple as dragging, clicking crop, and downloading the compliant version in under 10 seconds.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
