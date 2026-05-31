import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          position: "relative",
        }}
      >
        {/* Back doc — bone white */}
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            width: 20,
            height: 25,
            borderRadius: 3,
            background: "#F5F0E8",
            display: "flex",
          }}
        />
        {/* Dog-ear fold (grey) */}
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 2,
            width: 7,
            height: 7,
            background: "#C8C2B8",
            display: "flex",
          }}
        />
        {/* Lines on back doc */}
        <div style={{ position: "absolute", left: 5, top: 13, width: 8, height: 2, borderRadius: 1, background: "rgba(15,15,15,0.18)", display: "flex" }} />
        <div style={{ position: "absolute", left: 5, top: 17, width: 13, height: 2, borderRadius: 1, background: "rgba(15,15,15,0.18)", display: "flex" }} />
        <div style={{ position: "absolute", left: 5, top: 21, width: 10, height: 2, borderRadius: 1, background: "rgba(15,15,15,0.18)", display: "flex" }} />

        {/* Front doc — brand orange */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 9,
            width: 20,
            height: 22,
            borderRadius: 3,
            background: "#FF5C2E",
            display: "flex",
          }}
        />
        {/* Dog-ear fold (dark orange) on front */}
        <div
          style={{
            position: "absolute",
            left: 23,
            top: 9,
            width: 7,
            height: 7,
            background: "#E04820",
            display: "flex",
          }}
        />

        {/* Checkmark — left diagonal */}
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 21,
            width: 6,
            height: 2,
            borderRadius: 1,
            background: "#fff",
            transform: "rotate(45deg)",
            transformOrigin: "left center",
            display: "flex",
          }}
        />
        {/* Checkmark — right diagonal (longer) */}
        <div
          style={{
            position: "absolute",
            left: 17,
            top: 22,
            width: 9,
            height: 2,
            borderRadius: 1,
            background: "#fff",
            transform: "rotate(-45deg)",
            transformOrigin: "left center",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
