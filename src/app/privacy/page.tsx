import Header from "@/components/header";
import Footer from "@/components/footer";
import { ShieldCheck, Lock, EyeOff, ServerOff } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FileFit",
  description: "Learn how FileFit protects your documents and data using client-side processing.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-bone py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-[#0F0F0F] p-8 sm:p-12 space-y-8 shadow-[6px_6px_0px_#F5F0E8]">

          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl" style={{ background: "#fff4f0", color: "#FF5C2E" }}>
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-400 text-xs">Last Updated: May 30, 2026</p>
          </div>

          <div className="border-t border-bone-dark pt-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              At <strong className="text-gray-900">FileFit</strong>, we take user privacy extremely seriously. Our platform is architected around a single, foundational principle:{" "}
              <strong className="text-gray-900">your files are your own, and they should never leave your device.</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {[
                { icon: ServerOff, title: "No Server Uploads", desc: "Files are processed in-browser. Zero server transmission." },
                { icon: Lock, title: "Local Sandbox", desc: "HTML5 Canvas and PDF libraries execute locally in JavaScript." },
                { icon: EyeOff, title: "No Data Tracking", desc: "We do not read, index, parse, or track contents of your uploads." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 rounded-xl flex flex-col items-center text-center gap-2" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
                  <Icon className="h-5 w-5" style={{ color: "#FF5C2E" }} />
                  <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">{title}</span>
                  <span className="text-[10px] text-[#888]">{desc}</span>
                </div>
              ))}
            </div>

            {[
              {
                title: "1. File Processing Model",
                body: "Traditional online PDF and image compressors require you to upload documents to their cloud servers, where they are queued, compressed, and stored temporarily. FileFit uses client-side WebAssembly (WASM) and Canvas rendering. When you upload a file, the processing is performed entirely in your browser sandbox. The file never travels across the network to our servers.",
              },
              {
                title: "2. Information Collection",
                body: "We do not collect any personal identifier data. Because there is no registration or login required to use our service, we do not have databases containing user profiles, emails, or password records.",
              },
              {
                title: "3. Cookies & Advertising",
                body: "We utilize standard analytical metrics to track website performance (such as visitor counts and landing page popularity) to improve user flows. We display advertisements via third-party providers (such as Google AdSense). These advertising networks may use cookies or device identifiers to serve tailored ads based on browsing history. You may opt out of personalized advertising by adjusting your browser settings or Google Ad Settings.",
              },
              {
                title: "4. Changes to This Policy",
                body: "We reserve the right to modify this privacy policy at any time. Any changes will be updated directly on this page. By continuing to use FileFit, you acknowledge and agree to our client-side processing model.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="text-gray-900 text-base font-bold mb-2">{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
