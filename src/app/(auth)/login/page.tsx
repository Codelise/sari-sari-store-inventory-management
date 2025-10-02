"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setModalConfig({
          type: "error",
          title: "Login Failed",
          message: error.message,
        });
        setShowModal(true);
        return;
      }

      if (data.user) {
        setModalConfig({
          type: "success",
          title: "Login Successful!",
          message: "Welcome back to your inventory system.",
        });
        setShowModal(true);
      }
    } catch (err) {
      setModalConfig({
        type: "error",
        title: "Login Error",
        message: "An unexpected error occurred. Please try again.",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F8F8]">
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
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

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center text-[#333333] mb-6">
              Log In to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none"
                />
              </label>

              <label className="flex flex-col relative">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Password
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-10 text-[#A0A0A0] hover:text-[#6DB65B] transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-lg bg-[#6DB65B] px-5 font-bold text-white hover:bg-[#5CA24A] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-[#4A4A4A]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#6DB65B] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalConfig.type === "success") {
            router.push("/dashboard");
          }
        }}
        type={modalConfig.type}
        variant="login"
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
}
