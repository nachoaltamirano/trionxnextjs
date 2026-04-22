'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
  bgColor: string;
}

const slides: Slide[] = [
  {
    title: 'EQUIPATE PARA EL PRÓXIMO 70.3',
    subtitle: 'Indumentaria técnica para triatletas de alto rendimiento',
    cta: { text: 'Ver colección', href: '/productos' },
    bgColor: 'bg-black',
  },
  {
    title: 'CON IRON TEAM ARGENTINA EN CADA KM',
    subtitle: 'Presentes en todos los stands de Iron Man 70.3',
    cta: { text: 'Conocer más', href: '/productos' },
    bgColor: 'bg-red-600',
  },
  {
    title: 'NATACIÓN · CICLISMO · RUNNING',
    subtitle: 'Los tres ejes del triatlón en un solo lugar',
    cta: { text: 'Comprar ahora', href: '/productos' },
    bgColor: 'bg-black',
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
    <>
      <style>{`
        @keyframes fillBg {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        .cta-button {
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }
        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: #D10000;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: -1;
        }
        .cta-button:hover::before {
          clip-path: inset(0 0 0 0);
        }
        .hero-text {
          animation: slideUp 0.8s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className={`relative w-full h-screen ${slide.bgColor} flex items-center justify-center overflow-hidden group transition-all duration-700`}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Accent red bar */}
        {currentSlide === 1 ? (
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black"></div>
        ) : (
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600"></div>
        )}

        {/* Content */}
        <div className="text-center text-white z-10 px-4 md:px-8 max-w-5xl hero-text">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1]"
            style={{ 
              fontFamily: 'Bebas Neue, sans-serif',
              letterSpacing: '-0.02em',
              color: currentSlide === 1 ? '#0A0A0A' : '#FFFFFF'
            }}
          >
            {slide.title}
          </h1>
          <p 
            className="text-lg md:text-2xl mb-10 md:mb-12 font-normal"
            style={{ color: currentSlide === 1 ? '#0A0A0A' : '#FFFFFF' }}
          >
            {slide.subtitle}
          </p>
          <Link
            href={slide.cta.href}
            className="cta-button inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 border-2 transition-colors"
            style={{
              borderColor: currentSlide === 1 ? '#0A0A0A' : '#D10000',
              color: currentSlide === 1 ? '#0A0A0A' : '#FFFFFF',
              backgroundColor: currentSlide === 1 ? 'transparent' : '#D10000'
            }}
          >
            {slide.cta.text}
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Navigation Arrows - hidden on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-600 transition-all p-2 opacity-0 group-hover:opacity-100 lg:opacity-100"
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-600 transition-all p-2 opacity-0 group-hover:opacity-100 lg:opacity-100"
        >
          <ChevronRight size={40} strokeWidth={1} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-2 bg-red-600'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              style={{ borderRadius: '1px' }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </>
  );
}
