import { MetadataRoute } from "next";
import EXAMS_DATA from "@/data/exam-requirements.json";
import DOCUMENTS_DATA from "@/data/document-requirements.json";

const DOMAIN = "https://filefit.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  const addRoute = (path: string, priority: number = 0.5) => {
    routes.push({
      url: `${DOMAIN}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: priority,
    });
  };

  // 1. Core pages
  addRoute("", 1.0);
  addRoute("/privacy", 0.3);
  addRoute("/about", 0.5);
  addRoute("/passport-photo", 0.8);
  addRoute("/tools", 0.7);

  // 2. Generic tools
  addRoute("/tools/image/resize", 0.8);
  addRoute("/tools/image/compress", 0.8);
  addRoute("/tools/image/jpg-to-png", 0.7);
  addRoute("/tools/image/png-to-jpg", 0.7);
  addRoute("/tools/pdf/compress", 0.8);
  addRoute("/tools/pdf/merge", 0.8);
  addRoute("/tools/pdf/split", 0.8);
  addRoute("/tools/pdf/image-to-pdf", 0.7);
  addRoute("/tools/signature/resize", 0.8);
  addRoute("/tools/signature/crop", 0.7);

  // 3. Exams dynamic route presets
  EXAMS_DATA.forEach((exam) => {
    addRoute(`/exams/${exam.slug}`, 0.9);
  });

  // 4. Documents dynamic route presets
  DOCUMENTS_DATA.forEach((doc) => {
    addRoute(`/documents/${doc.slug}`, 0.9);
  });



  return routes;
}
