'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

const detailStyles = `
  .qty-btn {
    border-radius: 2px;
  }
`;

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel: Record<string, string> = {
    natacion: 'Natación',
    ciclismo: 'Ciclismo',
    running: 'Running',
    accesorios: 'Accesorios',
  };

  return (
    <>
      <style>{detailStyles}</style>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="relative">
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden" style={{ borderRadius: '2px' }}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
            {product.badge && <Badge type={product.badge} />}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-black uppercase tracking-widest" style={{ borderRadius: '2px' }}>
                {categoryLabel[product.category]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-5xl font-black text-red-600 mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              ${product.price.toLocaleString('es-AR')}
            </p>

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-10">
                <label className="block text-sm font-black uppercase tracking-widest text-black mb-4">
                  Selecciona tu talle
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 font-black uppercase text-sm transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-red-600 text-white border-2 border-red-600'
                          : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <label className="block text-sm font-black uppercase tracking-widest text-black mb-4">
                Cantidad
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn px-4 py-3 bg-black text-white hover:bg-red-600 transition"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="text-3xl font-black w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn px-4 py-3 bg-black text-white hover:bg-red-600 transition"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Stock Info */}
            <div className="mb-10 p-4 bg-black text-white border-l-4 border-red-600">
              <p className="text-sm">
                <span className="font-black">STOCK DISPONIBLE</span> • Varios talles en existencia
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 text-base"
            style={{ borderRadius: '2px' }}
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {added ? '✓ ¡AGREGADO AL CARRITO!' : 'AGREGAR AL CARRITO'}
          </Button>
        </div>
      </div>
    </>
  );
}
