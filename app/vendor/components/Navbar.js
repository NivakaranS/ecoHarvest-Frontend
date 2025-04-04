"use client";

import { useState } from "react";
import { FiBell, FiPlus } from "react-icons/fi";
import ProductModal from "./ProductModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddProduct = async (productData, resetForm) => {
    const vendorId = "67ebdddc067a1c7f6e6eff86";

    const fullProductData = {
      ...productData,
      vendorId,
      quantity: Number(productData.quantity),
      unitPrice: Number(productData.unitPrice),
      MRP: Number(productData.MRP),
    };

    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullProductData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      const newProduct = await response.json();
      console.log("Product created successfully:", newProduct);

      setToastMessage("✅ Product added successfully!");
      resetForm();
    } catch (err) {
      console.error("Error creating product:", err);
      setToastMessage(`❌ ${err.message}`);
    }

    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="relative">
      <div className="flex justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold">Welcome back, Green Foods Inc</h1>
        <div className="flex space-x-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className="mr-2" /> Add New Product
          </button>
          <button className="p-2 bg-gray-200 rounded-full">
            <FiBell />
          </button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
        toastMessage={toastMessage}
      />
    </div>
  );
};

export default Navbar;
