"use client";
import { useEffect, useState } from "react";
import { getReviews } from "@/lib/data";
import styles from "./Reviews.module.css";

interface Review {
  review_id: number;
  name: string;
  comment: string;
  star_rating: number;
  product_id: number;
}

function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.star_rating, 0);
  return total / reviews.length;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.starRow} aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getReviews();
        setReviews(data as Review[]);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsHeading}>Customer Reviews</h2>
        <p>No reviews yet. Be the first to leave feedback!</p>
      </section>
    );
  }

  const average = getAverageRating(reviews).toFixed(1);
  const totalReviews = reviews.length;
  const randomReviews = [...reviews].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
      <div className={styles.reviewsBox}>
        <h2 className={styles.reviewsHeading}>Customer Reviews</h2>
        <div className={styles.reviewsSummary}>
          <StarRating rating={Math.round(Number(average))} />
          <span className={styles.reviewText}>
            {average}/5 <span className={styles.reviewText}>Based on {totalReviews} reviews</span>
          </span>
        </div>
      </div>
      <div className={styles.reviewsGrid}>
        {randomReviews.map((review) => (
          <figure key={review.review_id} className={styles.reviewCard}>
            <figcaption className={styles.reviewNameBox}>
              <p className={styles.reviewText}>{review.name}</p>
            </figcaption>
            <div className={styles.starRowRating}>
              <StarRating rating={review.star_rating} />
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



