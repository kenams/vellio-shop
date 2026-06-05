import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NewsletterPopup } from "@/components/ui/newsletter-popup";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
