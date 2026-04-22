'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
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
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold">Carrito</h2>
            {itemCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 pb-24">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
              <Link href="/productos">
                <Button className="w-full">Explorar productos</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-2 mb-6">
                {items.map((item) => (
                  <CartItem key={`${item.productId}-${item.size}`} item={item} />
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">${total.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* CTA */}
              <Link href="/carrito" onClick={() => setOpen(false)}>
                <Button size="lg" className="w-full mb-2">
                  Ver carrito
                </Button>
              </Link>
              <Link href="/checkout" onClick={() => setOpen(false)}>
                <Button size="lg" variant="secondary" className="w-full">
                  Checkout
                </Button>
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
