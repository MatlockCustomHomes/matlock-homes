/*
 * DESIGN: Florida Coastal Luxury
 * Contact: Cream background, two-column layout.
 * Left: contact info + Google Maps. Right: contact form.
 */
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MapView } from "./Map";

// Matlock Custom Homes office coordinates
const OFFICE_LOCATION = { lat: 28.259031, lng: -82.6787113 };

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Thank you! We'll contact you shortly.", {
          description: "A Matlock Homes professional will reach out to discuss your project.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      toast.error("Network error. Please try again or call (727) 999-1959.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMapReady = (map: google.maps.Map) => {
    // Add a marker for the office location
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: OFFICE_LOCATION,
      title: "Matlock Custom Homes",
    });
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "(727) 999-1959", href: "tel:7279991959" },
    { icon: Mail, label: "Email", value: "matlockhomes@icloud.com", href: "mailto:matlockhomes@icloud.com" },
    { icon: MapPin, label: "Location", value: "8219 Massachusetts Ave, New Port Richey, FL 34653", href: "https://maps.google.com/?q=8219+Massachusetts+Ave+New+Port+Richey+FL+34653" },
    { icon: Clock, label: "Hours", value: "Monday - Friday: 8AM - 5PM", href: "#" },
  ];

  return (
    <section id="contact" ref={ref} className="relative bg-cream py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-gold text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Get In Touch
          </p>
          <h2
            className="text-charcoal text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
          >
            Let's Start <span className="text-gold italic">Building</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info + Map */}
          <div
            className="transition-all duration-1000"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transitionDelay: "300ms" }}
          >
            <h3
              className="text-charcoal text-2xl mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Ready to create your dream home?
            </h3>
            <p
              className="text-slate text-base leading-relaxed mb-10"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75 }}
            >
              Fill out the form and a Matlock Homes professional will contact you to discuss your future project. Whether you're building from the ground up or rebuilding on your existing lot, we're here to help.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${500 + i * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:shadow-gold/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-slate text-xs tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.label}</p>
                    <p className="text-charcoal font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Maps */}
            <div
              className="mt-10 rounded-sm overflow-hidden shadow-lg shadow-black/5 border border-sand/50 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "900ms",
              }}
            >
              <MapView
                className="h-[280px] w-full"
                initialCenter={OFFICE_LOCATION}
                initialZoom={14}
                onMapReady={handleMapReady}
              />
              <div className="bg-white px-4 py-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <p className="text-charcoal text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  8219 Massachusetts Ave, New Port Richey, FL 34653
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.facebook.com/105088618340246/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/matlockcustomhomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/byron-matlock-a25463a2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="transition-all duration-1000"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transitionDelay: "400ms" }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-sm shadow-xl shadow-black/5 p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-charcoal text-sm font-medium mb-2 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-sand rounded-sm bg-cream/50 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-charcoal text-sm font-medium mb-2 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-sand rounded-sm bg-cream/50 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-charcoal text-sm font-medium mb-2 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-sand rounded-sm bg-cream/50 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      placeholder="(727) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-charcoal text-sm font-medium mb-2 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-sand rounded-sm bg-cream/50 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 resize-none"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    placeholder="Describe your dream project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold px-8 py-4 rounded-sm text-base tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
