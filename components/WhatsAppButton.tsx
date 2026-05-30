export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917509400769"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gentelle on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#2C4A35] hover:bg-[#B8963E] text-white text-xs tracking-widest px-5 py-3.5 rounded-full shadow-[0_4px_24px_rgba(44,74,53,0.35)] hover:shadow-[0_4px_24px_rgba(184,150,62,0.35)] transition-all duration-300 group"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4 shrink-0"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
      <span className="hidden sm:block">Chat with Us</span>
    </a>
  );
}
