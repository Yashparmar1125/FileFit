"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Download, FlipHorizontal, FlipVertical, RotateCcw, RotateCw } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY =
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";

export default function RotateWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [imgNatW, setImgNatW] = useState(0);
  const [imgNatH, setImgNatH] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderCanvas = useCallback(() => {
    if (!imgSrc || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const rad = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = Math.round(w * cos + h * sin);
      canvas.height = Math.round(w * sin + h * cos);
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    img.src = imgSrc;
  }, [imgSrc, angle, flipH, flipV]);

  useEffect(() => { renderCanvas(); }, [renderCanvas]);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setAngle(0);
    setFlipH(false);
    setFlipV(false);
    const img = new Image();
    img.onload = () => { setImgNatW(img.naturalWidth); setImgNatH(img.naturalHeight); };
    img.src = url;
  };

  const rotate = (deg: number) => setAngle((a) => (a + deg + 360) % 360);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `filefit-rotate-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, "image/png");
  };

  const handleReset = () => {
    setFile(null);
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    setImgSrc(null);
    setAngle(0);
    setFlipH(false);
    setFlipV(false);
  };

  const isPortrait = angle === 90 || angle === 270;
  const outW = isPortrait ? imgNatH : imgNatW;
  const outH = isPortrait ? imgNatW : imgNatH;

  const CTRL_BTN =
    "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all";

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
          <RotateCw className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Rotate Image
          </h1>
          <p className="text-[#888] text-xs mt-0.5">Rotate & flip images instantly — no upload needed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {!file ? (
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <Dropzone
                onFilesSelected={handleFile}
                allowedTypes={["image/jpeg", "image/png", "image/webp"]}
              />
            </div>
          ) : (
            <div
              className="rounded-2xl border p-6 space-y-5"
              style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Preview</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              {/* Canvas preview */}
              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "#F5F0E8", minHeight: 200, padding: 16 }}>
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[420px] object-contain rounded-xl shadow-sm"
                  style={{ transition: "all 0.2s ease" }}
                />
              </div>

              {/* Dimensions */}
              <div className="flex items-center gap-4 text-xs" style={{ color: "#888" }}>
                <span>Original: <b className="text-[#0F0F0F]">{imgNatW} × {imgNatH}px</b></span>
                <span>→</span>
                <span>Output: <b style={{ color: "#FF5C2E" }}>{outW} × {outH}px</b></span>
                <span className="ml-auto font-semibold" style={{ color: "#FF5C2E" }}>
                  {angle}° {flipH ? "↔" : ""} {flipV ? "↕" : ""}
                </span>
              </div>

              <div className="flex justify-end pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                <button
                  type="button"
                  onClick={handleSave}
                  className={BTN_PRIMARY}
                  style={{ background: "#FF5C2E" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#E04820")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5C2E")}
                >
                  <Download className="h-4 w-4" /> Save Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div
            className="rounded-2xl border p-5 space-y-5"
            style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              Rotation
            </h2>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <RotateCcw className="h-5 w-5" />, label: "-90°", action: () => rotate(-90) },
                { icon: <RotateCw className="h-5 w-5" />, label: "+90°", action: () => rotate(90) },
                { icon: <RotateCw className="h-5 w-5" style={{ transform: "rotate(90deg)" }} />, label: "180°", action: () => rotate(180) },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={btn.action}
                  disabled={!file}
                  className={CTRL_BTN}
                  style={{
                    border: "1px solid #e8e2d8",
                    color: file ? "#FF5C2E" : "#ccc",
                    background: file ? "#fff4f0" : "#fafafa",
                    cursor: file ? "pointer" : "not-allowed",
                  }}
                  onMouseEnter={(e) => { if (file) e.currentTarget.style.borderColor = "#FF5C2E"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; }}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>

            <h2 className="text-[#0F0F0F] font-semibold text-sm pt-2 pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              Flip
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <FlipHorizontal className="h-5 w-5" />, label: "Flip H", active: flipH, action: () => setFlipH((v) => !v) },
                { icon: <FlipVertical className="h-5 w-5" />, label: "Flip V", active: flipV, action: () => setFlipV((v) => !v) },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={btn.action}
                  disabled={!file}
                  className={CTRL_BTN}
                  style={{
                    border: btn.active ? "1px solid #FF5C2E" : "1px solid #e8e2d8",
                    color: btn.active ? "#fff" : file ? "#888" : "#ccc",
                    background: btn.active ? "#FF5C2E" : file ? "#ffffff" : "#fafafa",
                    cursor: file ? "pointer" : "not-allowed",
                  }}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>

            {file && (
              <button
                type="button"
                onClick={() => { setAngle(0); setFlipH(false); setFlipV(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ border: "1px solid #e8e2d8", color: "#888" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.color = "#FF5C2E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.color = "#888"; }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
