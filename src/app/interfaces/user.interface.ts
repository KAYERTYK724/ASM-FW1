export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  name?: string;
  phone?: string | null;
  status: number; // 0 | 1
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}
