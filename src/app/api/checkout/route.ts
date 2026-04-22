import { NextResponse } from 'next/server';
import { CartItem } from '@/types';
import { checkStockAvailability } from '@/lib/stock';
import { createOrder } from '@/lib/orders';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerPostalCode,
      subtotal,
      taxes,
      shipping,
      total,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Items are required' },
        { status: 400 }
      );
    }

    // Check stock availability
    const stockAvailable = await checkStockAvailability(items);
    if (!stockAvailable) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock for some items' },
        { status: 400 }
      );
    }

    // Validate token exists
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('MP_ACCESS_TOKEN not configured in environment');
      return NextResponse.json(
        { success: false, error: 'Payment configuration error', details: 'Missing MP access token' },
        { status: 500 }
      );
    }

    // Create MercadoPago preference using REST API directly
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const mpItems = items.map((item: CartItem) => ({
      id: item.productId,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const preferencePayload = {
      items: mpItems,
      back_urls: {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout/failure`,
        pending: `${baseUrl}/checkout/pending`,
      },
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    };

    console.log('Sending to MercadoPago:', JSON.stringify(preferencePayload, null, 2));

    // Call MercadoPago API directly
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'TRIONX-Shop/1.0',
      },
      body: JSON.stringify(preferencePayload),
    });

    const mpResponseText = await mpResponse.text();
    console.log('MercadoPago response status:', mpResponse.status);
    console.log('MercadoPago response body:', mpResponseText);

    if (!mpResponse.ok) {
      console.error('MercadoPago API error:', mpResponse.status, mpResponseText);
      return NextResponse.json(
        {
          success: false,
          error: 'MercadoPago API error',
          details: `Status ${mpResponse.status}: ${mpResponseText}`,
        },
        { status: 500 }
      );
    }

    const preferenceData = JSON.parse(mpResponseText);

    if (!preferenceData.id || !preferenceData.init_point) {
      console.error('Invalid preference response:', preferenceData);
      return NextResponse.json(
        { success: false, error: 'Invalid preference response from MercadoPago' },
        { status: 500 }
      );
    }

    // Create order in our system
    const order = await createOrder(
      preferenceData.id,
      items,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerPostalCode,
      subtotal,
      taxes,
      shipping,
      total
    );

    console.log('Order created:', order.id);

    return NextResponse.json({
      success: true,
      init_point: preferenceData.init_point,
      preference_id: preferenceData.id,
      order_id: order.id,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Error creating checkout session',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
