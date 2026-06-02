import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full overflow-hidden"
    >
      <Image
        src="/images/hero-image.webp"
        alt="Artisan products"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">

        <h1
          id="title"
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          Discover Artisan Treasures
        </h1>

        <p
          id="slogan"
          className="mt-3 md:mt-4 text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium px-4"
        >
          Unique, Handcrafted Goods from Around the World
        </p>

        <button
          id="shop-now-button"
          className="mt-6 md:mt-8 rounded-md text-white text-sm md:text-lg font-medium transition px-8 py-3 md:px-10 md:py-4"
        >
          Shop Now
        </button>

      </div>
    </section>
  );
}