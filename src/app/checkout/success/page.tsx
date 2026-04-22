import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Pago realizado exitosamente!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Tu pedido ha sido confirmado y será procesado pronto. Recibirás un email con los
          detalles del seguimiento.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Número de orden:</p>
          <p className="font-mono font-bold text-lg text-gray-900">TRIONX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div className="space-y-3">
          <Link href="/productos" className="block">
            <Button size="lg" className="w-full">
              Continuar comprando
            </Button>
          </Link>
          <Link href="/" className="block">
            <button className="w-full px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition rounded-lg border border-gray-300">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
