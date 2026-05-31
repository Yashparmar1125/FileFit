import Link from "next/link";

/* ─── Inline SVG icons (FileFit iconset v3 style) ────────────────────────── */
const TOOL_ICONS: Record<string, React.ReactElement> = {
  "compress-image": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="16" y="16" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M26 22l-3 3-3-3M26 28l-3-3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "resize-image": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="13" width="16" height="19" rx="3" fill="#FF5C2E"/>
      <path d="M18 21h8M18 24.5h5" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" opacity={0.35}/>
      <path d="M20 19l2-2 2 2M20 27l2 2 2-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "convert-image": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="7" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <rect x="18" y="12" width="20" height="24" rx="4" fill="#FF5C2E"/>
      <path d="M23 21h10M23 25h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
      <path d="M17 21.5l3 0M17.5 20l2.5 1.5-2.5 1.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}/>
    </svg>
  ),
  "upscale": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="16" y="14" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M22 28v-8M18 24l4-4 4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "remove-bg": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="10" y="16" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="14" y="20" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="18" y="16" width="4" height="4" rx="0.5" fill="#ddd" opacity={0.8}/>
      <rect x="16" y="20" width="20" height="18" rx="4" fill="#FF5C2E"/>
      <path d="M21 30l2.5 2.5 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "watermark": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="15" y="16" width="20" height="18" rx="4" fill="#FF5C2E"/>
      <text x="25" y="29" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff" fontFamily="'Courier New',monospace">WM</text>
    </svg>
  ),
  "crop": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="12" width="20" height="20" rx="3" fill="#FF5C2E"/>
      <path d="M19 22l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "rotate": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <rect x="14" y="14" width="20" height="20" rx="4" fill="#FF5C2E"/>
      <path d="M23 20a5 5 0 0 1 5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M28 22l0-2-2 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "blur-face": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="22" height="27" rx="4" fill="#F5F0E8"/>
      <circle cx="19" cy="15" r="4" fill="#ddd"/>
      <rect x="16" y="13" width="20" height="16" rx="3" fill="#FF5C2E"/>
      <rect x="18" y="16" width="14" height="2" rx="1" fill="#fff" opacity={0.25}/>
      <rect x="18" y="20" width="10" height="2" rx="1" fill="#fff" opacity={0.25}/>
    </svg>
  ),
  "compress-pdf": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M27 28v5M24.5 31l2.5 2.5 2.5-2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "merge-pdf": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="5" y="8" width="18" height="23" rx="4" fill="#F5F0E8" opacity={0.6}/>
      <rect x="12" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M17 13h10M17 17h10M17 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="20" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M24 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "split-pdf": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <path d="M14 13h10M14 17h10M14 21h6" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="29" y2="18" stroke="#FF5C2E" strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l5-4M22 30l5 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "image-to-pdf": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="7" y="6" width="20" height="22" rx="4" fill="#F5F0E8"/>
      <rect x="8" y="8" width="16" height="11" rx="2" fill="#ccc" opacity={0.5}/>
      <path d="M11 22l3 3 3-3" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "resize-signature": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M26 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "clean-signature": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="26" height="18" rx="4" fill="#F5F0E8"/>
      <path d="M10 21c2-4 3.5-6 6-6s2.5 4 5 4 3.5-3 6-3" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M26 30l2 2 2-2M26 34l2-2 2 2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity={0.9}/>
    </svg>
  ),
  "passport": (
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="5" width="20" height="26" rx="4" fill="#F5F0E8"/>
      <circle cx="19" cy="15" r="5" fill="#ddd"/>
      <path d="M12 27c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <rect x="18" y="22" width="18" height="16" rx="4" fill="#FF5C2E"/>
      <path d="M22 30l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ─── Tool registry ───────────────────────────────────────────────────────── */
type Tool = {
  key: string;
  label: string;
  href: string;
  desc: string;
  tag?: string; // shown as a badge e.g. "Next step", "Popular"
};

const TOOL_REGISTRY: Record<string, Tool> = {
  "compress-image": { key: "compress-image", label: "Compress Image",     href: "/tools/image/compress",   desc: "Shrink file size, keep quality" },
  "resize-image":   { key: "resize-image",   label: "Resize Image",       href: "/tools/image/resize",     desc: "Exact pixels, %, or preset" },
  "convert-image":  { key: "convert-image",  label: "Convert PNG / JPG",  href: "/tools/image/convert",    desc: "Switch between formats instantly" },
  "crop":           { key: "crop",           label: "Crop Image",          href: "/tools/image/crop",       desc: "Trim to a perfect frame" },
  "rotate":         { key: "rotate",         label: "Rotate Image",        href: "/tools/image/rotate",     desc: "Rotate & flip in one click" },
  "upscale":        { key: "upscale",        label: "Upscale Image",       href: "/tools/image/upscale",    desc: "Enlarge up to 4× with clarity" },
  "remove-bg":      { key: "remove-bg",      label: "Remove Background",   href: "/tools/image/remove-bg",  desc: "Erase background — fully local" },
  "watermark":      { key: "watermark",      label: "Watermark Image",     href: "/tools/image/watermark",  desc: "Add custom text watermark" },
  "blur-face":      { key: "blur-face",      label: "Blur & Censor",       href: "/tools/image/blur-face",  desc: "Pixelate sensitive areas" },
  "compress-pdf":   { key: "compress-pdf",   label: "Compress PDF",        href: "/tools/pdf/compress",     desc: "Reduce PDF file size" },
  "merge-pdf":      { key: "merge-pdf",      label: "Merge PDF",           href: "/tools/pdf/merge",        desc: "Combine multiple PDFs into one" },
  "split-pdf":      { key: "split-pdf",      label: "Split PDF",           href: "/tools/pdf/split",        desc: "Extract pages into separate files" },
  "image-to-pdf":   { key: "image-to-pdf",   label: "Image to PDF",        href: "/tools/pdf/image-to-pdf", desc: "Convert images to PDF" },
  "resize-signature": { key: "resize-signature", label: "Resize Signature", href: "/tools/signature/resize", desc: "Fit any upload specification" },
  "clean-signature":  { key: "clean-signature",  label: "BG Cleaner",       href: "/tools/signature/clean",  desc: "Remove background noise" },
  "passport":       { key: "passport",       label: "Passport Photo",      href: "/passport-photo",         desc: "ID-ready photo in one click" },
};

/* ─── Recommendation map — what to suggest after using each tool ────────── */
export const TOOL_RECOMMENDATIONS: Record<string, Array<{ key: string; tag: string }>> = {
  /* After merging PDF → very likely need to compress it */
  "merge-pdf": [
    { key: "compress-pdf",   tag: "Next step" },
    { key: "split-pdf",      tag: "Related" },
    { key: "image-to-pdf",   tag: "Related" },
  ],
  /* After compressing PDF → might need to split or convert images */
  "compress-pdf": [
    { key: "merge-pdf",      tag: "Related" },
    { key: "split-pdf",      tag: "Related" },
    { key: "compress-image", tag: "Also try" },
  ],
  /* After splitting PDF → might compress individual parts */
  "split-pdf": [
    { key: "compress-pdf",   tag: "Next step" },
    { key: "merge-pdf",      tag: "Related" },
  ],
  /* After image to PDF → might compress the result */
  "image-to-pdf": [
    { key: "compress-pdf",   tag: "Next step" },
    { key: "compress-image", tag: "Before converting" },
    { key: "resize-image",   tag: "Before converting" },
  ],
  /* After resizing image → might compress or convert */
  "resize-image": [
    { key: "compress-image", tag: "Next step" },
    { key: "convert-image",  tag: "Related" },
    { key: "watermark",      tag: "Also try" },
    { key: "image-to-pdf",   tag: "Also try" },
  ],
  /* After compressing image → might resize or convert */
  "compress-image": [
    { key: "resize-image",   tag: "Related" },
    { key: "convert-image",  tag: "Related" },
    { key: "image-to-pdf",   tag: "Also try" },
    { key: "remove-bg",      tag: "Also try" },
  ],
  /* After converting PNG/JPG */
  "convert-image": [
    { key: "compress-image", tag: "Next step" },
    { key: "resize-image",   tag: "Related" },
    { key: "watermark",      tag: "Also try" },
  ],
  /* After removing background → watermark or convert to PDF */
  "remove-bg": [
    { key: "watermark",      tag: "Next step" },
    { key: "compress-image", tag: "Next step" },
    { key: "image-to-pdf",   tag: "Also try" },
    { key: "resize-signature", tag: "Also try" },
  ],
  /* After cropping */
  "crop": [
    { key: "compress-image", tag: "Next step" },
    { key: "resize-image",   tag: "Related" },
    { key: "watermark",      tag: "Also try" },
  ],
  /* After rotating */
  "rotate": [
    { key: "crop",           tag: "Next step" },
    { key: "compress-image", tag: "Next step" },
    { key: "image-to-pdf",   tag: "Also try" },
  ],
  /* After upscaling */
  "upscale": [
    { key: "watermark",      tag: "Next step" },
    { key: "compress-image", tag: "Reduce size after" },
    { key: "convert-image",  tag: "Related" },
  ],
  /* After watermarking */
  "watermark": [
    { key: "compress-image", tag: "Next step" },
    { key: "image-to-pdf",   tag: "Also try" },
    { key: "blur-face",      tag: "Privacy" },
  ],
  /* After blur/censor */
  "blur-face": [
    { key: "watermark",      tag: "Related" },
    { key: "compress-image", tag: "Next step" },
    { key: "image-to-pdf",   tag: "Also try" },
  ],
  /* After resizing signature → clean it or compress image */
  "resize-signature": [
    { key: "clean-signature", tag: "Next step" },
    { key: "compress-image",  tag: "Also try" },
    { key: "passport",        tag: "Related" },
  ],
  /* After cleaning signature */
  "clean-signature": [
    { key: "resize-signature", tag: "Next step" },
    { key: "passport",         tag: "Related" },
    { key: "compress-image",   tag: "Also try" },
  ],
  /* After passport photo */
  "passport": [
    { key: "compress-image",   tag: "Next step" },
    { key: "resize-signature", tag: "Related" },
    { key: "image-to-pdf",     tag: "Also try" },
  ],
};

/* ─── Tag color helper ──────────────────────────────────────────────────── */
function tagStyle(tag: string): { bg: string; text: string } {
  if (tag === "Next step")          return { bg: "#FFF0EB", text: "#FF5C2E" };
  if (tag === "Before converting")  return { bg: "#EFF6FF", text: "#3B82F6" };
  if (tag === "Reduce size after")  return { bg: "#FEF3C7", text: "#D97706" };
  if (tag === "Privacy")            return { bg: "#F5F3FF", text: "#8B5CF6" };
  if (tag === "Related")            return { bg: "#F0FDF4", text: "#16A34A" };
  return                                   { bg: "#F4F4F5", text: "#71717A" }; // Also try / fallback
}

/* ─── Component props ────────────────────────────────────────────────────── */
interface RelatedToolsProps {
  currentTool: string; // key from TOOL_REGISTRY, e.g. "merge-pdf"
  title?: string;       // override section heading
  max?: number;         // max tools to show (default 3)
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function RelatedTools({
  currentTool,
  title,
  max = 3,
}: RelatedToolsProps) {
  const recommendations = (TOOL_RECOMMENDATIONS[currentTool] ?? []).slice(0, max);
  if (recommendations.length === 0) return null;

  const tools = recommendations
    .map(({ key, tag }) => {
      const t = TOOL_REGISTRY[key];
      return t ? { ...t, tag } : null;
    })
    .filter(Boolean) as (Tool & { tag: string })[];

  if (tools.length === 0) return null;

  const heading = title ?? "You might also need";

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-[#f0f0f0]" />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#bbb] whitespace-nowrap">
          {heading}
        </p>
        <div className="flex-1 h-px bg-[#f0f0f0]" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tools.map((t) => {
          const { bg, text } = tagStyle(t.tag);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group flex items-start gap-3 p-4 rounded-2xl border border-[#0F0F0F] hover:border-[#0F0F0F] shadow-brutal shadow-brutal-hover bg-white"
            >
              {/* Icon */}
              <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border border-[#eee] bg-[#fafafa] group-hover:border-[#FF5C2E]/20 transition-colors overflow-hidden">
                {TOOL_ICONS[t.key]}
              </span>
              {/* Text */}
              <span className="flex-1 min-w-0">
                {/* Tag badge */}
                <span
                  className="inline-block text-[9.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1"
                  style={{ background: bg, color: text }}
                >
                  {t.tag}
                </span>
                <span className="block text-[13px] font-semibold text-[#1a1a1a] group-hover:text-[#FF5C2E] leading-tight transition-colors">
                  {t.label}
                </span>
                <span className="block text-[11px] text-[#999] mt-0.5 leading-tight">
                  {t.desc}
                </span>
              </span>
              {/* Arrow */}
              <svg
                className="shrink-0 w-4 h-4 mt-0.5 text-[#ddd] group-hover:text-[#FF5C2E] transition-colors"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
