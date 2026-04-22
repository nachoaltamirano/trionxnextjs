import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <XCircle size={80} className="mx-auto text-red-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pago cancelado
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          El pago no fue completado. Tu carrito sigue disponible para que puedas intentar de nuevo.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600">
            Si tienes problemas, contacta a nuestro equipo de soporte.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/carrito" className="block">
            <Button size="lg" className="w-full">
              Volver al carrito
            </Button>
          </Link>
          <Link href="/productos" className="block">
            <button className="w-full px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition rounded-lg border border-gray-300">
              Continuar comprando
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
