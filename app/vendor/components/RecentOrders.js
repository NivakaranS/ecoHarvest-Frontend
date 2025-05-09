"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/check-cookie/", {
          withCredentials: true,
        });

        const { id, role } = res.data;

        if (role !== "Vendor") return;

        const ordersRes = await axios.get(`http://localhost:8000/orders/vendor/${id}`);
        setOrders(ordersRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load vendor orders", err);
        setLoading(false);
      }
    };

    fetchVendorOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-3">Recent Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
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
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">{order.orderNumber}</td>
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
