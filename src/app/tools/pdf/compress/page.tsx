import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfWorkspace from "@/components/pdf-workspace";

export default function PdfCompressPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <PdfWorkspace defaultMode="compress" />
      </main>
      <Footer />
    </>
  );
}
