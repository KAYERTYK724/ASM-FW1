export interface IProduct {
  id: number;
  name: string;
  price: number;
  sale_price?: number;
  image: string;
  gallery?: string[];
  description?: string;
  category_id: number;
  stock?: number;
  rating?: number;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}
