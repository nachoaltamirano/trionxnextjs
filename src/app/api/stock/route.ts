import { NextResponse } from 'next/server';
import { getStock, updateStock } from '@/lib/stock';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { success: false, error: 'productId is required' },
      { status: 400 }
    );
  }

  try {
    const stock = await getStock(productId);
    return NextResponse.json({
      success: true,
      productId,
      stock,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching stock' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { productId, size, delta } = body;

    if (!productId || !size || delta === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'productId, size, and delta are required',
        },
        { status: 400 }
      );
    }

    const currentStock = await getStock(productId, size);
    const newStock = currentStock + delta;

    if (newStock < 0) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    await updateStock(productId, size, newStock);

    return NextResponse.json({
      success: true,
      productId,
      size,
      previousStock: currentStock,
      newStock,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error updating stock' },
      { status: 500 }
    );
  }
}
