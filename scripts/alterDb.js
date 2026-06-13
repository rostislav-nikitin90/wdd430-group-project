require('dotenv').config({ path: '.env.local' });

const { neon } = require('@neondatabase/serverless');

// To modify the db with this file, is needed to run each sql consult individually in order 1,2, 3
// pnpm alterDb

// async function modifyDb() {
//   const sql = neon(process.env.DATABASE_URL);

//   try {
//     console.log("Modifying the db...");
//     // Adding the columns

//     // 1. 
//     // await sql`
//     //   ALTER TABLE profiles
//     //   ADD COLUMN password_hash VARCHAR(255),
//     //   ADD COLUMN created_at TIMESTAMP DEFAULT NOW(),
//     //   ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
//     // `;

//     // 2. Filling out empty fields (null), password

//     //  await sql`
//     //     UPDATE profiles 
//     //     SET 
//     //         password_hash = 'password_sample' 
//     //     WHERE password_hash IS NULL;
//     // `;

//     // 3. Changing the password field to be not null

//     //  await sql`
//     //     ALTER TABLE profiles
//     //     ALTER COLUMN password_hash SET NOT NULL;
//     // `;

//     console.log("Done! ok.");
//   } catch (error) {
//     console.error("Error while altering the db", error);
//   }
// }

// modifyDb();

// TO DELETE EVERYTHING FROM THE DB, USE WITH PRECAUTION, IF NEEDED MUST BE USED INDIVIDUALLY
// uncomment just the code needed to run the function clearDatabase, and then on console pnpm alterDb


// async function clearDatabase() {
//   const sql = neon(process.env.DATABASE_URL);

//   try {
//     console.log("Emptying the database...");

//     await sql`TRUNCATE TABLE reviews, products, profiles RESTART IDENTITY CASCADE;`;

//     console.log("Database cleared successfully!");

//   } catch (error) {

//     console.error("Error while clearing the database:", error);

//   }
// }

// clearDatabase();