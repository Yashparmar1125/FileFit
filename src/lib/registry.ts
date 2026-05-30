export interface PresetSpec {
  id: string;
  title: string;
  description: string;
  toolType: "image" | "signature" | "pdf";
  presetName: string;
  category: "exam" | "document" | "general";
  
  // Specific properties
  targetSizeKb?: number; // Target size in KB (e.g. 20, 50, 100)
  minSizeKb?: number;
  maxSizeKb?: number;
  
  // Image properties
  aspectRatio?: number; // width / height
  widthPx?: number;
  heightPx?: number;
  widthCm?: number;
  heightCm?: number;
  allowedFormats?: string[]; // ["image/jpeg", "image/png"]
  
  // Custom SEO details
  seoTitle: string;
  seoDescription: string;
  guidelines: string[];
}

export const PRESET_REGISTRY: Record<string, PresetSpec> = {
  // --- General Presets ---
  "photo-to-20kb": {
    id: "photo-to-20kb",
    title: "Compress Image under 20KB",
    description: "Compress and resize any image or photo to under 20KB while preserving quality.",
    toolType: "image",
    presetName: "20kb",
    category: "general",
    maxSizeKb: 20,
    allowedFormats: ["image/jpeg", "image/png"],
    seoTitle: "Compress Image to 20KB Online Free | FileFit",
    seoDescription: "Easily compress your image to under 20KB online for free. Perfect for passport, visa, and exam application form uploads.",
    guidelines: [
      "Supported formats: JPEG, PNG.",
      "The tool will automatically optimize the image quality to fit exactly below 20KB.",
      "Ideal for online admission forms, job portal profiles, and ID uploads."
    ]
  },
  "photo-to-50kb": {
    id: "photo-to-50kb",
    title: "Compress Image under 50KB",
    description: "Compress and resize any image or photo to under 50KB.",
    toolType: "image",
    presetName: "50kb",
    category: "general",
    maxSizeKb: 50,
    allowedFormats: ["image/jpeg", "image/png"],
    seoTitle: "Compress Image to 50KB Online Free | FileFit",
    seoDescription: "Compress image to 50KB online in seconds. Reduce photo file size without losing quality for government forms.",
    guidelines: [
      "Adjusts resolution dynamically to match the 50KB limit.",
      "Output format defaults to JPG/JPEG for maximum compatibility.",
      "Commonly requested for government applications, school registrations, and visa forms."
    ]
  },
  "photo-to-100kb": {
    id: "photo-to-100kb",
    title: "Compress Image under 100KB",
    description: "Compress and resize any image or photo to under 100KB.",
    toolType: "image",
    presetName: "100kb",
    category: "general",
    maxSizeKb: 100,
    allowedFormats: ["image/jpeg", "image/png"],
    seoTitle: "Compress Image to 100KB Online Free | FileFit",
    seoDescription: "Reduce image file size to 100KB online. Fast, high-quality, and secure client-side browser processing.",
    guidelines: [
      "Compresses high-res photos to exactly under 100KB.",
      "All files are processed in your browser—no files are uploaded to any server.",
      "Highly recommended for portals like LinkedIn, job search sites, and college registrations."
    ]
  },
  "signature-to-10kb": {
    id: "signature-to-10kb",
    title: "Resize Signature under 10KB",
    description: "Crop and compress scanned signature to under 10KB. Cleans background.",
    toolType: "signature",
    presetName: "10kb",
    category: "general",
    maxSizeKb: 10,
    aspectRatio: 2.33, // e.g. 140x60
    allowedFormats: ["image/jpeg", "image/png"],
    seoTitle: "Compress Signature to 10KB Online Free | FileFit",
    seoDescription: "Resize signature to 10KB online. Crop signature, clean dark backgrounds, and compress for official online submissions.",
    guidelines: [
      "Upload a clear photo of your signature taken on white paper.",
      "Use our background cleaner to remove gray shadows and make the paper pure white or transparent.",
      "Compresses and resizes signature to stay strictly under 10KB."
    ]
  },
  "signature-to-20kb": {
    id: "signature-to-20kb",
    title: "Resize Signature under 20KB",
    description: "Crop, clean, and compress scanned signature to under 20KB.",
    toolType: "signature",
    presetName: "20kb",
    category: "general",
    maxSizeKb: 20,
    aspectRatio: 2.33,
    allowedFormats: ["image/jpeg", "image/png"],
    seoTitle: "Compress Signature to 20KB Online Free | FileFit",
    seoDescription: "Compress signature to 20KB online. Features dynamic background cleaning, aspect ratio locking, and client-side optimization.",
    guidelines: [
      "Crop your signature to exclude empty margins.",
      "Ensures the output signature is crisp and readable.",
      "Standard size requirements for banking portals and government exams."
    ]
  },
  "pdf-under-100kb": {
    id: "pdf-under-100kb",
    title: "Compress PDF under 100KB",
    description: "Compress and optimize PDF file sizes to under 100KB client-side.",
    toolType: "pdf",
    presetName: "100kb",
    category: "general",
    maxSizeKb: 100,
    seoTitle: "Compress PDF to 100KB Online Free | FileFit",
    seoDescription: "Shrink PDF to under 100KB without losing readability. Fast browser-based compression keeping your data safe and private.",
    guidelines: [
      "Optimizes page vector structure and downscales high-res images in the PDF.",
      "Perfect for strict government portal uploads (e.g. UPSC, tax portals).",
      "Processed locally: your sensitive PDF files never leave your device."
    ]
  },
  "pdf-under-200kb": {
    id: "pdf-under-200kb",
    title: "Compress PDF under 200KB",
    description: "Reduce PDF file size to under 200KB.",
    toolType: "pdf",
    presetName: "200kb",
    category: "general",
    maxSizeKb: 200,
    seoTitle: "Compress PDF to 200KB Online Free | FileFit",
    seoDescription: "Compress PDF to 200KB online. Reduce file size of certificates, resumes, and marksheets for easy web uploads.",
    guidelines: [
      "Maintains layout integrity and font clarity.",
      "Combines vector compression with image quality scaling.",
      "Best for college applications and job site resumes."
    ]
  },

  // --- Document Presets ---
  "passport-photo-resize": {
    id: "passport-photo-resize",
    title: "Passport Photo Size Converter",
    description: "Prepare passport photos with standard specifications (3.5 x 4.5 cm / 2 x 2 inches).",
    toolType: "image",
    presetName: "passport",
    category: "document",
    widthCm: 3.5,
    heightCm: 4.5,
    aspectRatio: 0.77,
    maxSizeKb: 100,
    seoTitle: "Resize Photo to Passport Size Online | FileFit",
    seoDescription: "Crop and resize your photo to standard Indian passport size (3.5cm x 4.5cm) or US size (2x2 inches) online. Fast & free.",
    guidelines: [
      "Indian standard passport photo dimensions are 3.5cm x 4.5cm (width x height).",
      "US standard passport/visa dimensions are 2x2 inches (51mm x 51mm).",
      "Make sure you upload a photo with a light or white background, looking straight at the camera."
    ]
  },
  "pan-card-photo-resize": {
    id: "pan-card-photo-resize",
    title: "PAN Card Photo and Signature Resize",
    description: "Format photo (2.5x3.5 cm) and signature (2x4.5 cm) to comply with NSDL/UTIITSL rules.",
    toolType: "image",
    presetName: "pan-card",
    category: "document",
    widthCm: 2.5,
    heightCm: 3.5,
    aspectRatio: 0.71,
    maxSizeKb: 20,
    seoTitle: "NSDL / UTI PAN Card Photo & Signature Resizer | FileFit",
    seoDescription: "Resize your photo to 2.5cm x 3.5cm (under 20KB) and signature to 2cm x 4.5cm (under 10KB) online for NSDL & UTI PAN card application.",
    guidelines: [
      "Photo dimensions: 2.5 cm x 3.5 cm (exactly under 20KB in JPEG format).",
      "Signature dimensions: 2.0 cm x 4.5 cm (exactly under 10KB in JPEG format).",
      "Ensure resolution is set to 200 DPI (the resizer does this automatically)."
    ]
  },
  "aadhaar-photo-resize": {
    id: "aadhaar-photo-resize",
    title: "Aadhaar Card Photo Resizer",
    description: "Resize card images or documents to standard Aadhaar uploading requirements.",
    toolType: "image",
    presetName: "aadhaar",
    category: "document",
    aspectRatio: 1.54, // standard CR80 style card aspect ratio
    maxSizeKb: 300,
    seoTitle: "Aadhaar Card Photo Resizer & Compressor | FileFit",
    seoDescription: "Resize and compress Aadhaar card scans, photos, or front-and-back mockups to exact upload dimensions and file size guidelines.",
    guidelines: [
      "Make sure the scanned Aadhaar text is clear and readable.",
      "Supports cropping card borders and merging front-and-back scans into one image.",
      "Keeps the file under the required portal upload limits (usually 300KB)."
    ]
  },
  "visa-photo-resize": {
    id: "visa-photo-resize",
    title: "Visa Photo Size Resizer",
    description: "Create visa-compliant photos for USA, Schengen, UK, Canada, and others.",
    toolType: "image",
    presetName: "visa",
    category: "document",
    widthPx: 600,
    heightPx: 600,
    aspectRatio: 1.0, // US Visa is square 2x2 inches
    maxSizeKb: 240,
    seoTitle: "Visa Photo Resizer Online (US, Schengen, UK Visa) | FileFit",
    seoDescription: "Generate standard visa-compliant photos online. Supports US visa square crop (600x600px) and Schengen visa dimensions (3.5x4.5cm).",
    guidelines: [
      "US Visa: 2x2 inches (600x600 pixels) on pure white background, under 240KB.",
      "Schengen Visa: 35mm x 45mm, light background, face must cover 70-80% of the height.",
      "UK Visa: 35mm x 45mm, cream or light grey background."
    ]
  },

  // --- Exam Presets (Programmatic SEO) ---
  "photo-resize-for-ssc": {
    id: "photo-resize-for-ssc",
    title: "SSC Photo Resizer & Compressor",
    description: "Format candidate photograph to meet SSC (Staff Selection Commission) guidelines.",
    toolType: "image",
    presetName: "ssc-photo",
    category: "exam",
    widthPx: 200,
    heightPx: 230,
    aspectRatio: 0.87, // 200/230
    minSizeKb: 20,
    maxSizeKb: 50,
    allowedFormats: ["image/jpeg"],
    seoTitle: "SSC Photo Resizer & Compressor Online (20-50KB) | FileFit",
    seoDescription: "Resize and compress your photo for SSC applications online. Automatically formats to 200x230 pixels, JPEG format, and 20KB - 50KB size.",
    guidelines: [
      "Format must be JPEG/JPG.",
      "Dimensions: 3.5 cm (width) x 4.5 cm (height) or 200 x 230 pixels.",
      "File size must be strictly between 20 KB and 50 KB.",
      "Ensure the photo is taken without spectacles and cap, and the date is clear if required."
    ]
  },
  "signature-resize-for-ssc": {
    id: "signature-resize-for-ssc",
    title: "SSC Signature Resizer & Compressor",
    description: "Format candidate signature to meet Staff Selection Commission (SSC) guidelines.",
    toolType: "signature",
    presetName: "ssc-sig",
    category: "exam",
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 2.33,
    minSizeKb: 10,
    maxSizeKb: 20,
    allowedFormats: ["image/jpeg"],
    seoTitle: "SSC Signature Resizer Online (10-20KB JPG) | FileFit",
    seoDescription: "Resize and compress SSC application signature. Keep it strictly between 10KB and 20KB in JPEG format, with standard 140x60 pixels.",
    guidelines: [
      "Format must be JPEG/JPG.",
      "Dimensions: 4.0 cm (width) x 2.0 cm (height) or 140 x 60 pixels.",
      "File size must be between 10 KB and 20 KB.",
      "Signature should be in black or blue ink on plain white paper (shadows will be removed by our tool)."
    ]
  },
  "photo-resize-for-upsc": {
    id: "photo-resize-for-upsc",
    title: "UPSC Photo Resizer & Compressor",
    description: "Format photograph for UPSC (Union Public Service Commission) civil services exam.",
    toolType: "image",
    presetName: "upsc-photo",
    category: "exam",
    widthPx: 350, // Minimum 350, standard 550x550px recommended
    heightPx: 350,
    aspectRatio: 1.0,
    minSizeKb: 20,
    maxSizeKb: 300,
    allowedFormats: ["image/jpeg"],
    seoTitle: "UPSC Photo Resizer & Compressor Online (20-300KB) | FileFit",
    seoDescription: "Format photo for UPSC application. Adjusts to square dimensions (minimum 350x350 pixels) and compresses to 20KB - 300KB in JPG format.",
    guidelines: [
      "Format must be JPEG/JPG.",
      "Dimensions: Minimum 350 x 350 pixels, maximum 1000 x 1000 pixels (square shape recommended).",
      "File size must be between 20 KB and 300 KB.",
      "Your face should occupy about 3/4th of the photo space."
    ]
  },
  "signature-resize-for-upsc": {
    id: "signature-resize-for-upsc",
    title: "UPSC Signature Resizer & Compressor",
    description: "Format signature for UPSC IAS and other examinations.",
    toolType: "signature",
    presetName: "upsc-sig",
    category: "exam",
    widthPx: 350,
    heightPx: 350,
    aspectRatio: 1.0,
    minSizeKb: 20,
    maxSizeKb: 300,
    allowedFormats: ["image/jpeg"],
    seoTitle: "UPSC Signature Resizer Online (20-300KB JPG) | FileFit",
    seoDescription: "Format and resize UPSC online signature image. Automatically resizes to UPSC specification and optimizes file size between 20KB and 300KB.",
    guidelines: [
      "Format must be JPEG/JPG.",
      "Dimensions: Minimum 350 x 350 pixels, maximum 1000 x 1000 pixels.",
      "File size must be between 20 KB and 300 KB.",
      "Sign clearly on white paper, scan or take a photo under good lighting, and upload."
    ]
  },
  "photo-resize-for-ibps": {
    id: "photo-resize-for-ibps",
    title: "IBPS Photo Resizer & Compressor",
    description: "Format photograph for IBPS Bank PO/Clerk applications.",
    toolType: "image",
    presetName: "ibps-photo",
    category: "exam",
    widthPx: 200,
    heightPx: 230,
    aspectRatio: 0.87,
    minSizeKb: 20,
    maxSizeKb: 50,
    allowedFormats: ["image/jpeg"],
    seoTitle: "IBPS Photo Resizer Online (20-50KB JPG) | FileFit",
    seoDescription: "Resize your photo for IBPS PO, Clerk, and RRB banking exams. Complies with 20KB-50KB size and 200x230 pixels NSDL standards.",
    guidelines: [
      "Dimensions: 200 x 230 pixels (preferred).",
      "File size: 20 KB to 50 KB.",
      "Format: JPG/JPEG.",
      "Make sure you upload a recent passport size color picture."
    ]
  },
  "signature-resize-for-ibps": {
    id: "signature-resize-for-ibps",
    title: "IBPS Signature Resizer & Compressor",
    description: "Format signature for IBPS Bank PO/Clerk applications.",
    toolType: "signature",
    presetName: "ibps-sig",
    category: "exam",
    widthPx: 140,
    heightPx: 60,
    aspectRatio: 2.33,
    minSizeKb: 10,
    maxSizeKb: 20,
    allowedFormats: ["image/jpeg"],
    seoTitle: "IBPS Signature Resizer Online (10-20KB) | FileFit",
    seoDescription: "Resize IBPS signature online. Fits standard 140x60 pixels and keeps the file size between 10KB and 20KB in JPG format.",
    guidelines: [
      "Dimensions: 140 x 60 pixels.",
      "File size: 10 KB to 20 KB.",
      "Format: JPG/JPEG.",
      "Note: Signature in CAPITAL LETTERS is not accepted by IBPS."
    ]
  }
};

// Returns standard exam lists
export const getExamPresets = () => 
  Object.values(PRESET_REGISTRY).filter(p => p.category === "exam");

// Returns standard document lists
export const getDocPresets = () => 
  Object.values(PRESET_REGISTRY).filter(p => p.category === "document");

// Returns general presets
export const getGeneralPresets = () => 
  Object.values(PRESET_REGISTRY).filter(p => p.category === "general");
