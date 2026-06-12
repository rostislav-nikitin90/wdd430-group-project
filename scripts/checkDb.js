require('dotenv').config({ path: '.env.local' });

// This file just check all data from profiles and products to see if changes on these tables are ok
// After we alter the tables, we can run this file to see db tables on console
//  pnpm run check

const { neon } = require('@neondatabase/serverless');

async function checkData() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("\nChecking table 'profiles'...");
    const profiles = await sql`SELECT * FROM profiles`;

    console.table(profiles); 


    console.log("\nChecking table 'products'");
    const products = await sql`SELECT * FROM products`;
    console.table(products);
    
  } catch (error) {
    console.error("Error while checking the db:", error);
  }
}

checkData();