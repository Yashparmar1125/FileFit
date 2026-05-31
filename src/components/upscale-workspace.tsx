"use client";

import { useState } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Download, ZoomIn } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY =
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";

const SCALES = [
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2 },
  { label: "3×", value: 3 },
  { label: "4×", value: 4 },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

export default function UpscaleWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgNatW, setImgNatW] = useState(0);
  const [imgNatH, setImgNatH] = useState(0);
  const [scale, setScale] = useState(2);
  const [processing, setProcessing] = useState(false);
  const [outputInfo, setOutputInfo] = useState<{ w: number; h: number; size: string } | null>(null);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setOutputInfo(null);
    const img = new Image();
    img.onload = () => { setImgNatW(img.naturalWidth); setImgNatH(img.naturalHeight); };
    img.src = url;
  };

  const handleUpscale = () => {
    if (!imgSrc || !file) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const newW = Math.round(img.naturalWidth * scale);
      const newH = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, newW, newH);
      canvas.toBlob((blob) => {
        if (!blob) { setProcessing(false); return; }
        const outSize = formatBytes(blob.size);
        setOutputInfo({ w: newW, h: newH, size: outSize });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `filefit-upscale-${scale}x-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        setProcessing(false);
      }, "image/png");
    };
    img.src = imgSrc;
  };

  const handleReset = () => {
    setFile(null);
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    setImgSrc(null);
    setImgNatW(0);
    setImgNatH(0);
    setOutputInfo(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 group transition-colors"
        style={{ color: "#888" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5C2E")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Tools
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl" style={{ background: "#fff4f0", color: "#FF5C2E" }}>
          <ZoomIn className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Upscale Image
          </h1>
          <p className="text-[#888] text-xs mt-0.5">Enlarge images up to 4× without losing clarity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {!file ? (
            <div className="rounded-2xl border p-6" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <Dropzone onFilesSelected={handleFile} allowedTypes={["image/jpeg", "image/png", "image/webp"]} />
            </div>
          ) : (
            <div className="rounded-2xl border p-6 space-y-5" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Preview</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              {/* Image preview */}
              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "#F5F0E8", minHeight: 200, padding: 16 }}>
                {imgSrc && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgSrc} alt="Source" className="max-w-full max-h-[360px] object-contain rounded-xl" />
                )}
              </div>

              {/* Comparison cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4 text-center" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#888" }}>Original</p>
                  <p className="text-lg font-bold text-[#0F0F0F]">{imgNatW} × {imgNatH}</p>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>{formatBytes(file.size)}</p>
                </div>
                <div className="rounded-xl p-4 text-center" style={{ background: "#fff4f0", border: "1px solid #ffe0d6" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF5C2E" }}>Upscaled ({scale}×)</p>
                  <p className="text-lg font-bold" style={{ color: "#FF5C2E" }}>
                    {Math.round(imgNatW * scale)} × {Math.round(imgNatH * scale)}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>
                    {outputInfo ? outputInfo.size : "~estimate varies"}
                  </p>
                </div>
              </div>

              {outputInfo && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-xs" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                  <span>✓</span>
                  <span>Upscaled to {outputInfo.w} × {outputInfo.h}px · {outputInfo.size} — file downloaded!</span>
                </div>
              )}

              <div className="flex justify-end pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                <button
                  type="button"
                  onClick={handleUpscale}
                  disabled={processing}
                  className={BTN_PRIMARY}
                  style={{ background: processing ? "#e8e2d8" : "#FF5C2E", color: processing ? "#888" : "#fff", cursor: processing ? "not-allowed" : "pointer" }}
                  onMouseEnter={(e) => { if (!processing) e.currentTarget.style.background = "#E04820"; }}
                  onMouseLeave={(e) => { if (!processing) e.currentTarget.style.background = "#FF5C2E"; }}
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 rounded-full animate-spin" style={{ border: "2px solid #ccc", borderTopColor: "#888" }} />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" /> Upscale & Download
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5 space-y-5" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              Scale Factor
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {SCALES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setScale(s.value)}
                  className="py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    border: scale === s.value ? "2px solid #FF5C2E" : "1px solid #e8e2d8",
                    background: scale === s.value ? "#fff4f0" : "#ffffff",
                    color: scale === s.value ? "#FF5C2E" : "#888",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 text-xs space-y-2" style={{ background: "#fff4f0", border: "1px solid #ffe0d6" }}>
            <p className="font-semibold" style={{ color: "#FF5C2E" }}>💡 About upscaling</p>
            <p style={{ color: "#888" }}>Uses browser canvas with high-quality smoothing. Best results with clean, non-noisy source images. Output is always PNG to preserve quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
