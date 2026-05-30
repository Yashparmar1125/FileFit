"use client";

import Dropzone from "@/components/dropzone";
import { compressImageToKb, cleanSignatureBackground, getSignatureBoundingBox, CompressionResult } from "@/lib/image-engine";
import { useState, useRef } from "react";
import { Download, RefreshCw, CheckCircle2, User, Signature, ArrowRight } from "lucide-react";

interface ExamSpec {
  slug: string; name: string;
  photoWidth: number; photoHeight: number; photoMinKb: number; photoMaxKb: number;
  sigWidth: number; sigHeight: number; sigMinKb: number; sigMaxKb: number;
  instructions: string[];
}

const BTN = "px-4 py-2 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors";

export default function ExamToolWidget({ exam }: { exam: ExamSpec }) {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [sigFile, setSigFile] = useState<File | null>(null);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [sigProcessing, setSigProcessing] = useState(false);
  const [photoResult, setPhotoResult] = useState<CompressionResult | null>(null);
  const [sigResult, setSigResult] = useState<CompressionResult | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [sigUrl, setSigUrl] = useState<string | null>(null);
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sigImgRef = useRef<HTMLImageElement | null>(null);
  const [sigThreshold, setSigThreshold] = useState<number>(200);

  const handlePhotoProcess = async () => {
    if (!photoFile) return;
    setPhotoProcessing(true); setPhotoResult(null);
    try {
      const result = await compressImageToKb(photoFile, {
        maxSizeKb: exam.photoMaxKb, targetWidth: exam.photoWidth, targetHeight: exam.photoHeight,
        aspectRatio: exam.photoWidth / exam.photoHeight, format: "image/jpeg",
      });
      setPhotoResult(result);
      const url = URL.createObjectURL(result.blob); setPhotoUrl(url);
      const a = document.createElement("a"); a.href = url; a.download = `${exam.slug}-photo-${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) { console.error(err); alert("Failed to process photo."); }
    finally { setPhotoProcessing(false); }
  };

  const handleSigProcess = async () => {
    if (!sigFile || !sigCanvasRef.current || !sigImgRef.current) return;
    setSigProcessing(true); setSigResult(null);
    try {
      const canvas = sigCanvasRef.current; const ctx = canvas.getContext("2d"); const img = sigImgRef.current;
      if (!ctx) return;
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight; ctx.drawImage(img, 0, 0);
      cleanSignatureBackground(canvas, sigThreshold, false, 1.2);
      const cropBox = getSignatureBoundingBox(canvas, sigThreshold);
      const fc = document.createElement("canvas"); const fctx = fc.getContext("2d"); if (!fctx) return;
      if (cropBox) {
        fc.width = cropBox.width; fc.height = cropBox.height;
        fctx.drawImage(canvas, cropBox.x, cropBox.y, cropBox.width, cropBox.height, 0, 0, cropBox.width, cropBox.height);
      } else { fc.width = canvas.width; fc.height = canvas.height; fctx.drawImage(canvas, 0, 0); }
      const tempBlob = await new Promise<Blob | null>((resolve) => fc.toBlob((b) => resolve(b), "image/jpeg", 0.9));
      if (!tempBlob) throw new Error("Signature clean failed");
      const result = await compressImageToKb(tempBlob, {
        maxSizeKb: exam.sigMaxKb, targetWidth: exam.sigWidth, targetHeight: exam.sigHeight,
        aspectRatio: exam.sigWidth / exam.sigHeight, format: "image/jpeg",
      });
      setSigResult(result);
      const url = URL.createObjectURL(result.blob); setSigUrl(url);
      const a = document.createElement("a"); a.href = url; a.download = `${exam.slug}-signature-${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) { console.error(err); alert("Failed to process signature."); }
    finally { setSigProcessing(false); }
  };

  const KBBadge = ({ min, max }: { min: number; max: number }) => (
    <span className="ml-auto text-[10px] font-bold uppercase py-0.5 px-2 rounded-lg"
      style={{ background: "#fff4f0", color: "#FF5C2E", border: "1px solid #ffd0c0" }}>
      {min}–{max} KB
    </span>
  );

  const ResultRow = ({ result, url, slug, type }: { result: CompressionResult; url: string; slug: string; type: string }) => (
    <div className="p-3 rounded-xl flex items-center justify-between text-xs" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
      <span className="font-semibold flex items-center gap-1" style={{ color: "#059669" }}>
        <CheckCircle2 className="h-4 w-4" />
        {(result.sizeBytes / 1024).toFixed(1)} KB · {result.width}×{result.height}px
      </span>
      <a href={url} download={`${slug}-${type}.jpg`} className="flex items-center gap-1 font-semibold hover:underline" style={{ color: "#FF5C2E" }}>
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Photo slot */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid #e8e2d8" }}>
          <div className="p-1.5 rounded-lg" style={{ background: "#eff6ff", color: "#3b82f6" }}><User className="h-4 w-4" /></div>
          <h3 className="text-[#0F0F0F] font-semibold text-sm">Step 1 — Candidate Photo</h3>
          <KBBadge min={exam.photoMinKb} max={exam.photoMaxKb} />
        </div>

        {!photoFile ? (
          <Dropzone onFilesSelected={(files) => { setPhotoFile(files[0]); setPhotoUrl(null); setPhotoResult(null); }}
            allowedTypes={["image/jpeg", "image/png"]} maxSizeKb={exam.photoMaxKb} />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
              <span className="text-xs text-[#0F0F0F] truncate max-w-[220px] font-medium">{photoFile.name}</span>
              <button onClick={() => { setPhotoFile(null); setPhotoUrl(null); setPhotoResult(null); }}
                className="text-xs font-semibold hover:underline ml-2" style={{ color: "#cc2200" }}>Clear</button>
            </div>
            {photoResult && photoUrl && <ResultRow result={photoResult} url={photoUrl} slug={exam.slug} type="photo" />}
            {!photoResult && !photoProcessing && (
              <div className="flex justify-end">
                <button onClick={handlePhotoProcess} type="button" className={BTN} style={{ background: "#FF5C2E" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#E04820")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#FF5C2E")}>
                  Resize Photo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {photoProcessing && (
              <div className="flex justify-center items-center gap-2 py-2 text-xs" style={{ color: "#888" }}>
                <RefreshCw className="h-4 w-4 animate-spin" /> Processing…
              </div>
            )}
          </div>
        )}
      </div>

      {/* Signature slot */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid #e8e2d8" }}>
          <div className="p-1.5 rounded-lg" style={{ background: "#f5f3ff", color: "#8b5cf6" }}><Signature className="h-4 w-4" /></div>
          <h3 className="text-[#0F0F0F] font-semibold text-sm">Step 2 — Scanned Signature</h3>
          <KBBadge min={exam.sigMinKb} max={exam.sigMaxKb} />
        </div>

        {!sigFile ? (
          <Dropzone onFilesSelected={(files) => { setSigFile(files[0]); setSigUrl(null); setSigResult(null); }}
            allowedTypes={["image/jpeg", "image/png"]} maxSizeKb={exam.sigMaxKb} />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
              <span className="text-xs text-[#0F0F0F] truncate max-w-[220px] font-medium">{sigFile.name}</span>
              <button onClick={() => { setSigFile(null); setSigUrl(null); setSigResult(null); }}
                className="text-xs font-semibold hover:underline ml-2" style={{ color: "#cc2200" }}>Clear</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center p-2" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
                <img ref={sigImgRef} src={URL.createObjectURL(sigFile)} alt="Signature"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onLoad={() => {
                    if (sigCanvasRef.current && sigImgRef.current) {
                      const c = sigCanvasRef.current; const ctx = c.getContext("2d"); const img = sigImgRef.current;
                      if (ctx) { c.width = img.naturalWidth; c.height = img.naturalHeight; ctx.drawImage(img, 0, 0); }
                    }
                  }}
                />
              </div>
              <div className="p-4 rounded-xl space-y-2" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
                <span className="text-[10px] font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Shadow Removal</span>
                <input type="range" min={120} max={240} value={sigThreshold}
                  onChange={(e) => setSigThreshold(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                  style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
                />
                <p className="text-[10px] leading-relaxed" style={{ color: "#aaa" }}>
                  Will be cleaned, cropped, and resized to {exam.sigWidth}×{exam.sigHeight}px.
                </p>
              </div>
            </div>

            {sigResult && sigUrl && <ResultRow result={sigResult} url={sigUrl} slug={exam.slug} type="signature" />}
            {!sigResult && !sigProcessing && (
              <div className="flex justify-end">
                <button onClick={handleSigProcess} type="button" className={BTN} style={{ background: "#FF5C2E" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#E04820")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#FF5C2E")}>
                  Clean & Resize <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {sigProcessing && (
              <div className="flex justify-center items-center gap-2 py-2 text-xs" style={{ color: "#888" }}>
                <RefreshCw className="h-4 w-4 animate-spin" /> Processing…
              </div>
            )}
            <canvas ref={sigCanvasRef} className="hidden" />
          </div>
        )}
      </div>
    </div>
  );
}
