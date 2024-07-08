"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/useTheme";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, []);

  return (
    <div className={`relative min-h-screen ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ backgroundColor: '#171925', fontFamily: 'Poppins, sans-serif' }}>
      <nav className="bg-transparent fixed w-full z-10 top-0 flex items-center justify-between p-4" style={{ marginTop: '-10px' }}>
        <div className="flex items-center">
          <button
            onClick={handleMenuToggle}
            className={`text-2xl font-bold md:hidden ${theme === 'light' ? 'text-black' : 'text-white'}`}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
          <Link href="/" legacyBehavior>
            <a className="ml-4">
              <Image src="/logo2.png" alt="Kollector's Logo" width={150} height={50} />
            </a>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center flex-grow space-x-6">
          <Link href="/collection" legacyBehavior>
            <a className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:text-gray-300 text-xl`} style={{ marginLeft: '130px' }}> Ma Collection</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" legacyBehavior>
            <a className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:text-gray-300 text-xl`}>Connexion</a>
          </Link>
          <Link href="/register" legacyBehavior>
            <a className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-xl">Inscription</a>
          </Link>
          <button onClick={toggleTheme} className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:text-gray-300 text-xl`} aria-label="Toggle theme">
            {theme === "light" ? "🌞" : "🌜"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-20 overflow-hidden">
          <div onClick={closeMenu} className="fixed inset-0 bg-black bg-opacity-75"></div>
          <div className="relative z-30 w-64 h-full bg-black flex flex-col items-start justify-center space-y-6 p-6 text-white">
            <button onClick={closeMenu} className="self-end text-2xl hover:text-gray-300 mb-4" aria-label="Close menu">
              ✖
            </button>
            <Link href="/" legacyBehavior>
              <a className="text-2xl hover:text-gray-300" onClick={closeMenu}>Home</a>
            </Link>
            <Link href="/categories" legacyBehavior>
              <a className="text-2xl hover:text-gray-300" onClick={closeMenu}>Categories</a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="text-2xl hover:text-gray-300" onClick={closeMenu}>Sign Up</a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="text-2xl hover:text-gray-300" onClick={closeMenu}>Sign In</a>
            </Link>
          </div>
        </div>
      )}

      <main className="pt-20">{children}</main> {/* Adjusted padding to account for the moved navbar */}
    </div>
  );
}
