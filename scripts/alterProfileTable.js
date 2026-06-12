require('dotenv').config({ path: '.env.local' });

// This file to add columns for authentication on profile tables
// Db already modified, this file here by any change we need to alter the db again or check how it was changed
// pnpm run alter

const { neon } = require('@neondatabase/serverless');

async function runMigration() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("Starting changes on profiles table...");
    
    await sql`
      ALTER TABLE profiles
      ADD COLUMN email VARCHAR(255) UNIQUE,
      ADD COLUMN password_hash VARCHAR(255),
      ADD COLUMN bio TEXT,
      ADD COLUMN profile_image VARCHAR(255),
      ADD COLUMN location VARCHAR(255),
      ADD COLUMN created_at TIMESTAMP DEFAULT NOW(),
      ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
    `;
    
    console.log("Done. Authentication fields added");
  } catch (error) {
    console.error("There was an error:", error);
  }
}

runMigration();