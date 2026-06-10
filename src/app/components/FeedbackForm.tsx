"use client";

import { useState, useEffect } from "react";
import styles from "./FeedbackForm.module.css";

interface Product {
  product_id: number;
  name: string;
}

export default function FeedbackForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productId: "",
    comment: "",
    starRating: 5,
  });

  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "starRating" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email.";
    if (!formData.productId) newErrors.productId = "Please select a product.";
    if (!formData.comment.trim()) newErrors.comment = "Comment cannot be empty.";
    if (formData.starRating < 1 || formData.starRating > 5)
      newErrors.starRating = "Rating must be between 1 and 5.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Review submitted successfully!");
        setFormData({
          name: "",
          email: "",
          productId: "",
          comment: "",
          starRating: 5,
        });
      } else {
        const error = await res.json();
        setStatus(error.error || "Error submitting review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setStatus("Error submitting review. Please try again.");
    }
  }

  return (
    <section className={styles.feedbackSection}>
      <div className={styles.feedbackHeaderBox}>
        <h2 className={styles.feedbackHeading}>Customer Feedback</h2>
        <div className={styles.feedbackHeaderLineBox}>
          <div></div>
        </div>
      </div>
      <div className={styles.feedbackWrapper}>
        <form className={styles.feedbackForm} onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <span id="email-error" className={styles.error}>{errors.email}</span>}

          <label htmlFor="productId">Select Product</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            aria-invalid={!!errors.productId}
            aria-describedby={errors.productId ? "product-error" : undefined}
          >
            <option value=""> -- Choose a product -- </option>
            {products.map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.productId && <span id="product-error" className={styles.error}>{errors.productId}</span>}

          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            aria-invalid={!!errors.comment}
            aria-describedby={errors.comment ? "comment-error" : undefined}
          />
          {errors.comment && <span id="comment-error" className={styles.error}>{errors.comment}</span>}

          <label htmlFor="starRating">Rating</label>
          <select
            id="starRating"
            name="starRating"
            value={formData.starRating}
            onChange={handleChange}
            required
            aria-invalid={!!errors.starRating}
            aria-describedby={errors.starRating ? "rating-error" : undefined}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.starRating && <span id="rating-error" className={styles.error}>{errors.starRating}</span>}

          <button type="submit">Submit Review</button>
        </form>

        {status && (
          <p className={styles.statusMessage} aria-live="polite">
            {status}
          </p>
        )}

        <div className={styles.feedbackImage}>
          <img src="/images/vase-feedback-form.webp" alt="A white ceramic vase holding three bright yellow sunflowers sits on a light wooden surface against a turquoise wooden plank background" />
        </div>
      </div>
    </section>
  );
}


