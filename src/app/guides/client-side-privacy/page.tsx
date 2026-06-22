import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, ShieldCheck, ServerCrash, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "The Ultimate Guide to Client-Side File Privacy | FileFit",
  description: "Learn why uploading your sensitive documents and IDs to cloud-based PDF and image compressors is a massive security risk, and how local WASM fixes it.",
  alternates: { canonical: "/guides/client-side-privacy" },
};

export default function PrivacyGuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <div className="max-w-3xl mx-auto px-4 mt-8">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors mb-8 font-medium group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Guides
          </Link>

          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#FF5C2E]">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6" style={{ letterSpacing: "-0.03em" }}>
              The Ultimate Guide to Client-Side File Privacy
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              Why you should never upload your passport or sensitive IDs to a random cloud server, and how local browser technology is changing the game.
            </p>

            <div className="bg-[#fff4f0] border border-[#ffcdbc] p-6 rounded-xl mb-10 flex gap-4 items-start">
              <ShieldCheck className="h-8 w-8 text-[#FF5C2E] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mt-0 mb-2">TL;DR Summary</h3>
                <p className="text-sm text-gray-700 m-0">
                  Most online file compressors force you to upload your files to their servers. This means your private passports and bank statements are stored on unknown hard drives. FileFit uses WebAssembly (WASM) to process files <strong>locally in your browser's memory</strong>, guaranteeing 100% data privacy.
                </p>
              </div>
            </div>

            <h2>The Cloud Upload Problem</h2>
            <p>
              Imagine you are applying for a visa or a government job. The application portal demands a scanned copy of your passport and a recent photograph, but strictly limits the file size to 50KB. Like millions of others, you Google "compress image to 50KB" and click on the first result.
            </p>
            <p>
              You drag your passport into the box, wait for the loading bar, and download the smaller file. <strong>But what actually happened?</strong>
            </p>
            <p>
              Traditional online utility sites operate on a server-side model. When you dropped your file in the box, it was physically uploaded over the internet to a server farm (often in another country). The server processed it, temporarily stored it on a hard drive, and sent it back to you. Your highly sensitive identity document just left your control.
            </p>

            <h2>Why is this dangerous?</h2>
            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="p-6 border border-gray-200 rounded-xl">
                <ServerCrash className="h-6 w-6 text-red-500 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Data Breaches</h4>
                <p className="text-sm text-gray-600">Even if a site promises to "delete your file after 1 hour," cloud storage buckets are frequently misconfigured, leaving uploaded files exposed to hackers.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <Zap className="h-6 w-6 text-yellow-500 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Data Mining</h4>
                <p className="text-sm text-gray-600">Many "free" utility tools exist solely to harvest data. They may train AI models on your documents or extract text via OCR before deleting the original file.</p>
              </div>
            </div>

            <h2>The Solution: Client-Side Processing</h2>
            <p>
              Modern web browsers (like Chrome, Firefox, and Safari) are incredibly powerful. They are no longer just document viewers; they are complete operating systems. With the advent of <strong>WebAssembly (WASM)</strong> and the <strong>HTML5 Canvas API</strong>, heavy computational tasks like image compression and PDF manipulation can now happen entirely within the browser sandbox.
            </p>
            <p>
              This is called "Client-Side Processing," and it is the architecture that powers FileFit.
            </p>
            
            <h3>How FileFit Works</h3>
            <ol>
              <li>You drag your file into our workspace.</li>
              <li>Instead of uploading your file to our server, our server downloads a tiny "compression engine" to your browser.</li>
              <li>Your device's own CPU/RAM runs the engine.</li>
              <li>The file is compressed directly in your local memory.</li>
              <li>You save the file directly to your hard drive.</li>
            </ol>

            <p>
              Because the file never crosses your router, it is mathematically impossible for us (or anyone else) to intercept or store your data. It is the exact same level of privacy as using offline software like Adobe Photoshop, but with the convenience of a web link.
            </p>

            <hr className="my-10" />
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center not-prose border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to compress your files securely?</h3>
              <div className="flex justify-center gap-4">
                <Link href="/tools/image/compress" className="bg-[#FF5C2E] text-white px-6 py-3 rounded-xl font-bold shadow-brutal hover:-translate-y-0.5 transition-transform">
                  Compress Image Locally
                </Link>
                <Link href="/tools/pdf/compress" className="bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold shadow-brutal hover:-translate-y-0.5 transition-transform">
                  Compress PDF Locally
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
