// Define a type for the search parameters your function will accept
export type ProductSearchParams = {
  category?: string;
  color?: string;
  size?: string;
  price?: string;
};

// Define a type for a single product
export type Product = {
  id: string;
  name: string;
  category: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
};
