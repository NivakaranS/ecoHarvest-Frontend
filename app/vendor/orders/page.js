"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState(null);
    const [role, setRole] = useState("");      
        const [userInformation, setUserInformation] = useState([]);
        const [notifications, setNotifications] = useState([]);
      
        
      
      
        
        useEffect(() => {
      
          const fetchCookies = async () => {
            try {
              const response = await axios.get(
                "http://localhost:8000/check-cookie/",
                {
                  withCredentials: true,
                }
              );
      
              try {
                console.log('id', response.data.id)
                const response2 = await axios.get('http://localhost:8000/vendors/:' + response.data.id)
                console.log('vendor', response2.data);
                setUserInformation(response2.data);
      
                try {
                  const response3 = await axios.get('http://localhost:8000/notification/:' + response.data.id)
                  console.log('notifications', response3.data);
                  setNotifications(response3.data);
                } catch(err) {
                  console.error("Error in fetching notifications: ", err)
                }
              } catch(err) {
                console.error("Error in fetching user information: ", err)
              }
              
      
              setId(response.data.id);
              setRole(response.data.role);
      
              if (response.data.role === "Vendor") setIsLoggedIn(true);
              else router.push("/");
            } catch (error) {
      
              console.error("Error fetching cookies:", error);
              router.push("/login");
      
            }
          };
      
          fetchCookies();
      
        }, [])

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
        console.error("Failed to load vendor orders:", err);
        setLoading(false);
      }
    };

    fetchVendorOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      <Navbar notifications={notifications} id={id} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-gray-600">Manage and track all your orders</p>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full p-2 border rounded-md"
            />
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">
              Date Range
            </button>
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">
              All Status
            </button>
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">
              All Categories
            </button>
            <button className="p-2 bg-gray-200 rounded-md">
              <FiFilter />
            </button>
          </div>

          <div className="mt-4 bg-white shadow rounded-lg p-4">
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4">Order Number</th>
                      <th className="py-2 px-4">Customer</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Amount</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="py-2 px-4">{order.orderNumber}</td>
                        <td className="py-2 px-4">{order.customer || "N/A"}</td>
                        <td className="py-2 px-4">
                          {new Date(order.orderTime).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-600"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-2 px-4">
                          <button className="text-gray-600">
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {orders.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No orders found
                  </p>
                )}
              </>
            )}
          </div>

          {!loading && (
            <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
              <p>
                Showing 1 to {orders.length} of {orders.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded-md">Previous</button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md">
                  1
                </button>
                <button className="px-3 py-1 border rounded-md">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
