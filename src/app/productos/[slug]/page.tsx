import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/ProductDetail';
import { getProductBySlug } from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | TRIONX`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <a href="/productos" className="hover:text-blue-600 transition">
            Productos
          </a>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Detail */}
        <ProductDetail product={product} />

        {/* Related Products */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Productos relacionados</h2>
          {/* TODO: Implement related products */}
          <p className="text-gray-600">Más productos próximamente</p>
        </div>
      </div>
    </div>
  );
}
