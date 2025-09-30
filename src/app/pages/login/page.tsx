"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle login logic (API call, validation, etc.)
    console.log("Login Submitted", formData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F8F8]">
      {/* Centered container */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo / Branding */}
          <div className="flex flex-col items-center mb-8 text-center">
            <span className="material-symbols-outlined text-5xl text-[#6DB65B] mb-2">
              inventory_2
            </span>
            <h1 className="text-2xl font-bold text-[#333333]">
              Sari-Sari Store Inventory System
            </h1>
            <p className="text-sm text-[#4A4A4A]">
              Your friendly neighborhood store&apos;s best friend.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center text-[#333333] mb-6">
              Log In to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username */}
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Username
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none"
                />
              </label>

              {/* Password */}
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none"
                />
              </label>

              {/* Button */}
              <button
                type="submit"
                className="h-12 rounded-lg bg-[#6DB65B] px-5 font-bold text-white hover:bg-[#5CA24A] transition-colors shadow-sm"
              >
                Log In
              </button>
            </form>
          </div>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-[#4A4A4A]">
            Don&apos;t have an account?{" "}
            <Link
              href="/pages/signup"
              className="font-medium text-[#6DB65B] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
