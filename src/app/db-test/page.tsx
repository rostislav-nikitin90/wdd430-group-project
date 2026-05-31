import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

interface Profile { profile_id: string | number; name: string; contact?: string; }

interface Product { product_id: string | number; name: string; description?: string; price: number; profile_id: any; }

interface Review { review_id: string | number; name: string; star_rating: number; comment?: string; product_id: any; }

export default async function DbTestPage() {

  if (!process.env.DATABASE_URL) {
    return <div>Error: DATABASE_URL is not set up. Please check your .env.local file.</div>;
  }

  try {

    const [profilesData, productsData, reviewsData] = await Promise.all([
      sql`SELECT * FROM profiles`,
      sql`SELECT * FROM products`,
      sql`SELECT * FROM reviews`,
    ]);

    const profiles = profilesData as Profile[];
    const products = productsData as Product[];
    const reviews = reviewsData as Review[];

    console.log('DB CONNECTION SUCCESSFUL');

    console.log(`Profiles Count: ${profiles.length}`, profiles);

    console.log(`Products Count: ${products.length}`, products);

    console.log(`Reviews Count: ${reviews.length}`, reviews);

    console.log('------------------------------');

    return <div>DB connected and running on server</div>;

  } catch (err: any) {

    const errorMsg = err.message || 'Unknown error when consulting the db';
    
    console.error('----DB Connection Error------', errorMsg);

    return <div>Connection error: {errorMsg}</div>;
    
  }
}