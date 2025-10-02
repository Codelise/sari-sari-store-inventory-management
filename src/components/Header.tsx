"use client";
import { useState } from "react";
import NavBar, { NavbarProps } from "./Navbar";

export default function Header({ page = "landing" }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 text-gray-800">
        <div className="size-6">
          <span className="material-symbols-outlined text-3xl text-green-600">
            storefront
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Sari-Sari Store Inventory System
        </h2>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex">
        <NavBar page={page} />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative z-50 w-64 bg-white shadow-lg p-6 flex flex-col">
            <button
              className="self-end text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <NavBar page={page} />
          </div>
        </div>
      )}
    </header>
  );
}
