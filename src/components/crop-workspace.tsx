"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Dropzone from "@/components/dropzone";
import { ChevronLeft, Crop, Download, RefreshCw, RotateCcw } from "lucide-react";
import Link from "next/link";

const BTN_PRIMARY = 
  "px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";

const ASPECT_PRESETS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
];

interface CropRect {
  x: number; // percentage 0-100
  y: number;
  w: number;
  h: number;
}

export default function CropWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgNatW, setImgNatW] = useState(0);
  const [imgNatH, setImgNatH] = useState(0);
  const [aspect, setAspect] = useState<number | null>(null);
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");
  const [crop, setCrop] = useState<CropRect>({ x: 10, y: 10, w: 80, h: 80 });
  const [dragging, setDragging] = useState<"move" | "resize-br" | null>(null);
  const [dragStart, setDragStart] = useState({ mx: 0, my: 0, cx: 0, cy: 0, cw: 0, ch: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (imgContainerRef.current)
      setContainerRect(imgContainerRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect]);

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    const img = new Image();
    img.onload = () => {
      setImgNatW(img.naturalWidth);
      setImgNatH(img.naturalHeight);
      setCrop({ x: 10, y: 10, w: 80, h: 80 });
      setTimeout(updateRect, 50);
    };
    img.src = url;
  };

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const applyAspect = (ar: number | null) => {
    setAspect(ar);
    if (!ar) return;
    setCrop((c) => {
      const newH = c.w / ar;
      if (c.y + newH <= 100) return { ...c, h: clamp(newH, 5, 100 - c.y) };
      const newW = c.h * ar;
      return { ...c, w: clamp(newW, 5, 100 - c.x) };
    });
  };

  const onMouseDown = (e: React.MouseEvent, type: "move" | "resize-br") => {
    e.preventDefault();
    updateRect();
    setDragging(type);
    setDragStart({ mx: e.clientX, my: e.clientY, cx: crop.x, cy: crop.y, cw: crop.w, ch: crop.h });
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging || !containerRect) return;
      const dx = ((e.clientX - dragStart.mx) / containerRect.width) * 100;
      const dy = ((e.clientY - dragStart.my) / containerRect.height) * 100;
      setCrop((c) => {
        if (dragging === "move") {
          return {
            ...c,
            x: clamp(dragStart.cx + dx, 0, 100 - c.w),
            y: clamp(dragStart.cy + dy, 0, 100 - c.h),
          };
        } else {
          let newW = clamp(dragStart.cw + dx, 5, 100 - dragStart.cx);
          let newH = aspect ? newW / aspect : clamp(dragStart.ch + dy, 5, 100 - dragStart.cy);
          if (aspect) newH = clamp(newH, 5, 100 - dragStart.cy);
          return { ...c, w: newW, h: newH };
        }
      });
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging, dragStart, containerRect, aspect]);

  const cropPxW = Math.round((crop.w / 100) * imgNatW);
  const cropPxH = Math.round((crop.h / 100) * imgNatH);

  const handleCrop = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const sx = (crop.x / 100) * img.naturalWidth;
      const sy = (crop.y / 100) * img.naturalHeight;
      const sw = (crop.w / 100) * img.naturalWidth;
      const sh = (crop.h / 100) * img.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `filefit-crop-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
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
    setCrop({ x: 10, y: 10, w: 80, h: 80 });
    setAspect(null);
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
          <Crop className="h-6 w-6" />
        </div>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            Crop Image
          </h1>
          <p className="text-[#888] text-xs mt-0.5">
            Trim and crop to exact dimensions — 100% in your browser
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main workspace */}
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
              <div
                className="flex justify-between items-center pb-4"
                style={{ borderBottom: "1px solid #e8e2d8" }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>
                  Drag to crop
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: "#cc2200" }}
                >
                  Clear
                </button>
              </div>

              {/* Crop area */}
              <div
                ref={imgContainerRef}
                onMouseEnter={updateRect}
                className="relative w-full select-none"
                style={{ userSelect: "none" }}
              >
                {imgSrc && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgSrc}
                    alt="Source"
                    className="w-full rounded-xl object-contain"
                    style={{ display: "block" }}
                    onLoad={updateRect}
                    draggable={false}
                  />
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.45)", borderRadius: 12 }} />
                {/* Crop rect cutout simulation using clip-path isn't possible easily; use 4 dark bars */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: 0, left: 0,
                    width: "100%",
                    height: `${crop.y}%`,
                    background: "rgba(0,0,0,0.45)",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: `${crop.y + crop.h}%`, left: 0,
                    width: "100%",
                    bottom: 0,
                    background: "rgba(0,0,0,0.45)",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: `${crop.y}%`,
                    left: 0,
                    width: `${crop.x}%`,
                    height: `${crop.h}%`,
                    background: "rgba(0,0,0,0.45)",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: `${crop.y}%`,
                    left: `${crop.x + crop.w}%`,
                    right: 0,
                    height: `${crop.h}%`,
                    background: "rgba(0,0,0,0.45)",
                  }}
                />

                {/* Crop rect border */}
                <div
                  ref={overlayRef}
                  onMouseDown={(e) => onMouseDown(e, "move")}
                  className="absolute"
                  style={{
                    top: `${crop.y}%`,
                    left: `${crop.x}%`,
                    width: `${crop.w}%`,
                    height: `${crop.h}%`,
                    border: "2px solid #FF5C2E",
                    cursor: dragging === "move" ? "grabbing" : "grab",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Rule of thirds grid lines */}
                  <div className="absolute inset-0 pointer-events-none" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} style={{ border: "0.5px solid rgba(255,92,46,0.35)" }} />
                    ))}
                  </div>
                  {/* Corner handles */}
                  {[
                    { top: -5, left: -5, cursor: "nwse-resize" },
                    { top: -5, right: -5, cursor: "nesw-resize" },
                    { bottom: -5, left: -5, cursor: "nesw-resize" },
                  ].map((style, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-sm pointer-events-none"
                      style={{ ...style, border: "2px solid #FF5C2E", boxSizing: "border-box" }}
                    />
                  ))}
                  {/* Bottom-right resize handle */}
                  <div
                    onMouseDown={(e) => { e.stopPropagation(); onMouseDown(e, "resize-br"); }}
                    className="absolute w-4 h-4 bg-white rounded-sm"
                    style={{ bottom: -6, right: -6, border: "2px solid #FF5C2E", cursor: "nwse-resize", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Dimensions info */}
              <div className="flex items-center gap-4 text-xs" style={{ color: "#888" }}>
                <span>Original: <b className="text-[#0F0F0F]">{imgNatW} × {imgNatH}px</b></span>
                <span>→</span>
                <span>Cropped: <b style={{ color: "#FF5C2E" }}>{cropPxW} × {cropPxH}px</b></span>
              </div>

              <div className="flex justify-end pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                <button
                  type="button"
                  onClick={handleCrop}
                  className={BTN_PRIMARY}
                  style={{ background: "#FF5C2E" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#E04820")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5C2E")}
                >
                  <Download className="h-4 w-4" /> Crop & Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Options panel */}
        <div className="space-y-5">
          <div
            className="rounded-2xl border p-5 space-y-5"
            style={{ borderColor: "#e9ecef", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <h2 className="text-[#0F0F0F] font-semibold text-sm pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              Crop Options
            </h2>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ASPECT_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyAspect(p.value)}
                    className="py-2 px-1 rounded-xl text-[10px] font-semibold uppercase tracking-wider text-center transition-all"
                    style={{
                      border: aspect === p.value ? "1px solid #FF5C2E" : "1px solid #e8e2d8",
                      background: aspect === p.value ? "#fff4f0" : "#ffffff",
                      color: aspect === p.value ? "#FF5C2E" : "#888",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom dimensions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>
                Custom Size (px)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Width", value: customW, setter: setCustomW },
                  { label: "Height", value: customH, setter: setCustomH },
                ].map(({ label, value, setter }) => (
                  <div key={label} className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase" style={{ color: "#aaa" }}>{label}</span>
                    <input
                      type="number"
                      placeholder="Auto"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-sm text-[#0F0F0F] focus:outline-none transition-all"
                      style={{ border: "1px solid #e8e2d8" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,92,46,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reset crop */}
            {file && (
              <button
                type="button"
                onClick={() => setCrop({ x: 10, y: 10, w: 80, h: 80 })}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ border: "1px solid #e8e2d8", color: "#888" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.color = "#FF5C2E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.color = "#888"; }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Selection
              </button>
            )}
          </div>

          <div
            className="rounded-2xl p-4 text-xs space-y-1"
            style={{ background: "#fff4f0", border: "1px solid #ffe0d6" }}
          >
            <p className="font-semibold" style={{ color: "#FF5C2E" }}>💡 How to crop</p>
            <p style={{ color: "#888" }}>Drag the orange rectangle to reposition. Drag the bottom-right handle to resize. Choose an aspect ratio preset to lock proportions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
