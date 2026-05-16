import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
export default function WhatsAppButton() {
  const { data } = useSite();
  return (
    <a href={`https://wa.me/${data.contact.whatsapp}?text=Hello%20Optimum%20Prime%20Solutions`} target="_blank" rel="noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-green-500/30 hover:bg-green-600 transition-all hover:scale-105">
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
