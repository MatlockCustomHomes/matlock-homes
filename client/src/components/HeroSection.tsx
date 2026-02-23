/*
 * DESIGN: Florida Coastal Luxury
 * Hero: Full-viewport with YouTube video background, dark overlay,
 * large serif heading, subtitle, and gold CTA. Scroll indicator at bottom.
 * Uses YouTube embed API with proper parameters for background autoplay.
 */
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Phone } from "lucide-react";

const HERO_FALLBACK = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-1_1771267569000_na1fn_bWF0bG9jay1oZXJvLW92ZXJsYXk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTFfMTc3MTI2NzU2OTAwMF9uYTFmbl9iV0YwYkc5amF5MW9aWEp2TFc5MlpYSnNZWGsuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rySwnzK5iLXL22x2iKIB7DMyM3y7qGpPOWu5Uc8TCqtfkqBZuubWR~or~X2tbYE8R~L73vis1h1bvxv4yuyEsxXeVQ2UeUeqnPJgYO~-PdK3hulTzEgnvSAcdQMSjalbMujhTV~bw03cY7LeulwuE8gYOqTeJUUGcBo~jZgXGBhEi-qxEaHt0MAJI5xEl0~-GmM38mSIPbyrxPEF-4HY-X8beOClKdXnRsi7G8nvwH~HAmZLRLp~DF3DBklMzvHNk2E-VjTMoXydV-hK3BC2iOrJZd90A4GDWiIi7EhbH9cN1FmfUGzrGyFwcEP7-6aSBbbOa91EnKBt8NM6tATCng__";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    // Add the YouTube IFrame API script
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current && (window as any).YT?.Player) {
        new (window as any).YT.Player(playerRef.current, {
          videoId: "_vomJleFeHs",
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "_vomJleFeHs",
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
              setVideoReady(true);
            },
            onStateChange: (event: any) => {
              if (event.data === 0) {
                event.target.playVideo();
              }
            },
          },
        });
      }
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Fallback Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${HERO_FALLBACK})`,
          opacity: videoReady ? 0 : 1,
        }}
      />

      {/* YouTube Video Background via API */}
      <div
        className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
        style={{ opacity: videoReady ? 1 : 0 }}
      >
        <div
          ref={playerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "calc(100vw + 200px)",
            height: "calc(100vh + 200px)",
            minWidth: "177.78vh",
            minHeight: "56.25vw",
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Main Heading */}
        <h1
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight max-w-5xl transition-all duration-1000 ease-out"
          style={{
            fontFamily: "'DM Serif Display', serif",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "500ms",
          }}
        >
          We Build Relationships
          <br />
          <span className="text-gold">Before We Build Homes</span>
        </h1>

        {/* Gold Divider */}
        <div
          className="gold-divider my-8 transition-all duration-1000 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: "800ms",
          }}
        />

        {/* Subtitle */}
        <p
          className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mb-10 transition-all duration-1000 ease-out"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1000ms",
          }}
        >
          Building custom homes and transforming existing spaces across the Tampa Bay Area
          with craftsmanship, care, and precision.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1200ms",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider"
          >
            Get Started
          </a>
          <a
            href="tel:7279991959"
            className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Phone className="w-4 h-4" />
            (727) 999-1959
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-gold transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
