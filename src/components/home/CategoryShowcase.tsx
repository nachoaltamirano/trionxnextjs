'use client';

import React from 'react';
import Link from 'next/link';
import { Waves, Mountain, Zap } from 'lucide-react';

interface CategoryItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const categories: CategoryItem[] = [
  {
    name: 'NATACIÓN',
    slug: 'natacion',
    icon: <Waves size={64} strokeWidth={1} />,
    color: 'from-blue-600 to-blue-800',
    description: 'Trajes y equipo para natación de alto rendimiento',
  },
  {
    name: 'CICLISMO',
    slug: 'ciclismo',
    icon: <Mountain size={64} strokeWidth={1} />,
    color: 'from-red-600 to-red-800',
    description: 'Jersey y indumentaria de ciclismo profesional',
  },
  {
    name: 'RUNNING',
    slug: 'running',
    icon: <Zap size={64} strokeWidth={1} />,
    color: 'from-orange-600 to-orange-800',
    description: 'Ropa y accesorios para running de velocidad',
  },
];

const showcaseStyles = `
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .category-card {
    animation: scaleIn 0.6s ease-out;
  }
  .category-card:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
  }
`;

export function CategoryShowcase() {
  return (
    <>
      <style>{showcaseStyles}</style>
      
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <Link
                key={category.slug}
                href={`/productos?category=${category.slug}`}
                className="group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`category-card relative overflow-hidden h-96 md:h-[450px] bg-gradient-to-br ${category.color} group transition-all duration-300 hover:shadow-2xl`} style={{ borderRadius: '2px' }}>
                  {/* Icon wrapper */}
                  <div className="icon-wrapper absolute inset-0 flex items-center justify-center text-white opacity-20 group-hover:opacity-30 transition-all duration-300">
                    {category.icon}
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 
                      className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:-translate-y-2 transition-transform duration-300 uppercase"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.02em' }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center text-red-600 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                      Explorar
                      <span className="ml-2">→</span>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
