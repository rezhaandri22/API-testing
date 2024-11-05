export default interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
