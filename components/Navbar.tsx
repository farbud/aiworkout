"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Plan", href: "/plan" },
  { label: "History", href: "/history" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-50">
      <ul className="flex justify-center gap-8 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-200 font-semibold"
              >
                {item.label}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-600 rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
