'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  
  // Get from store
  const storeItemCount = useCartStore((state) => state.getItemCount());

  // Handle hydration mismatch
  useEffect(() => {
    setHydrated(true);
    setItemCount(storeItemCount);
  }, [storeItemCount]);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-400">
            TRIONX
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="hover:text-blue-400 transition">
              Inicio
            </Link>
            <Link href="/productos" className="hover:text-blue-400 transition">
              Productos
            </Link>
            <Link href="/productos?category=natacion" className="hover:text-blue-400 transition">
              Natación
            </Link>
            <Link href="/productos?category=ciclismo" className="hover:text-blue-400 transition">
              Ciclismo
            </Link>
            <Link href="/productos?category=running" className="hover:text-blue-400 transition">
              Running
            </Link>
          </div>

          {/* Cart Icon */}
          <Link href="/carrito" className="relative hover:text-blue-400 transition">
            <ShoppingCart size={24} />
            {hydrated && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-slate-700 pt-4">
            <Link href="/" className="hover:text-blue-400 transition">
              Inicio
            </Link>
            <Link href="/productos" className="hover:text-blue-400 transition">
              Productos
            </Link>
            <Link href="/productos?category=natacion" className="hover:text-blue-400 transition">
              Natación
            </Link>
            <Link href="/productos?category=ciclismo" className="hover:text-blue-400 transition">
              Ciclismo
            </Link>
            <Link href="/productos?category=running" className="hover:text-blue-400 transition">
              Running
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
