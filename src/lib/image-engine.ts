export interface CompressionResult {
  blob: Blob;
  width: number;
  height: number;
  sizeBytes: number;
  quality: number;
  scale: number;
}

/**
 * Compresses an image to fit under a specific KB limit while maintaining the best possible quality.
 * Uses a binary search algorithm on JPEG quality, adjusting scale/resolution if necessary.
 */
export async function compressImageToKb(
  file: File | Blob,
  options: {
    maxSizeKb: number;
    minSizeKb?: number;
    targetWidth?: number;
    targetHeight?: number;
    aspectRatio?: number;
    format?: "image/jpeg" | "image/png";
  }
): Promise<CompressionResult> {
  const { maxSizeKb, targetWidth, targetHeight, aspectRatio, format = "image/jpeg" } = options;
  const targetSizeBytes = maxSizeKb * 1024;
  
  // Load file into an HTMLImageElement
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error("Failed to load image file."));
    img.src = URL.createObjectURL(file);
  });
  
  let srcWidth = image.naturalWidth;
  let srcHeight = image.naturalHeight;
  
  // If aspect ratio is specified, we might crop first or scale. Let's assume we crop or adjust bounds.
  // For a generic resizer, if we have targetWidth/Height, we scale to that.
  let scale = 1.0;
  let finalWidth = targetWidth || srcWidth;
  let finalHeight = targetHeight || srcHeight;
  
  if (targetWidth && targetHeight) {
    finalWidth = targetWidth;
    finalHeight = targetHeight;
  } else if (aspectRatio) {
    // Crop or fit to aspect ratio
    const currentRatio = srcWidth / srcHeight;
    if (currentRatio > aspectRatio) {
      // Image is wider than target ratio
      finalWidth = srcHeight * aspectRatio;
      finalHeight = srcHeight;
    } else {
      // Image is taller than target ratio
      finalWidth = srcWidth;
      finalHeight = srcWidth / aspectRatio;
    }
  }
  
  // Create Canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2D canvas context.");
  }
  
  // A helper function to compress canvas to blob at a specific scale and quality
  const getBlobForParams = (currentScale: number, currentQuality: number): Promise<Blob | null> => {
    const w = Math.round(finalWidth * currentScale);
    const h = Math.round(finalHeight * currentScale);
    canvas.width = w;
    canvas.height = h;
    
    ctx.clearRect(0, 0, w, h);
    
    // Smooth rendering quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    // Draw image (with centering/cropping if aspect ratio was adjusted)
    if (aspectRatio && !targetWidth && !targetHeight) {
      const sx = (srcWidth - finalWidth) / 2;
      const sy = (srcHeight - finalHeight) / 2;
      ctx.drawImage(image, sx, sy, finalWidth, finalHeight, 0, 0, w, h);
    } else {
      ctx.drawImage(image, 0, 0, srcWidth, srcHeight, 0, 0, w, h);
    }
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), format, currentQuality);
    });
  };
  
  // Binary search for optimal quality/scale to match target size
  let bestBlob: Blob | null = null;
  let bestQuality = 0.92;
  let bestScale = 1.0;
  
  // Iteration variables
  let minQuality = 0.05;
  let maxQuality = 0.98;
  let currentQuality = 0.85;
  
  // Phase 1: Try adjusting quality first (up to 8 binary search steps)
  for (let i = 0; i < 8; i++) {
    const blob = await getBlobForParams(bestScale, currentQuality);
    if (!blob) break;
    
    if (blob.size <= targetSizeBytes) {
      bestBlob = blob;
      bestQuality = currentQuality;
      // Size fits, try raising quality to see if we can get closer to target
      minQuality = currentQuality;
      currentQuality = (currentQuality + maxQuality) / 2;
    } else {
      // Size is too big, lower quality
      maxQuality = currentQuality;
      currentQuality = (currentQuality + minQuality) / 2;
    }
  }
  
  // Phase 2: If even at lowest quality (0.05), the file size is still too big,
  // we must reduce the scale/resolution dynamically.
  if (!bestBlob || bestBlob.size > targetSizeBytes) {
    let minScale = 0.1;
    let maxScale = 0.95;
    let currentScale = 0.7;
    bestQuality = 0.6; // fix quality to a reasonable medium
    
    for (let i = 0; i < 8; i++) {
      const blob = await getBlobForParams(currentScale, bestQuality);
      if (!blob) break;
      
      if (blob.size <= targetSizeBytes) {
        bestBlob = blob;
        bestScale = currentScale;
        // Fits, try to increase scale
        minScale = currentScale;
        currentScale = (currentScale + maxScale) / 2;
      } else {
        // Too big, decrease scale
        maxScale = currentScale;
        currentScale = (currentScale + minScale) / 2;
      }
    }
  }
  
  // Fallback if everything fails
  if (!bestBlob) {
    const finalBlob = await getBlobForParams(0.2, 0.1);
    if (finalBlob) {
      bestBlob = finalBlob;
      bestScale = 0.2;
      bestQuality = 0.1;
    } else {
      throw new Error("Failed to generate compressed image.");
    }
  }
  
  return {
    blob: bestBlob,
    width: Math.round(finalWidth * bestScale),
    height: Math.round(finalHeight * bestScale),
    sizeBytes: bestBlob.size,
    quality: bestQuality,
    scale: bestScale,
  };
}

/**
 * Cleans the background of a signature image.
 * Brightens light background pixels (paper shadows) to pure white or transparent.
 * Contrast adjusts dark pixels (ink) to make them stand out.
 */
export function cleanSignatureBackground(
  canvas: HTMLCanvasElement,
  threshold: number, // 0 to 255 (brightness cutoff)
  makeTransparent: boolean = false,
  contrastBoost: number = 1.2
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Calculate perceived brightness (standard formula)
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    
    if (brightness > threshold) {
      // Light background pixel
      if (makeTransparent) {
        data[i + 3] = 0; // Set alpha to transparent
      } else {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    } else {
      // Dark ink pixel - boost contrast / make it darker
      // Contrast adjustment centered around middle-gray (128)
      const adjust = (val: number) => {
        const factor = contrastBoost;
        const newVal = factor * (val - 128) + 128;
        return Math.max(0, Math.min(255, newVal));
      };
      
      // Let's make the ink stand out as dark blue/black
      const nr = adjust(r) * 0.8; // slightly darken
      const ng = adjust(g) * 0.8;
      const nb = adjust(b) * 0.8;
      
      data[i] = nr;
      data[i + 1] = ng;
      data[i + 2] = nb;
    }
  }
  
  ctx.putImageData(imgData, 0, 0);
}

/**
 * Auto-crops signature by identifying the bounding box of non-background pixels.
 */
export function getSignatureBoundingBox(
  canvas: HTMLCanvasElement,
  backgroundThreshold: number = 240
): { x: number; y: number; width: number; height: number } | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const w = canvas.width;
  const h = canvas.height;
  
  let minX = w;
  let maxX = 0;
  let minY = h;
  let maxY = 0;
  let found = false;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // A pixel is considered ink if it's dark or has opacity in a transparent image
      const isInk = (a > 30) && (brightness < backgroundThreshold);
      
      if (isInk) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }
  
  if (!found) return null;
  
  // Add a small padding (10px) around the bounding box
  const padding = 15;
  const x = Math.max(0, minX - padding);
  const y = Math.max(0, minY - padding);
  const width = Math.min(w - x, (maxX - minX) + padding * 2);
  const height = Math.min(h - y, (maxY - minY) + padding * 2);
  
  return { x, y, width, height };
}
