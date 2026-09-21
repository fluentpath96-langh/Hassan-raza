import React from 'react';
import { PageRoute } from '../types';
import {
  User,
  Building2,
  Calendar,
  Banknote,
  Home as HomeIcon,
  Plane,
  Sparkles,
  Shield,
  ShieldCheck,
  CheckCircle,
  MapPin,
  MessageCircle,
  Phone,
  ArrowLeft,
  HeartHandshake,
  Baby,
  Smile,
  HeartPulse,
  UtensilsCrossed,
  Briefcase,
  ShieldAlert,
  Car,
  HandHelping,
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const services = [
    { urdu: 'ماسی', en: 'Maid', desc: 'صفائی و امور خانہ داری', icon: <Sparkles className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'نینی', en: 'Nanny', desc: 'بچوں کی مکمل نگہداشت', icon: <Baby className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'بے بی سٹر', en: 'Baby Sitter', desc: 'نوزائیدہ و چھوٹے بچے', icon: <Smile className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'نرس', en: 'Nurse', desc: 'مریض و بزرگوں کی دیکھ بھال', icon: <HeartPulse className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'شیف', en: 'Chef', desc: 'پاکستانی اور مغربی کھانے', icon: <UtensilsCrossed className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'پرسنل اسسٹنٹ', en: 'Personal Assistant', desc: 'دفتری و ذاتی معاونت', icon: <Briefcase className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'سیکیورٹی گارڈ', en: 'Security Guard', desc: 'عمارت اور ہاؤس سیکیورٹی', icon: <ShieldAlert className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'ڈرائیور', en: 'Driver', desc: 'LTV و HTV لائسنس یافتہ', icon: <Car className="w-5 h-5 text-[#0B5D3B]" /> },
    { urdu: 'ہیلپر', en: 'Helper', desc: 'جنرل مدد و ہاؤس کیپنگ', icon: <HandHelping className="w-5 h-5 text-[#0B5D3B]" /> },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-[#F8F9FA] via-[#EEF3FA]/40 to-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Top trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF7F1] text-[#0B5D3B] text-xs sm:text-sm font-semibold border border-[#0B5D3B]/20 mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0B5D3B]" />
            <span className="font-arabic-body">لاہور اور سعودی عرب کا مایہ ناز ادارہ</span>
          </div>

          {/* Main Hero Headings */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0B2A5B] font-urdu-title leading-tight mb-3">
            پراعتماد ادارہ – محفوظ مستقبل
          </h1>
          <p className="text-base sm:text-xl text-[#0B5D3B] font-semibold tracking-wide font-en-label mb-2" dir="ltr">
            Trusted Agency – Secure Future
          </p>

          <p className="text-base sm:text-lg text-[#191C1D] font-medium font-arabic-body mt-2">
            گھریلو اور آفس اسٹاف – پاکستان اور سعودی عرب
          </p>
          <p className="text-xs sm:text-sm text-[#5F6B72] font-en-label" dir="ltr">
            Domestic & Office Staff – Pakistan & Saudi Arabia
          </p>

          {/* TWO BIG ACTION BUTTONS */}
          <div className="mt-8 sm:mt-10 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Button 1: I am Staff */}
            <button
              onClick={() => {
                navigate('/staff');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-3 bg-[#0B5D3B] hover:bg-[#08492E] text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-2 border-transparent"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-arabic-body leading-tight">
                  میں سٹاف ہوں
                </div>
                <div className="text-xs text-white/80 font-en-label">
                  I am Staff (نوکری چاہیے)
                </div>
              </div>
            </button>

            {/* Button 2: I am Client */}
            <button
              onClick={() => {
                navigate('/client');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-3 bg-[#0B2A5B] hover:bg-[#071C3D] text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-2 border-transparent"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-arabic-body leading-tight">
                  میں کلائنٹ ہوں
                </div>
                <div className="text-xs text-white/80 font-en-label">
                  I am Client (سٹاف چاہیے)
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SAUDI ARABIA OPPORTUNITY STRIP */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9] relative overflow-hidden">
          {/* Top Decorative accent line */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#D4A93A]" />

          {/* Opportunity Header & Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-[#E2E6E9]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FCF7EA] text-[#D4A93A] flex items-center justify-center shrink-0 border border-[#D4A93A]/30">
                <Plane className="w-5 h-5 text-[#D4A93A]" />
              </div>
              <div className="text-right">
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2A5B] font-arabic-body">
                  سعودی عرب میں گھریلو ملازمت کا سنہری موقع
                </h3>
                <p className="text-xs text-[#5F6B72] font-en-label">
                  Special Overseas Domestic Placement in Saudi Arabia
                </p>
              </div>
            </div>

            {/* Note Badge: صرف خواتین کے لیے – عمر 21 سے 45 سال */}
            <div className="inline-flex items-center gap-2 bg-[#FCEBEA] text-[#C93B2B] px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm border border-[#C93B2B]/30">
              <span className="w-2 h-2 rounded-full bg-[#C93B2B] animate-ping" />
              <span className="font-arabic-body">صرف خواتین کے لیے – عمر 21 سے 45 سال</span>
              <span className="text-xs opacity-75 font-en-label" dir="ltr">(Women Only, 21-45 Yrs)</span>
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {/* 1. Visa */}
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-3.5 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#EBF7F1] text-[#0B5D3B] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-[#191C1D] font-arabic-body">2 سال کا ویزا</p>
                <p className="text-xs text-[#5F6B72] font-en-label">Years Visa 2</p>
              </div>
            </div>

            {/* 2. Salary */}
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-3.5 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#FCF7EA] text-[#D4A93A] flex items-center justify-center shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-[#191C1D] font-arabic-body">تنخواہ 1200 ریال</p>
                <p className="text-xs text-[#5F6B72] font-en-label">Salary 1200 SAR</p>
              </div>
            </div>

            {/* 3. Food & Lodging */}
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-3.5 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#EEF3FA] text-[#0B2A5B] flex items-center justify-center shrink-0">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-[#191C1D] font-arabic-body">کھانا اور رہائش مفت</p>
                <p className="text-xs text-[#5F6B72] font-en-label">Free Food & Accommodation</p>
              </div>
            </div>

            {/* 4. Company Responsibility */}
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-3.5 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#EBF7F1] text-[#0B5D3B] flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base text-[#191C1D] font-arabic-body">ویزا سے ٹکٹ تک کمپنی کی ذمہ داری</p>
                <p className="text-xs text-[#5F6B72] font-en-label">Complete Responsibility</p>
              </div>
            </div>
          </div>

          {/* Quick Apply button for Saudi */}
          <div className="mt-6 pt-4 border-t border-[#E2E6E9] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-[#5F6B72] font-arabic-body text-center sm:text-right">
              سعودی عرب کا مفت ویزا، مکمل قانونی تحفظ اور رہائش کمپنی کی طرف سے فراہم کی جاتی ہے۔
            </p>
            <button
              onClick={() => {
                navigate('/staff/saudi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B5D3B] hover:bg-[#08492E] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <span>سعودی ویزا فارم پر کریں</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A5B] font-urdu-title leading-tight">
            ہماری خدمات
          </h2>
          <p className="text-sm text-[#5F6B72] font-en-label mt-1">
            Our Professional Staff Categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#E2E6E9] hover:border-[#0B5D3B] hover:shadow-md transition-all flex items-start gap-3 text-right"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF7F1] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-base text-[#191C1D] font-arabic-body leading-tight">
                  {item.urdu}
                </h4>
                <p className="text-xs text-[#0B5D3B] font-en-label font-semibold">
                  {item.en}
                </p>
                <p className="text-xs text-[#5F6B72] mt-1 line-clamp-1 font-arabic-body">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTACT & OFFICE ADDRESS SECTION */}
      <section id="contact" className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9]">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A5B] font-urdu-title">
              رابطہ کیجئے
            </h2>
            <p className="text-sm text-[#5F6B72] font-en-label mt-1">
              Get in touch with us instantly via WhatsApp or visit our office
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left: Contact cards */}
            <div className="space-y-4">
              {/* WhatsApp 1 */}
              <a
                href="https://wa.me/923017142648"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#EBF7F1] hover:bg-[#dbf1e5] border border-[#0B5D3B]/20 text-[#0B5D3B] transition-colors group"
              >
                <div className="flex items-center gap-3" dir="ltr">
                  <div className="w-11 h-11 rounded-xl bg-[#0B5D3B] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-base tracking-wider text-[#0B5D3B]">0301-7142648</p>
                    <p className="text-xs text-[#0B5D3B]/80 font-en-label">Click to chat on WhatsApp (Primary)</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-lg border border-[#0B5D3B]/20 group-hover:bg-[#0B5D3B] group-hover:text-white transition-colors">
                  چیٹ شروع کریں
                </span>
              </a>

              {/* WhatsApp 2 */}
              <a
                href="https://wa.me/923218477765"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#EEF3FA] hover:bg-[#dde8f8] border border-[#0B2A5B]/20 text-[#0B2A5B] transition-colors group"
              >
                <div className="flex items-center gap-3" dir="ltr">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-base tracking-wider text-[#0B2A5B]">0321-8477765</p>
                    <p className="text-xs text-[#0B2A5B]/80 font-en-label">Click to chat on WhatsApp (Corporate)</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-lg border border-[#0B2A5B]/20 group-hover:bg-[#0B2A5B] group-hover:text-white transition-colors">
                  چیٹ شروع کریں
                </span>
              </a>

              {/* Office Address Card */}
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E6E9] flex items-start gap-3.5 text-right">
                <div className="w-11 h-11 rounded-xl bg-[#FCF7EA] text-[#D4A93A] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-6 h-6 text-[#D4A93A]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0B2A5B]">ہماری برانچ / دفتر کا پتہ</h4>
                  <p className="font-bold text-base text-[#191C1D] mt-0.5 font-arabic-body">
                    پنجاب سوسائٹی، غازی روڈ، لاہور
                  </p>
                  <p className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
                    Punjab Society, Ghazi Road, Lahore, Pakistan
                  </p>
                  <p className="text-xs text-[#5F6B72] mt-1 font-arabic-body">
                    اوقات: پیر تا ہفتہ، صبح 9 بجے سے شام 7 بجے تک
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Clean Map Representation Card */}
            <div className="rounded-xl overflow-hidden border border-[#E2E6E9] bg-[#EBF7F1]/30 p-6 flex flex-col items-center justify-center text-center min-h-[260px] relative">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[#0B5D3B] mb-3">
                <MapPin className="w-8 h-8 fill-current text-[#0B5D3B]" />
              </div>
              <h4 className="font-bold text-lg text-[#0B2A5B] font-arabic-body">
                لاہور آفیس لوکیشن
              </h4>
              <p className="text-sm font-semibold text-[#191C1D] mt-1">
                پنجاب سوسائٹی، نزد غازی روڈ و ڈی ایچ اے، لاہور
              </p>
              <p className="text-xs text-[#5F6B72] font-en-label mt-0.5" dir="ltr">
                Punjab Society, Near Ghazi Road & DHA Lahore
              </p>

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <a
                  href="https://wa.me/923017142648?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D9%85%D8%AC%DA%BE%DB%92%20%D8%AF%D9%81%D8%AA%D8%B1%20%DA%A9%DB%8C%20%D9%84%D9%88%DA%A9%DB%8C%D8%B4%D9%86%20%D8%A8%DA%BE%DB%8C%D8%AC%DB%8C%DA%BA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#0B5D3B] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#08492E] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>گوگل میپ لوکیشن واٹس ایپ پر مانگیں</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
