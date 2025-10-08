"use client";

import { useState, useEffect } from "react";
import { salesService } from "@/lib/database";
import { SalesHistory } from "@/lib/sales";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState<SalesHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    loadSalesHistory();
    loadSalesCount();
  }, [currentPage]);

  const loadSalesHistory = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * itemsPerPage;
      const salesData = await salesService.getSalesHistory(
        itemsPerPage,
        offset
      );
      setSales(salesData);
    } catch (error) {
      console.error("Error loading sales history:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSalesCount = async () => {
    try {
      const count = await salesService.getSalesCount();
      setTotalSales(count);
    } catch (error) {
      console.error("Error loading sales count:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (searchQuery.trim()) {
        const searchResults = await salesService.searchSales(searchQuery);
        setSales(searchResults);
      } else {
        await loadSalesHistory();
      }
    } catch (error) {
      console.error("Error searching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const allSales = await salesService.getSalesHistory(1000, 0);

      if (!allSales || allSales.length === 0) {
        alert("No sales data available to export.");
        return;
      }

      // Format dates in a more readable way that Excel won't misinterpret
      const formatDateReadable = (dateString: string) => {
        if (!dateString) return "Unknown Date";

        try {
          const date = new Date(dateString);
          // Format as "Jan 15, 2024" - Excel will treat this as text
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (error) {
          return dateString;
        }
      };

      const headers = [
        "Date",
        "Product",
        "Quantity",
        "Unit Price",
        "Total Amount",
      ];

      const csvData = allSales.map((sale) => [
        `"${formatDateReadable(sale.date)}"`, // Wrap in quotes to force text
        `"${(sale.product_name || "Unknown Product").replace(/"/g, '""')}"`,
        sale.quantity_sold?.toString() || "0",
        (sale.unit_price || 0).toFixed(2),
        (sale.total_amount || 0).toFixed(2),
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      // Download with proper encoding
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sales-data-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export sales data.");
    }
  };

  const totalPages = Math.ceil(totalSales / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getUnitDisplay = (productName: string, quantity: number) => {
    // Customize unit display based on product type
    const lowerName = productName.toLowerCase();
    if (lowerName.includes("drink") || lowerName.includes("bottle")) {
      return `${quantity} bottle${quantity > 1 ? "s" : ""}`;
    } else if (lowerName.includes("pack") || lowerName.includes("noodle")) {
      return `${quantity} pack${quantity > 1 ? "s" : ""}`;
    } else if (lowerName.includes("sachet")) {
      return `${quantity} sachet${quantity > 1 ? "s" : ""}`;
    } else {
      return `${quantity} pcs`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Sales History
          </h1>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors"
          >
            <DownloadIcon className="h-5 w-5" />
            Export Sales Data
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or filter sales by product, date..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            </div>
          ) : sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No sales records found.</p>
              <p className="text-gray-400 mt-2">
                {searchQuery
                  ? "Try adjusting your search criteria."
                  : "Start recording sales in the dashboard."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(sale.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sale.product_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {getUnitDisplay(
                            sale.product_name,
                            sale.quantity_sold
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₱{sale.total_amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {sales.map((sale) => (
                  <div
                    key={sale.id}
                    className="bg-gray-50 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        {sale.product_name}
                      </h3>
                      <span className="font-bold text-gray-900">
                        ₱{sale.total_amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatDate(sale.date)}</span>
                      <span>
                        {getUnitDisplay(sale.product_name, sale.quantity_sold)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-teal-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                  ...
                </span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-teal-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Icon Components
function DownloadIcon({ className }: { className?: string }) {
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
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

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

function ChevronLeftIcon({ className }: { className?: string }) {
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
