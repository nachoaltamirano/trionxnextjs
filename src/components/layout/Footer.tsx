import React from 'react';
import Link from 'next/link';
import { Share2, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-red-600" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      {/* Red separator line */}
      <div className="h-1 bg-red-600 w-full mb-12"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-xl font-black text-red-600 mb-4 tracking-widest uppercase"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              TRIONX
            </h3>
            <p className="text-sm leading-relaxed">
              Indumentaria deportiva de alto rendimiento para triatletas profesionales. Sponsor oficial Iron Team Argentina.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase mb-4 tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-600 transition font-medium">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-red-600 transition font-medium">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-red-600 transition font-medium">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase mb-4 tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Categorías
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/productos?category=garmont" className="hover:text-red-600 transition font-medium">
                  Garmont
                </Link>
              </li>
              <li>
                <Link href="/productos?category=pista" className="hover:text-red-600 transition font-medium">
                  Pista
                </Link>
              </li>
              <li>
                <Link href="/productos?category=gorras" className="hover:text-red-600 transition font-medium">
                  Gorras
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase mb-4 tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Contacto
            </h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="hover:text-red-600 transition hover:scale-110 transform">
                <Share2 size={20} />
              </a>
              <a href="mailto:info@trionx.com" className="hover:text-red-600 transition hover:scale-110 transform">
                <Mail size={20} />
              </a>
              <a href="tel:+5491234567890" className="hover:text-red-600 transition hover:scale-110 transform">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-sm">+54 9 11 2345 6789</p>
            <p className="text-sm">info@trionx.com</p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-red-600/30 pt-8">
          <p className="text-center text-xs tracking-widest uppercase font-medium">
            © 2025 TRIONX. Todos los derechos reservados. | Sponsor Oficial Iron Team Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
