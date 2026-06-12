require('dotenv').config({ path: '.env.local' });

console.log("Ahora")

const { neon } = require('@neondatabase/serverless');

async function checkRequiredFields() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const columns = await sql`
      SELECT
        column_name,
        is_nullable
      FROM information_schema.columns
      WHERE table_name = 'profiles'
      AND column_name IN ('email', 'password');
    `;

    columns.forEach(column => {
      console.log(
        `${column.column_name}: ${
          column.is_nullable === 'NO'
            ? 'NOT NULL ✓'
            : 'NULL ALLOWED ✗'
        }`
      );
    });
  } catch (error) {
    console.error('Error checking columns:', error);
  }
}

checkRequiredFields();

// require('dotenv').config({ path: '.env.local' });

// // After we run alter, we might run this file so we change 

// const { neon } = require('@neondatabase/serverless');

// async function runMigration() {
//   const sql = neon(process.env.DATABASE_URL);

//   try {
//     console.log("Altering profiles tables...");
    
//     await sql`
//       ALTER TABLE profiles
//       ADD COLUMN email VARCHAR(255) UNIQUE,
//       ADD COLUMN password_hash VARCHAR(255),
//       ADD COLUMN bio TEXT,
//       ADD COLUMN profile_image VARCHAR(255),
//       ADD COLUMN location VARCHAR(255),
//       ADD COLUMN created_at TIMESTAMP DEFAULT NOW(),
//       ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
//     `;
    
//     console.log("Done!.");
//   } catch (error) {
//     console.error("Error while altering the table:", error);
//   }
// }

// runMigration();
