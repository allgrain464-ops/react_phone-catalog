import { Product, ProductCategory } from '../types/Product';

const BASE_URL = '/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getProductsByCategory = async (
  category: ProductCategory,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};
