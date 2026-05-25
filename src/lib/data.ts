import type { Product, ProductCategory } from '@/types';

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
    'Jewelry',
    'Home Decor',
    'Accessories',
] as const;

export const PRODUCTS: Product[] = [
    {
        id: 'p001',
        name: 'Ceramic Vase',
        description: 'Hand-thrown stoneware vase with a natural matte finish.',
        price: 45,
        category: 'Home Decor',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Ceramic+Vase',
    },
    {
        id: 'p002',
        name: 'Beaded Bracelet',
        description: 'Handcrafted bracelet with natural wooden and stone beads.',
        price: 30,
        category: 'Jewelry',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Beaded+Bracelet',
    },
    {
        id: 'p003',
        name: 'Wooden Serving Board',
        description: 'Solid walnut board, perfect for cheese, fruit, or charcuterie.',
        price: 55,
        category: 'Home Decor',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Serving+Board',
    },
    {
        id: 'p004',
        name: 'Woven Basket',
        description: 'Sustainably woven from natural seagrass fibers.',
        price: 40,
        category: 'Home Decor',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Woven+Basket',
    },
    {
        id: 'p005',
        name: 'Silver Pendant Necklace',
        description: 'Sterling silver pendant with a hand-engraved leaf motif.',
        price: 65,
        category: 'Jewelry',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Silver+Pendant',
    },
    {
        id: 'p006',
        name: 'Leather Card Holder',
        description: 'Minimalist hand-stitched wallet in full-grain leather.',
        price: 22,
        category: 'Accessories',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Card+Holder',
    },
    {
        id: 'p007',
        name: 'Wool Felt Hat',
        description: 'Wide-brim hat made from 100 percent natural wool.',
        price: 78,
        category: 'Accessories',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Felt+Hat',
    },
    {
        id: 'p008',
        name: 'Hammered Brass Earrings',
        description: 'Lightweight earrings with a textured hammered finish.',
        price: 18,
        category: 'Jewelry',
        image: 'https://placehold.co/600x600/F4F1DE/3D2C2E?text=Brass+Earrings',
    },
];