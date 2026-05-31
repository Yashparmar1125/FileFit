"use client";

import { useState, useRef, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Download, Eraser } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/** Flood-fill based background removal */
function floodFillRemoveBg(
  imageData: ImageData,
  startX: number,
  startY: number,
  tolerance: number
): ImageData {
  const { data, width, height } = imageData;
  const out = new Uint8ClampedArray(data);
  const idx = (x: number, y: number) => (y * width + x) * 4;
  const si = idx(startX, startY);
  const tr = data[si], tg = data[si + 1], tb = data[si + 2];

  const visited = new Uint8Array(width * height);
  const stack: number[] = [startX + startY * width];
  visited[startX + startY * width] = 1;

  while (stack.length) {
    const pos = stack.pop()!;
    const x = pos % width;
    const y = Math.floor(pos / width);
    const i = idx(x, y);
    const dist = colorDistance(data[i], data[i + 1], data[i + 2], tr, tg, tb);
    if (dist > tolerance) continue;
    out[i + 3] = 0; // make transparent

    const neighbors = [
      [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const np = nx + ny * width;
      if (visited[np]) continue;
      visited[np] = 1;
      stack.push(np);
    }
  }
  return new ImageData(out, width, height);
}

export default function RemoveBgWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<[number, number, number] | null>(null);
  const [tolerance, setTolerance] = useState(30);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setPickedColor(null);
    setResultUrl(null);
  };

  const sampleColor = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img || !imgSrc) return;
    const rect = img.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * img.naturalWidth;
    const py = ((e.clientY - rect.top) / rect.height) * img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    const src = new Image();
    src.onload = () => {
      ctx.drawImage(src, 0, 0);
      const p = ctx.getImageData(Math.round(px), Math.round(py), 1, 1).data;
      setPickedColor([p[0], p[1], p[2]]);
    };
    src.src = imgSrc;
  }, [imgSrc]);

  const handleRemove = () => {
    if (!imgSrc || !pickedColor) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Find the sampled pixel coords (center of image as fallback)
      const processed = floodFillRemoveBg(
        imageData,
        Math.round((img.naturalWidth * (pickedColor ? 0.5 : 0.5))),
        Math.round((img.naturalHeight * (pickedColor ? 0.5 : 0.5))),
        tolerance * 2.55
      );
      ctx.putImageData(processed, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) { setProcessing(false); return; }
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
        setProcessing(false);
      }, "image/png");
    };
    img.src = imgSrc;
  };

  const handleRemoveAtCoords = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img || !imgSrc) return;
    const rect = img.getBoundingClientRect();
    const px = Math.round(((e.clientX - rect.left) / rect.width) * img.naturalWidth);
    const py = Math.round(((e.clientY - rect.top) / rect.height) * img.naturalHeight);
    setProcessing(true);
    const src = new Image();
    src.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = src.naturalWidth;
      canvas.height = src.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(src, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Sample color at click point
      const pi = (py * canvas.width + px) * 4;
      const cr = imageData.data[pi], cg = imageData.data[pi + 1], cb = imageData.data[pi + 2];
      setPickedColor([cr, cg, cb]);
      const processed = floodFillRemoveBg(imageData, px, py, tolerance * 2.55);
      ctx.putImageData(processed, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) { setProcessing(false); return; }
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
        setProcessing(false);
      }, "image/png");
    };
    src.src = resultUrl || imgSrc;
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `filefit-nobg-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setFile(null);
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setImgSrc(null);
    setResultUrl(null);
    setPickedColor(null);
  };

  const colorHex = pickedColor
    ? `#${pickedColor.map((c) => c.toString(16).padStart(2, "0")).join("")}`
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <canvas ref={hiddenCanvasRef} className="hidden" />
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
          <Eraser className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Remove Background
          </h1>
          <p className="text-[#888] text-xs mt-0.5">Erase image background using color tolerance — fully local</p>
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
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Click image to remove color</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Source */}
                <div>
                  <p className="text-xs font-medium mb-2 text-center" style={{ color: "#888" }}>Source — click to sample</p>
                  <div className="rounded-xl overflow-hidden" style={{ background: "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 16px 16px", border: "1px solid #e8e2d8" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={imgRef}
                      src={imgSrc || ""}
                      alt="Source"
                      className="w-full object-contain"
                      style={{ maxHeight: 320, cursor: "crosshair", display: "block" }}
                      onClick={handleRemoveAtCoords}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Result */}
                <div>
                  <p className="text-xs font-medium mb-2 text-center" style={{ color: "#888" }}>Result (transparent)</p>
                  <div className="rounded-xl overflow-hidden" style={{ background: "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 16px 16px", border: "1px solid #e8e2d8", minHeight: 120 }}>
                    {processing ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "3px solid #e8e2d8", borderTopColor: "#FF5C2E" }} />
                      </div>
                    ) : resultUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={resultUrl} alt="Result" className="w-full object-contain" style={{ maxHeight: 320, display: "block" }} />
                    ) : (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-xs text-center px-4" style={{ color: "#aaa" }}>Click on source image to remove background</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                {resultUrl && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className={BTN_PRIMARY}
                    style={{ background: "#10b981" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
                  >
                    <Download className="h-4 w-4" /> Download PNG
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5 space-y-5" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>Options</h2>

            {/* Sampled color */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Sampled Color</label>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
                <div
                  className="w-8 h-8 rounded-lg shrink-0"
                  style={{
                    background: colorHex || "#ddd",
                    border: "1px solid #e8e2d8",
                  }}
                />
                <div>
                  <p className="text-xs font-semibold text-[#0F0F0F]">{colorHex || "Not sampled"}</p>
                  <p className="text-[10px]" style={{ color: "#888" }}>Click image to sample</p>
                </div>
              </div>
            </div>

            {/* Tolerance slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Tolerance</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{tolerance}</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={1}
                value={tolerance}
                onChange={(e) => setTolerance(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
              />
              <div className="flex justify-between text-[10px]" style={{ color: "#aaa" }}>
                <span>Precise</span>
                <span>Broad</span>
              </div>
            </div>

            {file && (
              <button
                type="button"
                onClick={() => { setResultUrl(null); setPickedColor(null); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ border: "1px solid #e8e2d8", color: "#888" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.color = "#FF5C2E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.color = "#888"; }}
              >
                Reset Result
              </button>
            )}
          </div>

          <div className="rounded-2xl p-4 text-xs space-y-1" style={{ background: "#fff4f0", border: "1px solid #ffe0d6" }}>
            <p className="font-semibold" style={{ color: "#FF5C2E" }}>💡 How it works</p>
            <p style={{ color: "#888" }}>Click directly on the background area of your image. The tool flood-fills and removes pixels within the tolerance range. You can click multiple times to remove more areas. Output is PNG with transparency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
