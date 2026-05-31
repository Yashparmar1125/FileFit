"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Download, EyeOff, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";

interface BlurRegion {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Pixelation blur using block averaging */
function pixelateRegion(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, blockSize: number) {
  const ix = Math.max(0, Math.round(x));
  const iy = Math.max(0, Math.round(y));
  const iw = Math.round(w);
  const ih = Math.round(h);
  const bs = Math.max(2, blockSize);
  for (let bx = ix; bx < ix + iw; bx += bs) {
    for (let by = iy; by < iy + ih; by += bs) {
      const bw = Math.min(bs, ix + iw - bx);
      const bh = Math.min(bs, iy + ih - by);
      if (bw <= 0 || bh <= 0) continue;
      try {
        const data = ctx.getImageData(bx, by, bw, bh);
        let r = 0, g = 0, b = 0, count = data.data.length / 4;
        for (let i = 0; i < data.data.length; i += 4) {
          r += data.data[i]; g += data.data[i + 1]; b += data.data[i + 2];
        }
        r = r / count; g = g / count; b = b / count;
        ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        ctx.fillRect(bx, by, bw, bh);
      } catch { /* cross-origin guard */ }
    }
  }
}

export default function BlurFaceWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgNatW, setImgNatW] = useState(0);
  const [imgNatH, setImgNatH] = useState(0);
  const [regions, setRegions] = useState<BlurRegion[]>([]);
  const [blockSize, setBlockSize] = useState(12);
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [previewRegion, setPreviewRegion] = useState<BlurRegion | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawToCanvas = useCallback(
    (targetCanvas: HTMLCanvasElement, extraRegion?: BlurRegion) => {
      if (!imgSrc) return;
      const img = new Image();
      img.onload = () => {
        targetCanvas.width = img.naturalWidth;
        targetCanvas.height = img.naturalHeight;
        const ctx = targetCanvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const allRegions = extraRegion ? [...regions, extraRegion] : regions;
        for (const r of allRegions) {
          pixelateRegion(ctx, r.x, r.y, r.w, r.h, blockSize);
        }
      };
      img.src = imgSrc;
    },
    [imgSrc, regions, blockSize]
  );

  // Redraw display whenever regions/blockSize change
  useEffect(() => {
    if (displayCanvasRef.current) drawToCanvas(displayCanvasRef.current);
  }, [drawToCanvas]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = displayCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    setDrawing(true);
    setDrawStart({ x, y });
    setPreviewRegion(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const { x, y } = getCanvasCoords(e);
    const rx = Math.min(drawStart.x, x);
    const ry = Math.min(drawStart.y, y);
    const rw = Math.abs(x - drawStart.x);
    const rh = Math.abs(y - drawStart.y);
    if (rw > 4 && rh > 4) setPreviewRegion({ x: rx, y: ry, w: rw, h: rh });
    // Draw live preview
    if (displayCanvasRef.current) {
      drawToCanvas(displayCanvasRef.current, { x: rx, y: ry, w: rw, h: rh });
      // Draw selection rect
      const ctx = displayCanvasRef.current.getContext("2d")!;
      ctx.strokeStyle = "#FF5C2E";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(rx, ry, rw, rh);
      ctx.setLineDash([]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    setDrawing(false);
    const { x, y } = getCanvasCoords(e);
    const rx = Math.min(drawStart.x, x);
    const ry = Math.min(drawStart.y, y);
    const rw = Math.abs(x - drawStart.x);
    const rh = Math.abs(y - drawStart.y);
    if (rw > 8 && rh > 8) {
      setRegions((prev) => [...prev, { x: rx, y: ry, w: rw, h: rh }]);
    }
    setPreviewRegion(null);
  };

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setRegions([]);
    const img = new Image();
    img.onload = () => { setImgNatW(img.naturalWidth); setImgNatH(img.naturalHeight); };
    img.src = url;
  };

  const handleUndo = () => setRegions((prev) => prev.slice(0, -1));
  const handleClear = () => setRegions([]);

  const handleSave = () => {
    if (!displayCanvasRef.current) return;
    const output = document.createElement("canvas");
    drawToCanvas(output);
    setTimeout(() => {
      output.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `filefit-blur-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }, "image/jpeg", 0.92);
    }, 200);
  };

  const handleReset = () => {
    setFile(null);
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    setImgSrc(null);
    setRegions([]);
    setImgNatW(0);
    setImgNatH(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <canvas ref={canvasRef} className="hidden" />
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
          <EyeOff className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Blur & Censor
          </h1>
          <p className="text-[#888] text-xs mt-0.5">Blur sensitive areas manually — nothing leaves your browser</p>
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
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>
                    Draw to blur areas
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: regions.length > 0 ? "#fff4f0" : "#f0f0f0", color: regions.length > 0 ? "#FF5C2E" : "#888" }}
                  >
                    {regions.length} region{regions.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              {/* Canvas */}
              <div
                ref={containerRef}
                className="w-full rounded-xl overflow-hidden"
                style={{ border: "1px solid #e8e2d8", background: "#F5F0E8" }}
              >
                <canvas
                  ref={displayCanvasRef}
                  className="w-full h-auto block"
                  style={{
                    maxHeight: 480,
                    objectFit: "contain",
                    cursor: drawing ? "crosshair" : "crosshair",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => {
                    if (drawing) {
                      setDrawing(false);
                      setPreviewRegion(null);
                      if (displayCanvasRef.current) drawToCanvas(displayCanvasRef.current);
                    }
                  }}
                />
              </div>

              <p className="text-xs text-center" style={{ color: "#aaa" }}>
                Click and drag on the image to draw blur rectangles
              </p>

              <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={regions.length === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      border: "1px solid #e8e2d8",
                      color: regions.length > 0 ? "#888" : "#ccc",
                      background: "#ffffff",
                      cursor: regions.length > 0 ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={(e) => { if (regions.length > 0) { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.color = "#FF5C2E"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.color = regions.length > 0 ? "#888" : "#ccc"; }}
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Undo
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={regions.length === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      border: "1px solid #e8e2d8",
                      color: regions.length > 0 ? "#cc2200" : "#ccc",
                      background: "#ffffff",
                      cursor: regions.length > 0 ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={(e) => { if (regions.length > 0) e.currentTarget.style.borderColor = "#cc2200"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; }}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear All
                  </button>
                </div>
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

        {/* Options */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5 space-y-5" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>Options</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Blur Intensity</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{blockSize}px</span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                step={1}
                value={blockSize}
                onChange={(e) => setBlockSize(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
              />
              <div className="flex justify-between text-[10px]" style={{ color: "#aaa" }}>
                <span>Subtle</span>
                <span>Heavy pixelation</span>
              </div>
            </div>

            {/* Region count */}
            <div className="p-3 rounded-xl text-center" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
              <p className="text-2xl font-extrabold" style={{ color: "#FF5C2E" }}>{regions.length}</p>
              <p className="text-xs mt-1" style={{ color: "#888" }}>Blurred Region{regions.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="rounded-2xl p-4 text-xs space-y-1" style={{ background: "#fff4f0", border: "1px solid #ffe0d6" }}>
            <p className="font-semibold" style={{ color: "#FF5C2E" }}>💡 How to blur</p>
            <p style={{ color: "#888" }}>Click and drag on the image to draw a blur region. Each region is pixelated with the block size you choose. Use Undo to remove the last region. Your image never leaves your device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
