import Header from "@/components/header";
import Footer from "@/components/footer";
import { Scale, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FileFit",
  description: "Terms and conditions for using FileFit's file compression and editing tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-bone py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-[#0F0F0F] p-8 sm:p-12 space-y-8 shadow-[6px_6px_0px_#F5F0E8]">

          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl" style={{ background: "#fff4f0", color: "#FF5C2E" }}>
              <Scale className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
            <p className="text-gray-400 text-xs">Effective Date: June 11, 2026</p>
          </div>

          <div className="border-t border-bone-dark pt-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              Welcome to <strong className="text-gray-900">FileFit</strong>. By accessing or using our website and tools, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our platform.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              1. Acceptance of Terms
            </h3>
            <p className="mb-4">
              By accessing FileFit, you agree to comply with and be bound by these terms. These terms govern your use of all features, tools, and content provided on the FileFit website. We reserve the right to update these terms at any time without prior notice.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              2. Use of Our Services
            </h3>
            <p className="mb-4">
              FileFit provides free, browser-based tools for compressing, resizing, and formatting files. You agree to use these tools only for lawful purposes. You are strictly prohibited from using FileFit to process illegal content, infringe upon intellectual property rights, or engage in any malicious, automated abuse of our systems.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              3. Client-Side Processing & Liability
            </h3>
            <p className="mb-4">
              FileFit operates entirely on the client side. This means that all file modifications happen on your own device's hardware. We do not store, backup, or transmit your files. Therefore, you acknowledge that FileFit is not responsible for any data loss, file corruption, or unexpected results during the conversion or compression process. Always keep original copies of your files before using our tools.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              4. Intellectual Property
            </h3>
            <p className="mb-4">
              The FileFit website, including its original design, logo, text content, and underlying code, is the property of FileFit and is protected by copyright laws. You may not scrape, copy, redistribute, or reverse-engineer any part of the site without our explicit written permission.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              5. Disclaimer of Warranties
            </h3>
            <p className="mb-4">
              Our services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the tools. We do not guarantee that the site will be error-free, uninterrupted, or perfectly compatible with all file types or browsers.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF5C2E]" />
              6. Limitation of Liability
            </h3>
            <p className="mb-4">
              In no event shall FileFit, its creators, or its affiliates be liable for any direct, indirect, incidental, or consequential damages arising out of your use or inability to use our services, including but not limited to loss of data or professional damages resulting from improper file formatting.
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
