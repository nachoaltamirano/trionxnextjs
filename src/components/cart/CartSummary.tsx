'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';

export function CartSummary() {
  const total = useCartStore((state) => state.getTotal());
  const itemCount = useCartStore((state) => state.getItemCount());
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return null;
  }

  // Estimate shipping and taxes
  const shipping = 1500;
  const subtotal = total;
  const tax = Math.round(subtotal * 0.21);
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="bg-black border border-red-600 rounded-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4 text-white">Resumen del pedido</h3>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Impuestos (21%)</span>
          <span className="font-semibold">${tax.toLocaleString('es-AR')}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Envío</span>
          <span className="font-semibold">${shipping.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <div className="border-t border-red-600 pt-4 mb-6">
        <div className="flex justify-between text-lg">
          <span className="font-bold text-white">Total</span>
          <span className="font-bold text-red-600">
            ${finalTotal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>

      <Link href="/checkout" className="block mb-3">
        <Button className="w-full bg-red-600 hover:bg-red-700">Ir a checkout</Button>
      </Link>

      <Link href="/productos">
        <button className="w-full px-4 py-2 text-red-600 font-semibold hover:text-red-700 transition border border-red-600 rounded">
          Continuar comprando
        </button>
      </Link>
    </div>
  );
}
