export type PageRoute = 
  | '/'
  | '/staff'
  | '/staff/saudi'
  | '/staff/pakistan'
  | '/client'
  | '/thank-you';

export interface SubmissionResult {
  refCode: string;
  type: 'staff_saudi' | 'staff_pakistan' | 'client';
  applicantName: string;
  phone: string;
  submittedAt: string;
}

export interface SaudiStaffFormData {
  fullName: string;
  age: string;
  phone: string;
  cityAddress: string;
  cnic: string;
  cnicFront: string | null;
  cnicBack: string | null;
  photo: string | null;
  hasPassport: 'yes' | 'no';
  experience: string;
  consent: boolean;
}

export interface PakistanStaffFormData {
  fullName: string;
  age: string;
  gender: 'female' | 'male';
  cityAddress: string;
  phone: string;
  cnic: string;
  cnicFront: string | null;
  cnicBack: string | null;
  selectedRole: string;
  licenseNumber?: string;
  licensePhoto?: string | null;
  experience?: string;
  consent: boolean;
}

export interface ClientFormData {
  clientName: string;
  phone: string;
  city: string;
  address: string;
  selectedRoles: string[];
  workplaceType: 'home' | 'office';
  staffCount: number;
  extraDetails: string;
}
