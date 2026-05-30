"use client";

import Dropzone from "@/components/dropzone";
import AdsPlaceholder from "@/components/ads-placeholder";
import { cleanSignatureBackground, getSignatureBoundingBox, compressImageToKb, CompressionResult } from "@/lib/image-engine";
import { useState, useRef } from "react";
import { Signature as SigIcon, Settings2, Download, RefreshCw, Crop, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SignatureWorkspaceProps {
  defaultMode?: "resize" | "crop" | "compress";
  defaultTargetKb?: number;
}

const BTN_PRIMARY = "px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";

export default function SignatureWorkspace({ defaultMode = "compress", defaultTargetKb = 10 }: SignatureWorkspaceProps) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const [threshold, setThreshold] = useState<number>(200);
  const [makeTransparent, setMakeTransparent] = useState<boolean>(false);
  const [autoCrop, setAutoCrop] = useState<boolean>(defaultMode === "crop" || defaultMode === "compress");
  const [targetKb, setTargetKb] = useState<number>(defaultTargetKb);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSourceFile(files[0]); setResult(null);
      if (resultUrl) { URL.revokeObjectURL(resultUrl); setResultUrl(null); }
    } else { setSourceFile(null); }
  };

  const handleProcess = async () => {
    if (!sourceFile || !canvasRef.current || !imageRef.current) return;
    setProcessing(true); setResult(null);
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;
      if (!ctx) return;

      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      cleanSignatureBackground(canvas, threshold, makeTransparent, 1.2);

      const cropBox = autoCrop ? getSignatureBoundingBox(canvas, makeTransparent ? 255 : threshold) : null;
      const finalCanvas = document.createElement("canvas");
      const finalCtx = finalCanvas.getContext("2d");
      if (!finalCtx) return;

      if (cropBox) {
        finalCanvas.width = cropBox.width; finalCanvas.height = cropBox.height;
        finalCtx.drawImage(canvas, cropBox.x, cropBox.y, cropBox.width, cropBox.height, 0, 0, cropBox.width, cropBox.height);
      } else {
        finalCanvas.width = canvas.width; finalCanvas.height = canvas.height;
        finalCtx.drawImage(canvas, 0, 0);
      }

      const fmt = makeTransparent ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob | null>((resolve) => finalCanvas.toBlob((b) => resolve(b), fmt, 0.9));
      if (!blob) throw new Error("Failed to export signature");

      const compResult = await compressImageToKb(blob, { maxSizeKb: targetKb, format: fmt as "image/jpeg" | "image/png" });
      setResult(compResult);
      const url = URL.createObjectURL(compResult.blob);
      setResultUrl(url);
      const a = document.createElement("a");
      a.href = url; a.download = `signature-fit-${Date.now()}.${makeTransparent ? "png" : "jpg"}`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) {
      console.error(err); alert("Failed to process signature.");
    } finally { setProcessing(false); }
  };

  const handleReset = () => {
    setSourceFile(null); setResult(null);
    if (resultUrl) { URL.revokeObjectURL(resultUrl); setResultUrl(null); }
  };

  const fmtSize = (bytes: number) => bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

  const modeTitle = defaultMode === "crop" ? "Signature Cropper" : defaultMode === "resize" ? "Signature Resizer" : "Signature Optimizer";
  const modeDesc = defaultMode === "crop" ? "Crop margins and isolate your signature with local boundaries."
    : defaultMode === "resize" ? "Scale signature width & height to exact form specifications."
      : "Remove shadows and compress signature file size under KB limits.";

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
        <div className="p-2.5 rounded-xl" style={{ background: "#f5f3ff", color: "#8b5cf6" }}>
          <SigIcon className="h-6 w-6" />
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
            <div className="panel p-6"><Dropzone onFilesSelected={handleFilesSelected} allowedTypes={["image/jpeg", "image/png"]} maxSizeKb={targetKb} /></div>
          ) : (
            <div className="panel p-6 space-y-5">
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Canvas</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Source */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium mb-2" style={{ color: "#888" }}>Scanned Input</span>
                  <div className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center p-2" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
                    <img ref={imageRef} src={URL.createObjectURL(sourceFile)} alt="Signature source"
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onLoad={() => {
                        if (canvasRef.current && imageRef.current) {
                          const c = canvasRef.current; const ctx = c.getContext("2d"); const img = imageRef.current;
                          if (ctx) { c.width = img.naturalWidth; c.height = img.naturalHeight; ctx.drawImage(img, 0, 0); }
                        }
                      }}
                    />
                  </div>
                  <p className="text-[10px] mt-2" style={{ color: "#888" }}>Original: {fmtSize(sourceFile.size)}</p>
                </div>

                {/* Output */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium mb-2" style={{ color: "#888" }}>Processed Output</span>
                  <div className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center p-2" style={{ border: "2px dashed #C8C2B8", background: "#faf8f5" }}>
                    {processing ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "3px solid #e8e2d8", borderTopColor: "#FF5C2E" }} />
                        <span className="text-xs" style={{ color: "#888" }}>Processing…</span>
                      </div>
                    ) : resultUrl ? (
                      <img src={resultUrl} alt="Processed" className="max-w-full max-h-full object-contain rounded-lg p-2" />
                    ) : (
                      <p className="text-xs text-center px-4" style={{ color: "#aaa" }}>Configure options and click Process</p>
                    )}
                  </div>
                  {result && (
                    <div className="mt-2 text-center">
                      <p className="text-xs font-semibold flex items-center justify-center gap-1" style={{ color: "#10b981" }}>
                        <CheckCircle2 className="h-3.5 w-3.5" />{fmtSize(result.sizeBytes)}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#888" }}>{result.width} × {result.height}px</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                {result && resultUrl && (
                  <a href={resultUrl} download={`signature-fit-${Date.now()}.${makeTransparent ? "png" : "jpg"}`}
                    className={BTN_PRIMARY} style={{ background: "#10b981" }}
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
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
          <AdsPlaceholder format="horizontal" slot="sig-tool-bottom" />
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="panel p-5 space-y-5">
            <div className="flex items-center gap-2 pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              <Settings2 className="h-4 w-4" style={{ color: "#888" }} />
              <h2 className="text-[#0F0F0F] font-semibold text-sm">Cleaner Options</h2>
            </div>

            {/* Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Background Threshold</label>
                <span className="text-xs font-bold" style={{ color: "#FF5C2E" }}>{threshold}</span>
              </div>
              <input type="range" min={100} max={250} value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
              />
              <p className="text-[10px]" style={{ color: "#aaa" }}>Higher = more background removed</p>
            </div>

            {/* Output background */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Output Background</label>
              <div className="flex gap-4">
                {[{ label: "White", value: false }, { label: "Transparent (PNG)", value: true }].map((item) => (
                  <label key={String(item.value)} className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#555" }}>
                    <input type="radio" name="bgType" checked={makeTransparent === item.value}
                      onChange={() => setMakeTransparent(item.value)}
                      style={{ accentColor: "#FF5C2E" }}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Auto-crop toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#555" }}>
                <Crop className="h-4 w-4" style={{ color: "#8b5cf6" }} />
                Auto-Crop Borders
              </div>
              <button type="button" onClick={() => setAutoCrop(!autoCrop)}
                className="w-10 h-6 rounded-full p-1 transition-all flex items-center"
                style={{ background: autoCrop ? "#FF5C2E" : "#e8e2d8", justifyContent: autoCrop ? "flex-end" : "flex-start" }}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            {/* Target size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Target Size</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{targetKb} KB</span>
              </div>
              <input type="range" min={5} max={50} step={5} value={targetKb}
                onChange={(e) => setTargetKb(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
              />
            </div>
          </div>
          <AdsPlaceholder format="rectangle" slot="sig-tool-side" />
        </div>
      </div>
    </div>
  );
}
