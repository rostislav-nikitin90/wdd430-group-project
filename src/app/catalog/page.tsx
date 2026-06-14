import { getProducts } from "@/lib/data";
import CatalogGrid from "../components/CatalogGrid";
import FeedbackForm from "../components/FeedbackForm";
import styles from "./catalog.module.css";

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Our Catalog</h1>
        <p className={styles.heroSubtitle}>
          Browse Unique, Handcrafted Goods by Category or Price
        </p>
      </section>
      <CatalogGrid products={products} heading="Featured Collection" showControls={true} />
      <FeedbackForm />
    </>
  );
}