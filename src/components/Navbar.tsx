"use client";
import { NavBarLinks } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import LogoutModal from "./LogoutModal";

const navLinks: NavBarLinks[] = [
  { label: "Sign Up", href: "/signup", showOnPages: ["landing"] },
  { label: "Log In", href: "/login", showOnPages: ["landing"] },
  { label: "Dashboard", href: "../dashboard", showOnPages: ["dashboard"] },
  { label: "Sales", href: "./dashboard/sales", showOnPages: ["dashboard"] },
  { label: "Logout", href: "#", showOnPages: ["dashboard"], isAction: true }, // Changed to action
];

export interface NavbarProps {
  page?: "landing" | "dashboard";
}

export default function NavBar({ page = "landing" }: NavbarProps) {
  const pathName = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredLinks = navLinks.filter((link) =>
    link.showOnPages?.includes(page)
  );

  const handleLogoutClick = (e: React.MouseEvent, href: string) => {
    if (href === "#") {
      e.preventDefault();
      setIsLogoutModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Close modal
      setIsLogoutModalOpen(false);

      // Force immediate redirect
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <nav className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {filteredLinks.map((link) => {
          const isActive = pathName === link.href;

          if (link.isAction) {
            return (
              <button
                key={link.href}
                onClick={(e) => handleLogoutClick(e, link.href)}
                disabled={isLoggingOut}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  isLoggingOut
                    ? "opacity-50 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isLoggingOut ? "Logging out..." : link.label}
              </button>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
