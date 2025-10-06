export interface Product {
  id: string;
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  daily_sales: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormData {
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  daily_sales?: number;
}
