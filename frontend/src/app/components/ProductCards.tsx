"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/config/api";

export default function ProductCards() {
  type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
    image?: string;
    imageUrl?: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="p-8 text-gray-600">Loading products...</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white">
          <div className="relative w-full h-56 flex-shrink-0">{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="contain" className="p-4" /> : null}</div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-lg mb-2 truncate" title={product.name}>
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>

            <div className="flex-grow"></div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-semibold text-xl">${Number(product.price).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
