import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function fetchProducts(): Promise<Product[]> {
  const data = await sql`SELECT * FROM products ORDER BY product_id`;
  return data as Product[];
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const data = await sql`SELECT * FROM products WHERE product_id = ${id}`;
  return (data[0] as Product) ?? null;
}