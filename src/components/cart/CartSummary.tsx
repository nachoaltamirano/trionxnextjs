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
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4">Resumen del pedido</h3>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Impuestos (21%)</span>
          <span className="font-semibold">${tax.toLocaleString('es-AR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span className="font-semibold">${shipping.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg">
          <span className="font-bold">Total</span>
          <span className="font-bold text-blue-600">
            ${finalTotal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>

      <Link href="/checkout" className="block mb-3">
        <Button className="w-full">Ir a checkout</Button>
      </Link>

      <Link href="/productos">
        <button className="w-full px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition">
          Continuar comprando
        </button>
      </Link>
    </div>
  );
}
