// showData.js (CommonJS style)
console.log("DATABASE_URL:", process.env.DATABASE_URL);
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

console.log("DATABASE_URL:", process.env.DATABASE_URL); // debug check

const sql = neon(process.env.DATABASE_URL);

async function showData() {
  console.log("Profiles:", await sql`SELECT * FROM profiles`);
  console.log("Products:", await sql`SELECT * FROM products`);
  console.log("Reviews:", await sql`SELECT * FROM reviews`);
}

showData();



