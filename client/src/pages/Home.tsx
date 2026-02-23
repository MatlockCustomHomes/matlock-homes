/*
 * DESIGN: Florida Coastal Luxury
 * Home page: Assembles all sections in VersaHomes-inspired order.
 * Full responsive, SEO-optimized single-page layout.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OurStorySection from "@/components/OurStorySection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileIntakePopup from "@/components/MobileIntakePopup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MobileIntakePopup />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <OurStorySection />
        <WhyChooseSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
