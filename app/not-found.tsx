import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NotFoundContent } from "@/components/not-found-content";

// Unknown top-level URLs never reach the public layout, so this one brings its own header and footer.
export default function NotFound() {
  return (
    <div className="bg-airbanBlue min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
