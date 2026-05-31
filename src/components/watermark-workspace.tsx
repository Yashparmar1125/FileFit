"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Download, Stamp } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";

type Position =
  | "top-left" | "top-center" | "top-right"
  | "center-left" | "center" | "center-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

const POSITIONS: { label: string; value: Position }[] = [
  { label: "↖", value: "top-left" }, { label: "↑", value: "top-center" }, { label: "↗", value: "top-right" },
  { label: "←", value: "center-left" }, { label: "●", value: "center" }, { label: "→", value: "center-right" },
  { label: "↙", value: "bottom-left" }, { label: "↓", value: "bottom-center" }, { label: "↘", value: "bottom-right" },
];

function getPositionXY(pos: Position, cw: number, ch: number, padding: number): [number, number] {
  const map: Record<Position, [number, number]> = {
    "top-left": [padding, padding],
    "top-center": [cw / 2, padding],
    "top-right": [cw - padding, padding],
    "center-left": [padding, ch / 2],
    "center": [cw / 2, ch / 2],
    "center-right": [cw - padding, ch / 2],
    "bottom-left": [padding, ch - padding],
    "bottom-center": [cw / 2, ch - padding],
    "bottom-right": [cw - padding, ch - padding],
  };
  return map[pos];
}

function getTextAlign(pos: Position): CanvasTextAlign {
  if (pos.endsWith("left")) return "left";
  if (pos.endsWith("right")) return "right";
  return "center";
}

function getTextBaseline(pos: Position): CanvasTextBaseline {
  if (pos.startsWith("top")) return "top";
  if (pos.startsWith("bottom")) return "bottom";
  return "middle";
}

export default function WatermarkWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [text, setText] = useState("© FileFit");
  const [fontSize, setFontSize] = useState(36);
  const [opacity, setOpacity] = useState(60);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [color, setColor] = useState("#ffffff");
  const [repeat, setRepeat] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderWatermark = useCallback(() => {
    if (!imgSrc || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", sans-serif`;

      if (repeat) {
        const stepX = img.naturalWidth / 3;
        const stepY = img.naturalHeight / 3;
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const x = stepX * col + stepX / 2;
            const y = stepY * row + stepY / 2;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 8);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, 0, 0);
            ctx.restore();
          }
        }
      } else {
        const padding = Math.max(20, fontSize * 0.6);
        const [x, y] = getPositionXY(position, canvas.width, canvas.height, padding);
        ctx.textAlign = getTextAlign(position);
        ctx.textBaseline = getTextBaseline(position);
        ctx.fillText(text, x, y);
      }

      ctx.globalAlpha = 1;
    };
    img.src = imgSrc;
  }, [imgSrc, text, fontSize, opacity, position, color, repeat]);

  useEffect(() => { renderWatermark(); }, [renderWatermark]);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `filefit-watermark-${Date.now()}.png`;
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
          <Stamp className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Watermark Image
          </h1>
          <p className="text-[#888] text-xs mt-0.5">Add text watermarks — stays on your device</p>
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
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Live Preview</span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "#F5F0E8", padding: 16 }}>
                <canvas
                  ref={canvasRef}
                  className="max-w-full rounded-xl shadow-brutal"
                  style={{ maxHeight: 400, objectFit: "contain" }}
                />
              </div>

              <div className="flex justify-end pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                <button
                  type="button"
                  onClick={handleDownload}
                  className={BTN_PRIMARY}
                  style={{ background: "#FF5C2E" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#E04820")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5C2E")}
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="rounded-2xl border p-5 space-y-5" style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>Watermark Options</h2>

            {/* Text */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Watermark Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. © My Brand"
                className="w-full px-3 py-2 rounded-xl text-sm text-[#0F0F0F] focus:outline-none transition-all"
                style={{ border: "1px solid #e8e2d8" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,92,46,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Font size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Font Size</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{fontSize}px</span>
              </div>
              <input type="range" min={12} max={120} step={2} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }} />
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Opacity</label>
                <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{opacity}%</span>
              </div>
              <input type="range" min={10} max={100} step={5} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }} />
            </div>

            {/* Color */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Text Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0.5"
                  style={{ border: "1px solid #e8e2d8" }} />
                <span className="text-sm font-mono text-[#0F0F0F]">{color}</span>
              </div>
            </div>

            {/* Position */}
            {!repeat && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Position</label>
                <div className="grid grid-cols-3 gap-1.5" style={{ width: 132 }}>
                  {POSITIONS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPosition(p.value)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg text-base font-bold transition-all"
                      style={{
                        border: position === p.value ? "2px solid #FF5C2E" : "1px solid #e8e2d8",
                        background: position === p.value ? "#fff4f0" : "#ffffff",
                        color: position === p.value ? "#FF5C2E" : "#888",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Repeat toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold" style={{ color: "#888" }}>Tile / Repeat pattern</label>
              <button
                type="button"
                onClick={() => setRepeat((v) => !v)}
                className="w-12 h-6 rounded-full transition-all relative"
                style={{ background: repeat ? "#FF5C2E" : "#e8e2d8" }}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                  style={{ left: repeat ? "calc(100% - 22px)" : 2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
