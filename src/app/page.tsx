import NavBar from './components/NavBar';
import Hero from './components/Hero';
import CatalogGrid from './components/CatalogGrid';
import Reviews from './components/Reviews';
import Community from './components/Community';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <CatalogGrid />
      <Reviews />
      <Community />
      <Footer />
    </>
  );
}
