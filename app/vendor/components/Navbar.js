"use client";

import { useState } from "react";
import { FiBell, FiPlus, FiLogOut } from "react-icons/fi";
import ProductModal from "./ProductModal";
import axios from "axios";

const Navbar = ({id, notifications}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const handleAddProduct = async (productData, resetForm) => {
    const vendorId = id;

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

  const handleDeleteNotification = async (notificationId) => {
    try {
        const response = await axios.delete(`http://localhost:8000/notification/:${notificationId}`)
        console.log(response.data)
        window.location.reload()
    } catch(err) {
        console.error("Error in deleting notification: ", err)
    }
}

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
          <div className="relative group">
  <button className="p-3 bg-gray-200 rounded-full relative">
    <FiBell />
    {notifications.length > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
        {notifications.length}
      </span>
    )}
  </button>

  <div className="absolute hidden group-hover:block px-[15px] ring-[0.5px] overflow-y-scroll ring-gray-500 w-[20vw] h-[50vh] text-black top-[40px] right-0 bg-white shadow-lg rounded-md p-2 z-10">
    <p className="text-[20px]">Notifications</p>
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="p-2 border-b">
            <div className="flex flex-row justify-between ">
              <p>{notification.message}</p>
              <div
                onClick={() => handleDeleteNotification(notification._id)}
                className="flex cursor-pointer items-center justify-center w-[20px] h-[20px] text-[13px] ring-gray-800 ring-[0.5px] text-black rounded-full"
              >
                <p>X</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              {new Date(notification.date).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  </div>
</div>

          <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              onClick={handleLogout}
              title="Logout">
              <FiLogOut />
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
