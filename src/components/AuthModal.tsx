"use client";
import { useState } from "react";

type ModalType = "success" | "error" | "info";
type ModalVariant = "signup" | "login";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  variant: ModalVariant;
  title: string;
  message: string;
}

export function AuthModal({
  isOpen,
  onClose,
  type,
  variant,
  title,
  message,
}: ModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div
        className={`w-full max-w-md mx-4 rounded-lg border-2 ${getBgColor()} p-6 shadow-lg`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`material-symbols-outlined text-2xl ${getIconColor()}`}
          >
            {getIcon()}
          </span>
          <h3 className={`text-lg font-semibold ${getTextColor()}`}>{title}</h3>
        </div>

        <p className={`mb-6 ${getTextColor()}`}>{message}</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              type === "success"
                ? "bg-green-500 text-white hover:bg-green-600"
                : type === "error"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {variant === "signup" && type === "success"
              ? "Continue to Login"
              : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Usage examples in your components:

// SIGNUP SUCCESS
// <AuthModal
//   isOpen={showModal}
//   onClose={() => setShowModal(false)}
//   type="success"
//   variant="signup"
//   title="Account Created Successfully!"
//   message="Your account has been created. You can now log in to your account."
// />

// SIGNUP ERROR
// <AuthModal
//   isOpen={showModal}
//   onClose={() => setShowModal(false)}
//   type="error"
//   variant="signup"
//   title="Signup Failed"
//   message="There was an error creating your account. Please try again."
// />

// LOGIN SUCCESS
// <AuthModal
//   isOpen={showModal}
//   onClose={() => {
//     setShowModal(false);
//     router.push("/dashboard");
//   }}
//   type="success"
//   variant="login"
//   title="Login Successful!"
//   message="Welcome back to your inventory system."
// />

// LOGIN ERROR
// <AuthModal
//   isOpen={showModal}
//   onClose={() => setShowModal(false)}
//   type="error"
//   variant="login"
//   title="Login Failed"
//   message="Invalid email or password. Please try again."
// />
