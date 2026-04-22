'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: 'todos', label: 'Todos', href: '/productos' },
  { id: 'natacion', label: 'Natación', href: '/productos?category=natacion' },
  { id: 'ciclismo', label: 'Ciclismo', href: '/productos?category=ciclismo' },
  { id: 'running', label: 'Running', href: '/productos?category=running' },
  { id: 'accesorios', label: 'Accesorios', href: '/productos?category=accesorios' },
];

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="flex flex-wrap gap-2 justify-center my-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.href}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            (!category && cat.id === 'todos') || category === cat.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
