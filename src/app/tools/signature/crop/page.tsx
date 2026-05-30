import Header from "@/components/header";
import Footer from "@/components/footer";
import SignatureWorkspace from "@/components/signature-workspace";

export default function SigCropPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <SignatureWorkspace defaultMode="crop" />
      </main>
      <Footer />
    </>
  );
}
