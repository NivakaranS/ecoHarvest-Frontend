"use client";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function generateSalesReport(data) {
  const doc = new jsPDF("l", "pt", "a4");

  autoTable(doc, {
    head: [["Order #", "Order Date", "Status", "Total Amount"]],
    body: data.map((order) => [
      order.orderNumber,
      new Date(order.orderTime).toLocaleString(),
      order.status,
      order.totalAmount,
    ]),
    startY: 30,
    theme: "grid",
  });

  doc.save("Sales_Report.pdf");
}

export function generateProductReport(data) {
  const doc = new jsPDF("l", "pt", "a4");

  autoTable(doc, {
    head: [["Name", "Category", "Stock", "Unit Price", "MRP", "Status"]],
    body: data.map((product) => [
      product.name,
      product.category,
      product.quantity,
      product.unitPrice,
      product.MRP,
      product.status,
    ]),
    startY: 50,
    theme: "grid",
  });

  doc.save("Product_Report.pdf");
}

export default function Analytics() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");
  const [userInformation, setUserInformation] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/check-cookie/", {
          withCredentials: true,
        });

        setId(response.data.id);
        setRole(response.data.role);

        try {
          const response2 = await axios.get(
            `http://localhost:8000/vendors/${response.data.id}`
          );
          setUserInformation(response2.data);
        } catch (err) {
          console.error("Error fetching user information:", err);
          setError("Failed to fetch user information");
        }

        try {
          const response3 = await axios.get(
            `http://localhost:8000/notification/${response.data.id}`
          );
          setNotifications(response3.data || []); // Ensure notifications is an array
        } catch (err) {
          console.error("Error fetching notifications:", err);
          setError("Failed to fetch notifications");
          setNotifications([]); // Fallback to empty array
        }

        if (response.data.role === "Vendor") {
          setIsLoggedIn(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching cookies:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, [router]);

  const handleSalesReport = async () => {
    try {
      const response = await fetch("/vendor/api/orders", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      const data = await response.json();
      generateSalesReport(data);
    } catch (err) {
      console.error("Error generating sales report:", err);
      setError("Failed to generate sales report");
    }
  };

  const handleProductReport = async () => {
    try {
      const response = await fetch("/vendor/api/products", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      generateProductReport(data);
    } catch (err) {
      console.error("Error generating product report:", err);
      setError("Failed to generate product report");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Router handles redirection
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar notifications={notifications || []} id={id} />
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <h1 className="text-2xl font-bold mb-1">Analytics Dashboard</h1>
          <p className="text-gray-600 mb-6">Generate and view your business reports</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Sales Report</h2>
              <p className="text-sm text-gray-600 mb-4">Generate comprehensive sales analysis</p>
              <ul className="text-sm text-gray-700 list-disc list-inside mb-6 space-y-1">
                <li>Revenue trends</li>
                <li>Top-selling items</li>
                <li>Customer insights</li>
                <li>Payment analytics</li>
              </ul>
              <button
                onClick={handleSalesReport}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded inline-flex items-center"
              >
                Generate Report <FiArrowRight className="ml-2" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Products Report</h2>
              <p className="text-sm text-gray-600 mb-4">Track your inventory movements</p>
              <ul className="text-sm text-gray-700 list-disc list-inside mb-6 space-y-1">
                <li>Stock levels</li>
                <li>Waste reduction metrics</li>
                <li>Category analysis</li>
                <li>Expiry tracking</li>
              </ul>
              <button
                onClick={handleProductReport}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded inline-flex items-center"
              >
                Generate Report <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex flex-col">
              <span className="text-sm text-gray-500">Total Sales</span>
              <div className="text-xl font-bold text-black">$24,590</div>
              <span className="text-green-500 text-sm">+12.5%</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col">
              <span className="text-sm text-gray-500">Waste Reduction</span>
              <div className="text-xl font-bold text-black">85%</div>
              <span className="text-green-500 text-sm">+5.2%</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col">
              <span className="text-sm text-gray-500">Active Inventory</span>
              <div className="text-xl font-bold text-black">1,234</div>
              <span className="text-red-500 text-sm">-2.1%</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col">
              <span className="text-sm text-gray-500">Revenue Saved</span>
              <div className="text-xl font-bold text-black">$3,450</div>
              <span className="text-green-500 text-sm">+8.3%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2 px-4">Date/Time</th>
                    <th className="py-2 px-4">Activity Type</th>
                    <th className="py-2 px-4">Details</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      time: "2024-01-20 14:30",
                      type: "Sales Report",
                      detail: "Monthly sales analysis generated",
                      status: "Completed",
                    },
                    {
                      time: "2024-01-20 13:15",
                      type: "Inventory Update",
                      detail: "Stock levels updated for 15 items",
                      status: "Processed",
                    },
                    {
                      time: "2024-01-20 11:45",
                      type: "Waste Report",
                      detail: "Weekly waste reduction metrics",
                      status: "Completed",
                    },
                    {
                      time: "2024-01-20 10:30",
                      type: "Revenue Analysis",
                      detail: "Daily revenue calculation",
                      status: "Processed",
                    },
                  ].map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">{item.time}</td>
                      <td className="py-2 px-4">{item.type}</td>
                      <td className="py-2 px-4">{item.detail}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
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