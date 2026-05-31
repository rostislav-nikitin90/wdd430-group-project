
interface Profile {
  profile_id: number;
  name: string;
  contact?: string;
}

interface Product {
  product_id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  profile_id: number;
}

interface Review {
  review_id: number;
  name: string;
  email?: string;
  comment: string;
  star_rating: number;
  product_id: number;
}

interface Artisan {
  id: string;
  name: string;
  businessName: string;
  story: string;
  impact: string;
  bgImage: string;
}