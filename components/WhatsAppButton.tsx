import { whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl("Hi Gentelle, I'd love to know more about your skincare.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gentelle on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[120px] sm:inline">
        Chat with us
      </span>
    </a>
  );
}
