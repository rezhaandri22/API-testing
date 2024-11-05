export default interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'member' | 'admin';
  created_at: Date;
  updated_at: Date;
}
