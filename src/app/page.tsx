import Hero from "./components/Hero";
import CatalogGrid from "./components/CatalogGrid";
import { getHomeProducts } from "@/lib/data";
import Reviews from "./components/Reviews";
import Community from "./components/Community";

export default async function HomePage() {
  const products = await getHomeProducts();

  return (
    <>
      <Hero />
      <CatalogGrid products={products} heading="Featured Products" showControls={false} />
      <Reviews />
      <Community />
    </>
  );
}