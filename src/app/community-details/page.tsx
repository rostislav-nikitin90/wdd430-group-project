'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { artisansData} from '../../lib/data';
import styles from './CommunityDetail.module.css';

export default function ComunidadDetailPage() {

  const [selectedArtisan, setSelectedArtisan] = useState<Artisan>(artisansData[0]);

  return (
    <>
      <NavBar />
      
      <main className={styles.mainContainer}>

        <header className={styles.pageHeader}>

          <h1 className={styles.title}>Our Artisans</h1>

          <p className={styles.subtitle}>
            Meet the creative minds and hands behind our project. Click any of them to discover their success story. </p>

        </header>

        <section className={styles.listSection} aria-label="Artisan list">


          <ul className={styles.artisanList}>

            {artisansData.map((artisan) => (
              <li key={artisan.id}>

                <button
                  type="button"
                  className={`${styles.artisanButton} ${
                    selectedArtisan.id === artisan.id ? styles.activeButton : ''
                  }`}
                  onClick={() => setSelectedArtisan(artisan)}
                >

                  <span className={styles.artisanName}>{artisan.name}</span>
                  <span className={styles.businessName}>{artisan.businessName}</span>

                </button>

              </li>


            ))}

          </ul>

        </section>

        <section 

          className={styles.dynamicSection} 

          style={{ '--bg-image': `url(${selectedArtisan.bgImage})` } as React.CSSProperties}
          aria-live="polite"
        >
          <div className={styles.overlay}>

            <div className={styles.dynamicContent}>

              <span className={styles.badge}>Community Impact</span>

              <h2 className={styles.detailTitle}>{selectedArtisan.businessName}</h2>
              <p className={styles.artisanAuthor}>By: {selectedArtisan.name}</p>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoBlock}>

                  <h3>Their Story</h3>

                  <p>{selectedArtisan.story}</p>

                </div>

                <div className={styles.infoBlock}>

                  <h3>Community Impact</h3>
                  <p>{selectedArtisan.impact}</p>

                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}