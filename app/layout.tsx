import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Airban Homes | Premium Doors & Real Estate Solutions",
    template: "%s · Airban Homes",
  },
  description:
    "Discover the best in real estate and premium door solutions with Airban Homes. Buy, rent, or upgrade your space with trusted property experts.",
};

export const viewport: Viewport = {
  themeColor: "#0e4783",
  viewportFit: "cover",
};

export const dynamic = "force-dynamic";

// Runs before paint so returning visitors in the same session skip the splash without a flash.
const splashFlag = `try{if(sessionStorage.getItem("airban-splash"))document.documentElement.dataset.splashSeen=""}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashFlag }} />
      </head>
      <body className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  );
}
