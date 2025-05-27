// Shared price type
export interface Price {
  size: string;
  price: string;
  currency: string;
}

// Coffee/Bean item
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any; // imported via require, so 'any' is safe
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: 'Coffee' | 'Bean';
  index: number;
}

// Categories array
export type CategoryList = string[];

// Category state
export interface CategoryState {
  index: number;
  category: string;
}
