import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

export interface ChipOption {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
  subTextUrdu?: string;
  desc?: string;
  icon?: React.ReactNode;
}

interface ChipSelectProps {
  options: ChipOption[];
  selected: string | string[]; // single id or array of ids
  onChange: (selected: any) => void;
  multiple?: boolean;
  accentColor?: 'green' | 'navy';
  error?: string;
}

export const ChipSelect: React.FC<ChipSelectProps> = ({
  options,
  selected,
  onChange,
  multiple = false,
  accentColor = 'green',
  error,
}) => {
  const isSelected = (id: string) => {
    if (multiple && Array.isArray(selected)) {
      return selected.includes(id);
    }
    return selected === id;
  };

  const handleToggle = (id: string) => {
    if (multiple && Array.isArray(selected)) {
      if (selected.includes(id)) {
        onChange(selected.filter((item) => item !== id));
      } else {
        onChange([...selected, id]);
      }
    } else {
      onChange(id);
    }
  };

  const activeStyles =
    accentColor === 'navy'
      ? 'bg-[#0B2A5B] text-white border-[#0B2A5B] shadow-sm'
      : 'bg-[#0B5D3B] text-white border-[#0B5D3B] shadow-sm';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((option) => {
          const checked = isSelected(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggle(option.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-right cursor-pointer min-h-[64px] ${
                checked
                  ? activeStyles
                  : 'bg-[#F3F4F5] hover:bg-[#EAECEE] text-[#191C1D] border-[#E2E6E9]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {option.icon && (
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      checked ? 'bg-white/20 text-white' : 'bg-white text-[#0B5D3B] shadow-2xs'
                    }`}
                  >
                    {option.icon}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base font-arabic-body leading-tight truncate">
                    {option.labelUrdu}
                  </div>
                  <div
                    className={`text-xs font-en-label leading-tight truncate ${
                      checked ? 'text-white/80' : 'text-[#5F6B72]'
                    }`}
                  >
                    {option.labelEnglish}
                  </div>
                  {(option.desc || option.subTextUrdu) && (
                    <div
                      className={`text-[11px] font-arabic-body mt-0.5 truncate ${
                        checked ? 'text-white/70' : 'text-[#5F6B72]/80'
                      }`}
                    >
                      {option.desc || option.subTextUrdu}
                    </div>
                  )}
                </div>
              </div>

              {/* Status checkmark */}
              <div className="shrink-0 mr-1">
                {checked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#8AD4A8]" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#BFC9C0]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs sm:text-sm text-[#C93B2B] font-medium font-arabic-body flex items-center gap-1.5 mt-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C93B2B]"></span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
