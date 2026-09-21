import React, { useState } from 'react';
import { MessageCircle, Phone, X, ExternalLink } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* WhatsApp Numbers Modal / Popover */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E6E9] p-4 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E6E9]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B2A5B] font-urdu-title leading-tight">واٹس ایپ ہیلپ لائن</h4>
                <p className="text-[11px] text-[#5F6B72] font-en-label">Official WhatsApp Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#5F6B72] hover:text-[#191C1D] p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5F6B72] py-2 font-arabic-body text-right">
            گلوبل فلائی کے نمائندے سے فوری معلومات یا رہنمائی حاصل کرنے کے لیے رابطہ کریں:
          </p>

          <div className="space-y-2 pt-1">
            <a
              href="https://wa.me/923017142648?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%DA%AF%D9%84%D9%88%D8%A8%D9%84%20%D9%81%D9%84%D8%A7%D8%A6%DB%8C%20%D8%B3%DB%92%20%D8%B1%D8%A7%D8%A8%D8%B7%DB%81%20%DA%A9%D8%B1%D9%86%D8%A7%20%DB%81%DB%92"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBF7F1] hover:bg-[#d8f0e4] border border-[#0B5D3B]/20 text-[#0B5D3B] transition-colors group"
            >
              <div className="flex items-center gap-2.5" dir="ltr">
                <div className="w-8 h-8 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm tracking-wide">0301-7142648</p>
                  <p className="text-[10px] text-[#0B5D3B]/80 font-en-label">Helpline 1 (Primary)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0B5D3B] flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                <span>چیٹ</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            <a
              href="https://wa.me/923218477765?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%DA%AF%D9%84%D9%88%D8%A8%D9%84%20%D9%81%D9%84%D8%A7%D8%A6%DB%8C%20%D8%B3%DB%92%20%D8%B1%D8%A7%D8%A8%D8%B7%DB%81%20%DA%A9%D8%B1%D9%86%D8%A7%20%DB%81%DB%92"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#EEF3FA] hover:bg-[#dce6f5] border border-[#0B2A5B]/20 text-[#0B2A5B] transition-colors group"
            >
              <div className="flex items-center gap-2.5" dir="ltr">
                <div className="w-8 h-8 rounded-full bg-[#0B2A5B] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm tracking-wide">0321-8477765</p>
                  <p className="text-[10px] text-[#0B2A5B]/80 font-en-label">Helpline 2 (Corporate)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0B2A5B] flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                <span>چیٹ</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E2E6E9] text-[11px] text-[#5F6B72] text-center">
            پیر تا ہفتہ: صبح 9 تا شام 7 بجے
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat Options"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4A93A] border-2 border-white rounded-full"></span>
        </div>
        <span className="font-bold text-sm font-arabic-body">واٹس ایپ رابطہ</span>
      </button>
    </div>
  );
};
