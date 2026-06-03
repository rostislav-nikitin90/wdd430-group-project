// /src/app/components/Reviews.tsx
import { REVIEWS } from '@/lib/data';
import type { Review } from '@/types';
import styles from './Reviews.module.css';

function getAverageRating(reviews: Review[]): number {
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.starRow} aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}
        aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const average = getAverageRating(REVIEWS).toFixed(1);
  const totalReviews = REVIEWS.length;
  const randomReviews = REVIEWS.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
      <div className={styles.reviewsBox}>
        <h2 className={styles.reviewsHeading}>Customer Reviews</h2>
        <div className={styles.reviewsSummary}>
          <StarRating rating={Math.round(Number(average))} />
          <span className={styles.reviewText}>{average}/5<span className={styles.reviewText}> Based on {totalReviews} reviews</span></span>
        </div>
      </div>
      <div className={styles.reviewsGrid}>
        {randomReviews.map((review) => (
          <figure key={review.id} className={styles.reviewCard}>
            <figcaption className={styles.reviewNameBox}><p className={styles.reviewText}>{review.name}</p></figcaption>
            <div className={styles.starRowRating}>
              <StarRating rating={review.rating} />
            </div>
            <div className={styles.reviewCommentBox}>
              <blockquote className={styles.reviewText}>“{review.comment}”</blockquote>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
