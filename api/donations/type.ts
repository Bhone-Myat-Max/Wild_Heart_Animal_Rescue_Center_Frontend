
export interface DonationFormData {
  name: string;
  amount: number | string;
  email: string;
  phone: string;
  purpose: string;
  image: File | null;
}

export interface FormErrors {
  name?: string;
  amount?: string;
  email?: string;
  phone?: string;
  purpose?: string;
  image?: string;
}

export enum DonationPurpose {
  FOOD = 'Food & Nutrition',
  MEDICINE = 'Medical Care',
  SHELTER = 'Habitat Construction',
  GENERAL = 'General Fund',
  OTHER = 'Other'
}