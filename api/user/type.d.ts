 type AvailabilityStatus = 'Free' | 'On Mission' | 'Off Duty';

 type UserStatus = 'Active' | 'Inactive';

 type User ={
  id: number;
  name: string;
  phone: string;
  status: UserStatus;
  address: string;
  email: string;
  email_verified_at?: string | null;
  availability_status: AvailabilityStatus;
  created_at?: string;
  updated_at?: string;
  
}
type UpdatePayload = {
  name?:string;
  email?: string;
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}
