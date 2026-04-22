'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Images */}
      <div className="relative">
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.badge && <Badge type={product.badge} />}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {categoryLabel[product.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price.toLocaleString('es-AR')}
          </p>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes.length > 1 && (
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Selecciona tu talle:
              </label>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white scale-105'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Cantidad:
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-bold text-lg"
              >
                −
              </button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Stock disponible:</span> Varios talles en existencia
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full flex items-center justify-center gap-2 text-lg"
        >
          <ShoppingCart size={24} />
          {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
        </Button>
      </div>
    </div>
  );
}
