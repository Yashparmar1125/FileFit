"use client";

import Dropzone from "@/components/dropzone";
import AdsPlaceholder from "@/components/ads-placeholder";
import { mergePdfs, splitPdf, imagesToPdf, pdfToImages, compressPdfToKb } from "@/lib/pdf-engine";
import { useState } from "react";
import { FileText, Settings2, Download, RefreshCw, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PdfWorkspaceProps {
  defaultMode?: "compress" | "merge" | "split" | "convert";
  defaultTargetKb?: number;
}

const BTN_PRIMARY = "px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";

export default function PdfWorkspace({ defaultMode = "compress", defaultTargetKb = 100 }: PdfWorkspaceProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [targetKb, setTargetKb] = useState<number>(defaultTargetKb);
  const [splitRange, setSplitRange] = useState<string>("1-2");
  const [convertSubmode, setConvertSubmode] = useState<"img2pdf" | "pdf2img">("img2pdf");

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files); setDownloadUrl(null); setResultSize(null); setResultCount(null);
  };
  const handleReset = () => {
    setSelectedFiles([]); setDownloadUrl(null); setResultSize(null); setResultCount(null);
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;
    setProcessing(true); setDownloadUrl(null);
    try {
      let outputBlob: Blob | null = null;
      let filename = `filefit-${Date.now()}`;

      if (defaultMode === "compress") {
        outputBlob = await compressPdfToKb(selectedFiles[0], targetKb);
        filename += "-compressed.pdf";
      } else if (defaultMode === "merge") {
        outputBlob = await mergePdfs(selectedFiles);
        filename += "-merged.pdf";
      } else if (defaultMode === "split") {
        outputBlob = await splitPdf(selectedFiles[0], splitRange);
        filename += "-split.pdf";
      } else if (defaultMode === "convert") {
        if (convertSubmode === "img2pdf") {
          outputBlob = await imagesToPdf(selectedFiles);
          filename += "-converted.pdf";
        } else {
          const imageResults = await pdfToImages(selectedFiles[0]);
          if (imageResults.length > 0) {
            setResultCount(imageResults.length);
            imageResults.forEach((img) => {
              const url = URL.createObjectURL(img.blob);
              const a = document.createElement("a");
              a.href = url; a.download = `page-${img.pageNum}-${filename}.png`;
              document.body.appendChild(a); a.click(); document.body.removeChild(a);
            });
            outputBlob = imageResults[0].blob;
            filename = `page-1-${filename}.png`;
          }
        }
      }

      if (outputBlob) {
        setResultSize(outputBlob.size);
        const url = URL.createObjectURL(outputBlob);
        setDownloadUrl(url);
        if (!(defaultMode === "convert" && convertSubmode === "pdf2img")) {
          const a = document.createElement("a");
          a.href = url; a.download = filename;
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to process PDF.");
    } finally { setProcessing(false); }
  };

  const fmt = (bytes: number) => bytes < 1024 ? `${bytes} B` : `${(bytes / 1048576).toFixed(2)} MB`;

  const modeTitle = defaultMode === "compress" ? "PDF Compressor" : defaultMode === "merge" ? "PDF Merger" : defaultMode === "split" ? "PDF Splitter" : "PDF Converter";
  const modeDesc = defaultMode === "compress" ? "Shrink scanned documents locally to meet upload KB limits."
    : defaultMode === "merge" ? "Merge multiple PDF files into one output document instantly."
      : defaultMode === "split" ? "Isolate pages and extract ranges from PDF files."
        : "Convert PNG/JPG scans to PDF, or render PDF pages as images.";

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
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]" style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", letterSpacing: "-0.02em" }}>{modeTitle}</h1>
          <p className="text-[#888] text-xs mt-0.5">{modeDesc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace */}
        <div className="lg:col-span-2 space-y-5">
          {selectedFiles.length === 0 ? (
            <div className="panel p-6">
              <Dropzone
                onFilesSelected={handleFilesSelected}
                allowedTypes={defaultMode === "convert" && convertSubmode === "img2pdf" ? ["image/jpeg", "image/png"] : ["application/pdf"]}
                multiple={defaultMode === "merge" || (defaultMode === "convert" && convertSubmode === "img2pdf")}
                maxFiles={defaultMode === "merge" ? 15 : undefined}
                maxSizeKb={defaultMode === "compress" ? targetKb : undefined}
              />
            </div>
          ) : (
            <div className="panel p-6 space-y-5">
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>
                  {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
                </span>
                <button onClick={handleReset} className="text-xs font-semibold hover:underline" style={{ color: "#cc2200" }}>Clear</button>
              </div>

              <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1">
                {selectedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid #e8e2d8", background: "#faf8f5" }}>
                    <p className="text-[#0F0F0F] text-xs font-medium truncate max-w-[260px]">{file.name}</p>
                    <span className="text-[#888] text-[10px] shrink-0 ml-2">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>

              {processing && (
                <div className="py-8 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full animate-spin" style={{ border: "4px solid #e8e2d8", borderTopColor: "#FF5C2E" }} />
                  <span className="text-xs font-medium" style={{ color: "#888" }}>Processing in browser…</span>
                </div>
              )}

              {downloadUrl && (
                <div className="p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0" style={{ color: "#10b981" }} />
                    <div>
                      <p className="text-[#0F0F0F] font-semibold text-sm">Done!</p>
                      <p className="text-[#888] text-xs mt-0.5">
                        {defaultMode === "convert" && convertSubmode === "pdf2img"
                          ? `Generated ${resultCount} page images.`
                          : `Output size: ${fmt(resultSize || 0)}`}
                      </p>
                    </div>
                  </div>
                  <a href={downloadUrl} download={`filefit-${Date.now()}.${defaultMode === "convert" && convertSubmode === "pdf2img" ? "png" : "pdf"}`}
                    className={BTN_PRIMARY + " shrink-0"} style={{ background: "#FF5C2E" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#E04820")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#FF5C2E")}
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                </div>
              )}

              {!processing && !downloadUrl && (
                <div className="flex justify-end pt-4" style={{ borderTop: "1px solid #e8e2d8" }}>
                  <button type="button" onClick={handleProcess}
                    className={BTN_PRIMARY} style={{ background: "#FF5C2E" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#E04820")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#FF5C2E")}
                  >
                    Process PDF <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          <AdsPlaceholder format="horizontal" slot="pdf-tool-bottom" />
        </div>

        {/* Options */}
        <div className="space-y-5">
          <div className="panel p-5 space-y-5">
            <div className="flex items-center gap-2 pb-4" style={{ borderBottom: "1px solid #e8e2d8" }}>
              <Settings2 className="h-4 w-4" style={{ color: "#888" }} />
              <h2 className="text-[#0F0F0F] font-semibold text-sm">Options</h2>
            </div>

            {defaultMode === "compress" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888" }}>Target Size</label>
                  <span className="text-sm font-bold" style={{ color: "#FF5C2E" }}>{targetKb} KB</span>
                </div>
                <input type="range" min={50} max={1000} step={50} value={targetKb}
                  onChange={(e) => setTargetKb(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                  style={{ background: "#e8e2d8", accentColor: "#FF5C2E" }}
                />
              </div>
            )}

            {defaultMode === "split" && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Page Range</label>
                <input type="text" value={splitRange} onChange={(e) => setSplitRange(e.target.value)} placeholder="e.g. 1, 3, 5-8"
                  className="w-full px-3 py-2 rounded-xl text-sm text-[#0F0F0F] focus:outline-none"
                  style={{ border: "1px solid #e8e2d8" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#FF5C2E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,92,46,0.1)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e8e2d8"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            )}

            {defaultMode === "convert" && (
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider block" style={{ color: "#888" }}>Direction</label>
                {[{ label: "Images → PDF", value: "img2pdf" }, { label: "PDF → PNG images", value: "pdf2img" }].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs cursor-pointer" style={{ color: "#555" }}>
                    <input type="radio" name="convertSub" checked={convertSubmode === item.value}
                      onChange={() => { setConvertSubmode(item.value as "img2pdf" | "pdf2img"); handleReset(); }}
                      style={{ accentColor: "#FF5C2E" }}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <AdsPlaceholder format="rectangle" slot="pdf-tool-side" />
        </div>
      </div>
    </div>
  );
}
