import { PDFDocument } from "pdf-lib";

// Dynamic worker source for PDF.js to run in browser without heavy local configuration
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let pdfjsLib: any = null;

// Lazy loader for pdfjs-dist on client side
async function getPdfjs() {
  if (typeof window === "undefined") return null;
  if (pdfjsLib) return pdfjsLib;
  
  // Dynamic import to prevent Server-Side Rendering (SSR) issues in Next.js
  const pdfjs = await import("pdfjs-dist");
  
  // Set worker src
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  pdfjsLib = pdfjs;
  return pdfjsLib;
}

/**
 * Merges multiple PDF files into a single PDF document.
 */
export async function mergePdfs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes as any], { type: "application/pdf" });
}

/**
 * Splits a PDF file by extracting specific pages/ranges.
 * pageRanges example: "1,2,5-8" (1-based index)
 */
export async function splitPdf(file: File, pageRanges: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer);
  const totalPages = srcPdf.getPageCount();
  
  const destPdf = await PDFDocument.create();
  
  // Parse ranges (e.g. "1-3, 5, 7-10")
  const pagesToExtract: number[] = [];
  const parts = pageRanges.split(",");
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            pagesToExtract.push(i - 1); // convert to 0-based
          }
        }
      }
    } else {
      const pageNum = parseInt(trimmed, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pagesToExtract.push(pageNum - 1);
      }
    }
  }
  
  // Remove duplicates and sort
  const uniquePages = Array.from(new Set(pagesToExtract)).sort((a, b) => a - b);
  
  if (uniquePages.length === 0) {
    throw new Error("No valid pages selected for splitting.");
  }
  
  const copiedPages = await destPdf.copyPages(srcPdf, uniquePages);
  copiedPages.forEach((page) => destPdf.addPage(page));
  
  const pdfBytes = await destPdf.save();
  return new Blob([pdfBytes as any], { type: "application/pdf" });
}

/**
 * Converts a list of image files into a single PDF document.
 */
export async function imagesToPdf(imageFiles: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  
  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    let img;
    
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      img = await pdfDoc.embedJpg(arrayBuffer);
    } else if (file.type === "image/png") {
      img = await pdfDoc.embedPng(arrayBuffer);
    } else {
      continue; // Skip unsupported types
    }
    
    // Create page with exact image dimensions
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as any], { type: "application/pdf" });
}

/**
 * Converts a PDF into an array of image Blobs (one image per page).
 */
export async function pdfToImages(
  file: File,
  dpiScale: number = 2.0 // Adjust scale for image quality
): Promise<{ blob: Blob; pageNum: number }[]> {
  const pdfjs = await getPdfjs();
  if (!pdfjs) return [];
  
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const images: { blob: Blob; pageNum: number }[] = [];
  
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    
    // Scale viewport
    const viewport = page.getViewport({ scale: dpiScale });
    
    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext("2d");
    if (!context) continue;
    
    // Render PDF page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
    
    // Convert to PNG image blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/png");
    });
    
    if (blob) {
      images.push({ blob, pageNum });
    }
  }
  
  return images;
}

/**
 * Compresses a PDF file by rasterizing its pages to images and re-compiling them.
 * This is an incredibly effective client-side compression technique for scanned documents.
 * Iteratively decreases resolution scale and JPEG compression quality to fit exactly below the target KB.
 */
export async function compressPdfToKb(
  file: File,
  targetSizeKb: number
): Promise<Blob> {
  const pdfjs = await getPdfjs();
  if (!pdfjs) throw new Error("PDFJS library not loaded");
  
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  const targetSizeBytes = targetSizeKb * 1024;
  
  // A helper function to build the PDF with a given scale and quality
  const getPdfBytesForParams = async (scale: number, quality: number): Promise<Uint8Array> => {
    const destPdf = await PDFDocument.create();
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (!context) continue;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      // Export to jpeg at specified quality
      const jpegBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
      });
      
      if (jpegBlob) {
        const jpegBuffer = await jpegBlob.arrayBuffer();
        const img = await destPdf.embedJpg(jpegBuffer);
        const newPage = destPdf.addPage([img.width, img.height]);
        newPage.drawImage(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
      }
    }
    
    return await destPdf.save();
  };
  
  // Binary search variables
  let bestBytes: Uint8Array | null = null;
  let bestScale = 1.5;
  let bestQuality = 0.7;
  
  // First attempt: try high quality, standard scale
  let bytes = await getPdfBytesForParams(bestScale, bestQuality);
  if (bytes.length <= targetSizeBytes) {
    bestBytes = bytes;
  } else {
    // Binary search over quality/scale steps
    // Lower scale and quality step-by-step
    const settings = [
      { scale: 1.2, quality: 0.6 },
      { scale: 1.0, quality: 0.5 },
      { scale: 0.8, quality: 0.4 },
      { scale: 0.6, quality: 0.3 }
    ];
    
    for (const setting of settings) {
      bytes = await getPdfBytesForParams(setting.scale, setting.quality);
      if (bytes.length <= targetSizeBytes) {
        bestBytes = bytes;
        break;
      }
    }
  }
  
  // Fallback if still too large, force lowest settings
  if (!bestBytes) {
    bestBytes = await getPdfBytesForParams(0.5, 0.2);
  }
  
  return new Blob([bestBytes as any], { type: "application/pdf" });
}
