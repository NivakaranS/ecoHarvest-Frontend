import Image from "next/image";
import { useState } from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8000/products/${product._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product deleted successfully!");
        onDelete(product._id);
      } else {
        alert(data.message || "Error deleting product.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product.");
    }
  };

  const handleAddToInventory = async () => {
  setLoading(true);

  // Map possible category inputs to inventory categories
  const categoryMap = {
    resale: "Resale",
    resell: "Resale",
    recycle: "Recycle",
    recycling: "Recycle",
    fertilizer: "Fertilizer",
    compost: "Fertilizer"
  };

  // Normalize and map the product's category
  const categoryInput = (product.category || "").toLowerCase();
  let inventoryCategory = categoryMap[categoryInput] || "Resale";

  try {
    // Try to add product to inventory
    const res = await fetch("http://localhost:8000/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: product.name,
        category: inventoryCategory,
        quantity: product.quantity,
        vendorName: product.vendorName || "Vendor",
        status: product.quantity > 0 ? "Active" : "Out of Stock",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product added to inventory!");
    } else if (data.message && data.message.includes("already exists")) {
      // If already exists, update quantity
      const invRes = await fetch("http://localhost:8000/inventory");
      const invData = await invRes.json();
      const invProduct = invData.inventories.find(
        (p) => p.productName === product.name && p.category === inventoryCategory
      );
      if (invProduct) {
        const updateRes = await fetch(`http://localhost:8000/inventory/${invProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: invProduct.quantity + product.quantity,
          }),
        });
        if (updateRes.ok) {
          alert("Inventory updated with new quantity!");
        } else {
          alert("Failed to update inventory quantity.");
        }
      } else {
        alert("Product exists but could not find in inventory for update.");
      }
    } else {
      alert(data.message || "Failed to add to inventory.");
    }
  } catch (err) {
    alert("Error adding to inventory.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-32 rounded overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <span className="text-sm text-gray-500">{product.category}</span>

      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold">{product.price}</span>
        <span className="text-sm line-through text-gray-400">{product.oldPrice}</span>
      </div>

      <p className="text-gray-600 text-sm">Quantity: {product.quantity} units</p>

      <span
        className={`text-sm px-2 py-1 rounded mt-2 inline-block ${
          product.status === "In Stock"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {product.status}
      </span>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 border border-blue-500 px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 border border-red-500 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
      <button
        onClick={handleAddToInventory}
        className="mt-2 w-full bg-green-600 text-white py-1 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Inventory"}
      </button>
    </div>
  );
};

export default ProductCard;
