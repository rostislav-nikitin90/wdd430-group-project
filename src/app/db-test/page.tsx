import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

export default async function DbTestPage() {

  if (!process.env.DATABASE_URL) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#8D3B3B' }}>

        <h2>DATABASE_URL is not set up</h2>

        <p>PLease make sure you have .env.local set up properly.</p>

      </div>
    );
  }

  let profiles: Profile[] = [];

  let products: Product[] = [];
  
  let reviews: Review[] = [];

  let errorMsg = '';

  try {

    const [profilesData, productsData, reviewsData] = await Promise.all([
      sql`SELECT * FROM profiles`,
      sql`SELECT * FROM products`,
      sql`SELECT * FROM reviews`,
    ]);

    profiles = profilesData as Profile[];

    products = productsData as Product[];

    reviews = reviewsData as Review[];

  } catch (err: any) {

    errorMsg = err.message || 'Unknown error when consulting the db';

  }


  const containerStyle: React.CSSProperties = {

    maxWidth: '1100px',
    margin: '40px auto',
    padding: '0 20px',

  };

  const sectionStyle: React.CSSProperties = {

    backgroundColor: '#FFF8F0',
    padding: '24px',
    marginBottom: '30px',

  };

  const gridStyle: React.CSSProperties = {

    display: 'grid',

    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',

    marginTop: '15px',

  };

  const cardStyle: React.CSSProperties = {
    
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '16px',

    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  };

  return (
    <>

      <main style={containerStyle}>

        <header style={{ marginBottom: '40px', textAlign: 'center' }}>

          <h1 style={{ color: '#264653', fontSize: '2.5rem' }}>Database Test Connection</h1>

        </header>

        {errorMsg && (
          <div style={{ backgroundColor: '#ffdddd', color: '#8D3B3B', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>

            <h3>Connection error</h3>

            <p>{errorMsg}</p>

          </div>
        )}

           {/*Profiles  */}

        <section style={sectionStyle}>

          <h2 style={{ color: '#8D3B3B', borderBottom: '2px solid #8D3B3B', paddingBottom: '8px', margin: 0 }}>
            Profiles Table ({profiles.length})
          </h2>

          <div style={gridStyle}>

            {profiles.map((profile) => (
              <div key={profile.profile_id} style={cardStyle}>

                <h3 style={{ margin: '0 0 8px 0', color: '#264653' }}>{profile.name}</h3>

                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>

                  <strong>Contact:</strong> {profile.contact || 'N/A'}

                </p>

                <small style={{ color: '#aaa' }}>ID: {profile.profile_id}</small>

              </div>
            ))}
            
            </div>

        </section>


        <section style={sectionStyle}>
            
          <h2 style={{ color: '#8D3B3B', borderBottom: '2px solid #8D3B3B', paddingBottom: '8px', margin: 0 }}>
            Products Table ({products.length})
          </h2>

          <div style={gridStyle}>

            {products.map((product) => (

              <div key={product.product_id} style={cardStyle}>

                <h3 style={{ margin: '0 0 8px 0', color: '#264653' }}>{product.name}</h3>

                <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#444' }}>{product.description}</p>

                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#2a9d8f' }}>${Number(product.price).toFixed(2)}</p>

                <small style={{ color: '#999' }}>Profile Owner ID: {product.profile_id}</small>

              </div>
            ))}

          </div>

        </section>


        <section style={sectionStyle}>
          <h2 style={{ color: '#8D3B3B', borderBottom: '2px solid #8D3B3B', paddingBottom: '8px', margin: 0 }}>
            Reviews Table ({reviews.length})
          </h2>

          <div style={gridStyle}>

            {reviews.map((review) => (

              <div key={review.review_id} style={cardStyle}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  
                  <h3 style={{ margin: 0, color: '#264653', fontSize: '1.1rem' }}>{review.name}</h3>

                  <span style={{ backgroundColor: '#e9c46a', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>⭐ {review.star_rating}/5
                  </span>

                </div>

                <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', color: '#555' }}>"{review.comment}"</p>

                <small style={{ color: '#999' }}>Product Target ID: {review.product_id}</small>
              </div>

            ))}

          </div>

        </section>

      </main>

    </>
  );
}