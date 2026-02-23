/*
 * DESIGN: Florida Coastal Luxury
 * Testimonial Slideshow: Auto-rotating carousel of real Google reviews.
 * Full-width image background with overlay, navigation dots, and arrows.
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const BG_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-4_1771267573000_na1fn_bWF0bG9jay1wcm9jZXNzLWJn.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTRfMTc3MTI2NzU3MzAwMF9uYTFmbl9iV0YwYkc5amF5MXdjbTlqWlhOekxXSm4uanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Gk3mgKYeRg-LMUyVRfMWjXfcX3V1I5WdbLEreyA~0~X1zO2nX4NIh2MWtncr0Dzjv0FgP3j6J0O-ZcGepfIV~zwTCU2WmulobD70KynXY20Y-osRyOeb4fiVLXa1aKEko-6AQH25AB8fkEk1Rv9VR5aFn8V6LFj63DkJk-RVd~OV8uRX9iIeK1bkBEwQFZmAlf-lXLnpqPPecrW57tfJhQhBDcCjN9wup1aR-vF5xhxmSx658IBGXPRPHuMF9e~YY2Eo7QRbgzG~2sgYio1okSPsCx2LO1mKM3dx2OsDjvqzpxoLiVRRo8JM41noKuXuPCrowtTnY8nsykOIADALhw__";

interface Review {
  quote: string;
  name: string;
  location: string;
  project: string;
  rating: number;
}

const reviews: Review[] = [
  {
    quote: "We used Matlock Homes to remodel our whole home and couldn't be happier with the results. The whole team was kind and respectful throughout the process. Byron made it so simple. Highly recommend!",
    name: "Satisfied Homeowner",
    location: "New Port Richey, FL",
    project: "Whole Home Remodel",
    rating: 5,
  },
  {
    quote: "I can't express how thrilled I am with Matlock Homes' work. They completely transformed our home from top to bottom — new layout, modern finishes, updated systems. The quality is top-notch, and their team is friendly and communicative. Choose Matlock Homes!",
    name: "Satisfied Homeowner",
    location: "New Port Richey, FL",
    project: "Whole Home Remodel",
    rating: 5,
  },
  {
    quote: "Matlock Homes exceeded my expectations! They took our outdated home and turned it into a modern masterpiece. Their team was professional, skilled, and completed the project ahead of schedule. Highly recommend!",
    name: "Satisfied Homeowner",
    location: "New Port Richey, FL",
    project: "Complete Home Remodel",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((index: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }, 300);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % reviews.length;
    goToSlide(next, "right");
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + reviews.length) % reviews.length;
    goToSlide(prev, "left");
  }, [currentIndex, goToSlide]);

  // Auto-play every 6 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(goNext, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, 6000);
  };

  const handleNext = () => { goNext(); resetAutoPlay(); };
  const handlePrev = () => { goPrev(); resetAutoPlay(); };
  const handleDot = (i: number) => {
    const dir = i > currentIndex ? "right" : "left";
    goToSlide(i, dir);
    resetAutoPlay();
  };

  const current = reviews[currentIndex];

  return (
    <section ref={ref} id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={BG_IMG} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p
            className="text-gold text-sm tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
          >
            Google Reviews
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Satisfied <span className="text-gold italic">Homeowners</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-16 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/15 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-16 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/15 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Review Card */}
          <div className="text-center px-8 sm:px-12">
            {/* Quote Icon */}
            <Quote
              className="w-10 h-10 lg:w-12 lg:h-12 text-gold/40 mx-auto mb-6 transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
            />

            {/* Stars */}
            <div
              className="flex items-center justify-center gap-1 mb-6 transition-all duration-500"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${direction === "right" ? "-30px" : "30px"})`
                  : "translateX(0)",
              }}
            >
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>

            {/* Quote Text */}
            <blockquote
              className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 transition-all duration-500 min-h-[120px] lg:min-h-[100px] flex items-center justify-center"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic",
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${direction === "right" ? "-40px" : "40px"})`
                  : "translateX(0)",
              }}
            >
              <span>"{current.quote}"</span>
            </blockquote>

            <div
              className="gold-divider mx-auto mb-6 transition-opacity duration-500"
              style={{ opacity: isAnimating ? 0.3 : 1 }}
            />

            {/* Attribution */}
            <div
              className="transition-all duration-500"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                  : "translateX(0)",
              }}
            >
              <p
                className="text-gold text-sm tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
              >
                {current.name}
              </p>
              <p
                className="text-white/40 text-sm mt-1"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                {current.project} · {current.location}
              </p>

              {/* Google Review Badge */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span
                  className="text-white/30 text-xs tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Verified Google Review
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className="group relative p-1"
                aria-label={`Go to review ${i + 1}`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === currentIndex ? "#C5A55A" : "rgba(255,255,255,0.2)",
                    transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                    boxShadow: i === currentIndex ? "0 0 8px rgba(197,165,90,0.4)" : "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Review Counter */}
          <p
            className="text-center text-white/20 text-xs mt-4 tracking-wider"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {currentIndex + 1} / {reviews.length}
          </p>
        </div>
      </div>
    </section>
  );
}
