import { IComment } from 'src/comments/interfaces';

export default interface IPost {
  id: number;
  user_id?: number;
  title: string;
  content: string;
  comments?: IComment[];
  created_at: Date;
  updated_at: Date;
}
