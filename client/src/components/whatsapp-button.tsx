import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactInfo } from "@/hooks/use-contact-info";

export default function WhatsAppButton() {
  const contactInfo = useContactInfo();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = contactInfo.whatsapp ? contactInfo.whatsapp.replace(/[^0-9]/g, '') : "919876543210";
    const message = encodeURIComponent(
      "Hello! I'm interested in your services at Mahech Internet Cafe. Please help me with information about your available services."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </Button>
    </div>
  );
}