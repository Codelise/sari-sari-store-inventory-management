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

// NEW: Proper sales service that records individual sales transactions
export const salesService = {
  // Record a sale and update product quantities
  async recordSale(productId: string, quantity: number): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    // Get product details
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (productError || !product) throw new Error("Product not found");

    // Check stock availability
    if (product.quantity < quantity) {
      throw new Error(
        `Insufficient stock. Only ${product.quantity} items available.`
      );
    }

    const totalAmount = product.price * quantity;

    try {
      // 1. Record the sale in sales table
      const { error: saleError } = await supabase.from("sales").insert({
        product_id: productId,
        product_name: product.name,
        quantity_sold: quantity,
        unit_price: product.price,
        total_amount: totalAmount,
        user_id: userData.user.id,
      });

      if (saleError) throw saleError;

      // 2. Update product quantity and daily sales
      const newQuantity = product.quantity - quantity;
      const newDailySales = (product.daily_sales || 0) + totalAmount;

      const { error: updateError } = await supabase
        .from("products")
        .update({
          quantity: newQuantity,
          daily_sales: newDailySales,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error("Error in sales transaction:", error);
      throw error;
    }
  },

  // Get sales history
  async getSalesHistory(limit = 50, offset = 0): Promise<any[]> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("sale_date", { ascending: false })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return data.map((sale) => ({
      id: sale.id,
      date: sale.sale_date,
      product_name: sale.product_name,
      quantity_sold: sale.quantity_sold,
      total_amount: sale.total_amount,
      unit_price: sale.unit_price,
    }));
  },

  // Search sales by product name or date
  async searchSales(query: string): Promise<any[]> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .eq("user_id", userData.user.id)
      .or(`product_name.ilike.%${query}%,sale_date.ilike.%${query}%`)
      .order("sale_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((sale) => ({
      id: sale.id,
      date: sale.sale_date,
      product_name: sale.product_name,
      quantity_sold: sale.quantity_sold,
      total_amount: sale.total_amount,
      unit_price: sale.unit_price,
    }));
  },

  // Get total count for pagination
  async getSalesCount(): Promise<number> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const { count, error } = await supabase
      .from("sales")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userData.user.id);

    if (error) throw error;
    return count || 0;
  },

  // Get today's total sales from sales table
  async getTodaySales(): Promise<number> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("sales")
      .select("total_amount")
      .eq("user_id", userData.user.id)
      .eq("sale_date", today);

    if (error) throw error;

    return data.reduce((sum, sale) => sum + sale.total_amount, 0);
  },
};

// REMOVE or COMMENT OUT the old salesHistoryService since we're replacing it
/*
export const salesHistoryService = {
  // ... your old salesHistoryService code ...
};
*/
