import { NextResponse } from 'next/server';
import { getOrderByPreferenceId, updateOrderStatus } from '@/lib/orders';
import { reserveStock } from '@/lib/stock';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('MercadoPago Webhook received:', JSON.stringify(body, null, 2));

    // Handle different notification types
    const { action, data } = body;

    // Handle payment creation
    if (action === 'payment.created') {
      console.log('Payment created:', data.id);
      return NextResponse.json({ received: true });
    }

    // Handle payment updates (most important for order processing)
    if (action === 'payment.updated') {
      const paymentId = data.id;
      const paymentStatus = data.status;
      const preferenceId = data.preference_id;

      console.log(`Payment ${paymentId} updated to status: ${paymentStatus}`);

      // Find order by preference ID
      const order = await getOrderByPreferenceId(preferenceId);

      if (!order) {
        console.error(`Order not found for preference: ${preferenceId}`);
        return NextResponse.json({ received: true }); // Still return 200 to acknowledge
      }

      // Update order based on payment status
      if (paymentStatus === 'approved') {
        console.log(`Payment approved for order: ${order.id}`);
        
        // Reserve stock for this order
        try {
          await reserveStock(order.items);
          console.log(`Stock reserved for order: ${order.id}`);
        } catch (error) {
          console.error(`Failed to reserve stock for order ${order.id}:`, error);
          // Don't fail the webhook, just log the error
        }

        // Update order status to approved
        await updateOrderStatus(order.id, 'approved', paymentId);
        
        // Here you could:
        // - Send confirmation email
        // - Trigger fulfillment process
        // - Update inventory
        // - Create shipping label
        
      } else if (paymentStatus === 'pending') {
        console.log(`Payment pending for order: ${order.id}`);
        await updateOrderStatus(order.id, 'pending', paymentId);
        
      } else if (paymentStatus === 'rejected' || paymentStatus === 'cancelled') {
        console.log(`Payment rejected for order: ${order.id}`);
        await updateOrderStatus(order.id, 'rejected', paymentId);
        
        // Here you could:
        // - Send rejection notification
        // - Release any reserved stock if needed
      }

      return NextResponse.json({ received: true });
    }

    // Handle merchant_order updates (alternative notification method)
    if (action === 'merchant_order.updated') {
      console.log('Merchant order updated:', data.id);
      // MercadoPago sometimes sends merchant_order notifications instead of payment
      // You can implement additional logic here if needed
      return NextResponse.json({ received: true });
    }

    console.log('Unknown webhook action:', action);
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent MercadoPago from retrying
    // Log errors for debugging but don't fail the webhook
    return NextResponse.json({ received: true });
  }
}

