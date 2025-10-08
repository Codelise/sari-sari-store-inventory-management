"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Product } from "@/types/product";

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRecordSale: (productId: string, quantity: number) => void;
}

export default function SaleModal({
  isOpen,
  onClose,
  products,
  onRecordSale,
}: SaleModalProps) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || quantity < 1) return;

    onRecordSale(selectedProductId, quantity);
    setSelectedProductId("");
    setQuantity(1);
    onClose();
  };

  const handleClose = () => {
    setSelectedProductId("");
    setQuantity(1);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Record Sale
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="product"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Product
                    </label>
                    <select
                      id="product"
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-md"
                      required
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option
                          key={product.id}
                          value={product.id}
                          disabled={product.quantity === 0}
                        >
                          {product.name} - ₱{product.price.toFixed(2)}{" "}
                          {product.quantity === 0
                            ? "(Out of Stock)"
                            : `(${product.quantity} available)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedProduct && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-md text-gray-600">
                        Available:{" "}
                        <span className="font-medium">
                          {selectedProduct.quantity}
                        </span>
                      </p>
                      <p className="text-md text-gray-600">
                        Price:{" "}
                        <span className="font-medium">
                          ₱{selectedProduct.price.toFixed(2)}
                        </span>
                      </p>
                      {selectedProduct.quantity > 0 && (
                        <p className="text-md text-green-600 font-medium">
                          Total:{" "}
                          <span className="font-bold">
                            ₱{(selectedProduct.price * quantity).toFixed(2)}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={selectedProduct?.quantity || 1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-md"
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        !selectedProductId ||
                        quantity < 1 ||
                        (selectedProduct && quantity > selectedProduct.quantity)
                      }
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Record Sale
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
