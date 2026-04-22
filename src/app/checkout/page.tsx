'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Loader } from 'lucide-react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerCity: '',
    customerPostalCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Carrito vacío</h2>
            <p className="text-gray-600 mb-8">
              Agrega productos a tu carrito antes de proceder al pago.
            </p>
            <Link href="/productos">
              <Button size="lg">Volver a productos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    // Validate form
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.customerAddress || !formData.customerCity || !formData.customerPostalCode) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Estimate shipping and taxes
      const shipping = 1500;
      const subtotal = total;
      const taxes = Math.round(subtotal * 0.21);
      const finalTotal = subtotal + shipping + taxes;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          ...formData,
          subtotal,
          taxes,
          shipping,
          total: finalTotal,
        }),
      });

      const data = await response.json();

      if (data.success && data.init_point) {
        // Redirect to MercadoPago
        window.location.href = data.init_point;
      } else {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Error creating checkout session';
        setError(errorMsg);
        console.error('Checkout error:', data);
      }
    } catch (err) {
      setError('Error processing checkout. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Estimate shipping and taxes
  const shipping = 1500;
  const subtotal = total;
  const tax = Math.round(subtotal * 0.21);
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={`${item.productId}-${item.size}`} item={item} />
                ))}
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Datos de envío</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Nombre"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Teléfono"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="customerAddress"
                    placeholder="Dirección"
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="customerCity"
                    placeholder="Ciudad"
                    value={formData.customerCity}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="customerPostalCode"
                    placeholder="Código Postal"
                    value={formData.customerPostalCode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div>
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Total del pedido</h3>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (21%)</span>
                  <span className="font-semibold">${tax.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold">${shipping.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-600">
                    ${finalTotal.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading && <Loader size={20} className="animate-spin" />}
                {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
              </button>

              <Link href="/carrito" className="block mt-3">
                <button className="w-full px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition border border-blue-600 rounded-lg">
                  Volver al carrito
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
