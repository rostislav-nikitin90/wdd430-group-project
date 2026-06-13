require('dotenv').config({ path: '.env.local' });

const { neon } = require('@neondatabase/serverless');

async function checkData() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const printVertical = (data, tableName) => {
      console.log(`\n=== Records from profiles: ${tableName.toUpperCase()} (${data.length} records) ===`);
      data.forEach((row, index) => {
        console.log(`\n--- Record #${index + 1} ---`);
        console.dir(row, { depth: null, colors: true });
      });
    };

    console.log("Checking DB...");

    const profiles = await sql`SELECT * FROM profiles`;
    printVertical(profiles, 'profiles');

    const products = await sql`SELECT * FROM products`;
    printVertical(products, 'products');
    
  } catch (error) {
    console.error("Error while checking the db:", error);
  }
}

checkData();