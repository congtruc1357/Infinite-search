import { Product } from "../types/Product";
import { deserializeProducts } from "../utils/deserializedProducts";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (
  limit: number,
  skip: number
): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return deserializeProducts(data.products);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`);
  const data = await res.json();
  return deserializeProducts(data.products);
};
