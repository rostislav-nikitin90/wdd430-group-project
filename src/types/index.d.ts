export interface Profile {
  profile_id: number;
  name: string;
  contact?: string;
}

export interface Product {
  product_id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category?: string;
  profile_id: number;
}

export interface Review {
  review_id: number;
  name: string;
  email?: string;
  comment: string;
  star_rating: number;
  product_id: number;
}

export interface Artisan {
  id: string;
  name: string;
  businessName: string;
  story: string;
  impact: string;
  bgImage: string;
}

