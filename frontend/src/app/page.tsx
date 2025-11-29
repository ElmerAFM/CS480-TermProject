import ProductTable from "./components/ProductTable";
import ProductCards from "./components/ProductCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Product Management</h1>

      <div className="max-w-7xl mx-auto">
        <ProductTable />
        <ProductCards />
      </div>
    </div>
  );
}
