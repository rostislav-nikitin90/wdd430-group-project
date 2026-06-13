import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import styles from "./auth.module.css";
import AddProductForm from '@/app/components/AddProductForm';

// enh

export default async function ProfilePage() {

  const cookieStore = await cookies();
  
  const sessionCookie = cookieStore.get('session_user_id');

  if (!sessionCookie || !sessionCookie.value) {
    redirect('/login');
  }

  const profileId = sessionCookie.value;
  const sql = neon(process.env.DATABASE_URL!);

  const profiles = await sql`
    SELECT name, bio, image 
    FROM profiles 
    WHERE profile_id = ${profileId}
  `;

  if (profiles.length === 0) {
    redirect('/login');
  }

  const seller = profiles[0];

  const products = await sql`
    SELECT product_id, name, image, description, price 
    FROM products 
    WHERE profile_id = ${profileId}
  `;

  return (
    <main className={styles.profilePage}>
      <div className={styles.profileBanner}>
        <h1 className={styles.bannerTitle}>Welcome to Your<br />Seller Account</h1>
      </div>

      <div className={styles.profileContent}>
        <h2 className={styles.sellerName}>Seller: {seller.name}</h2>

        <div className={styles.sectionStrip}>
          <h3>Your Products for Sale</h3>
        </div>
        {/* here */}

        {products.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.product_id} className={styles.productCard}>
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                  />
                ) : (
                  <div className={styles.imagePlaceholder}></div>
                )}

                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>

                  <p className={styles.productDesc}>{product.description}</p>

                  <p className={styles.productPrice}>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}> You haven't listed any products yet.</p>
        )}

      </div>

      <AddProductForm />

    </main>
  );
}