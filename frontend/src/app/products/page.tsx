"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AddProductForm from "../components/AddProductForm";

export default function ProductsPage() {
  type Product = {
    id: number;
    title: string;
    category: string;
    price: number;

    rating?: {
      rate: number;
      count: number;
    };
    image: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
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
                    <th className="px-3 py-2 border text-sm">Title</th>
                    <th className="px-3 py-2 border text-sm">Category</th>
                    <th className="px-3 py-2 border text-sm">Price</th>
                    <th className="px-3 py-2 border text-sm">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 bg-white">
                      <td className="px-3 py-2 border text-center text-sm">{product.id}</td>
                      <td className="px-3 py-2 border">
                        <div className="flex justify-center">
                          <Image src={product.image} alt={product.title} width={40} height={40} className="object-contain" />
                        </div>
                      </td>
                      <td className="px-3 py-2 border text-sm">{product.title}</td>
                      <td className="px-3 py-2 border capitalize text-sm">{product.category || "-"}</td>
                      <td className="px-3 py-2 border text-right text-sm">${product.price.toFixed(2)}</td>
                      <td className="px-3 py-2 border text-center text-sm">⭐ {product.rating?.rate.toFixed(1) ?? "N/A"}</td>
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
