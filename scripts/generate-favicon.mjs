/**
 * generate-favicon.mjs
 * Generates favicon.ico from the FileFit SVG brand mark using Node.js canvas.
 * Run: node scripts/generate-favicon.mjs
 */

import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Draws the FileFit brand mark on a canvas context.
 * Mirrors the SVG exactly: viewBox 0 0 32 32, scaled to `size`.
 */
function drawFileFitMark(ctx, size) {
  const s = size / 32; // scale factor

  ctx.clearRect(0, 0, size, size);

  // Back doc — bone white
  ctx.fillStyle = "#F5F0E8";
  ctx.beginPath();
  ctx.roundRect(2 * s, 2 * s, 20 * s, 25 * s, 3 * s);
  ctx.fill();

  // Dog-ear shadow
  ctx.fillStyle = "rgba(15,15,15,0.12)";
  ctx.beginPath();
  ctx.moveTo(15 * s, 2 * s);
  ctx.lineTo(22 * s, 2 * s);
  ctx.lineTo(22 * s, 9 * s);
  ctx.closePath();
  ctx.fill();

  // Dog-ear fold
  ctx.fillStyle = "#C8C2B8";
  ctx.beginPath();
  ctx.moveTo(15 * s, 2 * s);
  ctx.lineTo(15 * s, 9 * s);
  ctx.lineTo(22 * s, 9 * s);
  ctx.closePath();
  ctx.fill();

  // Lines on back doc
  ctx.fillStyle = "rgba(15,15,15,0.18)";
  ctx.beginPath(); ctx.roundRect(5 * s, 13 * s, 8 * s, 2 * s, 1 * s); ctx.fill();
  ctx.beginPath(); ctx.roundRect(5 * s, 17 * s, 13 * s, 2 * s, 1 * s); ctx.fill();
  ctx.beginPath(); ctx.roundRect(5 * s, 21 * s, 10 * s, 2 * s, 1 * s); ctx.fill();

  // Front doc — brand orange
  ctx.fillStyle = "#FF5C2E";
  ctx.beginPath();
  ctx.roundRect(10 * s, 9 * s, 20 * s, 22 * s, 3 * s);
  ctx.fill();

  // Dog-ear shadow on front
  ctx.fillStyle = "rgba(15,15,15,0.18)";
  ctx.beginPath();
  ctx.moveTo(23 * s, 9 * s);
  ctx.lineTo(30 * s, 9 * s);
  ctx.lineTo(30 * s, 16 * s);
  ctx.closePath();
  ctx.fill();

  // Dog-ear fold on front
  ctx.fillStyle = "#E04820";
  ctx.beginPath();
  ctx.moveTo(23 * s, 9 * s);
  ctx.lineTo(23 * s, 16 * s);
  ctx.lineTo(30 * s, 16 * s);
  ctx.closePath();
  ctx.fill();

  // Checkmark
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.2 * s;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(15 * s, 21 * s);
  ctx.lineTo(18.5 * s, 24.5 * s);
  ctx.lineTo(25 * s, 17 * s);
  ctx.stroke();
}

/**
 * Minimal ICO writer — embeds one or more PNG frames.
 */
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + count * dirEntrySize;

  let offset = dirSize;
  const entries = pngBuffers.map((buf, i) => {
    const entry = { size: sizes[i], dataLen: buf.length, offset };
    offset += buf.length;
    return entry;
  });

  const total = offset;
  const buf = Buffer.alloc(total);
  let pos = 0;

  // ICO header
  buf.writeUInt16LE(0, pos); pos += 2;      // reserved
  buf.writeUInt16LE(1, pos); pos += 2;      // type = 1 (ICO)
  buf.writeUInt16LE(count, pos); pos += 2;  // image count

  // Directory entries
  for (const e of entries) {
    const sz = e.size >= 256 ? 0 : e.size; // 0 = 256px in ICO spec
    buf.writeUInt8(sz, pos); pos++;          // width
    buf.writeUInt8(sz, pos); pos++;          // height
    buf.writeUInt8(0, pos); pos++;           // color count (0 = no palette)
    buf.writeUInt8(0, pos); pos++;           // reserved
    buf.writeUInt16LE(1, pos); pos += 2;    // color planes
    buf.writeUInt16LE(32, pos); pos += 2;   // bits per pixel
    buf.writeUInt32LE(e.dataLen, pos); pos += 4;
    buf.writeUInt32LE(e.offset, pos); pos += 4;
  }

  // PNG data
  for (const png of pngBuffers) png.copy(buf, pos), (pos += png.length);

  return buf;
}

async function main() {
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");
    drawFileFitMark(ctx, size);
    pngBuffers.push(canvas.toBuffer("image/png"));
    console.log(`✓ Rendered ${size}×${size}`);
  }

  const icoBuffer = buildIco(pngBuffers, sizes);

  // Write favicon.ico into src/app/ (Next.js App Router)
  const outIco = path.join(__dirname, "../src/app/favicon.ico");
  fs.writeFileSync(outIco, icoBuffer);
  console.log(`✓ Written: ${outIco} (${icoBuffer.length} bytes)`);

  // Also write a PNG for use as apple-touch-icon etc.
  const canvas192 = createCanvas(192, 192);
  drawFileFitMark(canvas192.getContext("2d"), 192);
  const out192 = path.join(__dirname, "../public/filefit-icon-192.png");
  fs.writeFileSync(out192, canvas192.toBuffer("image/png"));
  console.log(`✓ Written: ${out192}`);

  console.log("\n✅ Favicon generation complete!");
}

main().catch((err) => { console.error(err); process.exit(1); });
