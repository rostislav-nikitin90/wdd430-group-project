import NavBar from './components/NavBar';
import Hero from './components/Hero';
import CatalogGrid from './components/CatalogGrid';
import Reviews from './components/Reviews';
import Community from './components/Community';
import Footer from './components/Footer';
import { fetchProducts } from '@/lib/data';

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      <NavBar />
      <Hero />
      <CatalogGrid products={featured} heading="Featured Products" showControls={false} />
      <Reviews />
      <Community />
      <Footer />
    </>
  );
}