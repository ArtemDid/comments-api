export interface ICommentDB {
  id?: number;
  users_id: number;
  parent_id: string;
  text: string;
  created_at?: string;
  updated_at?: string;
  childrens?: any;
}
