"use client";

import Dropzone from "@/components/dropzone";
import AdsPlaceholder from "@/components/ads-placeholder";
import { compressImageToKb, CompressionResult } from "@/lib/image-engine";
import { useState } from "react";
import { ImageIcon, Settings2, Download, RefreshCw, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ImageWorkspaceProps {
  defaultMode?: "resize" | "compress" | "convert";
  defaultFormat?: "image/jpeg" | "image/png";
  defaultTargetKb?: number;
}

const BTN_PRIMARY = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";
const BTN_SUCCESS = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";
const INPUT_BASE = "w-full px-3 py-2 rounded-xl text-sm text-[#0F0F0F] focus:outline-none transition-all";

export default function ImageWorkspace({
  defaultMode = "compress",
  defaultFormat = "image/jpeg",
  defaultTargetKb = 50,
}: ImageWorkspaceProps) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const [targetKb, setTargetKb] = useState<number>(defaultTargetKb);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("free");
  const [format, setFormat] = useState<"image/jpeg" | "image/png">(defaultFormat);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSourceFile(file);
      const url = URL.createObjectURL(file);
      setSourcePreview(url);
      setResult(null);
      if (resultUrl) { URL.revokeObjectURL(resultUrl); setResultUrl(null); }
      const img = new Image();
      img.onload = () => { setWidth(img.naturalWidth.toString()); setHeight(img.naturalHeight.toString()); };
      img.src = url;
    } else {
      setSourceFile(null); setSourcePreview(null);
    }
  };

  const handleProcess = async () => {
    if (!sourceFile) return;
    setProcessing(true); setResult(null);
    try {
      const compResult = await compressImageToKb(sourceFile, {
        maxSizeKb: targetKb,
        targetWidth: width ? parseInt(width, 10) : undefined,
        targetHeight: height ? parseInt(height, 10) : undefined,
        aspectRatio: aspectRatio !== "free" ? parseFloat(aspectRatio) : undefined,
        format,
      });
      setResult(compResult);
      const url = URL.createObjectURL(compResult.blob);
      setResultUrl(url);
      const a = document.createElement("a");
      a.href = url; a.download = `filefit-${Date.now()}.${format === "image/png" ? "png" : "jpg"}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) {
      console.error(err); alert("Error processing image. Try another file.");
    } finally { setProcessing(false); }
  };

  const handleReset = () => {
    setSourceFile(null); setSourcePreview(null); setResult(null);
    if (resultUrl) { URL.revokeObjectURL(resultUrl); setResultUrl(null); }
    setWidth(""); setHeight(""); setAspectRatio("free");
  };

  const fmt = (bytes: number) => bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

  const modeTitle = defaultMode === "resize" ? "Image Resizer" : defaultMode === "convert" ? "Image Converter" : "Image Compressor";
  const modeDesc = defaultMode === "resize" ? "Adjust width & height dimensions locally in your browser."
    : defaultMode === "convert" ? `Convert images to ${defaultFormat === "image/png" ? "PNG" : "JPEG"} format.`
      : "Compress photo file size to target KB limits without losing quality.";

  const ASPECT_OPTIONS = [{ name: "Free", value: "free" }, { name: "1:1", value: "1.0" }, { name: "3:4", value: "0.75" }];
  const FORMAT_OPTIONS = [{ name: "JPEG", value: "image/jpeg" }, { name: "PNG", value: "image/png" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 group transition-colors" style={{ color: "#888" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#FF5C2E")}
        onMouseLeave={e => (e.currentTarget.style.color = "#888")}
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Tools
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl" style={{ background: "#fff4f0", color: "#FF5C2E" }}>
          <ImageIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]" style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}>{modeTitle}</h1>
          <p className="text-[#888] text-xs mt-0.5">{modeDesc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace */}
        <div className="lg:col-span-2 space-y-5">
          {!sourceFile ? (
            <div className="panel p-6"><Dropzone onFilesSelected={handleFilesSelected} allowedTypes={["image/jpeg", "image/png", "image/webp"]} maxSizeKb={targetKb} /></div>
          ) : (
            <div className="panel p-6 space-y-5">
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Preview</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Original */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium mb-2" style={{ color: "#888" }}>Original</span>
                  <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-2" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
                    {sourcePreview && <img src={sourcePreview} alt="Original" className="max-w-full max-h-full object-contain rounded-lg" />}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[#0F0F0F] text-xs font-medium truncate max-w-[180px]">{sourceFile.name}</p>
                    <p className="text-[#888] text-[10px] mt-0.5">{fmt(sourceFile.size)}</p>
                  </div>
                </div>

                {/* Output */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium mb-2" style={{ color: "#888" }}>Output</span>
                  <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-2" style={{ border: "2px dashed #C8C2B8", background: "#faf8f5" }}>
                    {processing ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "3px solid #e8e2d8", borderTopColor: "#FF5C2E" }} />
                        <span className="text-xs" style={{ color: "#888" }}>Processing…</span>
                      </div>
                    ) : resultUrl ? (
                      <img src={resultUrl} alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
                    ) : (
                      <p className="text-xs text-center px-4" style={{ color: "#aaa" }}>Click "Process" to generate output</p>
                    )}
                  </div>
                  {result && (
                    <div className="mt-2 text-center">
                      <p className="text-xs font-semibold flex items-center justify-center gap-1" style={{ color: "#10b981" }}>
                        <CheckCircle2 className="h-3.5 w-3.5" />{fmt(result.sizeBytes)}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#888" }}>{result.width} × {result.height}px · Q{Math.round(result.quality * 100)}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                {result && resultUrl && (
                  <a href={resultUrl} download={`filefit-${Date.now()}.${format === "image/png" ? "png" : "jpg"}`}
                    className={BTN_SUCCESS} style={{ background: "#10b981" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#059669")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#10b981")}
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                )}
                <button type="button" onClick={handleProcess} disabled={processing}
                  className={BTN_PRIMARY}
                  style={{ background: processing ? "#e8e2d8" : "#FF5C2E", color: processing ? "#888" : "#fff", cursor: processing ? "not-allowed" : "pointer" }}
                  onMouseEnter={e => { if (!processing) e.currentTarget.style.background = "#E04820"; }}
                  onMouseLeave={e => { if (!processing) e.currentTarget.style.background = "#FF5C2E"; }}
                >
                  {processing ? <><RefreshCw className="h-4 w-4 animate-spin" /> Processing…</> : <>Process <ArrowRight className="h-4 w-4" /></>}
                </button>
              </div>
            </div>
          )}
          <AdsPlaceholder format="horizontal" slot="image-tool-bottom" />
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="panel p-5 space-y-5">
            <div className="flex items-center gap-2 pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              <Settings2 className="h-4 w-4" style={{ color: "#888" }} />
              <h2 className="text-[#0F0F0F] font-semibold text-sm">Options</h2>
            </div>

            {/* Target KB */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Target Size</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{targetKb} KB</span>
              </div>
              <input type="range" min={5} max={500} step={5} value={targetKb}
                onChange={(e) => setTargetKb(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
              />
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Dimensions (px)</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: "Width", value: width, setter: setWidth }, { label: "Height", value: height, setter: setHeight }].map(({ label, value, setter }) => (
                  <div key={label} className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase" style={{ color: "#aaa" }}>{label}</span>
                    <input type="number" value={value} onChange={(e) => setter(e.target.value)} placeholder="Auto"
                      className={INPUT_BASE} style={{ border: "1px solid #e8e2d8" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,92,46,0.1)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Aspect lock */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Aspect Lock</label>
              <div className="grid grid-cols-3 gap-2">
                {ASPECT_OPTIONS.map((item) => (
                  <button key={item.value} type="button" onClick={() => setAspectRatio(item.value)}
                    className="py-2 px-1 rounded-xl text-[10px] font-semibold uppercase tracking-wider text-center transition-all"
                    style={{
                      border: aspectRatio === item.value ? "1px solid #FF5C2E" : "1px solid #e8e2d8",
                      background: aspectRatio === item.value ? "#fff4f0" : "#ffffff",
                      color: aspectRatio === item.value ? "#FF5C2E" : "#888",
                    }}
                  >{item.name}</button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Format</label>
              <div className="flex gap-4">
                {FORMAT_OPTIONS.map((item) => (
                  <label key={item.value} className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#555" }}>
                    <input type="radio" name="imageFormat" checked={format === item.value}
                      onChange={() => setFormat(item.value as "image/jpeg" | "image/png")}
                      style={{ accentColor: "#FF5C2E" }}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <AdsPlaceholder format="rectangle" slot="image-tool-side" />
        </div>
      </div>
    </div>
  );
}
