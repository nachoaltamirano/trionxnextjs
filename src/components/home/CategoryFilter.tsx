'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categoryStyles = `
  @keyframes slideInCategory {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .category-btn {
    animation: slideInCategory 0.4s ease-out forwards;
  }
`;

const categories = [
  { id: 'todos', label: 'Todos', href: '/productos' },
  { id: 'garmont', label: 'Garmont', href: '/productos?category=garmont' },
  { id: 'pista', label: 'Pista', href: '/productos?category=pista' },
  { id: 'gorras', label: 'Gorras', href: '/productos?category=gorras' },
];

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <style>{categoryStyles}</style>
      
      <div className="flex flex-wrap gap-3 justify-center my-12">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="category-btn"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <button
              className={`px-7 py-3 font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                (!category && cat.id === 'todos') || category === cat.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {cat.label}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
