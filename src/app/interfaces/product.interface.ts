export interface IProduct {
[x: string]: any;
  set: any;
  id : number;
  name : string;
  price : number;
  sale_price? : number;
  image : string;
  description? : string;
  category_id : number,
  status? : boolean;
  created_at? : string;
  updated_at? : string;
  category?: {
    id: number;
    name: string;
  };
}
