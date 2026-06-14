import Image from "next/image";
import styles from "./sellers.module.css";
import { pool } from "@/lib/data";

type Profile = {
  name: string;
  contact: string;
  image: string;
  bio: string;
};

export default async function SellersPage() {
  const result = await pool.query(
    `
      SELECT name, contact, image, bio
      FROM profiles
      ORDER BY profile_id
    `
  );

  const profiles = result.rows as Profile[];

  return (
    <main className={styles.sellersPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            Discover Our Artisans
          </h1>

          <p className={styles.heroSubtitle}>
            Meet the Creators of Unique Handcrafted Items
          </p>
        </div>
      </section>

      {/* Craftspeople Section */}
      <section className={styles.craftspeopleSection}>
        <h2 className={styles.sectionTitle}>
          Craftspeople
        </h2>

        {/* Dynamic artisans from DB */}
        {profiles.map((profile, index) => (
          <article
            key={`${profile.name}-${index}`}
            className={styles.artisan}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 280px"
                className={styles.artisanImage}
              />
            </div>

            <div className={styles.artisanContent}>
              <h3 className={styles.artisanName}>
                {profile.name}
              </h3>

              <p className={styles.email}>
                {profile.contact}
              </p>

              <p className={styles.bio}>
                {profile.bio}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}