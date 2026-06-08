import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CatalogGrid from '../components/CatalogGrid';
import { fetchProducts } from '@/lib/data';
import styles from './catalog.module.css';

export default async function CatalogPage() {
  const products = await fetchProducts();

  return (
    <>
      <NavBar />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Our Catalog</h1>
        <p className={styles.heroSubtitle}>
          Browse Unique, Handcrafted Goods by Category or Price
        </p>
      </section>
      <CatalogGrid products={products} heading="Featured Collection" showControls={true} />
      <Footer />
    </>
  );
}