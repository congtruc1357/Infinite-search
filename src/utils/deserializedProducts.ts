import { Product } from "../types/Product";

// The API returns raw data
interface RawProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

// Function deserialize data
export const deserializeProducts = (rawProducts: RawProduct[]): Product[] => {
  return rawProducts.map((rawProduct) => ({
    id: rawProduct.id,
    name: rawProduct.title,
    price: rawProduct.price,
    imageURL: rawProduct.thumbnail,
  }));
};
