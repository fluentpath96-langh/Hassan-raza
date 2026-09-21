import React, { useState } from 'react';
import { PageRoute, SaudiStaffFormData } from '../types';
import { FormField } from '../components/FormField';
import { FileUpload } from '../components/FileUpload';
import {
  saveSubmission,
  formatCNIC,
  validateCNIC,
  formatPhone,
  validatePakistaniPhone,
} from '../utils/submission';
import {
  ArrowRight,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Banknote,
  Home,
  User,
  Phone as PhoneIcon,
  CreditCard,
  MapPin,
  FileCheck,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';

interface StaffSaudiPageProps {
  navigate: (route: PageRoute) => void;
}

export const StaffSaudiPage: React.FC<StaffSaudiPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState<SaudiStaffFormData>({
    fullName: '',
    age: '',
    phone: '',
    cityAddress: '',
    cnic: '',
    cnicFront: null,
    cnicBack: null,
    photo: null,
    hasPassport: 'no',
    experience: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleCNICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value);
    setFormData((prev) => ({ ...prev, cnic: formatted }));
    if (errors.cnic) {
      setErrors((prev) => ({ ...prev, cnic: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'براہ کرم اپنا پورا نام درج کریں (Please enter your full name)';
    }

    // 2. Age (21 to 45 only)
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age.trim()) {
      newErrors.age = 'براہ کرم اپنی عمر درج کریں (Please enter your age)';
    } else if (isNaN(ageNum) || ageNum < 21 || ageNum > 45) {
      newErrors.age = 'سعودی عرب کے لیے عمر 21 سے 45 سال ہونی چاہیے';
    }

    // 3. Phone (03XXXXXXXXX)
    if (!formData.phone.trim()) {
      newErrors.phone = 'براہ کرم موبائل یا واٹس ایپ نمبر درج کریں';
    } else if (!validatePakistaniPhone(formData.phone)) {
      newErrors.phone = 'درست پاکستانی موبائل نمبر درج کریں (03XXXXXXXXX)';
    }

    // 4. City & Address
    if (!formData.cityAddress.trim()) {
      newErrors.cityAddress = 'براہ کرم اپنا شہر اور مکمل پتہ درج کریں';
    }

    // 5. CNIC
    if (!formData.cnic.trim()) {
      newErrors.cnic = 'براہ کرم شناختی کارڈ نمبر درج کریں';
    } else if (!validateCNIC(formData.cnic)) {
      newErrors.cnic = '13 ہندسوں کا درست شناختی کارڈ نمبر درج کریں (مثال: 12345-1234567-1)';
    }

    // 6. CNIC front photo
    if (!formData.cnicFront) {
      newErrors.cnicFront = 'شناختی کارڈ کے سامنے کی تصویر اپلوڈ کرنا لازمی ہے';
    }

    // 7. CNIC back photo
    if (!formData.cnicBack) {
      newErrors.cnicBack = 'شناختی کارڈ کے پچھلے رخ کی تصویر اپلوڈ کرنا لازمی ہے';
    }

    // 8. Own photo
    if (!formData.photo) {
      newErrors.photo = 'امیدوار کی اپنی حالیہ صاف تصویر اپلوڈ کرنا لازمی ہے';
    }

    // 9. Consent
    if (!formData.consent) {
      newErrors.consent = 'درخواست جمع کروانے کے لیے اجازت دینا لازمی ہے';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-container-${firstErrorKey}`) || document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);
    try {
      await saveSubmission(
        'staff_saudi',
        {
          fullName: formData.fullName,
          age: formData.age,
          phone: formData.phone,
          cityAddress: formData.cityAddress,
          cnic: formData.cnic,
          hasPassport: formData.hasPassport,
          experience: formData.experience,
        },
        {
          cnicFront: formData.cnicFront,
          cnicBack: formData.cnicBack,
          photo: formData.photo,
        }
      );

      navigate('/thank-you');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('درخواست جمع کروانے میں خرابی پیش آئی ہے۔ براہ کرم دوبارہ کوشش کریں یا واٹس ایپ پر رابطہ کریں۔');
    } finally {
      setSubmitting(false);
    }
  };

  const experienceOptions = [
    'صفائی و امور خانہ داری (Cleaning & Housekeeping)',
    'کھانا پکانا (Cooking / Kitchen Work)',
    'بچوں کی دیکھ بھال (Child Care / Babysitting)',
    'بزرگوں کی نگہداشت (Elderly Care)',
    'پہلے کبھی باہر کام نہیں کیا (Fresh Candidate)',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/staff')}
        className="inline-flex items-center gap-2 text-sm text-[#0B5D3B] hover:text-[#08492E] font-semibold mb-6 transition-colors cursor-pointer group"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        <span>واپس انتخاب کے صفحے پر جائیں</span>
        <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">/ Back</span>
      </button>

      {/* Main Header & Saudi Opportunity Recap Box */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9] mb-8 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#D4A93A]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCF7EA] text-[#D4A93A] flex items-center justify-center shrink-0 border border-[#D4A93A]/30">
              <Plane className="w-6 h-6 text-[#D4A93A]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B2A5B] font-arabic-body">
                سعودی عرب ملازمت فارم
              </h1>
              <p className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
                Saudi Arabia Staff Application Form
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#FCEBEA] text-[#C93B2B] px-3.5 py-1.5 rounded-full font-bold text-xs border border-[#C93B2B]/30 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-[#C93B2B] animate-pulse" />
            <span className="font-arabic-body">صرف خواتین | عمر 21 سے 45 سال</span>
          </div>
        </div>

        {/* Highlighted Perks Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-[#191C1D]">
          <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0B5D3B]" />
            <span>2 سال ویزا</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-2">
            <Banknote className="w-4 h-4 text-[#D4A93A]" />
            <span>1200 ریال تنخواہ</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-2">
            <Home className="w-4 h-4 text-[#0B2A5B]" />
            <span>کھانا رہائش مفت</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E6E9] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0B5D3B]" />
            <span>ٹکٹ کمپنی کا</span>
          </div>
        </div>
      </div>

      {/* The Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E6E9] space-y-6">
        <h2 className="text-lg font-bold text-[#0B2A5B] font-arabic-body pb-3 border-b border-[#E2E6E9] flex items-center gap-2">
          <User className="w-5 h-5 text-[#0B5D3B]" />
          <span>امیدوار کی بنیادی معلومات (Personal Information)</span>
        </h2>

        {/* 1. Full Name */}
        <FormField
          id="fullName"
          labelUrdu="پورا نام (شناختی کارڈ کے مطابق)"
          labelEnglish="Full Name (As per CNIC)"
          required
          error={errors.fullName}
        >
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            placeholder="مثال: نسیم بی بی / Fatima Bibi"
            className={`w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-right ${
              errors.fullName
                ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                : 'border-[#E2E6E9] focus:border-[#0B5D3B] focus:ring-[#0B5D3B]/20'
            }`}
          />
        </FormField>

        {/* 2. Age & Phone in 2 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Age */}
          <FormField
            id="age"
            labelUrdu="عمر (سال)"
            labelEnglish="Age (21 to 45 Years Only)"
            required
            error={errors.age}
            helperText="سعودی حکومتی قوانین کے مطابق عمر 21 سے 45 سال ہونا ضروری ہے"
          >
            <input
              type="number"
              id="age"
              min={18}
              max={80}
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                if (errors.age) setErrors({ ...errors, age: '' });
              }}
              placeholder="مثال: 28"
              className={`w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-right ${
                errors.age
                  ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                  : 'border-[#E2E6E9] focus:border-[#0B5D3B] focus:ring-[#0B5D3B]/20'
              }`}
            />
          </FormField>

          {/* Mobile/WhatsApp */}
          <FormField
            id="phone"
            labelUrdu="موبائل یا واٹس ایپ نمبر"
            labelEnglish="Mobile / WhatsApp Number"
            required
            error={errors.phone}
            helperText="11 ہندسے (شروع میں 03)"
          >
            <div className="relative">
              <input
                type="tel"
                id="phone"
                dir="ltr"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="03011234567"
                className={`w-full px-4 py-3 pl-10 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-left font-mono ${
                  errors.phone
                    ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                    : 'border-[#E2E6E9] focus:border-[#0B5D3B] focus:ring-[#0B5D3B]/20'
                }`}
              />
              <PhoneIcon className="w-4 h-4 text-[#5F6B72] absolute left-3.5 top-3.5" />
            </div>
          </FormField>
        </div>

        {/* 3. Address */}
        <FormField
          id="cityAddress"
          labelUrdu="آپ کہاں رہتی ہیں؟ شہر اور مکمل پتہ"
          labelEnglish="Current City & Full Address"
          required
          error={errors.cityAddress}
        >
          <input
            type="text"
            id="cityAddress"
            value={formData.cityAddress}
            onChange={(e) => {
              setFormData({ ...formData, cityAddress: e.target.value });
              if (errors.cityAddress) setErrors({ ...errors, cityAddress: '' });
            }}
            placeholder="مثال: لاہور، غازی روڈ، مکان نمبر 12..."
            className={`w-full px-4 py-3 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-right ${
              errors.cityAddress
                ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                : 'border-[#E2E6E9] focus:border-[#0B5D3B] focus:ring-[#0B5D3B]/20'
            }`}
          />
        </FormField>

        {/* 4. CNIC Number */}
        <FormField
          id="cnic"
          labelUrdu="قومی شناختی کارڈ نمبر"
          labelEnglish="CNIC Number (13 Digits)"
          required
          error={errors.cnic}
          helperText="شناختی کارڈ نمبر خود بخود فارمیٹ ہو جائے گا (12345-1234567-1)"
        >
          <div className="relative">
            <input
              type="text"
              id="cnic"
              dir="ltr"
              value={formData.cnic}
              onChange={handleCNICChange}
              placeholder="35201-1234567-2"
              className={`w-full px-4 py-3 pl-10 rounded-xl border bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 transition-all text-left font-mono tracking-wider ${
                errors.cnic
                  ? 'border-[#C93B2B] focus:ring-[#C93B2B]/20'
                  : 'border-[#E2E6E9] focus:border-[#0B5D3B] focus:ring-[#0B5D3B]/20'
              }`}
            />
            <CreditCard className="w-4 h-4 text-[#5F6B72] absolute left-3.5 top-3.5" />
          </div>
        </FormField>

        {/* 5. CNIC Front & Back Uploads */}
        <div className="pt-2 border-t border-[#E2E6E9]">
          <h3 className="font-bold text-base text-[#0B2A5B] font-arabic-body mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#0B5D3B]" />
            <span>شناختی کارڈ اور تصویر اپلوڈ (Required Documents)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileUpload
              id="cnicFront"
              labelUrdu="شناختی کارڈ: سامنے کی تصویر"
              labelEnglish="CNIC Front Side Photo"
              required
              value={formData.cnicFront}
              onChange={(dataUrl) => {
                setFormData((prev) => ({ ...prev, cnicFront: dataUrl }));
                if (errors.cnicFront) setErrors((prev) => ({ ...prev, cnicFront: '' }));
              }}
              error={errors.cnicFront}
            />

            <FileUpload
              id="cnicBack"
              labelUrdu="شناختی کارڈ: پچھلی تصویر"
              labelEnglish="CNIC Back Side Photo"
              required
              value={formData.cnicBack}
              onChange={(dataUrl) => {
                setFormData((prev) => ({ ...prev, cnicBack: dataUrl }));
                if (errors.cnicBack) setErrors((prev) => ({ ...prev, cnicBack: '' }));
              }}
              error={errors.cnicBack}
            />
          </div>
        </div>

        {/* 6. Own Photo Upload */}
        <div className="pt-2">
          <FileUpload
            id="photo"
            labelUrdu="امیدوار کی تازہ ترین صاف تصویر"
            labelEnglish="Applicant Recent Clear Photo"
            subTextUrdu="سامنے سے لی گئی صاف تصویر یا کیمرے سے فوری تصویر بنائیں"
            required
            value={formData.photo}
            onChange={(dataUrl) => {
              setFormData((prev) => ({ ...prev, photo: dataUrl }));
              if (errors.photo) setErrors((prev) => ({ ...prev, photo: '' }));
            }}
            error={errors.photo}
          />
        </div>

        {/* 7. Passport Available Toggle */}
        <div className="pt-2 border-t border-[#E2E6E9]">
          <label className="block font-semibold text-sm sm:text-base text-[#191C1D] mb-2 font-arabic-body">
            کیا آپ کے پاس پاسپورٹ موجود ہے؟ <span className="text-xs text-[#5F6B72] font-en-label">(Do you have a valid Passport?)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasPassport: 'yes' })}
              className={`p-3 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                formData.hasPassport === 'yes'
                  ? 'bg-[#0B5D3B] text-white border-[#0B5D3B] shadow-xs'
                  : 'bg-[#F8F9FA] text-[#191C1D] border-[#E2E6E9] hover:bg-[#EAECEE]'
              }`}
            >
              <span>ہاں، پاسپورٹ موجود ہے (Yes)</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasPassport: 'no' })}
              className={`p-3 rounded-xl border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                formData.hasPassport === 'no'
                  ? 'bg-[#0B2A5B] text-white border-[#0B2A5B] shadow-xs'
                  : 'bg-[#F8F9FA] text-[#191C1D] border-[#E2E6E9] hover:bg-[#EAECEE]'
              }`}
            >
              <span>نہیں، پاسپورٹ بنوانا ہے (No)</span>
            </button>
          </div>
          <p className="text-xs text-[#5F6B72] font-arabic-body mt-1.5">
            اگر پاسپورٹ نہیں ہے تو کمپنی آپ کی پاسپورٹ بنوانے میں مکمل رہنمائی کرے گی۔
          </p>
        </div>

        {/* 8. Work experience dropdown/chips */}
        <div className="pt-2">
          <label className="block font-semibold text-sm sm:text-base text-[#191C1D] mb-2 font-arabic-body">
            گھریلو کام کا تجربہ <span className="text-xs text-[#5F6B72] font-en-label">(Domestic Work Experience - Optional)</span>
          </label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E6E9] bg-[#F8F9FA] text-[#191C1D] text-sm sm:text-base focus:bg-white focus:border-[#0B5D3B] focus:outline-hidden focus:ring-2 focus:ring-[#0B5D3B]/20 transition-all text-right"
          >
            <option value="">تجربہ منتخب کریں (آپشنل)</option>
            {experienceOptions.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 9. Consent Checkbox */}
        <div className="pt-4 border-t border-[#E2E6E9]">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => {
                setFormData({ ...formData, consent: e.target.checked });
                if (errors.consent) setErrors({ ...errors, consent: '' });
              }}
              className="mt-1 w-5 h-5 rounded border-[#BFC9C0] text-[#0B5D3B] focus:ring-[#0B5D3B] cursor-pointer"
            />
            <div className="text-right">
              <span className="font-bold text-sm sm:text-base text-[#191C1D] font-arabic-body">
                میں اپنی معلومات جمع کروانے کی اجازت دیتی/دیتا ہوں
              </span>
              <p className="text-xs text-[#5F6B72] font-arabic-body mt-0.5 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#0B5D3B]" />
                <span>آپ کی تمام معلومات اور دستاویزات مکمل طور پر محفوظ رہیں گی۔</span>
              </p>
            </div>
          </label>
          {errors.consent && (
            <p className="text-xs sm:text-sm text-[#C93B2B] font-medium font-arabic-body flex items-center gap-1.5 mt-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* 10. Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-[#0B5D3B] hover:bg-[#08492E] disabled:bg-[#0B5D3B]/60 text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-arabic-body">درخواست جمع ہو رہی ہے...</span>
              </>
            ) : (
              <>
                <span className="font-arabic-body">سعودی عرب کے لیے درخواست جمع کروائیں</span>
                <span className="text-xs opacity-80 font-en-label" dir="ltr">/ Submit Saudi Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
