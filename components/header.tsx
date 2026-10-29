"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartCount, readCart } from "@/lib/cart";

const BROCHURE = "/assets/documents/Airban+Homes+Brochure.pdf";

const links = [
  { href: "/home", label: "Home" },
  { href: "/doors", label: "Our Doors" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
];

function NavLinks({ mobile = false, onClickLink }: { mobile?: boolean; onClickLink?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClickLink}
            aria-current={active ? "page" : undefined}
            className={`relative flex flex-col items-center ${mobile ? "text-lg font-medium" : "text-white text-sm font-medium"}`}
          >
            <span>{link.label}</span>
            <div
              className={`h-[2px] mt-1 rounded bg-white origin-left transition-transform duration-300 ease-in-out w-full ${
                active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cartUpdated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cartUpdated", sync);
    };
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < last || y < 100);
      setScrolled(y > 50);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out transform
      ${visible || menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      ${scrolled || menuOpen ? "bg-black/40 backdrop-blur-sm py-3" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/home" aria-label="Airban Homes home">
              <Image src="/assets/airbanWhiteLogo.png" alt="Airban Logo" width={150} height={150} priority className="cursor-pointer h-auto w-[120px] md:w-[150px]" />
            </Link>
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4">
              <NavLinks />
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="px-3 relative">
              <Link href="/cart" className="hidden lg:inline" aria-label={`Cart${count ? `, ${count} items` : ""}`}>
                <div className="relative">
                  <ShoppingCart size={18} className="text-white" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-airbanBlue text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {count}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <Button
              variant="secondary"
              className="hidden md:flex items-center bg-white text-airbanBlue hover:bg-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => window.open(BROCHURE, "_blank")}
            >
              <span>Brochure</span>
            </Button>
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 animate-in slide-in-from-top-5 fade-in duration-500 ease-out bg-black/80 backdrop-blur-lg rounded-xl px-6 py-6 space-y-6 text-white">
            <NavLinks mobile onClickLink={() => setMenuOpen(false)} />
            <div className="flex gap-2">
              <Button
                className="flex-1 flex items-center gap-2 bg-white text-airbanBlue hover:bg-gray-100 hover:scale-[1.02] transform transition-all duration-300 ease-in-out"
                onClick={() => {
                  window.open(BROCHURE, "_blank");
                  setMenuOpen(false);
                }}
                aria-label="Download Brochure"
              >
                <span className="font-medium">Brochure</span>
              </Button>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                aria-label="View Cart"
                className="flex-1 inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-white px-4 text-sm font-medium text-airbanBlue hover:bg-gray-100 hover:scale-[1.02] transform transition-all duration-300 ease-in-out"
              >
                <span className="relative">
                  <ShoppingCart size={18} className="text-airbanBlue" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {count}
                    </span>
                  )}
                </span>
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
