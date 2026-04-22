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
    <div className="flex gap-4 py-4 px-2 border-b border-gray-200 last:border-0 items-start">
      {/* Image */}
      <div className="w-20 h-20 bg-gray-100 overflow-hidden shrink-0 border border-gray-300">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-black text-gray-800 line-clamp-2 text-sm uppercase">{item.name}</h3>
          <p className="text-xs text-gray-600 mt-1 font-bold">TALLE: {item.size}</p>
          <p className="font-black text-red-600 mt-2 text-lg">
            ${item.price.toLocaleString('es-AR')}
          </p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
            className="p-1 bg-gray-200 hover:bg-black hover:text-white transition"
            style={{ borderRadius: '2px' }}
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <span className="w-6 text-center font-black text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
            className="p-1 bg-gray-200 hover:bg-black hover:text-white transition"
            style={{ borderRadius: '2px' }}
          >
            <Plus size={14} strokeWidth={3} />
          </button>
          
          {/* Subtotal */}
          <span className="ml-auto font-black text-gray-800 text-sm">
            ${(item.price * item.quantity).toLocaleString('es-AR')}
          </span>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.productId, item.size)}
            className="ml-2 text-red-600 hover:text-red-800 hover:bg-red-100 p-1 transition"
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
