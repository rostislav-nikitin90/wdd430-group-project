import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Handle POST requests (insert new review)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, comment, starRating, productId } = body;

    if (!name || !email || !comment || !starRating || !productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sql`
      INSERT INTO reviews (name, email, comment, star_rating, product_id)
      VALUES (${name}, ${email}, ${comment}, ${starRating}, ${productId})
    `;

    return NextResponse.json({ message: "Review submitted successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("Error inserting review:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// Handle GET requests (fetch all reviews)
export async function GET() {
  try {
    const reviews = await sql`SELECT * FROM reviews`;
    return NextResponse.json(reviews, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

