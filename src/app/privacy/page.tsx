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
            <p className="text-gray-400 text-xs">Effective Date: June 11, 2026</p>
          </div>

          <div className="border-t border-bone-dark pt-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              Welcome to <strong className="text-gray-900">FileFit</strong>. Your privacy is critically important to us. This Privacy Policy outlines what information we collect, how we protect your files, and how we operate our services to ensure your data remains completely secure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {[
                { icon: ServerOff, title: "Zero Server Uploads", desc: "Your files never leave your device. All processing happens locally." },
                { icon: Lock, title: "Total Security", desc: "Because we never receive files, there is zero risk of data interception." },
                { icon: EyeOff, title: "No Prying Eyes", desc: "We cannot view, share, or store the contents of your documents." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 rounded-xl flex flex-col items-center text-center gap-2" style={{ background: "#faf8f5", border: "1px solid #e8e2d8" }}>
                  <Icon className="h-5 w-5" style={{ color: "#FF5C2E" }} />
                  <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">{title}</span>
                  <span className="text-[10px] text-[#888]">{desc}</span>
                </div>
              ))}
            </div>

            <h3 className="text-gray-900 text-base font-bold mb-2">1. How We Process Your Files</h3>
            <p className="mb-4">
              Unlike conventional web tools that force you to upload documents to a remote cloud server, FileFit is built using modern Web APIs (like HTML5 Canvas and WebAssembly). When you compress an image or edit a PDF, the computational work is performed entirely by your own device's web browser sandbox. Consequently, <strong>we do not upload, transmit, store, or have any access to your files.</strong>
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2">2. Information We Do Not Collect</h3>
            <p className="mb-4">
              Since our service operates directly in your browser, you do not need to create an account, provide an email address, or submit personal information to use FileFit. We do not maintain user profiles, databases containing personal identifiers, or logs of the files you process.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2">3. Third-Party Analytics and Advertising</h3>
            <p className="mb-4">
              To keep FileFit free, we partner with third-party advertising networks (such as Google AdSense) and use basic analytics tools to understand how people navigate our site. 
              These third parties may use cookies, web beacons, and device identifiers to collect non-personally identifiable information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
              You can opt out of personalized advertising by visiting Google's Ad Settings or adjusting your browser's cookie preferences.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2">4. Your Consent & Policy Changes</h3>
            <p className="mb-4">
              By using FileFit, you consent to this Privacy Policy. We reserve the right to modify this privacy policy at any time to reflect updates to our practices. Any changes will be updated directly on this page. By continuing to use FileFit, you acknowledge and agree to our client-side processing model.
            </p>

            <h3 className="text-gray-900 text-base font-bold mb-2">5. Contact Us</h3>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us via our Contact page or email us directly at support@filefit.com.
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
