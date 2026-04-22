import fs from 'fs/promises';
import path from 'path';
import { CartItem } from '@/types';

export interface Order {
  id: string;
  preferenceId: string;
  paymentId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

const ORDERS_FILE = path.join(process.cwd(), 'src/data/orders.json');

async function readOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

async function writeOrders(orders: Order[]): Promise<void> {
  try {
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error('Error writing orders:', error);
    throw error;
  }
}

export async function createOrder(
  preferenceId: string,
  items: CartItem[],
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  customerAddress: string,
  customerCity: string,
  customerPostalCode: string,
  subtotal: number,
  taxes: number,
  shipping: number,
  total: number
): Promise<Order> {
  const orders = await readOrders();
  
  const order: Order = {
    id: `ORD-${Date.now()}`,
    preferenceId,
    status: 'pending',
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  await writeOrders(orders);
  
  return order;
}

export async function getOrderByPreferenceId(preferenceId: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find(order => order.preferenceId === preferenceId);
}

export async function getOrderByPaymentId(paymentId: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find(order => order.paymentId === paymentId);
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find(order => order.id === orderId);
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  paymentId?: string
): Promise<Order | undefined> {
  const orders = await readOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) {
    return undefined;
  }

  orders[orderIndex].status = status;
  if (paymentId) {
    orders[orderIndex].paymentId = paymentId;
  }
  orders[orderIndex].updatedAt = new Date().toISOString();

  await writeOrders(orders);
  return orders[orderIndex];
}

export async function getAllOrders(): Promise<Order[]> {
  return await readOrders();
}
