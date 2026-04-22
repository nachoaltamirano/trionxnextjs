import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <Clock size={80} className="mx-auto text-yellow-500 mb-6 animate-spin" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pago pendiente
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Tu pago está siendo procesado. Recibirás un email con la confirmación del estado.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600">
            Por favor, no cierres este navegador ni recargues la página mientras se procesa el pago.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button size="lg" className="w-full">
              Volver al inicio
            </Button>
          </Link>
          <Link href="/carrito" className="block">
            <button className="w-full px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition rounded-lg border border-gray-300">
              Ver carrito
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
