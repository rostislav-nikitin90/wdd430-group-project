// const { neon } = require('@neondatabase/serverless');

// require('dotenv').config({ path: '.env.local' });

// if (!process.env.DATABASE_URL) {

//   console.error('Error: DATABASE_URL is not defined in .env.local');
//   process.exit(1);

// }

// const sql = neon(process.env.DATABASE_URL);

// async function seedDatabase() {

//   try {

//     console.log('Starting test data insertion...');

//     const profiles = await sql`
//       INSERT INTO profiles (name, contact)
//       VALUES 
//         ('María Carmen', 'maria@southernlooms.com'),
//         ('José Mateo', 'jose@livingclay.com')
//       RETURNING profile_id, name;
//     `;
    
//     console.log(`${profiles.length} profiles inserted.`);

//     const mariaId = profiles[0].profile_id;

//     const joseId = profiles[1].profile_id;

//     const products = await sql`

//       INSERT INTO products (name, image, description, price, profile_id)
//       VALUES 
//         ('Traditional Ruana', '/images/ruana.webp', 'Handwoven traditional wool ruana.', 85.00, ${mariaId}),
//         ('Black Clay Vase', '/images/vase.webp', 'Masterfully crafted black clay vase.', 45.00, ${joseId})
//       RETURNING product_id, name;
//     `;

//     console.log(`${products.length} products inserted.`);

//     const ruanaId = products[0].product_id;

//     const reviews = await sql`
//       INSERT INTO reviews (name, email, comment, star_rating, product_id)
//       VALUES 
//         ('Maria Grothendiek', 'alice@email.com', 'Beautiful! Exceeded expectations.', 5, ${ruanaId}),
//         ('John Mayer', 'john@email.com', 'Very authentic piece, I loved it.', 4, ${ruanaId});
//     `;
//     console.log('Sample reviews inserted successfully.');
//     console.log('Database seeded successfully!');

//   } catch (error) {

//     console.error('Error during seeding:', error);

//   }
// }

// seedDatabase();