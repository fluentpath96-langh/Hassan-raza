import React from 'react';
import { PageRoute } from '../types';
import { Globe, MapPin, Phone, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  navigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#0B2A5B] text-white pt-14 pb-8 border-t border-[#071D3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Company Profile */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center border-2 border-[#D4A93A] shrink-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-urdu-title text-white">گلوبل فلائی پرائیویٹ لمیٹڈ</h3>
                <p className="text-xs text-white/70 font-en-label uppercase tracking-wider">Global Fly Private Limited</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-arabic-body">
              لاہور اور سعودی عرب کے لیے ایک پراعتماد اور باضابطہ سٹافنگ ادارہ۔ گھریلو اور دفتری ملازمین کی محفوظ اور قانونی فراہمی۔
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs text-[#D4A93A] font-medium border border-[#D4A93A]/30">
              <ShieldCheck className="w-4 h-4 text-[#D4A93A]" />
              <span>حکومت سے منظور شدہ اور رجسٹرڈ ادارہ</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-base text-[#D4A93A] mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>فوری لنکس</span>
              <span className="text-xs text-white/60 font-en-label uppercase">Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A93A] transition-colors flex items-center gap-2 text-white/90"
                >
                  <span className="text-xs text-[#D4A93A]">◀</span>
                  <span>ہوم پیج (Home)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/staff');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A93A] transition-colors flex items-center gap-2 text-white/90"
                >
                  <span className="text-xs text-[#D4A93A]">◀</span>
                  <span>میں سٹاف ہوں (Job Seekers)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/staff/saudi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A93A] transition-colors flex items-center gap-2 text-white/90"
                >
                  <span className="text-xs text-[#D4A93A]">◀</span>
                  <span>سعودی عرب نوکری (Saudi Visa)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/staff/pakistan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A93A] transition-colors flex items-center gap-2 text-white/90"
                >
                  <span className="text-xs text-[#D4A93A]">◀</span>
                  <span>پاکستان میں نوکری (Pakistan Jobs)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/client');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A93A] transition-colors flex items-center gap-2 text-white/90"
                >
                  <span className="text-xs text-[#D4A93A]">◀</span>
                  <span>سٹاف کی ضرورت ہے (Hire Staff)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Staff Categories */}
          <div>
            <h4 className="font-bold text-base text-[#D4A93A] mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>ہماری خدمات</span>
              <span className="text-xs text-white/60 font-en-label uppercase">Categories</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> ماسی (Maid)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> نینی (Nanny)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> بے بی سٹر (Baby Sitter)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> نرس (Nurse)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> شیف (Chef)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> اسسٹنٹ (Assistant)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> سیکیورٹی گارڈ
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> ڈرائیور (Driver)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8AD4A8]" /> ہیلپر (Helper)
              </span>
            </div>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-[#D4A93A] mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>دفتر کا پتہ و رابطہ</span>
              <span className="text-xs text-white/60 font-en-label uppercase">Contact Us</span>
            </h4>

            <div className="flex items-start gap-2.5 text-sm text-white/90">
              <MapPin className="w-5 h-5 text-[#D4A93A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">پنجاب سوسائٹی، غازی روڈ، لاہور</p>
                <p className="text-xs text-white/70 font-en-label" dir="ltr">Punjab Society, Ghazi Road, Lahore, Pakistan</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/923017142648"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm bg-white/10 hover:bg-white/15 px-3 py-2 rounded-lg transition-colors"
                dir="ltr"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="font-semibold">0301-7142648</span>
                <span className="text-[11px] text-[#D4A93A] ml-auto">WhatsApp 1</span>
              </a>

              <a
                href="https://wa.me/923218477765"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm bg-white/10 hover:bg-white/15 px-3 py-2 rounded-lg transition-colors"
                dir="ltr"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="font-semibold">0321-8477765</span>
                <span className="text-[11px] text-[#D4A93A] ml-auto">WhatsApp 2</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p className="text-center sm:text-right">
            گلوبل فلائی پرائیویٹ لمیٹڈ © تمام حقوق محفوظ ہیں | Global Fly Private Limited © All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-white/60">
            <span>رازداری کی پالیسی (Privacy Policy)</span>
            <span>•</span>
            <span>شرائط و ضوابط (Terms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
