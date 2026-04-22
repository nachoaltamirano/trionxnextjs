import React, { Suspense } from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getFeaturedProducts } from '@/lib/products';

function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-8 h-10 bg-gray-200 rounded animate-pulse" />
  );
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Productos destacados
            </h2>
            <p className="text-gray-600 text-lg">
              Descubre nuestra selección de artículos para triatletas
            </p>
          </div>

          <Suspense fallback={<CategoryFilterSkeleton />}>
            <CategoryFilter />
          </Suspense>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <a
              href="/productos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Ver todos los productos
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué elegir TRIONX?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Rendimiento técnico',
                description:
                  'Desarrollado con triatletas profesionales para máximo desempeño en agua, asfalto y tierra.',
              },
              {
                title: 'Material premium',
                description:
                  'Utilizamos solo materiales de la más alta calidad, duraderos y confortables.',
              },
              {
                title: 'Sponsor oficial',
                description:
                  'Presentes en todos los stands de Iron Man 70.3 y triatlones de Argentina.',
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
