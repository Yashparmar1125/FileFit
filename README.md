# [FileFit](https://filefit.online) 📄✨

[Visit Website - https://filefit.online](https://filefit.online)
> **"Make Any File Fit Any Requirement."**
> An elegant, mobile-first document compliance platform that helps users resize, crop, and compress files to meet exact upload specifications. 

FileFit is designed to be the ultimate developer-friendly, privacy-focused alternative to platforms like iLovePDF, TinyPNG, and Calculator.net, optimized specifically for **students, job applicants, government exam candidates, and visa applicants**.

---

## ⚡ Core Philosophy & Architecture

### 🔒 100% Client-Side & Private
Documents contain highly sensitive candidate information (passports, signatures, national IDs). Unlike traditional web converters, **FileFit performs 100% of its file processing in-browser memory** using HTML5 Canvas, the native Web Cryptography API, and compiled in-browser WASM PDF engines. No files are ever uploaded, stored, or sent to a server.

### 📈 Programmatic SEO Engine (920+ Routes)
FileFit is architected around **5 Core Engines** mapped to **920+ programmatically generated indexable landing pages**. Every size, exam, and document landing page is statically generated from structured JSON metadata presets:

- **Image Resize & Compress Engine**: Adjusts dimensions & compresses images (JPEG, PNG) under exact KB limits (e.g. 20KB, 50KB, 100KB, 200KB).
- **Signature Resize & Cleaner Engine**: Rescales signature scans, automatically cleaning grey shadows/background noise to make the background transparent or pure white.
- **PDF Compressor Engine**: Compresses, merges, and splits PDF documents entirely client-side using `pdf-lib` and rasterization.
- **Passport & Visa Photo Engine**: Crop and scale photos to standard Indian passport sizes (3.5×4.5 cm) and global Visa formats (e.g. US 2×2 inches).
- **Government Exam Preset Uploader**: A dual-slot widget formatted to SSC, UPSC, IBPS, and bank portals, allowing candidates to format both photo and signature in a single click.

---

## 📂 Project Structure

```text
app/
├── page.tsx                     # Homepage (Tool directory with search and tabs)
├── sitemap.ts                   # Dynamic programmatic XML sitemap (920+ routes)
├── robots.ts                    # Search bot indexing parameters
├── passport-photo/              # Dedicated Passport photo maker landing page
├── photo-size/[size]/           # SSG landing page for custom photo sizes (e.g., photo-to-20kb)
├── signature-size/[size]/       # SSG landing page for signature constraints (e.g., signature-to-10kb)
├── pdf-size/[size]/             # SSG landing page for PDF limits (e.g., pdf-under-200kb)
├── exams/[exam]/                # SSG landing page for Indian & global exams (SSC, UPSC, RRB)
└── documents/[document]/        # SSG landing page for ID documents (PAN Card, Aadhaar, Visas)
src/
├── components/                  # Shared workspaces (image-workspace, pdf-workspace, etc.)
├── data/                        # JSON presets database mapping all SEO pages
└── lib/                         # Local client-side processing engines
```

---

## 🛠️ Technology Stack

- **Core Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + Vanilla CSS custom variables
- **File Processing**: 
  - HTML5 Canvas & ImageBitmap (local image interpolation)
  - `pdf-lib` (client-side PDF manipulation)
- **Icons**: Custom-designed, premium themed SVGs + Lucide React for UI elements

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Yashparmar1125/FileFit.git
   cd FileFit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the live app.

4. Build for production:
   ```bash
   npm run build
   ```
   This compiles Next.js with TS validation and pre-renders the high-priority SEO landing pages statically (SSG).

---

## 🛣️ Monetization Roadmap

- **Phase 1: AdSense** — Lightweight, non-intrusive ad placement matching fixed-container layouts (CLS-optimized).
- **Phase 2: Premium (₹99/month)** — Adds batch file processing, unlimited usage, and removes ads.
- **Phase 3: Developer API** — Provides public programmatic access (`POST /resize-image`, `POST /compress-pdf`) for enterprise portals.
