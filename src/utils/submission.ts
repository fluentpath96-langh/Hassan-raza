import { SubmissionResult } from '../types';

/**
 * Saves or logs submission data. In this phase, logs to console and stores in localStorage
 * for the /thank-you page. Can be swapped with Firestore / Backend API in the future.
 */
export async function saveSubmission(
  type: 'staff_saudi' | 'staff_pakistan' | 'client',
  data: Record<string, any>,
  files: Record<string, string | null> = {}
): Promise<SubmissionResult> {
  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const refCode = `GF-${randomNumber}`;

  const submission: SubmissionResult = {
    refCode,
    type,
    applicantName: data.fullName || data.clientName || 'درخواست گزار',
    phone: data.phone || '',
    submittedAt: new Date().toISOString(),
  };

  // Log to console as requested
  console.log('=== [GLOBAL FLY SUBMISSION] ===', {
    type,
    refCode,
    data,
    filesCount: Object.keys(files).length,
    timestamp: new Date().toISOString(),
  });

  // Store in localStorage for the thank-you page
  try {
    localStorage.setItem('gf_last_submission', JSON.stringify(submission));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  return submission;
}

export function getLastSubmission(): SubmissionResult | null {
  try {
    const raw = localStorage.getItem('gf_last_submission');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read last submission:', e);
  }
  return null;
}

/**
 * Format CNIC to 12345-1234567-1 format as the user types
 */
export function formatCNIC(input: string): string {
  // Extract only digits
  const digits = input.replace(/\D/g, '').slice(0, 13);
  
  if (digits.length <= 5) {
    return digits;
  } else if (digits.length <= 12) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  } else {
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  }
}

/**
 * Validates Pakistani CNIC (13 digits formatted as 12345-1234567-1)
 */
export function validateCNIC(cnic: string): boolean {
  const digitsOnly = cnic.replace(/\D/g, '');
  return digitsOnly.length === 13;
}

/**
 * Formats Pakistani mobile number
 */
export function formatPhone(input: string): string {
  return input.replace(/[^\d+]/g, '').slice(0, 11);
}

/**
 * Validates Pakistani mobile format: 03XXXXXXXXX (11 digits)
 */
export function validatePakistaniPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  // Must be 11 digits and start with 03
  return /^03\d{9}$/.test(clean);
}

/**
 * Compresses an image file on the client using an HTML canvas.
 * - Enforces max 5 MB initial size
 * - Only accepts JPEG / PNG
 * - Resizes and compresses down to ~1 MB or below
 */
export async function compressImage(file: File): Promise<{
  dataUrl: string;
  sizeKb: number;
  name: string;
}> {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    throw new Error('صرف JPG یا PNG تصاویر اپلوڈ کرنے کی اجازت ہے (Only JPG/PNG images allowed)');
  }

  // Validate initial size (Max 5 MB)
  const MAX_BYTES = 5 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    throw new Error('تصویر کا سائز 5 ایم بی سے زیادہ نہیں ہونا چاہیے (Image size must be less than 5MB)');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('فائل پڑھنے میں مسئلہ پیش آیا ہے'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('تصویر لوڈ کرنے میں مسئلہ پیش آیا'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension 1600px for good fidelity while maintaining compact size
          const MAX_DIM = 1600;
          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas context not available');
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG at 0.8 quality (~500KB - 1MB)
          const quality = 0.82;
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          const sizeKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

          resolve({
            dataUrl: compressedDataUrl,
            sizeKb,
            name: file.name,
          });
        } catch (err) {
          reject(err);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
