 type Animal ={
  id: number;
  tagcode: string;
  species: string;
  gender: string;
  estimated_age: string;
  health_status: string;
  rescue_id: number;
  current_status: 'rescued' | 'under_treatment' | 'adopted';
  image?: string | null;
  created_at: string;
  updated_at: string;
}