'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/Button';

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Carrito de compras</h1>

          <div className="bg-white rounded-lg p-12 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">
              Agrega productos a tu carrito para comenzar a comprar.
            </p>
            <Link href="/productos">
              <Button size="lg">Explorar productos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Carrito de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6">
            {items.map((item) => (
              <CartItem key={`${item.productId}-${item.size}`} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
