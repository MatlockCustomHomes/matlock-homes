import { Globe, Instagram, Facebook, Linkedin } from "lucide-react";

const LINKS = [
  {
    label: "Visit Our Website",
    url: "https://matlockcustomhomes.com/",
    icon: Globe,
    color: "bg-gold text-charcoal",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/matlockcustomhomes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/people/Matlock-Homes/100065545447347/#",
    icon: Facebook,
    color: "bg-[#1877F2] text-white",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@matlockcustomhomes",
    icon: null, // custom SVG below
    color: "bg-black text-white",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/byron-matlock-a25463a2",
    icon: Linkedin,
    color: "bg-[#0A66C2] text-white",
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" />
    </svg>
  );
}

export default function Links() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-10"
      style={{
        background: "linear-gradient(180deg, #2A2520 0%, #1a1714 50%, #2A2520 100%)",
      }}
    >
      {/* Logo & Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-4 border-2 border-gold/40">
          <span
            className="text-gold text-2xl font-bold"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            M
          </span>
        </div>
        <h1
          className="text-cream text-2xl tracking-wide text-center"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Matlock{" "}
          <span className="text-gold italic">Custom</span>{" "}
          Homes
        </h1>
        <p
          className="text-slate text-sm mt-2 text-center max-w-xs"
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          Premium Quality Custom Home Builder &middot; Tampa Bay Area
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} flex items-center gap-3 px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              {Icon ? (
                <Icon className="w-5 h-5 shrink-0" />
              ) : (
                <TikTokIcon className="w-5 h-5 shrink-0" />
              )}
              <span className="flex-1 text-center">{link.label}</span>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p
          className="text-slate/60 text-xs"
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Matlock Custom Homes. All rights reserved.
        </p>
        <p
          className="text-slate/40 text-xs mt-1"
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          (727) 999-1959
        </p>
      </div>
    </div>
  );
}
