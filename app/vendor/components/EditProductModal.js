"use client";

import { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      MRP: Number(formData.MRP),
    };

    try {
      const res = await fetch(`http://localhost:8000/products/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (res.ok) {
        onSave(data);
        onClose();
      } else {
        alert(data.message || "Failed to update product.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating product.");
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Name" />
          <input name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Subtitle" />
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Quantity" />
          <input name="unitPrice" type="number" value={formData.unitPrice} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Unit Price" />
          <input name="MRP" type="number" value={formData.MRP} onChange={handleChange} className="w-full p-2 border rounded" placeholder="MRP" />
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Image URL" />

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
