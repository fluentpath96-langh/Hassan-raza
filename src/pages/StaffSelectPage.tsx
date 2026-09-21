import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, Plane, MapPin, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';

interface StaffSelectPageProps {
  navigate: (route: PageRoute) => void;
}

export const StaffSelectPage: React.FC<StaffSelectPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Back button to Home */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-[#0B5D3B] hover:text-[#08492E] font-semibold mb-6 transition-colors cursor-pointer group"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        <span>واپس ہوم پیج پر جائیں</span>
        <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">/ Back to Home</span>
      </button>

      {/* Main Page Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7F1] text-[#0B5D3B] text-xs font-bold mb-3 border border-[#0B5D3B]/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ملازمت کے مواقع (Job Opportunities)</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0B2A5B] font-urdu-title leading-tight mb-2">
          آپ کہاں نوکری چاہتے ہیں؟
        </h1>
        <p className="text-sm sm:text-base text-[#5F6B72] font-en-label" dir="ltr">
          Where do you want to work? Select your preferred job location below.
        </p>
      </div>

      {/* Two Big Destination Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Pakistan */}
        <div
          onClick={() => {
            navigate('/staff/pakistan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-[#E2E6E9] hover:border-[#0B5D3B] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden text-right"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#0B5D3B] opacity-0 group-hover:opacity-100 transition-opacity" />

          <div>
            {/* Top Icon and Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EBF7F1] text-[#0B5D3B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7F1] text-[#0B5D3B] border border-[#0B5D3B]/20 font-arabic-body">
                خواتین اور مرد دونوں
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#191C1D] group-hover:text-[#0B5D3B] transition-colors font-arabic-body">
              پاکستان میں نوکری چاہیے
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B72] font-en-label mt-1" dir="ltr">
              Need job in Pakistan (Domestic & Office Staff)
            </p>

            <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#191C1D]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>لاہور اور دیگر شہروں میں باعزت روزگار</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>ماسی، نینی، نرس، ڈرائیور، سیکیورٹی گارڈ، ہیلپر</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>عمر کی حد: 18 سے 60 سال</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>معقول تنخواہ اور محفوظ ماحول</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E2E6E9] flex items-center justify-between text-[#0B5D3B] font-bold text-sm">
            <span>فارم پر کریں (Apply in Pakistan)</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Saudi Arabia */}
        <div
          onClick={() => {
            navigate('/staff/saudi');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-[#E2E6E9] hover:border-[#D4A93A] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden text-right"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#D4A93A]" />

          <div>
            {/* Top Icon and Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FCF7EA] text-[#D4A93A] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#D4A93A]/30">
                <Plane className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FCEBEA] text-[#C93B2B] border border-[#C93B2B]/30 font-arabic-body">
                صرف خواتین | عمر 21 تا 45 سال
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#191C1D] group-hover:text-[#0B2A5B] transition-colors font-arabic-body">
              سعودی عرب میں نوکری چاہیے
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B72] font-en-label mt-1" dir="ltr">
              Need job in Saudi Arabia (Housemaid & Domestic)
            </p>

            <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#191C1D]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>2 سال کا قانونی ویزا کمپنی کی طرف سے</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>ماہانہ تنخواہ 1200 سعودی ریال</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>کھانا، رہائش اور میڈیکل مفت</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>ویزا سے ہوائی ٹکٹ تک تمام اخراجات کمپنی کی ذمہ داری</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E2E6E9] flex items-center justify-between text-[#0B2A5B] font-bold text-sm">
            <span>سعودی ویزا فارم پر کریں (Apply for Saudi)</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Helpful Trust Note */}
      <div className="mt-10 p-4 rounded-xl bg-[#EBF7F1] border border-[#0B5D3B]/20 flex items-center gap-3 text-right">
        <HeartHandshake className="w-6 h-6 text-[#0B5D3B] shrink-0" />
        <div className="text-xs sm:text-sm text-[#0B5D3B] font-arabic-body">
          <strong>یاد دہانی:</strong> گلوبل فلائی پرائیویٹ لمیٹڈ کا مقصد آپ کو محفوظ، قانونی اور باعزت روزگار فراہم کرنا ہے۔ کسی بھی مدد کے لیے ہمارے واٹس ایپ نمبر 0301-7142648 پر بلا جھجھک رابطہ کریں۔
        </div>
      </div>
    </div>
  );
};
