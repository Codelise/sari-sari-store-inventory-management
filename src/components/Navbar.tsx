"use client";
import { NavBarLinks } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks: NavBarLinks[] = [
  { label: "Sign Up", href: "/signup", showOnPages: ["landing"] },
  { label: "Log In", href: "/login", showOnPages: ["landing"] },
  { label: "Dashboard", href: "./dashboard", showOnPages: ["dashboard"] },
  { label: "Inventory", href: "./inventory", showOnPages: ["dashboard"] },
  { label: "Sales", href: "./sales", showOnPages: ["dashboard"] },
  { label: "Report", href: "./report", showOnPages: ["dashboard"] },
  { label: "Logout", href: "../", showOnPages: ["dashboard"] },
];

export interface NavbarProps {
  page?: "landing" | "dashboard";
}

export default function NavBar({ page = "landing" }: NavbarProps) {
  const pathName = usePathname();

  const filteredLinks = navLinks.filter((link) =>
    link.showOnPages?.includes(page)
  );

  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
      {filteredLinks.map((link) => {
        const isActive = pathName === link.href;
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
  );
}
