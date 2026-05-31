import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/static/", "/api/"],
      },
      {
        // Explicitly welcome AI search/citation bots
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "anthropic-ai"],
        allow: "/",
      }
    ],
    sitemap: "https://filefit.online/sitemap.xml",
  };
}
