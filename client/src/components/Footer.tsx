/*
 * DESIGN: Florida Coastal Luxury
 * Footer: Dark charcoal, multi-column layout, gold accents.
 * Services now link to individual service pages.
 */
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/WSbLUJNfPYsItOKD.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Process", href: "#process" },
  { label: "Build-Ready Estates", href: "/build-ready-estates", isRoute: true },
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "Warranty", href: "/warranty", isRoute: true },
  { label: "FAQs", href: "/faq", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "Custom Home Building", href: "/services/custom-home-building" },
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      setLocation(href);
      window.scrollTo(0, 0);
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceClick = (href: string) => {
    setLocation(href);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-charcoal border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-gold py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-charcoal text-xl sm:text-2xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Ready to build your dream home?
          </h3>
          <a
            href="tel:7279991959"
            className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-sm hover:bg-charcoal-light transition-colors duration-300 text-sm tracking-wider"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
          >
            <Phone className="w-4 h-4" />
            Call (727) 999-1959
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="Matlock Custom Homes" className="h-14 w-auto mb-4" />
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              Premium quality custom home builder serving Tampa Bay Area. Licensed and insured.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href, link.isRoute); }}
                    className="text-white/50 hover:text-gold text-sm transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    onClick={(e) => { e.preventDefault(); handleServiceClick(service.href); }}
                    className="text-white/50 hover:text-gold text-sm transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
              Contact
            </h4>
            <div className="space-y-4">
              <a href="tel:7279991959" className="flex items-center gap-3 text-white/50 hover:text-gold text-sm transition-colors duration-300" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                (727) 999-1959
              </a>
              <a href="mailto:matlockhomes@icloud.com" className="flex items-center gap-3 text-white/50 hover:text-gold text-sm transition-colors duration-300" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                matlockhomes@icloud.com
              </a>
              <a
                href="https://maps.google.com/?q=8219+Massachusetts+Ave+New+Port+Richey+FL+34653"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 hover:text-gold text-sm transition-colors duration-300"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                8219 Massachusetts Ave,<br />New Port Richey, FL 34653
              </a>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/105088618340246/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/matlockcustomhomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@MatlockCustomHomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/byron-matlock-a25463a2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            &copy; {new Date().getFullYear()} Matlock Custom Homes. All rights reserved.
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Licensed & Insured Florida Builder
          </p>
        </div>
      </div>
    </footer>
  );
}
