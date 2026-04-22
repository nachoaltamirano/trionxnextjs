import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const gridStyles = `
  @supports (display: grid) {
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    @media (min-width: 1024px) {
      .product-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      
      /* Asymmetric grid - larger items */
      .product-grid > :nth-child(1),
      .product-grid > :nth-child(5),
      .product-grid > :nth-child(9) {
        grid-column: span 1;
      }
      
      .product-grid > :nth-child(3),
      .product-grid > :nth-child(7) {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }
`;

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600 font-medium">
          No se encontraron productos en esta categoría.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{gridStyles}</style>
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
