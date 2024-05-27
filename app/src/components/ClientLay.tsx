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
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/Back2.png')]">
      <nav className="bg-transparent fixed w-full z-10 top-0 flex items-center justify-between p-6">
        <div className="flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white text-2xl font-bold md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link href="/" className="ml-4 text-white text-2xl font-bold">
            Kollector's
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/collection" className="text-white hover:text-gray-300">Collection</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-gray-300">Connexion</Link>
          <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Inscription</Link>
          <button onClick={toggleTheme} className="text-white hover:text-gray-300" aria-label="Toggle theme">
            {theme === "light" ? "🌞" : "🌜"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-20">
          <div onClick={closeMenu} className="fixed inset-0 bg-black bg-opacity-75"></div>
          <div className="relative z-30 w-64 h-full bg-black flex flex-col items-start justify-center space-y-6 p-6">
            <Link href="/" className="text-white text-2xl hover:text-gray-300" onClick={closeMenu}>Home</Link>
            <Link href="/categories" className="text-white text-2xl hover:text-gray-300" onClick={closeMenu}>Categories</Link>
            <Link href="/cards" className="text-white text-2xl hover:text-gray-300" onClick={closeMenu}>Cards</Link>
            <Link href="/cart" className="text-white text-2xl hover:text-gray-300" onClick={closeMenu}>Cart</Link>
            <Link href="/login" className="text-white text-2xl hover:text-gray-300" onClick={closeMenu}>Sign In</Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={closeMenu}>Sign Up</Link>
            <button onClick={toggleTheme} className="text-white text-2xl hover:text-gray-300" aria-label="Toggle theme">
              {theme === "light" ? "🌞" : "🌜"}
            </button>
          </div>
        </div>
      )}

      <main className="pt-20">{children}</main>
    </div>
  );
}
