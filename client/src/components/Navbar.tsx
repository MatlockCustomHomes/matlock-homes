/*
 * DESIGN: Florida Coastal Luxury
 * Navbar: Transparent on hero, solid on scroll. Gold accent CTA.
 * Logo left, nav center-right, phone CTA far right.
 */
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/WSbLUJNfPYsItOKD.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20 lg:h-24 mt-2">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex-shrink-0 -ml-2 lg:-ml-4"
          >
            <img
              src={LOGO_URL}
              alt="Matlock Custom Homes"
              className="h-12 lg:h-16 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-white/80 hover:text-gold text-sm font-medium tracking-widest uppercase transition-colors duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:7279991959"
              className="hidden sm:flex items-center gap-2 btn-gold px-5 py-2.5 rounded-sm text-sm tracking-wider"
            >
              <Phone className="w-4 h-4" />
              (727) 999-1959
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-white text-2xl font-light tracking-widest uppercase transition-all duration-300 hover:text-gold"
              style={{
                fontFamily: "'DM Serif Display', serif",
                transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:7279991959"
            className="mt-4 btn-gold px-8 py-3 rounded-sm text-lg tracking-wider flex items-center gap-3"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <Phone className="w-5 h-5" />
            (727) 999-1959
          </a>
        </div>
      </div>
    </>
  );
}
