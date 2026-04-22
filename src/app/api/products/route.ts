import { NextResponse } from 'next/server';
import { getProducts, getProductsByCategory } from '@/lib/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let products;
    if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getProducts();
    }

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error fetching products',
      },
      { status: 500 }
    );
  }
}
