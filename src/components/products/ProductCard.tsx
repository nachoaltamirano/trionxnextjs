'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  garmont: 'bg-blue-600',
  pista: 'bg-red-600',
  gorras: 'bg-orange-600',
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
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          animation: slideIn 0.5s ease-out forwards;
        }
        .product-card:hover {
          transform: scale(1.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .overlay-red {
          background-color: rgba(209, 0, 0, 0.8);
        }
      `}</style>

      <div className="product-card bg-white overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-100" style={{ borderRadius: '2px' }}>
        {/* Image Container */}
        <div className={`relative w-full h-64 md:h-72 ${categoryColors[product.category]} flex items-center justify-center overflow-hidden group`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />

          {/* Badge */}
          {product.badge && <Badge type={product.badge} />}

          {/* Overlay */}
          <div className="absolute inset-0 overlay-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {/* Quick Add Button */}
            <button
              onClick={handleAddToCart}
              className="bg-white text-red-600 p-4 hover:bg-red-100 transition-all duration-200 hover:scale-110"
              title="Agregar al carrito"
              style={{ borderRadius: '2px' }}
            >
              <Plus size={28} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <Link href={`/productos/${product.slug}`}>
            <h3 className="text-base md:text-lg font-black text-black hover:text-red-600 transition line-clamp-2 uppercase tracking-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-600 text-xs md:text-sm mt-3 line-clamp-2 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes.length > 1 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs px-3 py-1 bg-black text-white font-bold uppercase tracking-widest"
                  style={{ borderRadius: '2px' }}
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs px-3 py-1 text-gray-700 font-bold">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <p className="text-2xl md:text-3xl font-black text-red-600 mt-5 tracking-tight">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>

        {/* Size Selector Modal */}
        {showSizeSelector && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 max-w-md w-full" style={{ borderRadius: '2px' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-black uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Selecciona tu talle
                </h3>
                <button
                  onClick={() => setShowSizeSelector(false)}
                  className="text-gray-400 hover:text-black transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 font-bold uppercase text-sm tracking-wider transition ${
                      selectedSize === size
                        ? 'bg-red-600 text-white border-2 border-red-600'
                        : 'bg-black text-white border-2 border-black hover:border-red-600'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSizeSelector(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-black font-bold uppercase tracking-wider hover:bg-gray-300 transition"
                  style={{ borderRadius: '2px' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmSize}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition"
                  style={{ borderRadius: '2px' }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
