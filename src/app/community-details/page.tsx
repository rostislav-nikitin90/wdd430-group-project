import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { makerStories } from '../../lib/data';
import styles from './CommunityDetail.module.css';

export default function CommunityDetailPage() {
  return (
    <>
      <NavBar />
      
      <header className={styles.bannerHeader}>

        <div className={styles.bannerContent}>

          <h1 className={styles.bannerTitle}>Join the Community</h1>

          <p className={styles.bannerSubtitle}>Connect with Fellow Creators and Showcase Your Craft</p>


        </div>

      </header>

      <main className={styles.mainContainer}>

        <section>

          Upcoming Events and Workshops
          {/* Hi, replace with your code for this section here */}
    
        </section>


        <section className={styles.storiesSection} aria-labelledby="stories-title">
          
          <div className={styles.sectionHeader}>

            <h2 id="stories-title" className={styles.mainTitle}>Maker Stories</h2>

            <div className={styles.separatorLine} role="presentation"></div>

          </div>

          <div className={styles.storiesGrid}>

            {makerStories.map((story) => (

              <article key={story.id} className={styles.storyCard}>
                
                <div className={styles.storyText}>

                  <h3>{story.title}</h3>
                  <p>{story.paragraph}</p>

                </div>

                <div className={styles.storyImageWrapper}>

                  <Image 
                    src={story.imageUrl} 
                    alt={story.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.storyImage}
                  />

                </div>

              </article>

            ))}
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}