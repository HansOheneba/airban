import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Splash } from "@/components/splash";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-airbanBlue min-h-screen flex flex-col">
      <Splash>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </Splash>
    </div>
  );
}
