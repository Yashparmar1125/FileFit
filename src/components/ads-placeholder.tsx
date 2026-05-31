"use client";

import { useEffect, useState } from "react";

interface AdsPlaceholderProps {
  slot?: string;
  format?: "auto" | "rectangle" | "leaderboard" | "horizontal" | "vertical";
  className?: string;
}

export default function AdsPlaceholder({ slot, format = "auto", className = "" }: AdsPlaceholderProps) {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-5681219308522655";

  useEffect(() => {
    // Ad-blocker detection
    const testAd = document.createElement("div");
    testAd.innerHTML = "&nbsp;";
    testAd.className = "adsbygoogle";
    testAd.style.cssText = "position:absolute;left:-9999px;top:-9999px;";
    document.body.appendChild(testAd);

    let pushed = false;

    const tryPush = (insEl: Element | null) => {
      if (pushed || !insEl) return;
      // Only push when the container has a real width
      if ((insEl as HTMLElement).offsetWidth > 0) {
        pushed = true;
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense trigger error:", e);
        }
      }
    };

    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        setIsAdBlockerActive(true);
        testAd.remove();
        return;
      }
      testAd.remove();

      // Find the <ins> inside this component instance
      const insEl = document.querySelector(`ins[data-ad-slot="${slot || getDefaultSlot()}"]`);

      // Try immediately first (page may already be laid out)
      tryPush(insEl);

      if (!pushed && insEl) {
        // Fall back to ResizeObserver until width is non-zero
        const ro = new ResizeObserver(() => {
          tryPush(insEl);
          if (pushed) ro.disconnect();
        });
        ro.observe(insEl);
        // Safety cleanup after 5 s
        setTimeout(() => ro.disconnect(), 5000);
      }
    }, 200);
  }, []);

  const getDimensionsClass = () => {
    switch (format) {
      case "leaderboard": return "w-full min-h-[90px] max-w-[728px]";
      case "rectangle": return "w-full min-h-[250px] max-w-[336px]";
      case "horizontal": return "w-full min-h-[90px]";
      case "vertical": return "w-[120px] md:w-[160px] min-h-[600px]";
      default: return "w-full min-h-[90px] md:min-h-[250px]";
    }
  };

  const getDefaultSlot = () => {
    switch (format) {
      case "leaderboard": return "1414039077";
      case "rectangle": return "7787875731";
      case "horizontal": return "2292006478";
      default: return "2292006478";
    }
  };

  if (isAdBlockerActive) return <div className="hidden" aria-hidden="true" />;

  return (
    <div
      className={`mx-auto my-4 flex flex-col items-center justify-center rounded-xl border border-[#e9ecef] bg-[#f8f9fa] relative overflow-hidden ${getDimensionsClass()} ${className}`}
    >
      <span className="absolute top-1 left-2 text-[9px] uppercase tracking-widest text-gray-400 font-medium">
        Advertisement
      </span>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot || getDefaultSlot()}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
