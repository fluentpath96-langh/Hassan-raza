import React, { useState, useRef } from 'react';
import { compressImage } from '../utils/submission';
import { Upload, Camera, X, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
  subTextUrdu?: string;
  required?: boolean;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  error?: string;
  acceptCamera?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  labelUrdu,
  labelEnglish,
  subTextUrdu = 'تصویر اپلوڈ کرنے کے لیے کلک کریں (JPG, PNG)',
  required = false,
  value,
  onChange,
  error,
  acceptCamera = true,
}) => {
  const [compressing, setCompressing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; sizeKb: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setLocalError(null);
    setCompressing(true);

    try {
      const result = await compressImage(file);
      setFileInfo({ name: result.name, sizeKb: result.sizeKb });
      onChange(result.dataUrl);
    } catch (err: any) {
      setLocalError(err.message || 'تصویر اپلوڈ نہیں ہو سکی، براہ کرم دوبارہ کوشش کریں');
      onChange(null);
    } finally {
      setCompressing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setFileInfo(null);
    setLocalError(null);
  };

  return (
    <div className="flex flex-col gap-1.5 text-right w-full">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="font-semibold text-sm sm:text-base text-[#191C1D] flex items-center gap-1">
          <span className="font-arabic-body">{labelUrdu}</span>
          {required && <span className="text-[#C93B2B] font-bold">*</span>}
        </label>
        <span className="text-xs text-[#5F6B72] font-en-label" dir="ltr">
          {labelEnglish}
        </span>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleInputChange}
        className="hidden"
      />
      {acceptCamera && (
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/jpeg,image/png,image/jpg"
          capture="environment"
          onChange={handleInputChange}
          className="hidden"
        />
      )}

      {/* Container / Dropzone / Preview */}
      {!value ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#F3F4F5] hover:bg-[#EAECEE] hover:border-[#0B5D3B] ${
            error || localError ? 'border-[#C93B2B] bg-[#FCEBEA]' : 'border-[#BFC9C0]'
          }`}
        >
          {compressing ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="w-8 h-8 text-[#0B5D3B] animate-spin" />
              <p className="text-xs font-semibold text-[#0B5D3B] font-arabic-body">
                تصویر کو محفوظ سائز میں تبدیل کیا جا رہا ہے...
              </p>
              <span className="text-[11px] text-[#5F6B72] font-en-label">Optimizing image size (~1MB)...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center shadow-xs">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <p className="font-bold text-sm text-[#191C1D] font-arabic-body">
                  فائل منتخب کریں یا یہاں ڈراپ کریں
                </p>
                <p className="text-xs text-[#5F6B72] mt-0.5 font-arabic-body">
                  {subTextUrdu}
                </p>
              </div>

              {/* Action Buttons: Gallery or Camera */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E6E9] text-xs font-semibold text-[#191C1D] hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#0B5D3B]" />
                  <span>گیلری سے منتخب کریں</span>
                </button>

                {acceptCamera && (
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B5D3B] text-white text-xs font-semibold hover:bg-[#08492E] shadow-xs transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>کیمرہ سے تصویر لیں</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] text-[#5F6B72] font-en-label mt-1">
                Max: 5MB (Auto-compressed to ~1MB) • JPG, PNG
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Preview State */
        <div className="relative border border-[#0B5D3B]/30 rounded-xl p-3 bg-white shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#E2E6E9] bg-gray-50 shrink-0">
              <img
                src={value}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right min-w-0">
              <p className="font-semibold text-sm text-[#191C1D] truncate font-arabic-body">
                {fileInfo?.name || 'تصویر کامیابی سے منتخب ہو چکی ہے'}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1 text-xs text-[#0B5D3B] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>تیار ہے</span>
                </span>
                {fileInfo && (
                  <span className="text-[11px] text-[#5F6B72] font-en-label" dir="ltr">
                    ({fileInfo.sizeKb} KB)
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="flex items-center gap-1 text-xs text-[#C93B2B] hover:text-[#93000A] bg-[#FCEBEA] hover:bg-[#ffdad6] px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
            <span>ہٹائیں / Remove</span>
          </button>
        </div>
      )}

      {/* Error message */}
      {(error || localError) && (
        <p className="text-xs sm:text-sm text-[#C93B2B] font-medium font-arabic-body flex items-center gap-1.5 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error || localError}</span>
        </p>
      )}
    </div>
  );
};
