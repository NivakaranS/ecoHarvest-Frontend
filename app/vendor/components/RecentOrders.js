"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
  const fetchVendorId = async () => {
    try {
      const res = await fetch("http://localhost:8000/check-cookie", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || data.role !== "Vendor") {
        throw new Error("Not a vendor or unauthorized");
      }

      const userId = data.id;
      const userRes = await fetch(`http://localhost:8000/vendors/${userId}`, {
        credentials: "include",
      });
      const userData = await userRes.json();
      if (!userRes.ok || !userData[1]?.entityId) {
        throw new Error("User entityId (vendorId) not found");
      }
      console.log("vendorId",userData[1].entityId);
      setVendorId(userData[1].entityId);

    } catch (err) {
      console.error("Error fetching vendor ID:", err);
    }
  };

  fetchVendorId();
}, []);

   useEffect(() => {
    const fetchOrders = async () => {
      if (!vendorId) return;

      try {
        const ordersRes = await axios.get(`http://localhost:8000/orders/vendor/${vendorId}`, {
          withCredentials: true,
        });
        setOrders(ordersRes.data);
        console.log("orders", ordersRes.data);
      } catch (err) {
        console.error("Error fetching vendor orders:", err);
      }
    };

    fetchOrders();
  }, [vendorId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-3">Recent Orders</h3>

      {orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">{(index + 1).toString().padStart(3, '0')}</td>
                <td>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.productId?.name || "Unnamed Product"}</div>
                  ))}
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.orderTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentOrders;