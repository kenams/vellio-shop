import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
