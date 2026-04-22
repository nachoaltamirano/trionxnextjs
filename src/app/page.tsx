import React, { Suspense } from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getFeaturedProducts } from '@/lib/products';

function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-12 h-10 bg-gray-300 rounded animate-pulse" />
  );
}

const pageStyles = `
  @keyframes fillCTA {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0 0 0); }
  }
  .cta-fill::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: #D10000;
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: -1;
  }
  .cta-fill:hover::before {
    clip-path: inset(0 0 0 0);
  }
`;

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <style>{pageStyles}</style>

      <div className="w-full min-h-screen bg-white">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Category Showcase */}
        <div className="mb-8 md:mb-12">
          <CategoryShowcase />
        </div>

        {/* Featured Section */}
        <section className="py-16 md:py-32 px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-4 uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.02em' }}
              >
                Productos destacados
              </h2>
              <div className="w-12 h-1 bg-red-600"></div>
              <p className="text-gray-600 text-base md:text-lg mt-6 max-w-2xl">
                Descubre nuestra selección curada de artículos de alto rendimiento para triatletas que buscan excelencia.
              </p>
            </div>

            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilter />
            </Suspense>

            <div className="my-12">
              <ProductGrid products={featuredProducts} />
            </div>

            <div className="text-center mt-16">
              <a
                href="/productos"
                className="cta-fill relative inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 border-2 border-red-600 text-red-600 bg-white font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                style={{ borderRadius: '2px' }}
              >
                Ver todos los productos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-32 px-6 md:px-8 bg-black text-white mt-20 md:mt-40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-4"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.02em' }}
              >
                ¿Por qué elegir TRIONX?
              </h2>
              <div className="w-12 h-1 bg-red-600"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Rendimiento técnico',
                  description:
                    'Desarrollado con triatletas profesionales para máximo desempeño en agua, asfalto y tierra. Cada prenda es un resultado de años de investigación.',
                  icon: '01'
                },
                {
                  title: 'Material premium',
                  description:
                    'Utilizamos solo materiales de la más alta calidad, duraderos y confortables. Tejidos innovadores que respiran y se adaptan a tu cuerpo.',
                  icon: '02'
                },
                {
                  title: 'Sponsor oficial',
                  description:
                    'Presentes en todos los stands de Iron Man 70.3 y triatlones de Argentina. Confianza de atletas profesionales en competiciones.',
                  icon: '03'
                },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="pt-8 pb-6 px-0 border-t-2 border-red-600 hover:border-white transition-colors duration-300"
                >
                  <div className="text-5xl font-black text-red-600 mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {item.icon}
                  </div>
                  <h3 
                    className="text-2xl md:text-3xl font-black text-white mb-4 uppercase"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
