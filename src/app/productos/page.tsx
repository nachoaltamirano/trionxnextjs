import { Metadata } from 'next';
import { Suspense } from 'react';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getProducts, getProductsByCategory } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Productos | TRIONX',
  description: 'Catálogo completo de indumentaria deportiva para triatlón',
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-8 h-10 bg-gray-200 rounded animate-pulse" />
  );
}

export default async function ProductosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;

  let products;
  if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getProducts();
  }

  const categoryLabel: Record<string, string> = {
    garmont: 'Garmont',
    pista: 'Pista',
    gorras: 'Gorras',
    
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category ? `${categoryLabel[category] || 'Productos'}` : 'Todos los productos'}
          </h1>
          <p className="text-gray-600 text-lg">
            {products.length} producto{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<CategoryFilterSkeleton />}>
          <CategoryFilter />
        </Suspense>

        {/* Products Grid */}
        <div className="mb-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
