import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import CatalogGrid from "./components/CatalogGrid";
import { getHomeProducts } from "@/lib/data";
import Reviews from "./components/Reviews";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default async function HomePage() {
  const products = await getHomeProducts();

  return (
    <>
      <NavBar />
      <Hero />
      <CatalogGrid products={products} heading="Featured Products" showControls={false} />
      <Reviews />
      <Community />
      <Footer />
    </>
  );
}