export interface ICategory {
  id : number;
  name : string;
  parent_id? : number;
  status? : boolean;
  created_at? : string;
  updated_at? : string;
}
