import { productService } from "./database";

export const salesService = {
  async recordSale(
    productId: string,
    quantity: number,
    price: number
  ): Promise<void> {
    const salesAmount = quantity * price;
    await productService.incrementDailySales(productId, salesAmount);
  },

  async getTodaySales(): Promise<number> {
    return await productService.getTodayTotalSales();
  },

  async resetDailySales(): Promise<void> {
    await productService.resetAllDailySales();
  },
};

export interface SalesHistory {
  id: string;
  date: string;
  product_name: string;
  quantity_sold: number;
  total_amount: number;
  unit_type: string;
}

export interface SalesHistoryFilters {
  search: string;
  dateFrom?: string;
  dateTo?: string;
}
