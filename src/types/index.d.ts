export type ProductCategory = 'Jewelry' | 'Home Decor' | 'Accessories';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    image: string;
}