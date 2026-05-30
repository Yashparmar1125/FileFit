import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageWorkspace from "@/components/image-workspace";

export default function PngToJpgPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-screen pb-20">
        <ImageWorkspace defaultMode="convert" defaultFormat="image/jpeg" />
      </main>
      <Footer />
    </>
  );
}
