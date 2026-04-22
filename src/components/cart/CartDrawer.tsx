'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <>
      {/* Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto`}
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag size={28} className="text-red-600" strokeWidth={2} />
            <div>
              <h2 className="text-xl font-black uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Carrito</h2>
              {itemCount > 0 && (
                <span className="text-xs font-black text-red-600">{itemCount} ITEMS</span>
              )}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 transition"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-32">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={56} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-bold text-lg mb-6">Tu carrito está vacío</p>
              <Link href="/productos" onClick={() => setOpen(false)}>
                <Button className="w-full">Explorar productos</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-0 mb-8 border-t border-black">
                {items.map((item) => (
                  <CartItem key={`${item.productId}-${item.size}`} item={item} />
                ))}
              </div>

              {/* Summary */}
              <div className="border-t-2 border-black pt-6 mb-8">
                <div className="flex justify-between mb-4">
                  <span className="font-black uppercase text-sm tracking-widest text-gray-700">Subtotal</span>
                  <span className="font-black text-lg">${total.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-2xl font-black mb-4">
                  <span className="uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Total</span>
                  <span className="text-red-600" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>${total.toLocaleString('es-AR')}</span>
                </div>
                <p className="text-xs text-gray-500 font-bold">Envío calculado al checkout</p>
              </div>

              {/* CTA */}
              <Link href="/carrito" onClick={() => setOpen(false)} className="block mb-3">
                <Button size="lg" className="w-full flex items-center justify-center gap-2">
                  Ver carrito completo
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/checkout" onClick={() => setOpen(false)} className="block">
                <button className="w-full px-6 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-gray-900 transition flex items-center justify-center gap-2" style={{ borderRadius: '2px' }}>
                  Ir al checkout
                  <ArrowRight size={20} />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Trigger Button - Hidden, used by Navbar */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden"
        id="cart-drawer-toggle"
      />
    </>
  );
}
