"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";

export default function SignUpPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });
  const [accountForm, setAccountForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (accountForm.password !== accountForm.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (accountForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: accountForm.email,
        password: accountForm.password,
        options: {
          data: {
            username: accountForm.username,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        setModalConfig({
          type: "success",
          title: "Account Created Successfully!",
          message: "Your account has been created.",
        });
        setShowModal(true);
      }

      if (error) {
      }
    } catch (err) {
      setModalConfig({
        type: "error",
        title: "Signup Failed",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F8F8]">
      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalConfig.type === "success") {
            router.push("/login");
          }
        }}
        type={modalConfig.type}
        variant="signup"
        title={modalConfig.title}
        message={modalConfig.message}
      />
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
              Create Your Account
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Username
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={accountForm.username}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={accountForm.email}
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
                  value={accountForm.password}
                  onChange={handleChange}
                  required
                  minLength={6}
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

              <label className="flex flex-col relative">
                <span className="text-sm font-medium text-[#4A4A4A] pb-2">
                  Confirm Password
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={accountForm.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-lg border border-[#DCE5DC] px-4 text-base text-[#333333] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#6DB65B]/50 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-10 text-[#A0A0A0] hover:text-[#6DB65B] transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-lg bg-[#6DB65B] px-5 font-bold text-white hover:bg-[#5CA24A] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-[#4A4A4A]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#6DB65B] hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
