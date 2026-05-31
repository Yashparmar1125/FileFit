/**
 * generate-favicon-pure.mjs
 * Pure Node.js favicon generator — no native modules needed.
 * Generates a multi-size ICO with the FileFit brand mark using raw PNG encoding.
 *
 * Run: node scripts/generate-favicon-pure.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── RGBA pixel renderer ──────────────────────────────────────────────────
function hexToRgba(hex, a = 255) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, a];
}

function lerp(a, b, t) { return a + (b - a) * t; }

// Paint a rounded rectangle into the pixel buffer
function fillRoundRect(pixels, W, x, y, w, h, r, color) {
  const [R, G, B, A] = color;
  for (let py = Math.floor(y); py < Math.ceil(y + h); py++) {
    for (let px = Math.floor(x); px < Math.ceil(x + w); px++) {
      if (px < 0 || py < 0 || px >= W || py >= W) continue;
      // corner distance check
      const cx = Math.max(x + r, Math.min(x + w - r, px + 0.5));
      const cy = Math.max(y + r, Math.min(y + h - r, py + 0.5));
      const dx = px + 0.5 - cx, dy = py + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.max(0, Math.min(1, r - dist + 0.5));
      const idx = (py * W + px) * 4;
      // Alpha-blend over existing
      const ea = pixels[idx + 3] / 255;
      const na = A / 255 * alpha;
      const oa = na + ea * (1 - na);
      if (oa < 0.001) continue;
      pixels[idx]     = Math.round((R * na + pixels[idx]     * ea * (1 - na)) / oa);
      pixels[idx + 1] = Math.round((G * na + pixels[idx + 1] * ea * (1 - na)) / oa);
      pixels[idx + 2] = Math.round((B * na + pixels[idx + 2] * ea * (1 - na)) / oa);
      pixels[idx + 3] = Math.round(oa * 255);
    }
  }
}

function fillPolygon(pixels, W, points, color) {
  const [R, G, B, A] = color;
  const alpha = A / 255;
  // Simple scanline fill
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
  const minY = Math.floor(Math.min(...ys)), maxY = Math.ceil(Math.max(...ys));
  for (let y = minY; y <= maxY; y++) {
    const intersections = [];
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const y0 = points[i][1], y1 = points[j][1];
      if ((y0 <= y && y < y1) || (y1 <= y && y < y0)) {
        const t = (y - y0) / (y1 - y0);
        intersections.push(lerp(points[i][0], points[j][0], t));
      }
    }
    intersections.sort((a, b) => a - b);
    for (let k = 0; k + 1 < intersections.length; k += 2) {
      for (let x = Math.floor(intersections[k]); x < Math.ceil(intersections[k + 1]); x++) {
        if (x < 0 || y < 0 || x >= W || y >= W) continue;
        const idx = (y * W + x) * 4;
        const ea = pixels[idx + 3] / 255;
        const oa = alpha + ea * (1 - alpha);
        if (oa < 0.001) continue;
        pixels[idx]     = Math.round((R * alpha + pixels[idx]     * ea * (1 - alpha)) / oa);
        pixels[idx + 1] = Math.round((G * alpha + pixels[idx + 1] * ea * (1 - alpha)) / oa);
        pixels[idx + 2] = Math.round((B * alpha + pixels[idx + 2] * ea * (1 - alpha)) / oa);
        pixels[idx + 3] = Math.round(oa * 255);
      }
    }
  }
}

function strokeLine(pixels, W, x0, y0, x1, y1, lineWidth, color) {
  const [R, G, B, A] = color;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(len * 4);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = x0 + dx * t, cy = y0 + dy * t;
    const hw = lineWidth / 2;
    for (let py = Math.floor(cy - hw - 1); py <= Math.ceil(cy + hw + 1); py++) {
      for (let px = Math.floor(cx - hw - 1); px <= Math.ceil(cx + hw + 1); px++) {
        if (px < 0 || py < 0 || px >= W || py >= W) continue;
        const d = Math.sqrt((px + 0.5 - cx) ** 2 + (py + 0.5 - cy) ** 2);
        const alpha = Math.max(0, Math.min(1, hw - d + 0.5)) * (A / 255);
        const idx = (py * W + px) * 4;
        const ea = pixels[idx + 3] / 255;
        const oa = alpha + ea * (1 - alpha);
        if (oa < 0.001) continue;
        pixels[idx]     = Math.round((R * alpha + pixels[idx]     * ea * (1 - alpha)) / oa);
        pixels[idx + 1] = Math.round((G * alpha + pixels[idx + 1] * ea * (1 - alpha)) / oa);
        pixels[idx + 2] = Math.round((B * alpha + pixels[idx + 2] * ea * (1 - alpha)) / oa);
        pixels[idx + 3] = Math.round(oa * 255);
      }
    }
  }
}

// Draw the FileFit brand mark, scaled so SVG viewBox 0 0 32 32 → WxW canvas
function renderFileFitMark(W) {
  const pixels = new Uint8Array(W * W * 4); // RGBA, fully transparent
  const s = W / 32;

  // Back doc — bone white
  fillRoundRect(pixels, W, 2*s, 2*s, 20*s, 25*s, 3*s, hexToRgba("#F5F0E8"));

  // Dog-ear shadow
  fillPolygon(pixels, W,
    [[15*s, 2*s], [22*s, 2*s], [22*s, 9*s]],
    [15, 15, 15, Math.round(0.12 * 255)]
  );

  // Dog-ear fold
  fillPolygon(pixels, W,
    [[15*s, 2*s], [15*s, 9*s], [22*s, 9*s]],
    hexToRgba("#C8C2B8")
  );

  // Lines on back doc
  fillRoundRect(pixels, W, 5*s, 13*s, 8*s, 2*s, 1*s, [15, 15, 15, Math.round(0.18 * 255)]);
  fillRoundRect(pixels, W, 5*s, 17*s, 13*s, 2*s, 1*s, [15, 15, 15, Math.round(0.18 * 255)]);
  fillRoundRect(pixels, W, 5*s, 21*s, 10*s, 2*s, 1*s, [15, 15, 15, Math.round(0.18 * 255)]);

  // Front doc — brand orange
  fillRoundRect(pixels, W, 10*s, 9*s, 20*s, 22*s, 3*s, hexToRgba("#FF5C2E"));

  // Dog-ear shadow on front
  fillPolygon(pixels, W,
    [[23*s, 9*s], [30*s, 9*s], [30*s, 16*s]],
    [15, 15, 15, Math.round(0.18 * 255)]
  );

  // Dog-ear fold on front
  fillPolygon(pixels, W,
    [[23*s, 9*s], [23*s, 16*s], [30*s, 16*s]],
    hexToRgba("#E04820")
  );

  // Checkmark: M15 21 L18.5 24.5 L25 17
  const lw = 2.2 * s;
  strokeLine(pixels, W, 15*s, 21*s, 18.5*s, 24.5*s, lw, hexToRgba("#FFFFFF"));
  strokeLine(pixels, W, 18.5*s, 24.5*s, 25*s, 17*s, lw, hexToRgba("#FFFFFF"));

  return pixels;
}

// ─── Minimal PNG encoder ────────────────────────────────────────────────────
function crc32(buf) {
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[i] = c;
    }
    return t;
  })());
  let c = 0xFFFFFFFF;
  for (const b of buf) c = table[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.concat([typeBytes, data]);
  const crcVal = Buffer.alloc(4); crcVal.writeUInt32BE(crc32(crcBuf), 0);
  return Buffer.concat([len, typeBytes, data, crcVal]);
}

function encodePNG(pixels, W) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(W, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw image data: filter byte (0) + RGBA row per scanline
  const raw = Buffer.alloc(W * (1 + W * 4));
  for (let y = 0; y < W; y++) {
    raw[y * (1 + W * 4)] = 0; // filter = None
    for (let x = 0; x < W; x++) {
      const src = (y * W + x) * 4;
      const dst = y * (1 + W * 4) + 1 + x * 4;
      raw[dst]     = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
      raw[dst + 3] = pixels[src + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", compressed), chunk("IEND", Buffer.alloc(0))]);
}

// ─── ICO builder ────────────────────────────────────────────────────────────
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = pngBuffers.map((buf, i) => {
    const e = { size: sizes[i], dataLen: buf.length, offset };
    offset += buf.length;
    return e;
  });
  const buf = Buffer.alloc(offset);
  let pos = 0;
  buf.writeUInt16LE(0, pos); pos += 2;
  buf.writeUInt16LE(1, pos); pos += 2;
  buf.writeUInt16LE(count, pos); pos += 2;
  for (const e of entries) {
    const sz = e.size >= 256 ? 0 : e.size;
    buf[pos++] = sz; buf[pos++] = sz;
    buf[pos++] = 0; buf[pos++] = 0;
    buf.writeUInt16LE(1, pos); pos += 2;
    buf.writeUInt16LE(32, pos); pos += 2;
    buf.writeUInt32LE(e.dataLen, pos); pos += 4;
    buf.writeUInt32LE(e.offset, pos); pos += 4;
  }
  for (const png of pngBuffers) { png.copy(buf, pos); pos += png.length; }
  return buf;
}

// ─── Main ───────────────────────────────────────────────────────────────────
const sizes = [16, 32, 48];
const pngBuffers = sizes.map(sz => {
  const pixels = renderFileFitMark(sz);
  return encodePNG(pixels, sz);
});

const icoBuffer = buildIco(pngBuffers, sizes);

const outDir = path.join(__dirname, "../src/app");
const outIco = path.join(outDir, "favicon.ico");
fs.writeFileSync(outIco, icoBuffer);
console.log(`✅ favicon.ico written → ${outIco} (${icoBuffer.length} bytes, sizes: 16/32/48)`);

// Also write a 192px PNG for Google / PWA use
const pixels192 = renderFileFitMark(192);
const png192 = encodePNG(pixels192, 192);
const outPng = path.join(__dirname, "../public/filefit-icon-192.png");
fs.writeFileSync(outPng, png192);
console.log(`✅ filefit-icon-192.png written → ${outPng}`);
