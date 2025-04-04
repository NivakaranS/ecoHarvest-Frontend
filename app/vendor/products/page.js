"use client";

import { useEffect, useState } from "react";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/EditProductModal";

export default function Products() {

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const handleProductUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.subtitle && product.subtitle.toLowerCase().includes(query))
  );
});

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Navbar />
        
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">
            All Categories <FiChevronDown className="ml-2" />
          </button>

          <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">
            All Status <FiChevronDown className="ml-2" />
          </button>

          <button className="p-2 bg-gray-200 rounded-md">
            <FiFilter />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  imageSrc: product.imageUrl,
                  price: `$${product.unitPrice.toFixed(2)}`,
                  oldPrice: `$${product.MRP.toFixed(2)}`,
                  status: product.quantity > 0 ? "In Stock" : "No Stock",
                }}
                onDelete={(id) => {
                  setProducts((prev) => prev.filter((p) => p._id !== id));
                }}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setEditModalOpen(true);
                }}
              />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found.</p>
          )}
        </div>
        <EditProductModal
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              product={selectedProduct}
              onSave={handleProductUpdate}
        />
      </div>
    </div>
  );
}
