/*
 * DESIGN: Florida Coastal Luxury
 * Navbar: Transparent on hero, solid on scroll. Gold accent CTA.
 * Logo left, nav center-right. About & Services have dropdown menus.
 */
import { useState, useEffect, useRef } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/WSbLUJNfPYsItOKD.png";

const aboutDropdown = [
  { label: "About Us", href: "#about" },
  { label: "Our Story", href: "#our-story" },
  { label: "Our Process", href: "#process" },
  { label: "FAQ", href: "/faq", isRoute: true },
];

const servicesDropdown = [
  { label: "Custom Home Building", href: "/services/custom-home-building", isRoute: true },
  { label: "Home Renovations", href: "/services/home-renovations", isRoute: true },
  { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling", isRoute: true },
  { label: "Bathroom Renovations", href: "/services/bathroom-renovations", isRoute: true },
  { label: "Demolition Services", href: "/services/demolition-services", isRoute: true },
  { label: "Flooring Services", href: "/services/flooring-services", isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [, setLocation] = useLocation();

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setMobileOpen(false);
    setAboutOpen(false);
    setServicesOpen(false);
    setMobileAboutOpen(false);
    setMobileServicesOpen(false);
    if (isRoute) {
      setLocation(href);
      return;
    }
    if (window.location.pathname !== "/") {
      setLocation("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkStyle = "text-white/80 hover:text-gold text-sm font-medium tracking-widest uppercase transition-colors duration-300";
  const fontStyle = { fontFamily: "'Outfit', sans-serif" };

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
            {/* Home */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className={linkStyle}
              style={fontStyle}
            >
              Home
            </a>

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => { setAboutOpen(!aboutOpen); setServicesOpen(false); }}
                onMouseEnter={() => { setAboutOpen(true); setServicesOpen(false); }}
                className={`${linkStyle} flex items-center gap-1`}
                style={fontStyle}
              >
                About
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {/* Dropdown Menu */}
              <div
                onMouseLeave={() => setAboutOpen(false)}
                className="absolute top-full left-0 pt-3"
                style={{
                  opacity: aboutOpen ? 1 : 0,
                  pointerEvents: aboutOpen ? "auto" : "none",
                  transform: aboutOpen ? "translateY(0)" : "translateY(-8px)",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  className="rounded-sm py-2 min-w-[200px]"
                  style={{
                    background: "rgba(42, 37, 32, 0.97)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(154,123,60,0.2)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  {aboutDropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.isRoute); }}
                      className="block px-5 py-3 text-white/80 hover:text-gold hover:bg-white/5 text-sm tracking-wide transition-all duration-200"
                      style={fontStyle}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setAboutOpen(false); }}
                onMouseEnter={() => { setServicesOpen(true); setAboutOpen(false); }}
                className={`${linkStyle} flex items-center gap-1`}
                style={fontStyle}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {/* Dropdown Menu */}
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute top-full left-0 pt-3"
                style={{
                  opacity: servicesOpen ? 1 : 0,
                  pointerEvents: servicesOpen ? "auto" : "none",
                  transform: servicesOpen ? "translateY(0)" : "translateY(-8px)",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  className="rounded-sm py-2 min-w-[240px]"
                  style={{
                    background: "rgba(42, 37, 32, 0.97)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(154,123,60,0.2)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  {servicesDropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.isRoute); }}
                      className="block px-5 py-3 text-white/80 hover:text-gold hover:bg-white/5 text-sm tracking-wide transition-all duration-200"
                      style={fontStyle}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); handleNavClick("#projects"); }}
              className={linkStyle}
              style={fontStyle}
            >
              Projects
            </a>

            {/* Pricing */}
            <a
              href="/pricing"
              onClick={(e) => { e.preventDefault(); handleNavClick("/pricing", true); }}
              className={linkStyle}
              style={fontStyle}
            >
              Pricing
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className={linkStyle}
              style={fontStyle}
            >
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4">
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
        <div className="flex flex-col items-center justify-center h-full gap-3 overflow-y-auto py-24 px-6">
          {/* Home */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "0ms" : "0ms" }}
          >
            Home
          </a>

          {/* About Accordion */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "80ms" : "0ms" }}
            >
              About
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileAboutOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className="flex flex-col items-center overflow-hidden transition-all duration-300"
              style={{ maxHeight: mobileAboutOpen ? "300px" : "0px", opacity: mobileAboutOpen ? 1 : 0, marginTop: mobileAboutOpen ? "8px" : "0px" }}
            >
              {aboutDropdown.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.isRoute); }}
                  className="text-white/60 text-base py-1.5 hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services Accordion */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "160ms" : "0ms" }}
            >
              Services
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className="flex flex-col items-center overflow-hidden transition-all duration-300"
              style={{ maxHeight: mobileServicesOpen ? "400px" : "0px", opacity: mobileServicesOpen ? 1 : 0, marginTop: mobileServicesOpen ? "8px" : "0px" }}
            >
              {servicesDropdown.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.isRoute); }}
                  className="text-white/60 text-base py-1.5 hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Projects */}
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); handleNavClick("#projects"); }}
            className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "240ms" : "0ms" }}
          >
            Projects
          </a>

          {/* Pricing */}
          <a
            href="/pricing"
            onClick={(e) => { e.preventDefault(); handleNavClick("/pricing", true); }}
            className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "320ms" : "0ms" }}
          >
            Pricing
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="text-white text-xl font-light tracking-widest uppercase hover:text-gold transition-all duration-300"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transitionDelay: mobileOpen ? "400ms" : "0ms" }}
          >
            Contact
          </a>

          {/* Phone CTA */}
          <a
            href="tel:7274855996"
            className="mt-4 btn-gold px-8 py-3 rounded-sm text-lg tracking-wider flex items-center gap-3"
            style={{
              transitionDelay: mobileOpen ? "480ms" : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <Phone className="w-5 h-5" />
            (727) 485-5996
          </a>
        </div>
      </div>
    </>
  );
}
