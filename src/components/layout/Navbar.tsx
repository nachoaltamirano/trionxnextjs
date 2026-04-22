'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navStyles = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-100%); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fillHorizontal {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0 0 0); }
  }
  .nav-link {
    position: relative;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #D10000;
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.3s ease;
  }
  .nav-link:hover::after {
    clip-path: inset(0 0 0 0);
  }
`;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const storeItemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setHydrated(true);
    setItemCount(storeItemCount);
  }, [storeItemCount]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{navStyles}</style>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-2 backdrop-blur-md bg-black/80 border-b border-red-600/30' 
            : 'py-4 bg-black/95 backdrop-blur-sm border-b border-red-600/50'
        }`}
        style={{ animation: 'slideDown 0.5s ease' }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl lg:text-2xl font-black text-red-600 tracking-widest hover:text-red-500 transition"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
            >
              TRIONX
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-8 items-center">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/productos', label: 'Productos' },
                { href: '/productos?category=natacion', label: 'Natación' },
                { href: '/productos?category=ciclismo', label: 'Ciclismo' },
                { href: '/productos?category=running', label: 'Running' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="nav-link text-white hover:text-red-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Cart Icon */}
              <Link 
                href="/carrito" 
                className="relative text-white hover:text-red-600 transition group"
              >
                <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                {hydrated && itemCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center" style={{ minWidth: '24px', borderRadius: '2px' }}>
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden text-white hover:text-red-600 transition"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden mt-6 pt-6 border-t border-red-600/30 flex flex-col gap-4 pb-4">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/productos', label: 'Productos' },
                { href: '/productos?category=natacion', label: 'Natación' },
                { href: '/productos?category=ciclismo', label: 'Ciclismo' },
                { href: '/productos?category=running', label: 'Running' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-white hover:text-red-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
