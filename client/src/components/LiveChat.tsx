/*
 * DESIGN: Florida Coastal Luxury
 * LiveChat: Floating chat widget for customer inquiries.
 * Gold accent bubble, dark panel, quick-reply options.
 * Sends conversation transcripts to backend for email delivery.
 */
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  options?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Welcome to Matlock Custom Homes! How can we help you today?",
    sender: "bot",
    options: [
      "I want to build a custom home",
      "I want to rebuild my existing home",
      "Tell me about your services",
      "I have a question about pricing",
      "I'd like to speak with someone",
    ],
  },
];

const BOT_RESPONSES: Record<string, Message> = {
  "I want to build a custom home": {
    id: 0,
    text: "That's exciting! We'd love to help you build your dream home. Our custom home builds start with a free consultation where we discuss your vision, budget, and timeline. Would you like to schedule a call or get a quick estimate?",
    sender: "bot",
    options: ["Schedule a call", "Use the estimate tool", "Tell me about the process"],
  },
  "I want to rebuild my existing home": {
    id: 0,
    text: "Great choice! We specialize in full home rebuilds — tearing down your existing structure and building a brand-new, modern home on the lot you already love. You get current building codes, energy efficiency, and hurricane-rated construction. How would you like to proceed?",
    sender: "bot",
    options: ["Schedule a call", "Use the estimate tool", "Tell me about the process"],
  },
  "Tell me about your services": {
    id: 0,
    text: "We specialize in Custom Home Building — both new construction and full home rebuilds:\n\n• New Construction — Build your dream home from the ground up on your own lot.\n• Full Home Rebuilds — Tear down and rebuild on your existing property with a brand-new modern home.\n\nEvery project comes with our Matlock Shield 5-10 year builder's warranty.",
    sender: "bot",
    options: ["New Construction", "Full Home Rebuilds", "Tell me about the warranty", "Back to main menu"],
  },
  "I have a question about pricing": {
    id: 0,
    text: "Great question! Our pricing varies based on project scope, size, and finish level. Custom homes typically range from $200-$400+ per square foot. For a quick ballpark, try our online estimate tool, or we can discuss specifics on a call.",
    sender: "bot",
    options: ["Use the estimate tool", "Schedule a call", "What's included in the price?"],
  },
  "I'd like to speak with someone": {
    id: 0,
    text: "Of course! You can reach us directly:\n\n(727) 999-1959\nmatlockhomes@icloud.com\n\nOr leave your info below and we'll get back to you within 24 hours.",
    sender: "bot",
    options: ["Call now", "Send an email"],
  },
  "Schedule a call": {
    id: 0,
    text: "You can reach us directly at (727) 999-1959 during business hours, or leave a message anytime. We typically return calls within a few hours.",
    sender: "bot",
    options: ["Call now", "Send an email", "Back to main menu"],
  },
  "Use the estimate tool": {
    id: 0,
    text: "Our online estimate tool walks you through a few quick questions to give you a ballpark cost range. It only takes about 2 minutes!",
    sender: "bot",
    options: ["Open estimate tool", "Schedule a call instead", "Back to main menu"],
  },
  "Tell me about the process": {
    id: 0,
    text: "Our process is straightforward:\n\n1. Consultation — We discuss your vision & budget\n2. Design — Blueprints and material selection\n3. Build — Construction with regular updates\n4. Delivery — Final walkthrough and handover\n\nMost custom homes take 10-18 months from start to finish.",
    sender: "bot",
    options: ["Schedule a consultation", "Use the estimate tool", "Back to main menu"],
  },
  "Tell me about the warranty": {
    id: 0,
    text: "Every project includes our Matlock Shield builder's warranty:\n\n5 Years — Workmanship & Materials\n10 Years — Structural Defects\n\nThis goes beyond the industry standard and is backed directly by us — not a third-party provider.",
    sender: "bot",
    options: ["View warranty details", "Schedule a call", "Back to main menu"],
  },
  "Custom Home Building": {
    id: 0,
    text: "Our custom home building service takes you from concept to keys. We handle everything — site evaluation, architectural design, permitting, construction, and final walkthrough. Every home is built to your exact specifications with premium materials and craftsmanship.",
    sender: "bot",
    options: ["Schedule a consultation", "Use the estimate tool", "Tell me about the process", "Back to main menu"],
  },
  "New Construction": {
    id: 0,
    text: "New construction means building your dream home from the ground up on your own lot. Every detail is fully custom — floor plan, materials, finishes, and smart home features. We guide you from the first blueprint to the final walkthrough.",
    sender: "bot",
    options: ["Schedule a consultation", "Use the estimate tool", "Tell me about the process", "Back to main menu"],
  },
  "Full Home Rebuilds": {
    id: 0,
    text: "A full home rebuild means we tear down your existing structure and build a brand-new home on the same lot. You get modern hurricane-rated construction, energy-efficient systems, and current Florida building codes — all while keeping the property you love.",
    sender: "bot",
    options: ["Schedule a call", "Use the estimate tool", "Tell me about the warranty", "Back to main menu"],
  },
  "Schedule a consultation": {
    id: 0,
    text: "You can reach us directly at (727) 999-1959 during business hours, or leave a message anytime. We typically return calls within a few hours.",
    sender: "bot",
    options: ["Call now", "Send an email", "Back to main menu"],
  },
  "What's included in the price?": {
    id: 0,
    text: "Our pricing is transparent and all-inclusive. A typical custom home package includes:\n\n• Architectural design & engineering\n• Permitting & site preparation\n• All construction labor & materials\n• Quality inspections throughout\n• Matlock Shield builder's warranty\n\nWant to get a personalized estimate?",
    sender: "bot",
    options: ["Use the estimate tool", "Schedule a call", "Back to main menu"],
  },
  "Schedule a call instead": {
    id: 0,
    text: "You can reach us directly at (727) 999-1959 during business hours, or leave a message anytime. We typically return calls within a few hours.",
    sender: "bot",
    options: ["Call now", "Send an email", "Back to main menu"],
  },
};

const DEFAULT_RESPONSE: Message = {
  id: 0,
  text: "Thanks for your message! For the fastest response, please call us at (727) 999-1959 or email matlockhomes@icloud.com. We'll get back to you as soon as possible.",
  sender: "bot",
  options: ["Call now", "Send an email", "Back to main menu"],
};

// Send chat transcript to backend
async function sendChatTranscript(messages: Message[]) {
  try {
    await fetch("/api/forms/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages
          .filter((m) => m.id !== 1) // Skip initial bot greeting
          .map((m) => ({ sender: m.sender, text: m.text })),
      }),
    });
  } catch {
    // Silent fail — chat still works for user
  }
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSentTranscript, setHasSentTranscript] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Send transcript when user has typed at least one free-text message and closes chat
  useEffect(() => {
    if (!isOpen && !hasSentTranscript) {
      const userMessages = messages.filter((m) => m.sender === "user");
      if (userMessages.length > 0) {
        sendChatTranscript(messages);
        setHasSentTranscript(true);
      }
    }
  }, [isOpen]);

  const addBotResponse = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = BOT_RESPONSES[userText] || DEFAULT_RESPONSE;
      setMessages((prev) => [
        ...prev,
        { ...response, id: Date.now() + 1 },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleOptionClick = (option: string) => {
    // Handle action options
    if (option === "Call now") {
      window.location.href = "tel:7279991959";
      return;
    }
    if (option === "Send an email") {
      window.location.href = "mailto:matlockhomes@icloud.com";
      return;
    }
    if (option === "Open estimate tool") {
      window.location.href = "/pricing";
      return;
    }
    if (option === "View warranty details") {
      window.location.href = "/warranty";
      return;
    }
    if (option === "Back to main menu") {
      setMessages(INITIAL_MESSAGES);
      return;
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: option, sender: "user" },
    ]);
    addBotResponse(option);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user" },
    ]);
    addBotResponse(text);
    // Reset transcript flag so new messages get sent
    setHasSentTranscript(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-charcoal border border-white/20 rotate-0"
            : "bg-gold hover:bg-gold-light hover:scale-110"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-charcoal" />
        )}
      </button>

      {/* Notification dot when closed */}
      {!isOpen && (
        <span className="fixed bottom-[4.25rem] right-6 z-50 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse pointer-events-none" />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ height: "480px" }}>
          {/* Header */}
          <div className="bg-charcoal-light px-5 py-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <h4
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Matlock Custom Homes
              </h4>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span
                  className="text-white/50 text-xs"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  We typically reply instantly
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <a
                href="tel:7279991959"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/5 transition-all"
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:matlockhomes@icloud.com"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/5 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "thin" }}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gold text-charcoal rounded-br-sm"
                        : "bg-white/[0.07] text-white/80 rounded-bl-sm"
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.6 }}
                  >
                    {msg.text}
                  </div>
                </div>
                {/* Quick reply options */}
                {msg.options && msg.sender === "bot" && msg.id === messages[messages.length - 1]?.id && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-gold/80 hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all duration-200"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.07] px-4 py-3 rounded-xl rounded-bl-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-charcoal-light/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center text-charcoal hover:bg-gold-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
