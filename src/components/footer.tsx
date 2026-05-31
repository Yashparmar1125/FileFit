import Link from "next/link";
import { Shield, Cpu, Zap, RefreshCw } from "lucide-react";

function FileFitMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="25" rx="3" fill="#F5F0E8" />
      <polygon points="15,2 22,2 22,9" fill="#0F0F0F" opacity="0.12" />
      <polygon points="15,2 15,9 22,9" fill="#C8C2B8" />
      <rect x="5" y="13" width="8" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="17" width="13" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="21" width="10" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="10" y="9" width="20" height="22" rx="3" fill="#FF5C2E" />
      <polygon points="23,9 30,9 30,16" fill="#0F0F0F" opacity="0.18" />
      <polygon points="23,9 23,16 30,16" fill="#E04820" />
      <path d="M15 21 L18.5 24.5 L25 17" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: Shield, title: "100% Private", desc: "Files are processed entirely in your browser. Nothing is uploaded to our servers." },
  { icon: Zap, title: "Lightning Fast", desc: "Under 10 seconds using local Canvas and PDF engines — no waiting for uploads." },
  { icon: Cpu, title: "High Accuracy", desc: "Smart binary-search compressor hits target file size while retaining visual quality." },
  { icon: RefreshCw, title: "Zero Cost", desc: "Unlimited usage with no logins, credits, or subscriptions required." },
];

const FOOTER_LINKS = [
  {
    heading: "Exam Resizers",
    links: [
      ["SSC CGL Resizer", "/exams/ssc-cgl"],
      ["SSC CHSL Resizer", "/exams/ssc-chsl"],
      ["UPSC IAS Resizer", "/exams/upsc-ias"],
      ["UPSC NDA Resizer", "/exams/upsc-nda"],
      ["IBPS PO Resizer", "/exams/ibps-po"],
      ["SBI PO Resizer", "/exams/sbi-po"],
    ],
  },
  {
    heading: "Official Forms",
    links: [
      ["Passport Photo Maker", "/passport-photo"],
      ["PAN Card Photo", "/documents/pan-card-photo"],
      ["PAN Card Signature", "/documents/pan-card-signature"],
      ["US Visa Photo", "/documents/visa-usa"],
      ["Schengen Visa Photo", "/documents/visa-schengen"],
      ["Aadhaar Card Scan", "/documents/aadhaar-card-scan"],
    ],
  },
  {
    heading: "File Compressors",
    links: [
      ["Compress Photo to 20KB", "/photo-size/20kb"],
      ["Compress Photo to 50KB", "/photo-size/50kb"],
      ["Compress Photo to 100KB", "/photo-size/100kb"],
      ["Compress PDF under 100KB", "/pdf-size/100kb"],
      ["Compress PDF under 200KB", "/pdf-size/200kb"],
      ["Resize Signature to 10KB", "/signature-size/10kb"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-bone-dark mt-auto text-sm">

      {/* Trust strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-bone-dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="p-2 bg-bone rounded-lg text-[#FF5C2E] shrink-0 shadow-brutal border border-[#0F0F0F]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-[#0F0F0F] font-semibold text-sm mb-0.5">{title}</h4>
                <p className="text-[#888] text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <h3
                className="text-[#0F0F0F] font-bold mb-4 text-sm"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                {heading}
              </h3>
              <ul className="space-y-2 text-xs text-[#888]">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-[#FF5C2E] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileFitMark size={26} />
              <span
                className="font-extrabold text-base text-[#0F0F0F] tracking-tight"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.03em" }}
              >
                File<span style={{ color: "#FF5C2E" }}>Fit</span>
              </span>
            </div>
            <p
              className="text-xs text-[#888] mb-3 leading-relaxed"
              style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.04em" }}
            >
              COMPRESS · CONVERT · MANAGE
            </p>
            <p className="text-xs text-[#aaa] mb-4 leading-relaxed">
              Making files comply with government exams, visa applications, and web uploads instantly in your browser.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#aaa]">
              <span>© 2026 FileFit</span>
              <span>·</span>
              <Link href="/about" className="hover:text-[#FF5C2E] transition-colors">
                About
              </Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-[#FF5C2E] transition-colors">
                Privacy
              </Link>
              <span>·</span>
              <Link
                href="https://github.com/Yashparmar1125/FileFit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF5C2E] transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
