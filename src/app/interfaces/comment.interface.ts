import { IUser } from "./user.interface";

export interface IComment {
  id: number;
  content: string;
  date: string;        // timestamp -> string
  status: number;      // tinyint -> number
  product_id: number;
  user_id: number;
  product?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
  };
}
