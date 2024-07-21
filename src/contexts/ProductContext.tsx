"use client"
import { createContext, useEffect, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

interface ProductContextType {
  products: Product[];
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;