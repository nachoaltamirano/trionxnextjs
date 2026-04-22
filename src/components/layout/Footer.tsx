import React from 'react';
import Link from 'next/link';
import { Smartphone, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">TRIONX</h3>
            <p className="text-sm">
              Indumentaria deportiva de alto rendimiento para triatletas profesionales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-blue-400 transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-blue-400 transition">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos?category=natacion" className="hover:text-blue-400 transition">
                  Natación
                </Link>
              </li>
              <li>
                <Link href="/productos?category=ciclismo" className="hover:text-blue-400 transition">
                  Ciclismo
                </Link>
              </li>
              <li>
                <Link href="/productos?category=running" className="hover:text-blue-400 transition">
                  Running
                </Link>
              </li>
              <li>
                <Link href="/productos?category=accesorios" className="hover:text-blue-400 transition">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Smartphone size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Globe size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-sm">
            © 2025 TRIONX. Todos los derechos reservados. | Sponsor Oficial Iron Team Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
