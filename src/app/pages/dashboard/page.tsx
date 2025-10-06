"use client";

import { useState, useEffect } from "react";
import ProductModal from "@/components/ProductModal";
import { Product, ProductFormData } from "@/types/product";
import { productService } from "@/lib/database";
import { salesService } from "@/lib/sales";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "quantity" | "price">("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [todaySales, setTodaySales] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadTodaySales();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTodaySales = async () => {
    try {
      setSalesLoading(true);
      const salesTotal = await productService.getTodayTotalSales();
      setTodaySales(salesTotal);
    } catch (error) {
      console.error("Error loading today sales:", error);
      setTodaySales(0);
    } finally {
      setSalesLoading(false);
    }
  };

  const handleRecordSale = async (productId: string, quantity: number) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("Product not found");

      if (product.quantity < quantity) {
        alert(`Insufficient stock. Only ${product.quantity} items available.`);
        return;
      }

      // Record the sale
      await salesService.recordSale(productId, quantity, product.price);

      // Update product quantity
      const newQuantity = product.quantity - quantity;
      await productService.updateProduct(productId, { quantity: newQuantity });

      // Reload data
      await loadProducts();
      await loadTodaySales();

      alert(
        `Sale recorded successfully! ₱${(quantity * product.price).toFixed(
          2
        )} added to today's sales.`
      );
    } catch (error) {
      console.error("Error recording sale:", error);
      alert("Failed to record sale");
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await productService.createProduct(data);
      await loadProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;

    try {
      await productService.updateProduct(editingProduct.id, data);
      await loadProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        await loadProducts();
        await loadTodaySales(); // Reload sales total in case this product had sales
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleResetDailySales = async () => {
    if (
      confirm(
        "Are you sure you want to reset today's sales? This cannot be undone."
      )
    ) {
      try {
        await salesService.resetDailySales();
        await loadProducts();
        await loadTodaySales();
        alert("Daily sales reset successfully!");
      } catch (error) {
        console.error("Error resetting daily sales:", error);
        alert("Failed to reset daily sales");
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "quantity") return a.quantity - b.quantity;
      return a.price - b.price;
    });

  return (
    <div className="space-y-6">
      {/* Sales Summary Card */}
      <div className="bg-green-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-3xl font-bold">
              {salesLoading
                ? "Loading..."
                : `₱ ${todaySales.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </p>
            <p className="text-green-100">Today's Total Sales</p>
          </div>
          <button
            onClick={handleResetDailySales}
            className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-sm transition-colors"
            title="Reset daily sales"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="w-full md:w-1/3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(["name", "quantity", "price"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    sortBy === option
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Add Product Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Add New Product
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm
                  ? "No products found matching your search."
                  : "No products added yet."}
              </p>
            </div>
          ) : (
            filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border-l-4 ${
                  product.quantity <= 5
                    ? "border-red-500 bg-red-50"
                    : "border-transparent shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                <div className="flex-1 mb-3 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Supplier: {product.supplier}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    Today's Sales: ₱{(product.daily_sales || 0).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-center">
                  <div className="w-20">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-medium text-gray-900">
                      ₱ {product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-20">
                    <p className="text-sm text-gray-600">Stock</p>
                    <p
                      className={`font-medium ${
                        product.quantity <= 5 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {product.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => handleRecordSale(product.id, 1)}
                    disabled={product.quantity === 0}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Sell 1 item"
                  >
                    <SellIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <EditIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <DeleteIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        product={editingProduct}
        isEditing={!!editingProduct}
      />
    </div>
  );
}

// Add Sell Icon
function SellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5.5m-5.5 0V19a2 2 0 104 0v-1.5"
      />
    </svg>
  );
}

// Search Icon
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

// Edit Icon
function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

// Delete Icon
function DeleteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}
