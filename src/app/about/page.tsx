import Header from "@/components/header";
import Footer from "@/components/footer";
import { ShieldCheck, Code, Mail, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FileFit — Secure Local File Resizing & Formatting",
  description: "Learn how FileFit processes files 100% client-side in browser memory without sending data to servers. Meet the developer and inspect our open-source code.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-bone py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-bone-dark p-8 sm:p-12 space-y-8 shadow-sm">
          
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-500">
              <ShieldCheck className="h-8 w-8" style={{ color: "#FF5C2E" }} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">About FileFit</h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              A privacy-first document compliance platform designed to format your photos, signatures, and PDFs locally inside your browser.
            </p>
          </div>

          <div className="border-t border-bone-dark pt-8 space-y-8 text-gray-600 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-gray-900 text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-500" style={{ color: "#FF5C2E" }} />
                Our Privacy Philosophy
              </h2>
              <p>
                Most online compressors force you to upload private files to their remote servers, creating security risks for documents containing sensitive data like passport scans, signatures, and IDs.
              </p>
              <p>
                FileFit is engineered from the ground up to operate <strong>100% client-side</strong>. Using modern browser features such as HTML5 Canvas, WebAssembly (WASM), and client-side JavaScript, all processing is performed inside your local browser memory sandbox. Your original files never cross the network or touch a cloud server.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-gray-900 text-lg font-bold flex items-center gap-2">
                <Code className="h-5 w-5 text-brand-500" style={{ color: "#FF5C2E" }} />
                Open Source & Transparency
              </h2>
              <p>
                We believe that trust requires verification. That is why FileFit's codebase is fully open-source. Anyone can audit, run, or verify our claim that no files are uploaded.
              </p>
              <div className="pt-2">
                <Link
                  href="https://github.com/Yashparmar1125/FileFit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bone border border-bone-dark hover:border-brand-300 text-gray-800 font-bold transition-all text-xs"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  View GitHub Repository
                </Link>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-gray-900 text-lg font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-500" style={{ color: "#FF5C2E" }} />
                Developer Credit
              </h2>
              <p>
                FileFit was built and is maintained by <strong>Yash Parmar</strong>, a software developer passionate about building performant, privacy-preserving web utilities.
              </p>
              <p>
                The project aims to make government recruitment registrations, visa applications, and general document handling simple and seamless for everyone.
              </p>
            </section>

            <section className="space-y-3 border-t border-bone-dark pt-6">
              <h2 className="text-gray-900 text-lg font-bold flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-500" style={{ color: "#FF5C2E" }} />
                Get in Touch
              </h2>
              <p>
                Have feedback, feature requests, or questions about the compression engines? Feel free to open an issue on our GitHub repository or contact us directly at:
              </p>
              <p className="font-semibold text-gray-900">
                <Link href="mailto:contact@filefit.online" className="hover:text-brand-500 transition-colors">
                  contact@filefit.online
                </Link>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
