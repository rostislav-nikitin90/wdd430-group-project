const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL not found in .env.local');
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
    try {
        console.log('1. Adding category column...');
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(50)`;

        console.log('2. Updating existing products...');
        await sql`UPDATE products SET category = 'Home Decor', image = '/products/traditional-ruana.jpg' WHERE name = 'Traditional Ruana'`;
        await sql`UPDATE products SET category = 'Home Decor', image = '/products/black-clay-vase.jpg' WHERE name = 'Black Clay Vase'`;

        // 중복 방지: 이미 상품이 2개 초과면 INSERT 건너뜀
        const countResult = await sql`SELECT COUNT(*) AS count FROM products`;
        if (Number(countResult[0].count) > 2) {
            console.log('More than 2 products already exist. Skipping insert to avoid duplicates.');
        } else {
            console.log('3. Getting profile ids...');
            const profiles = await sql`SELECT profile_id FROM profiles ORDER BY profile_id`;
            const p1 = profiles[0].profile_id;
            const p2 = profiles[1] ? profiles[1].profile_id : p1;

            console.log('4. Inserting new products...');
            const newProducts = [
                ['Beaded Bracelet', '/products/beaded-bracelet.jpg', 'Handcrafted bracelet with natural wooden and stone beads.', 30.0, 'Jewelry', p1],
                ['Woven Basket', '/products/woven-basket.jpg', 'Sustainably woven from natural seagrass fibers.', 40.0, 'Home Decor', p2],
                ['Silver Pendant Necklace', '/products/silver-pendant.jpg', 'Sterling silver pendant with a hand-engraved leaf motif.', 65.0, 'Jewelry', p1],
                ['Leather Card Holder', '/products/leather-card-holder.jpg', 'Minimalist hand-stitched wallet in full-grain leather.', 22.0, 'Accessories', p2],
                ['Wool Felt Hat', '/products/wool-felt-hat.jpg', 'Wide-brim hat made from 100 percent natural wool.', 78.0, 'Accessories', p1],
                ['Hammered Brass Earrings', '/products/brass-earrings.jpg', 'Lightweight earrings with a textured hammered finish.', 18.0, 'Jewelry', p2],
            ];

            for (const [name, image, description, price, category, profile_id] of newProducts) {
                await sql`INSERT INTO products (name, image, description, price, category, profile_id)
                  VALUES (${name}, ${image}, ${description}, ${price}, ${category}, ${profile_id})`;
            }
        }

        console.log('5. Verifying...');
        const all = await sql`SELECT product_id, name, category, price FROM products ORDER BY product_id`;
        console.table(all);
        console.log(`Total products: ${all.length}`);
        console.log('Migration complete!');
    } catch (error) {
        console.error('Migration error:', error);
    }
}

migrate();