import React, { useState } from 'react';
import { PageRoute, ClientFormData } from '../types';
import { FormField } from '../components/FormField';
import { ChipSelect, ChipOption } from '../components/ChipSelect';
import { saveSubmission, formatPhone, validatePakistaniPhone } from '../utils/submission';
import {
  ArrowRight,
  Building2,
  Home,
  User,
  Phone as PhoneIcon,
  MapPin,
  Sparkles,
  Baby,
  Smile,
  HeartPulse,
  UtensilsCrossed,
  Briefcase,
  ShieldAlert,
  Car,
  HandHelping,
  Plus,
  Minus,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface ClientPageProps {
  navigate: (route: PageRoute) => void;
}

export const ClientPage: React.FC<ClientPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    clientName: '',
    phone: '',
    city: 'لاہور (Lahore)',
    address: '',
    selectedRoles: ['maid'],
    workplaceType: 'home',
    staffCount: 1,
    extraDetails: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const staffRoleOptions: ChipOption[] = [
    { id: 'maid', labelUrdu: 'ماسی', labelEnglish: 'Maid', desc: 'صفائی و ہاؤس کیپنگ', icon: <Sparkles className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'nanny', labelUrdu: 'نینی', labelEnglish: 'Nanny', desc: 'بچوں کی دیکھ بھال', icon: <Baby className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'babysitter', labelUrdu: 'بے بی سٹر', labelEnglish: 'Baby Sitter', desc: 'چھوٹے بچوں کی نگہداشت', icon: <Smile className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'nurse', labelUrdu: 'نرس', labelEnglish: 'Nurse', desc: 'مریض و بزرگوں کی دیکھ بھال', icon: <HeartPulse className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'chef', labelUrdu: 'شیف', labelEnglish: 'Chef', desc: 'کھانا پکانے کا ماہر', icon: <UtensilsCrossed className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'assistant', labelUrdu: 'پرسنل اسسٹنٹ', labelEnglish: 'Personal Assistant', desc: 'دفتری یا ذاتی مدد', icon: <Briefcase className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'security_guard', labelUrdu: 'سیکیورٹی گارڈ', labelEnglish: 'Security Guard', desc: 'حفاظت اور نگرانی', icon: <ShieldAlert className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'driver', labelUrdu: 'ڈرائیور', labelEnglish: 'Driver', desc: 'ذاتی یا دفتری ڈرائیور', icon: <Car className="w-5 h-5 text-[#0B2A5B]" /> },
    { id: 'helper', labelUrdu: 'ہیلپر', labelEnglish: 'Helper', desc: 'جنرل سپورٹ و مدد', icon: <HandHelping className="w-5 h-5 text-[#0B2A5B]" /> },
  ];

  const cities = [
    'لاہور (Lahore)',
    'اسلام آباد / راولپنڈی (Islamabad / Rawalpindi)',
    'کراچی (Karachi)',
    'فیصل آباد (Faisalabad)',
    'ملتان (Multan)',
    'سیالکوٹ (Sialkot)',
    'گوجرانوالہ (Gujranwala)',
    'پشاور (Peshawar)',
    'دیگر شہر (Other City)',
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'براہ کرم اپنا نام یا ادارے کا نام درج کریں';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'براہ کرم رابطہ نمبر درج کریں';
    } else if (!validatePakistaniPhone(formData.phone)) {
      newErrors.phone = 'درست پاکستانی موبائل نمبر درج کریں (03XXXXXXXXX)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'براہ کرم شہر منتخب کریں';
    }

    if (formData.selectedRoles.length === 0) {
      newErrors.selectedRoles = 'کم از کم ایک قسم کا اسٹاف منتخب کرنا ضروری ہے';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-container-${firstErrorKey}`) || document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);
    try {
      await saveSubmission('client', formData);
      navigate('/thank-you');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('فارم جمع کروانے میں مسئلہ پیش آیا ہے۔ براہ کرم واٹس ایپ پر رابطہ کریں۔');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-[#0B2A5B] hover:text-[#071C3D] font-semibold mb-6 transition-colors cursor-pointer group"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        <span>واپس ہوم پیج پر جائیں</span>
        <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">/ Back to Home</span>
      </button>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9] mb-8 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#0B2A5B]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FA] text-[#0B2A5B] flex items-center justify-center shrink-0 border border-[#0B2A5B]/20">
              <Building2 className="w-6 h-6 text-[#0B2A5B]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B2A5B] font-arabic-body">
                سٹاف کی ضرورت ہے؟ (کلائنٹ فارم)
              </h1>
              <p className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
                Hire Verified Domestic & Corporate Staff
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#EEF3FA] text-[#0B2A5B] px-3.5 py-1.5 rounded-full font-bold text-xs border border-[#0B2A5B]/20 self-start sm:self-center">
            <ShieldCheck className="w-4 h-4 text-[#0B2A5B]" />
            <span className="font-arabic-body">نادرا سے تصدیق شدہ اسٹاف</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#5F6B72] mt-3 font-arabic-body">
          گھر یا دفتر کے لیے قابلِ اعتماد، تربیت یافتہ اور تصدیق شدہ ملازمین حاصل کریں۔ فارم پر کریں، ہماری ٹیم جلد رابطہ کرے گی۔
        </p>
      </div>

      {/* The Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9] space-y-6">
        <h2 className="text-lg font-bold text-[#0B2A5B] font-arabic-body pb-3 border-b border-[#E2E6E9] flex items-center gap-2">
          <User className="w-5 h-5 text-[#0B2A5B]" />
          <span>آپ کی تفصیلات (Client Details)</span>
        </h2>

        {/* 1. Client / Company Name */}
        <FormField
          id="clientName"
          labelUrdu="آپ کا نام یا کمپنی کا نام"
          labelEnglish="Your Full Name or Company Name"
          required
          error={errors.clientName}
        >
          <input
            type="text"
            id="clientName"
            value={formData.clientName}
            onChange={(e) => {
              setFormData({ ...formData, clientName: e.target.value });
              if (errors.clientName) setErrors({ ...errors, clientName: '' });
            }}
            placeholder="مثال: چوہدری عثمان یا الائیڈ انٹرپرائزز"
            className={`w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-right ${
              errors.clientName
                ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                : 'border-[#E2E6E9] focus:border-[#0B2A5B] focus:ring-[#0B2A5B]/20'
            }`}
          />
        </FormField>

        {/* 2. Phone */}
        <FormField
          id="phone"
          labelUrdu="موبائل یا واٹس ایپ نمبر"
          labelEnglish="Mobile / WhatsApp Number"
          required
          error={errors.phone}
          helperText="ہم اس نمبر پر آپ سے رابطہ کریں گے (03XXXXXXXXX)"
        >
          <div className="relative">
            <input
              type="tel"
              id="phone"
              dir="ltr"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="03001234567"
              className={`w-full px-4 py-3 pl-10 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-left font-mono ${
                errors.phone
                  ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                : 'border-[#E2E6E9] focus:border-[#0B2A5B] focus:ring-[#0B2A5B]/20'
              }`}
            />
            <PhoneIcon className="w-4 h-4 text-[#5F6B72] absolute left-3.5 top-3.5" />
          </div>
        </FormField>

        {/* 3. City Selection & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="city"
            labelUrdu="شہر منتخب کریں"
            labelEnglish="City"
            required
            error={errors.city}
          >
            <select
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E6E9] bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:border-[#0B2A5B] focus:outline-hidden focus:ring-2 focus:ring-[#0B2A5B]/20 transition-all text-right"
            >
              {cities.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="address"
            labelUrdu="علاقہ یا پتہ"
            labelEnglish="Area / Address"
            helperText="مثال: ڈی ایچ اے، بحریہ ٹاؤن، گلبرگ..."
          >
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="علاقے کا نام لکھیں"
              className="w-full px-4 py-3 rounded-xl border border-[#E2E6E9] bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:border-[#0B2A5B] focus:outline-hidden focus:ring-2 focus:ring-[#0B2A5B]/20 transition-all text-right"
            />
          </FormField>
        </div>

        {/* 4. Staff Type Needed (Multi-select Chips) */}
        <div className="pt-4 border-t border-[#E2E6E9]">
          <div className="flex items-center justify-between mb-3">
            <label className="font-bold text-base text-[#0B2A5B] font-arabic-body">
              اسٹاف کی قسم منتخب کریں (ایک یا ایک سے زیادہ) <span className="text-[#C93B2B]">*</span>
            </label>
            <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
              Select Staff Types
            </span>
          </div>

          <ChipSelect
            options={staffRoleOptions}
            selected={formData.selectedRoles}
            multiple={true}
            onChange={(selectedRoles: string[]) => {
              setFormData((prev) => ({ ...prev, selectedRoles }));
              if (errors.selectedRoles) setErrors((prev) => ({ ...prev, selectedRoles: '' }));
            }}
            accentColor="navy"
            error={errors.selectedRoles}
          />
        </div>

        {/* 5. Workplace Type & Staff Count */}
        <div className="pt-4 border-t border-[#E2E6E9] grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Workplace Type: Home or Office */}
          <div>
            <label className="block font-semibold text-sm sm:text-base text-[#191C1D] mb-2 font-arabic-body">
              ملازمت کی جگہ (Workplace Type)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, workplaceType: 'home' })}
                className={`p-3 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.workplaceType === 'home'
                    ? 'bg-[#0B2A5B] text-white border-[#0B2A5B] shadow-xs'
                    : 'bg-[#F8F9FA] text-[#191C1D] border-[#E2E6E9] hover:bg-[#EAECEE]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>گھر (Residence)</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, workplaceType: 'office' })}
                className={`p-3 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.workplaceType === 'office'
                    ? 'bg-[#0B2A5B] text-white border-[#0B2A5B] shadow-xs'
                    : 'bg-[#F8F9FA] text-[#191C1D] border-[#E2E6E9] hover:bg-[#EAECEE]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>آفس (Office)</span>
              </button>
            </div>
          </div>

          {/* Staff Count Stepper */}
          <div>
            <label className="block font-semibold text-sm sm:text-base text-[#191C1D] mb-2 font-arabic-body">
              کتنے افراد چاہئیں؟ <span className="text-xs text-[#5F6B72] font-en-label">(Staff Count)</span>
            </label>
            <div className="flex items-center justify-between p-2 rounded-xl border border-[#E2E6E9] bg-[#F8F9FA]">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, staffCount: Math.max(1, prev.staffCount - 1) }))}
                className="w-10 h-10 rounded-lg bg-white border border-[#E2E6E9] flex items-center justify-center text-[#191C1D] hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="text-center font-bold text-lg text-[#0B2A5B] font-mono">
                <span>{formData.staffCount}</span>
                <span className="text-xs text-[#5F6B72] font-arabic-body mr-2">افراد</span>
              </div>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, staffCount: Math.min(20, prev.staffCount + 1) }))}
                className="w-10 h-10 rounded-lg bg-white border border-[#E2E6E9] flex items-center justify-center text-[#191C1D] hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6. Extra Requirements Textarea */}
        <div className="pt-2">
          <label className="block font-semibold text-sm sm:text-base text-[#191C1D] mb-1.5 font-arabic-body">
            مزید تفصیل یا مخصوص شرائط <span className="text-xs text-[#5F6B72] font-en-label">(Special Requirements - Optional)</span>
          </label>
          <textarea
            rows={3}
            value={formData.extraDetails}
            onChange={(e) => setFormData({ ...formData, extraDetails: e.target.value })}
            placeholder="مثال: فل ٹائم ملازم چاہیے، رہائش دستیاب ہے، مخصوص اوقات وغیرہ..."
            className="w-full px-4 py-3 rounded-xl border border-[#E2E6E9] bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:border-[#0B2A5B] focus:outline-hidden focus:ring-2 focus:ring-[#0B2A5B]/20 transition-all text-right resize-none"
          />
        </div>

        {/* 7. Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-[#0B2A5B] hover:bg-[#071C3D] disabled:bg-[#0B2A5B]/60 text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-arabic-body">درخواست جمع ہو رہی ہے...</span>
              </>
            ) : (
              <>
                <span className="font-arabic-body">سٹاف حاصل کرنے کے لیے درخواست بھیجیں</span>
                <span className="text-xs opacity-80 font-en-label" dir="ltr">/ Submit Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
