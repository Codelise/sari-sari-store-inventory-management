import { supabase } from "./supabase";
import { Product, ProductFormData } from "@/types/product";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createProduct(productData: ProductFormData): Promise<Product> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("products")
      .insert({
        ...productData,
        daily_sales: 0, // Initialize daily_sales to 0
        user_id: userData.user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(
    id: string,
    productData: Partial<ProductFormData>
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .update({
        ...productData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateDailySales(
    productId: string,
    salesAmount: number
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .update({
        daily_sales: salesAmount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async incrementDailySales(
    productId: string,
    amount: number
  ): Promise<Product> {
    // First get the current daily_sales
    const { data: currentProduct } = await supabase
      .from("products")
      .select("daily_sales")
      .eq("id", productId)
      .single();

    if (!currentProduct) throw new Error("Product not found");

    const newDailySales = (currentProduct.daily_sales || 0) + amount;

    const { data, error } = await supabase
      .from("products")
      .update({
        daily_sales: newDailySales,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async resetAllDailySales(): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("products")
      .update({ daily_sales: 0 })
      .eq("user_id", userData.user.id);

    if (error) throw error;
  },

  async getTodayTotalSales(): Promise<number> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("products")
      .select("daily_sales")
      .eq("user_id", userData.user.id);

    if (error) throw error;

    return data.reduce(
      (total, product) => total + (product.daily_sales || 0),
      0
    );
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;
  },
};
