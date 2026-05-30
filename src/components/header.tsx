"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Image as ImageIcon, Signature, Menu, X } from "lucide-react";

/** Inline FileFit logo mark — two stacked document pages with checkmark */
function FileFitMark({ size = 32 }: { size?: number }) {
  const s = size / 32; // scale factor
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Back document — Bone White */}
      <rect x="2" y="2" width="20" height="25" rx="3" fill="#F5F0E8" />
      {/* Fold corner shadow */}
      <polygon points="15,2 22,2 22,9" fill="#0F0F0F" opacity="0.12" />
      <polygon points="15,2 15,9 22,9" fill="#C8C2B8" />
      {/* Text lines on back doc */}
      <rect x="5" y="13" width="8" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="17" width="13" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="21" width="10" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />

      {/* Front document — Ignite Orange */}
      <rect x="10" y="9" width="20" height="22" rx="3" fill="#FF5C2E" />
      {/* Fold corner dark */}
      <polygon points="23,9 30,9 30,16" fill="#0F0F0F" opacity="0.18" />
      <polygon points="23,9 23,16 30,16" fill="#E04820" />
      {/* Checkmark on front doc */}
      <path
        d="M15 21 L18.5 24.5 L25 17"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Full wordmark: icon + "File" + "Fit" in brand orange */
function FileFitWordmark() {
  return (
    <span className="flex items-center gap-2 select-none">
      <FileFitMark size={30} />
      <span
        className="text-[1.2rem] font-extrabold tracking-tight leading-none"
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.03em" }}
      >
        <span className="text-[#0F0F0F]">File</span>
        <span style={{ color: "#FF5C2E" }}>Fit</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/tools/image/compress", icon: ImageIcon, label: "Image Tools" },
    { href: "/tools/signature/crop", icon: Signature, label: "Signature" },
    { href: "/tools/pdf/compress", icon: FileText, label: "PDF Tools" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-bone-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="group shrink-0">
            <FileFitWordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#555] hover:text-[#FF5C2E] hover:bg-[#fff4f0] transition-all font-medium"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <Link
              href="/tools/image/compress"
              className="ml-3 px-4 py-2 bg-[#FF5C2E] hover:bg-[#E04820] text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#888] hover:text-[#0F0F0F] hover:bg-bone transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-bone-dark">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#555] hover:text-[#FF5C2E] hover:bg-[#fff4f0] transition-all"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/tools/image/compress"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 bg-[#FF5C2E] hover:bg-[#E04820] text-white text-sm font-bold rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
