"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AddProductForm from "../components/AddProductForm";
import { API_URL } from "@/config/api";

export default function ProductsPage() {
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
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Product Management</h1>

      {/* Two-column layout: Form on left, Table on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Add Product Form */}
        <div>
          <AddProductForm onProductAdded={fetchProducts} />
        </div>

        {/* Right Column - Product Table */}
        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Product List</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border text-sm">ID</th>
                    <th className="px-3 py-2 border text-sm">Image</th>
                    <th className="px-3 py-2 border text-sm">Name</th>
                    <th className="px-3 py-2 border text-sm">Category</th>
                    <th className="px-3 py-2 border text-sm">Price</th>
                    <th className="px-3 py-2 border text-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 bg-white">
                      <td className="px-3 py-2 border text-center text-sm">{product.id}</td>
                      <td className="px-3 py-2 border">
                        <div className="flex justify-center">{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-contain" unoptimized /> : <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-xs text-gray-500">No img</div>}</div>
                      </td>
                      <td className="px-3 py-2 border text-sm">{product.name}</td>
                      <td className="px-3 py-2 border capitalize text-sm">{product.category || "-"}</td>
                      <td className="px-3 py-2 border text-right text-sm">${Number(product.price).toFixed(2)}</td>
                      <td className="px-3 py-2 border text-sm">{product.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
