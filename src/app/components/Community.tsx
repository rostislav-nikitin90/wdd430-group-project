import Image from 'next/image';
import Link from 'next/link';
import styles from './Community.module.css';

export default function Community() {
  return (
    <section className={styles.communitySection} aria-labelledby="community-heading">
      
      <div className={styles.headerContainer}>
        <h2 id="community-heading" className={styles.mainTitle}>Our Artisan Community</h2>
        <div className={styles.separatorLine} role="presentation"></div>
      </div>

      <div className={styles.contentGrid}>
        
        <div className={styles.imageWrapper}>

          <Image 
            src="/images/community-main.webp"
            alt="A variety of handcrafted products"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
            className={styles.mainImage}
          />

        </div>

        <div className={styles.textBlock}>
          <h3 className={styles.contentTitle}>Meet Our Makers</h3>
          <p className={styles.description}>
            Learn the stories of our artisans and their craft</p>

          <Link href="/community-details" className={styles.readStoriesBtn}>
            Read Stories
          </Link>
    
        </div>
      </div>

    </section>
  );
}