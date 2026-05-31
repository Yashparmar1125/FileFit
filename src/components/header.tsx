"use client";

import React from "react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─── Brand mark ─────────────────────────────────────────────────────────── */
function FileFitMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="25" rx="3" fill="#F5F0E8" />
      <polygon points="15,2 22,2 22,9" fill="#0F0F0F" opacity="0.12" />
      <polygon points="15,2 15,9 22,9" fill="#C8C2B8" />
      <rect x="5" y="13" width="8" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="17" width="13" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="5" y="21" width="10" height="2" rx="1" fill="#0F0F0F" opacity="0.18" />
      <rect x="10" y="9" width="20" height="22" rx="3" fill="#FF5C2E" />
      <polygon points="23,9 30,9 30,16" fill="#0F0F0F" opacity="0.18" />
      <polygon points="23,9 23,16 30,16" fill="#E04820" />
      <path d="M15 21 L18.5 24.5 L25 17" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── All icons (FileFit iconset v3, camelCase JSX) ──────────────────────── */
const ICONS: Record<string, React.ReactElement> = {
  /* Image – Optimize */
  "compress-image": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="16" y="16" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M26 22l-3 3-3-3M26 28l-3-3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "upscale": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="16" y="14" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M22 28v-8M18 24l4-4 4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 32l2 2M16 32l-2 2M28 20l2-2M16 20l-2-2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity={0.6}/>
    </svg>
  ),
  "remove-bg": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      {/* checkerboard hint */}
      <rect x="10" y="16" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="14" y="20" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="18" y="16" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="14" y="12" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="16" y="20" width="20" height="18" rx="4" fill="#FF5C2E"/>
      <path d="M21 30l2.5 2.5 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Image – Modify */
  "resize-image": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="13" width="16" height="19" rx="3" fill="#FF5C2E"/>
      <path d="M18 21h8M18 24.5h5" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" opacity={0.35}/>
      <path d="M20 19l2-2 2 2M20 27l2 2 2-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "crop": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="12" width="20" height="20" rx="3" fill="#FF5C2E"/>
      {/* crop handles */}
      <rect x="12" y="10" width="3" height="10" rx="1" fill="#0F0F0F" opacity={0.25}/>
      <rect x="10" y="10" width="8" height="3" rx="1" fill="#0F0F0F" opacity={0.25}/>
      <rect x="29" y="24" width="3" height="10" rx="1" fill="#fff" opacity={0.6}/>
      <rect x="26" y="31" width="8" height="3" rx="1" fill="#fff" opacity={0.6}/>
      <path d="M19 22l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "rotate": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="14" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M23 20a5 5 0 0 1 5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M28 22l0-2-2 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 29a5 5 0 0 1-1-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={0.6}/>
    </svg>
  ),
  /* Image – Convert */
  "convert-image": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="7" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <rect x="18" y="12" width="20" height="24" rx="4" fill="#FF5C2E"/>
      <path d="M23 21h10M23 25h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
      <path d="M17 21.5l3 0M17.5 20l2.5 1.5-2.5 1.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}/>
    </svg>
  ),
  /* Image – Security */
  "watermark": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="15" y="16" width="20" height="18" rx="4" fill="#FF5C2E"/>
      {/* "WM" text hint */}
      <text x="25" y="29" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff" fontFamily="'Courier New',monospace" opacity={0.9}>WM</text>
      {/* shield */}
      <path d="M10 13l3-1.5 3 1.5v2.5c0 1.5-1.3 2.8-3 3-1.7-.2-3-1.5-3-3V13z" fill="#FF5C2E" opacity={0.7}/>
    </svg>
  ),
  "blur-face": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      {/* face outline */}
      <circle cx="19" cy="17" r="5" fill="#ddd"/>
      <path d="M13 26c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#ccc" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* blur box overlay */}
      <rect x="16" y="13" width="20" height="16" rx="3" fill="#FF5C2E"/>
      {/* blur lines */}
      <rect x="18" y="16" width="14" height="2" rx="1" fill="#fff" opacity={0.25}/>
      <rect x="18" y="20" width="10" height="2" rx="1" fill="#fff" opacity={0.25}/>
      <rect x="18" y="24" width="12" height="2" rx="1" fill="#fff" opacity={0.25}/>
    </svg>
  ),
  /* Signatures */
  "resize-signature": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M26 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "clean-signature": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M26 30l2 2 2-2M26 34l2-2 2 2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity={0.9}/>
      <rect x="28" y="27" width="4" height="1.5" rx={0.75} fill="#fff" opacity={0.6}/>
    </svg>
  ),
  /* PDF */
  "compress-pdf": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M27 28v5M24.5 31l2.5 2.5 2.5-2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "merge-pdf": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="5" y="8" width="18" height="23" rx="4" fill="#F5F0E8" opacity={0.6}/>
      <rect x="12" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M17 13h10M17 17h10M17 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="20" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M24 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "split-pdf": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="29" y2="18" stroke="#FF5C2E" strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l5-4M22 30l5 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "image-to-pdf": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="7" y="6" width="20" height="22" rx="4" fill="#F5F0E8"/>
      <rect x="8" y="8" width="16" height="11" rx="2" fill="#ccc" opacity={0.5}/>
      <path d="M11 22l3 3 3-3" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Exam & Gov */
  "passport": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <circle cx="19" cy="15" r="5" fill="#ddd"/>
      <path d="M12 27c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "ssc": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="3" width="10" height="6" rx="2" fill="#F5F0E8" stroke="#ccc" strokeWidth="1"/>
      <path d="M13 16h12M13 20h9M13 24h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <text x="27" y="33" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">SSC</text>
    </svg>
  ),
  "upsc": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <circle cx="19" cy="16" r="5" fill="#ddd"/>
      <path d="M13 25c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <text x="27" y="33" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">UPSC</text>
    </svg>
  ),
  "ibps": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="3" width="10" height="6" rx="2" fill="#F5F0E8" stroke="#ccc" strokeWidth="1"/>
      <rect x="13" y="13" width="6" height="8" rx="1.5" fill="#ddd"/>
      <path d="M21 15h6M21 18h4M13 24h12" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <text x="27" y="33" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">IBPS</text>
    </svg>
  ),
  "pan": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="9" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <rect x="10" y="12" width="7" height="9" rx="1.5" fill="#ddd"/>
      <path d="M20 14h8M20 17h6M20 20h7" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <text x="30" y="33" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" fontFamily="'Courier New',monospace">PAN</text>
    </svg>
  ),
  "visa": (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="9" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <circle cx="15" cy="17" r="4.5" fill="#ddd"/>
      <path d="M21 13h9M21 17h7M21 21h8" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M26 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ─── Mega-menu data (5 columns: Optimize | Modify | Convert+Security | Sigs | PDF | Exams) ── */
// We render two rows: top = Images (4 sub-groups), bottom = Sigs + PDF + Exams
const IMG_GROUPS = [
  {
    label: "Optimize",
    accent: "#22C55E",
    tools: [
      { key: "compress-image", label: "Compress Image",     href: "/tools/image/compress", desc: "Shrink size, keep quality" },
      { key: "upscale",        label: "Upscale Image",      href: "/tools/image/upscale",  desc: "Enlarge up to 4× with clarity" },
      { key: "remove-bg",      label: "Remove Background",  href: "/tools/image/remove-bg",desc: "Erase BG — fully local" },
    ],
  },
  {
    label: "Modify",
    accent: "#3B82F6",
    tools: [
      { key: "resize-image",   label: "Resize Image",   href: "/tools/image/resize",  desc: "Exact px, % or preset" },
      { key: "crop",           label: "Crop Image",     href: "/tools/image/crop",    desc: "Trim to perfect frame" },
      { key: "rotate",         label: "Rotate Image",   href: "/tools/image/rotate",  desc: "Rotate & flip instantly" },
    ],
  },
  {
    label: "Convert",
    accent: "#F59E0B",
    tools: [
      { key: "convert-image",  label: "Convert PNG / JPG", href: "/tools/image/convert",    desc: "Switch between formats" },
    ],
  },
  {
    label: "Security",
    accent: "#EF4444",
    tools: [
      { key: "watermark",      label: "Watermark Image", href: "/tools/image/watermark",  desc: "Add text watermark" },
      { key: "blur-face",      label: "Blur & Censor",   href: "/tools/image/blur-face",   desc: "Blur sensitive areas" },
    ],
  },
];

const OTHER_GROUPS = [
  {
    label: "Signatures",
    accent: "#8B5CF6",
    tools: [
      { key: "resize-signature", label: "Resize Signature", href: "/tools/signature/resize", desc: "Fit any upload spec" },
      { key: "clean-signature",  label: "BG Cleaner",       href: "/tools/signature/clean",  desc: "Remove background noise" },
    ],
  },
  {
    label: "PDF",
    accent: "#EF4444",
    tools: [
      { key: "compress-pdf",  label: "Compress PDF",  href: "/tools/pdf/compress",     desc: "Reduce file size" },
      { key: "merge-pdf",     label: "Merge PDF",     href: "/tools/pdf/merge",        desc: "Combine multiple PDFs" },
      { key: "split-pdf",     label: "Split PDF",     href: "/tools/pdf/split",        desc: "Extract pages" },
      { key: "image-to-pdf",  label: "Image to PDF",  href: "/tools/pdf/image-to-pdf", desc: "Convert images to PDF" },
    ],
  },
  {
    label: "Exam & Gov Forms",
    accent: "#F59E0B",
    tools: [
      { key: "passport", label: "Passport Photo",  href: "/passport-photo",   desc: "ID-ready photo" },
      { key: "ssc",      label: "SSC Resizer",     href: "/exams/ssc",        desc: "CGL / CHSL / MTS" },
      { key: "upsc",     label: "UPSC Formatter",  href: "/exams/upsc",       desc: "DAF & application" },
      { key: "ibps",     label: "IBPS Banking",    href: "/exams/ibps",       desc: "PO, Clerk, SO" },
      { key: "pan",      label: "PAN Card",        href: "/tools/image/pan",  desc: "NSDL / UTI spec" },
      { key: "visa",     label: "Visa Photo",      href: "/tools/image/visa", desc: "Country-specific" },
    ],
  },
];

const QUICK = [
  { label: "Compress Image", href: "/tools/image/compress" },
  { label: "Remove Background", href: "/tools/image/remove-bg" },
  { label: "Compress PDF",   href: "/tools/pdf/compress" },
  { label: "Passport Photo", href: "/passport-photo" },
];

/* ─── Tiny tool row ─────────────────────────────────────────────────────── */
type ToolItem = { key: string; label: string; href: string; desc: string };
function ToolRow({ tool, close }: { tool: ToolItem; close: () => void }) {
  return (
    <li>
      <Link
        href={tool.href}
        onClick={close}
        className="group flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#f8f9fa] transition-colors"
      >
        <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#eee] group-hover:border-[#e0e0e0] transition-colors overflow-hidden">
          {ICONS[tool.key]}
        </span>
        <span>
          <span className="block text-[12px] font-semibold text-[#1a1a1a] group-hover:text-[#FF5C2E] leading-tight transition-colors">
            {tool.label}
          </span>
          <span className="block text-[10.5px] text-[#aaa] leading-tight">{tool.desc}</span>
        </span>
      </Link>
    </li>
  );
}

/* ─── Mega panel ────────────────────────────────────────────────────────── */
function MegaPanel({ close }: { close: () => void }) {
  return (
    <div
      className="absolute top-[calc(100%+1px)] left-0 right-0 bg-white z-50 border-b border-[#e9ecef]"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}
    >
      <div className="max-w-7xl mx-auto px-7 py-6">

        {/* ── Row 1: Image tools (4 sub-groups) ── */}
        <div className="mb-5">
          <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-[#bbb] mb-3">Image Tools</p>
          <div className="grid grid-cols-4 gap-4">
            {IMG_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: g.accent }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: g.accent }} />
                  {g.label}
                </p>
                <ul className="space-y-0.5">
                  {g.tools.map((t) => <ToolRow key={t.href} tool={t} close={close} />)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-[#f0f0f0] mb-5" />

        {/* ── Row 2: Signatures | PDF | Exams ── */}
        <div className="grid grid-cols-3 gap-6">
          {OTHER_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: g.accent }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: g.accent }} />
                {g.label}
              </p>
              <ul className="space-y-0.5">
                {g.tools.map((t) => <ToolRow key={t.href} tool={t} close={close} />)}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Popular strip ── */}
        <div className="mt-5 pt-4 border-t border-[#f2f2f2] flex items-center gap-2 flex-wrap">
          <span className="text-[9.5px] text-[#ccc] font-semibold uppercase tracking-wider">Popular</span>
          <span className="text-[#eee]">·</span>
          {QUICK.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              onClick={close}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f4f4f5] text-[#555] hover:bg-[#FF5C2E] hover:text-white transition-all"
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile accordion section ───────────────────────────────────────────── */
type GroupType = { label: string; accent: string; tools: ToolItem[] };
function MobileSection({ group, close }: { group: GroupType; close: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f2f2f2] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-semibold text-[#1a1a1a]"
      >
        <span className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full" style={{ background: group.accent }} />
          {group.label}
        </span>
        <ChevronDown className="w-4 h-4 text-[#bbb] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div className="pb-2 px-2">
          {group.tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={close}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[#fff4f0] transition-colors group"
            >
              <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#f8f8f8] overflow-hidden">
                {ICONS[t.key]}
              </span>
              <span className="text-[13px] font-medium text-[#333] group-hover:text-[#FF5C2E] transition-colors">
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Header ────────────────────────────────────────────────────────── */
const ALL_MOBILE_GROUPS: GroupType[] = [
  ...IMG_GROUPS,
  ...OTHER_GROUPS,
];

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (!megaOpen) return;
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [megaOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setMegaOpen(false); setMobileOpen(false); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeMega = () => setMegaOpen(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white border-b border-[#e9ecef]"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-6">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2" onClick={() => { closeMega(); closeMobile(); }}>
              <FileFitMark size={30} />
              <span className="text-[1.1rem] font-extrabold leading-none" style={{ letterSpacing: "-0.03em" }}>
                <span className="text-[#0F0F0F]">File</span>
                <span style={{ color: "#FF5C2E" }}>Fit</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {/* All Tools */}
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={`flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13.5px] font-semibold transition-all ${
                  megaOpen ? "bg-[#FFF0EB] text-[#FF5C2E]" : "text-[#333] hover:bg-[#f5f5f5]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                All Tools
                <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform duration-200"
                  style={{ transform: megaOpen ? "rotate(180deg)" : "none" }} />
              </button>

              <span className="w-px h-5 bg-[#e9ecef] mx-1.5" />

              {/* Quick category links */}
              {[
                { label: "Images",     href: "/tools/image/compress",   dot: "#22C55E" },
                { label: "Signatures", href: "/tools/signature/resize", dot: "#8B5CF6" },
                { label: "PDF",        href: "/tools/pdf/compress",     dot: "#EF4444" },
                { label: "Exam Forms", href: "/passport-photo",          dot: "#F59E0B" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-lg text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.dot }} />
                  {c.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="/tools/image/compress"
              className="hidden md:flex shrink-0 h-9 items-center px-4 rounded-lg text-[13px] font-bold text-white bg-[#FF5C2E] hover:bg-[#E04820] transition-colors"
            >
              Try Free →
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden ml-auto p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega-menu */}
        {megaOpen && <MegaPanel close={closeMega} />}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40" style={{ top: 56 }}>
          <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={closeMobile} />
          <div className="relative bg-white max-h-[calc(100dvh-56px)] overflow-y-auto shadow-2xl">
            {/* Popular */}
            <div className="px-5 py-3 bg-[#fafafa] border-b border-[#f0f0f0] flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#bbb]">Popular</span>
              {QUICK.map((q) => (
                <Link key={q.href} href={q.href} onClick={closeMobile}
                  className="px-3 py-1 rounded-full text-[11.5px] font-medium bg-white border border-[#e5e7eb] text-[#444] hover:border-[#FF5C2E] hover:text-[#FF5C2E] transition-all">
                  {q.label}
                </Link>
              ))}
            </div>

            {/* Accordion */}
            {ALL_MOBILE_GROUPS.map((g) => (
              <MobileSection key={g.label} group={g} close={closeMobile} />
            ))}

            {/* Footer */}
            <div className="px-5 py-5 border-t border-[#f0f0f0] space-y-2">
              <Link href="/about"   onClick={closeMobile} className="block text-sm text-[#666] hover:text-[#FF5C2E]">About</Link>
              <Link href="/privacy" onClick={closeMobile} className="block text-sm text-[#666] hover:text-[#FF5C2E]">Privacy</Link>
              <Link href="/tools/image/compress" onClick={closeMobile}
                className="mt-3 block w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-[#FF5C2E] hover:bg-[#E04820] transition-colors">
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
