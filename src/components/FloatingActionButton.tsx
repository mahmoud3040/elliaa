
import { useState } from 'react';
import { MessageCircle, Phone, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/201234567890', '_blank');
  };

  const callPhone = () => {
    window.open('tel:+201234567890', '_blank');
  };

  const sendEmail = () => {
    window.open('mailto:info@elyaastore.com', '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center space-y-3">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-2 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <Button
          onClick={scrollToTop}
          size="sm"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={sendEmail}
          size="sm"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
        >
          <Mail className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={callPhone}
          size="sm"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
        >
          <Phone className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={openWhatsApp}
          size="sm"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="w-14 h-14 rounded-full lavender-gradient hover:scale-110 shadow-xl animate-pulse-glow"
      >
        <MessageCircle className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </Button>
    </div>
  );
};

export default FloatingActionButton;
