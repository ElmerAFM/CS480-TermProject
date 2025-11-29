"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/config/api";

export default function ProductTable() {
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
    <div className="container px-4 mx-auto">
      <div className="overflow-x-auto border border-gray-200 rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500">
                Image
              </th>
              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500">
                Name
              </th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                Category
              </th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                Price
              </th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex justify-center">{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-contain" unoptimized /> : <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-xs text-gray-500">No img</div>}</div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">{product.name}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap capitalize">{product.category || "-"}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap text-right">${Number(product.price).toFixed(2)}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">{product.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
