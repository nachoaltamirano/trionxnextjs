import { Product } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src/data/products.json');

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsPath, 'utf-8');
    const json = JSON.parse(data);
    return json.products;
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}
