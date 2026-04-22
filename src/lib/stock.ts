import { CartItem, StockData } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const stockPath = path.join(process.cwd(), 'src/data/stock.json');

async function readStock(): Promise<StockData> {
  try {
    const data = await fs.readFile(stockPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stock:', error);
    return {};
  }
}

async function writeStock(stock: StockData): Promise<void> {
  try {
    await fs.writeFile(stockPath, JSON.stringify(stock, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing stock:', error);
    throw error;
  }
}

export async function getStock(productId: string, size?: string): Promise<number> {
  const stock = await readStock();
  
  if (!stock[productId]) {
    return 0;
  }
  
  if (size) {
    return stock[productId][size] || 0;
  }
  
  return Object.values(stock[productId]).reduce((sum, qty) => sum + qty, 0);
}

export async function updateStock(
  productId: string,
  size: string,
  quantity: number
): Promise<void> {
  const stock = await readStock();
  
  if (!stock[productId]) {
    stock[productId] = {};
  }
  
  stock[productId][size] = Math.max(0, quantity);
  await writeStock(stock);
}

export async function reserveStock(items: CartItem[]): Promise<boolean> {
  const stock = await readStock();
  
  // Verify all items have sufficient stock
  for (const item of items) {
    if (!stock[item.productId] || !stock[item.productId][item.size]) {
      return false;
    }
    if (stock[item.productId][item.size] < item.quantity) {
      return false;
    }
  }
  
  // Reserve stock
  for (const item of items) {
    stock[item.productId][item.size] -= item.quantity;
  }
  
  await writeStock(stock);
  return true;
}

export async function releaseStock(items: CartItem[]): Promise<void> {
  const stock = await readStock();
  
  for (const item of items) {
    if (stock[item.productId] && stock[item.productId][item.size]) {
      stock[item.productId][item.size] += item.quantity;
    }
  }
  
  await writeStock(stock);
}

export async function checkStockAvailability(items: CartItem[]): Promise<boolean> {
  const stock = await readStock();
  
  for (const item of items) {
    const availableStock = stock[item.productId]?.[item.size] || 0;
    if (availableStock < item.quantity) {
      return false;
    }
  }
  
  return true;
}
