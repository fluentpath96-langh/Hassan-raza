import React from 'react';

interface FormFieldProps {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  labelUrdu,
  labelEnglish,
  required = false,
  error,
  helperText,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1.5 text-right w-full" id={`field-container-${id}`}>
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-semibold text-sm sm:text-base text-[#191C1D] flex items-center gap-1">
          <span className="font-arabic-body">{labelUrdu}</span>
          {required && <span className="text-[#C93B2B] font-bold">*</span>}
        </label>
        <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
          {labelEnglish}
        </span>
      </div>

      {/* Input Slot */}
      <div className="relative">
        {children}
      </div>

      {/* Urdu Error Message */}
      {error && (
        <p className="text-xs sm:text-sm text-[#C93B2B] font-medium font-arabic-body flex items-center gap-1.5 mt-0.5 animate-in fade-in">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C93B2B]"></span>
          <span>{error}</span>
        </p>
      )}

      {/* Helper info text */}
      {!error && helperText && (
        <p className="text-xs text-[#5F6B72] font-arabic-body mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
};
