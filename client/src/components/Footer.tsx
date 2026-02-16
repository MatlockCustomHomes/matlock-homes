/*
 * DESIGN: Florida Coastal Luxury
 * Footer: Dark charcoal, multi-column layout, gold accents.
 */
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/WSbLUJNfPYsItOKD.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "Warranty", href: "/warranty", isRoute: true },
  { label: "FAQs", href: "/faq", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Custom Home Building",
  "Home Renovations",
  "Kitchen Remodeling",
  "Bathroom Renovations",
  "Demolition Services",
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
              Premium quality custom home builder serving South Florida. Licensed and insured.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gold text-sm tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href, (link as any).isRoute); }}
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
                <li key={service}>
                  <span className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    {service}
                  </span>
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
              <div className="flex items-center gap-3 text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                New Port Richey, FL
              </div>
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
