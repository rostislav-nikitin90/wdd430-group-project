"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { Product } from "@/types";

// Debug check
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL!);

// Fetch all reviews
export async function getReviews() {
  return await sql`
    SELECT review_id, name, comment, star_rating, product_id
    FROM reviews
    ORDER BY review_id DESC;
  `;
}

getReviews().then(res => console.log("Reviews:", res));

// Fetch all products with average rating
export async function getProducts(): Promise<Product[]> {
  return (await sql`
    SELECT p.product_id, p.name, p.image, p.description, p.price, p.category,
           COALESCE(AVG(r.star_rating), 0) AS avg_rating,
           COUNT(r.review_id) AS total_reviews
    FROM products p
    LEFT JOIN reviews r ON p.product_id = r.product_id
    GROUP BY p.product_id, p.name, p.image, p.description, p.price, p.category
    ORDER BY p.product_id;
  `) as Product[];
}


// Debug: log products when server starts
getProducts().then(res => console.log("Products:", res));

// Fetch 4 products for Home page
export async function getHomeProducts(): Promise<Product[]> {
  return (await sql`
    SELECT p.product_id, p.name, p.image, p.description, p.price,
           COALESCE(AVG(r.star_rating), 0) AS avg_rating,
           COUNT(r.review_id) AS total_reviews
    FROM products p
    LEFT JOIN reviews r ON p.product_id = r.product_id
    GROUP BY p.product_id
    ORDER BY p.product_id
    LIMIT 4;
  `) as Product[];
}

// Insert a new review (Server Action will call this)
export async function submitReview(formData: {
  name: string;
  email: string;
  comment: string;
  starRating: number;
  productId: number;
}) {
  await sql`
    INSERT INTO reviews (name, email, comment, star_rating, product_id)
    VALUES (${formData.name}, ${formData.email}, ${formData.comment},
            ${formData.starRating}, ${formData.productId});
  `;
  // Revalidate both catalog and home page
  revalidatePath("/catalog"); // forces the catalog page to refresh its data
  revalidatePath("/"); // forces the home page to refresh its data
}
