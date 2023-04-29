export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  is_admin: boolean;
  balance: number;
  currency: string;
  created_at: Date;
};