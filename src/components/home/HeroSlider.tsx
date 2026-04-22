'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
  bgImage?: string;
  bgColor?: string;
}

const slides: Slide[] = [
  {
    title: 'Equipate para el próximo 70.3',
    subtitle: 'Indumentaria técnica para triatletas de alto rendimiento',
    cta: { text: 'Ver colección', href: '/productos' },
    bgColor: 'bg-gradient-to-r from-slate-900 to-blue-900',
  },
  {
    title: 'Con el Iron Team Argentina en cada km',
    subtitle: 'Presentes en todos los stands de Iron Man 70.3',
    cta: { text: 'Conocer más', href: '/productos' },
    bgColor: 'bg-gradient-to-r from-blue-900 to-slate-900',
  },
  {
    title: 'Natación · Ciclismo · Running',
    subtitle: 'Los tres ejes del triatlón en un solo lugar',
    cta: { text: 'Comprar ahora', href: '/productos' },
    bgColor: 'bg-gradient-to-r from-slate-800 to-blue-800',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoplay(false);
  };

  const slide = slides[currentSlide];

  return (
    <div
      className={`relative w-full h-96 md:h-[500px] ${slide.bgColor} flex items-center justify-center overflow-hidden group transition-all duration-500`}
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Slide Content */}
      <div className="text-center text-white z-10 px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
          {slide.subtitle}
        </p>
        <Link
          href={slide.cta.href}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {slide.cta.text}
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
