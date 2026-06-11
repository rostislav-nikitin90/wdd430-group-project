import Image from "next/image";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>About Handcrafted Haven</h1>
        <p className={styles.heroSubtitle}>
          Where Tradition Meets Design
        </p>
      </section>

      {/* Mission + Contact Info */}
<section className={styles.infoRow}>
  <div className={styles.infoColumn}>
    <h2 className={styles.sectionTitle}>
      Our Mission and Vision
    </h2>

    <div className={styles.missionGrid}>
      <div className={styles.missionCard}>
        Support artisans and sustainability
      </div>

      <div className={styles.missionCard}>
        Build a creative community
      </div>

      <div className={styles.missionCard}>
        Preserve cultural heritage
      </div>

      <div className={styles.missionCard}>
        Connect global audiences
      </div>
    </div>
  </div>

  <div className={styles.infoColumn}>
    <h2 className={styles.sectionTitle}>
      Contact Information
    </h2>

    <div className={styles.contactInfo}>
      <p>Email: contact@handcraftedhaven.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Craft St, Artisan City, TX</p>
    </div>
  </div>
</section>


      {/* FAQ + Maker Stories */}
      <section className={styles.section}>
        <div className={styles.twoColumn}>
          <div>
            <h2 className={styles.sectionTitle}>
              Frequently Asked Questions
            </h2>

            <div className={styles.contentGroup}>
              <div className={styles.contentBlock}>
                <h3>How long does shipping take?</h3>
                <p>
                  Orders are typically processed within 2–3
                  business days. Delivery times vary by
                  location, but most customers in Europe and
                  North America receive their items within
                  7–10 business days.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3>What is your return policy?</h3>
                <p>
                  We accept returns within 30 days of delivery
                  for unused items in their original condition.
                  Customers are responsible for return shipping
                  costs unless the item was defective.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3>
                  What payment methods do you accept?
                </h3>
                <p>
                  We accept major credit cards, PayPal, and
                  secure online payment gateways. All
                  transactions are encrypted to protect
                  customer data.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.sectionTitle}>
              <hr className={styles.sectionLine}/>
            </div>

            <div className={styles.contentGroup}>
              <div className={styles.contentBlock}>
                <h3>
                  How do you verify your artisans?
                </h3>
                <p>
                  Each artisan completes a profile submission
                  process, including proof of craftsmanship and
                  product samples. Our team reviews every
                  application to ensure authenticity and
                  quality.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3>
                  How are customer reviews displayed?
                </h3>
                <p>
                  Reviews are linked directly to the product a
                  customer selects in the feedback form. Star
                  ratings and comments are stored in our
                  database and displayed on the corresponding
                  product card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
<section className={styles.contactSection}>
  <div className={styles.contactRow}>
    <div className={styles.formWrapper}>
      <h2 className={styles.sectionTitle}>
        Contact Us
      </h2>

      <form className={styles.contactForm}>
        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <textarea
          rows={6}
          placeholder="Your Message"
        />

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>

    <div className={styles.imageWrapper}>
      <Image
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200"
        alt="Artisans at work"
        width={1200}
        height={800}
        unoptimized
      />
    </div>
  </div>
</section>
    </main>
  );
}