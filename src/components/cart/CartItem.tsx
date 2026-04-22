'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">Talle: {item.size}</p>
          <p className="font-bold text-blue-600 mt-2">
            ${item.price.toLocaleString('es-AR')}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-bold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-24 text-right">
        <p className="font-bold text-gray-800">
          ${(item.price * item.quantity).toLocaleString('es-AR')}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.productId, item.size)}
        className="text-red-500 hover:text-red-700 transition p-1"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
