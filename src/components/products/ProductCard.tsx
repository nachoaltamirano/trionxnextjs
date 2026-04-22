'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  natacion: 'bg-blue-100',
  ciclismo: 'bg-green-100',
  running: 'bg-red-100',
  accesorios: 'bg-amber-100',
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.sizes.length > 1) {
      setShowSizeSelector(true);
    } else {
      addItem({
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        price: product.price,
        name: product.name,
        image: product.images[0],
      });
      alert('Agregado al carrito');
    }
  };

  const handleConfirmSize = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.images[0],
    });
    setShowSizeSelector(false);
    alert('Agregado al carrito');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className={`relative w-full h-64 ${categoryColors[product.category]} flex items-center justify-center overflow-hidden group`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          priority={false}
        />

        {/* Badge */}
        {product.badge && <Badge type={product.badge} />}

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transform opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Sizes */}
        {product.sizes.length > 1 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-600">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600 mt-4">
          ${product.price.toLocaleString('es-AR')}
        </p>
      </div>

      {/* Size Selector Modal */}
      {showSizeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4">Selecciona tu talle</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded font-semibold transition ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSizeSelector(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSize}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
