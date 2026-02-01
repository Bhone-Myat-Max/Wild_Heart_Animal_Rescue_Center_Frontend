// ENUM TYPES (match Laravel ENUM)
// type DonationPurpose =
//   | "Food & Nutrition"
//   | "Medical Care"
//   | "Habitat Construction"
//   | "General Fund"
//   | "Other";



 type Donation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  image: Text | null; // backend usually stores image path, not File
};

// type DonationResponse = {

// }

// export enum DonationPurpose { FOOD = 'Food & Nutrition', MEDICINE = 'Medical Care', SHELTER = 'Habitat Construction', GENERAL = 'General Fund', OTHER = 'Other' }



// export interface DonationFormData {
//   name: string;
//   amount: number | string;
//   email: string;
//   phone: string;
//   purpose: string;
//   image: File | null;
// }

// export interface FormErrors {
//   name?: string;
//   amount?: string;
//   email?: string;
//   phone?: string;
//   purpose?: string;
//   image?: string;
// }



