import Image from "next/image";
import Link from "next/link";

const linkClass = "text-gray-600 hover:text-gray-900 transition-colors";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#D5E9FF] to-white py-12 px-6 mt-auto">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Image src="/assets/logoFooter.png" alt="Airban Logo" width={120} height={40} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">NAVIGATE</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/home" className={linkClass}>Home</Link>
              <Link href="/properties" className={linkClass}>Properties</Link>
              <Link href="/doors" className={linkClass}>Doors</Link>
              <Link href="/cart" className={linkClass}>Cart</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">COMPANY</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/about" className={linkClass}>About Us</Link>
              <Link href="/contact" className={linkClass}>Contact</Link>
              <Link href="/news" className={linkClass}>News</Link>
              <Link href="/admin/login" className={`${linkClass} text-sm`}>Sign in</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">LEGAL</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/contact" className={linkClass}>Terms of Service</Link>
              <Link href="/contact" className={linkClass}>Privacy Policy</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Airban Homes. All Rights Reserved</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/people/Airban-Homes/100083341262318/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/myairbanhomes/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/company/airban-homes/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
