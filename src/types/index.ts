import { JSX } from "react";

export type User = {
  id: number;
  email?: string;
  username?: string;
  password?: string;
  createdAt?: Date;
};

export type Product = {
  id: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
  product_stocks: number;
  supplier_name?: string;
};

export type Sale = {
  sale_id: string;
  productId: string;
  quantity: number;
  total: number;
  date: string;
};

export interface NavBarLinks {
  label: string;
  href: string;
  showOnPages?: ("landing" | "dashboard")[]; // array of links where the links should appear different
}
