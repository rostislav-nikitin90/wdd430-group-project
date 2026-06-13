import Hero from './components/Hero';
import CatalogGrid from './components/CatalogGrid';
import Reviews from './components/Reviews';
import Community from './components/Community';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CatalogGrid />
      <Reviews />
      <Community />
    </>
  );
}
