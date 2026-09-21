import React, { useState, useEffect } from 'react';
import { PageRoute, SubmissionResult } from '../types';
import { getLastSubmission } from '../utils/submission';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Home,
  Phone,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ThankYouPageProps {
  navigate: (route: PageRoute) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ navigate }) => {
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const last = getLastSubmission();
    if (last) {
      setSubmission(last);
    } else {
      // Fallback if accessed directly
      const randomCode = `GF-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmission({
        refCode: randomCode,
        type: 'staff_pakistan',
        applicantName: 'معزز صارف',
        phone: '',
        submittedAt: new Date().toISOString(),
      });
    }
  }, []);

  const handleCopy = () => {
    if (submission?.refCode) {
      navigator.clipboard.writeText(submission.refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const refCode = submission?.refCode || 'GF-104928';
  const whatsappPreFilledText = encodeURIComponent(
    `السلام علیکم، میں نے گلوبل فلائی پرائیویٹ لمیٹڈ کی ویب سائٹ پر درخواست جمع کروائی ہے۔ میرا ریفرنس کوڈ ہے: ${refCode}`
  );

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      {/* Thank you card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#E2E6E9] relative overflow-hidden">
        {/* Top green accent strip */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-[#0B5D3B]" />

        {/* Big Green Success Check Icon */}
        <div className="w-20 h-20 rounded-full bg-[#EBF7F1] text-[#0B5D3B] flex items-center justify-center mx-auto mb-6 shadow-xs border-2 border-[#0B5D3B]/20 animate-in zoom-in-90 duration-300">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        {/* Primary Urdu Headings */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2A5B] font-urdu-title leading-tight mb-2">
          شکریہ! آپ کی درخواست موصول ہو گئی ہے
        </h1>
        <p className="text-sm sm:text-base text-[#0B5D3B] font-semibold font-arabic-body mb-2">
          ہماری ٹیم جلد آپ سے رابطہ کرے گی
        </p>
        <p className="text-xs text-[#5F6B72] font-en-label mb-6" dir="ltr">
          Thank you! Your application has been received. Our team will contact you shortly.
        </p>

        {/* Reference Code Box */}
        <div className="p-5 rounded-2xl bg-[#F8F9FA] border-2 border-dashed border-[#BFC9C0] mb-6">
          <p className="text-xs text-[#5F6B72] font-arabic-body mb-1">
            آپ کا ریفرنس نمبر (Reference Code):
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-widest text-[#0B2A5B]" dir="ltr">
              {refCode}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white border border-[#E2E6E9] text-[#0B5D3B] hover:bg-[#EBF7F1] transition-colors cursor-pointer shadow-xs"
              title="Copy Reference Code"
              aria-label="Copy Reference Code"
            >
              {copied ? <Check className="w-5 h-5 text-[#0B5D3B]" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-[#0B5D3B] font-semibold font-arabic-body mt-1 animate-in fade-in">
              ریفرنس کوڈ کاپی ہو گیا ہے!
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-right bg-[#EBF7F1]/50 p-4 rounded-xl border border-[#0B5D3B]/20 mb-8 text-xs sm:text-sm text-[#191C1D]">
          <div className="flex items-center gap-2 text-[#0B5D3B] font-bold">
            <Clock className="w-4 h-4" />
            <span>اگلا مرحلہ کیا ہے؟ (Next Steps)</span>
          </div>
          <p className="font-arabic-body leading-relaxed text-[#191C1D]">
            ہماری کسٹمر سروس ٹیم آپ کی فراہم کردہ معلومات کی تصدیق کے لیے 24 سے 48 گھنٹوں کے دوران آپ کے دیے گئے نمبر پر کال یا واٹس ایپ کرے گی۔
          </p>
          <p className="font-arabic-body text-[#5F6B72]">
            فوری معلومات یا کسی بھی سوال کے لیے نیچے دیے گئے واٹس ایپ بٹن سے ریفرنس نمبر کے ساتھ میسج بھیجیں۔
          </p>
        </div>

        {/* Two Main Action Buttons */}
        <div className="space-y-3">
          {/* 1. WhatsApp Button with pre-filled message */}
          <a
            href={`https://wa.me/923017142648?text=${whatsappPreFilledText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="font-arabic-body">واٹس ایپ پر ریفرنس کوڈ شیئر کریں</span>
            <span className="text-xs opacity-90 font-en-label" dir="ltr">/ Share on WhatsApp</span>
          </a>

          {/* 2. Return to Home */}
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#191C1D] border border-[#E2E6E9] py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#0B5D3B]" />
            <span className="font-arabic-body">ہوم پیج پر واپس جائیں</span>
            <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">/ Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
