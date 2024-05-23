"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/useTheme";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Back2.png')" }}>
      <nav className="bg-transparent fixed w-full z-10 top-0 flex items-center justify-between p-6">
        <div className="flex items-center">
          <button onClick={handleMenuToggle} className="text-white text-2xl font-bold md:hidden">
            ☰
          </button>
          <Link href="/" className="ml-4 text-white text-2xl font-bold">
            Kollector's
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/categories" className="text-white hover:text-gray-300">Categories</Link>
          <Link href="/cards" className="text-white hover:text-gray-300">Cards</Link>
          <Link href="/cart" className="text-white hover:text-gray-300">Cart</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-gray-300">Sign In</Link>
          <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sign Up</Link>
          <button onClick={toggleTheme} className="text-white hover:text-gray-300">
            {theme === "light" ? "🌞" : "🌜"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-20">
          <div onClick={closeMenu} className="fixed inset-0 bg-black bg-opacity-75"></div>
          <div className="relative z-30 w-64 h-full bg-black flex flex-col items-start justify-center space-y-6 p-6">
            <Link href="/" className="text-white text-2xl hover:text-gray-300" onClick={handleMenuToggle}>Home</Link>
            <Link href="/categories" className="text-white text-2xl hover:text-gray-300" onClick={handleMenuToggle}>Categories</Link>
            <Link href="/cards" className="text-white text-2xl hover:text-gray-300" onClick={handleMenuToggle}>Cards</Link>
            <Link href="/cart" className="text-white text-2xl hover:text-gray-300" onClick={handleMenuToggle}>Cart</Link>
            <Link href="/login" className="text-white text-2xl hover:text-gray-300" onClick={handleMenuToggle}>Sign In</Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleMenuToggle}>Sign Up</Link>
            <button onClick={toggleTheme} className="text-white text-2xl hover:text-gray-300">
              {theme === "light" ? "🌞" : "🌜"}
            </button>
          </div>
        </div>
      )}

      <main className="pt-20">{children}</main>
    </div>
  );
}
