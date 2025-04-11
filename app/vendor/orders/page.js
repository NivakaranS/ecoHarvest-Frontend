import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const orders = [
  { id: "ECO-2024-001", customer: "Green Foods Co", date: "02/15/2024", status: "Completed", category: "Resell", amount: "$249.99" },
  { id: "ECO-2024-002", customer: "Fresh Bakery", date: "02/15/2024", status: "Pending", category: "Recycle", amount: "$149.50" },
  { id: "ECO-2024-003", customer: "Eco Restaurant", date: "02/14/2024", status: "Cancelled", category: "Repurpose", amount: "$324.75" },
  { id: "ECO-2024-004", customer: "Sustainable Foods", date: "02/14/2024", status: "Completed", category: "Resell", amount: "$189.99" },
  { id: "ECO-2024-005", customer: "Green Market", date: "02/13/2024", status: "Pending", category: "Recycle", amount: "$275.25" },
];

export default function OrdersPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-gray-600">Manage and track all orders</p>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full p-2 border rounded-md"
            />
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">Date Range</button>
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">All Status</button>
            <button className="flex items-center px-3 py-2 bg-white border rounded-md shadow min-w-[150px]">All Categories</button>
            <button className="p-2 bg-gray-200 rounded-md">
              <FiFilter />
            </button>
          </div>

          <div className="mt-4 bg-white shadow rounded-lg p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Order Number</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.customer}</td>
                    <td className="py-2 px-4">{order.date}</td>
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
                    <td className="py-2 px-4">{order.category}</td>
                    <td className="py-2 px-4">{order.amount}</td>
                    <td className="py-2 px-4">
                      <button className="text-gray-600">
                        <BsThreeDotsVertical />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
            <p>Showing 1 to 5 of 25 entries</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded-md">Previous</button>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded-md">1</button>
              <button className="px-3 py-1 border rounded-md">2</button>
              <button className="px-3 py-1 border rounded-md">3</button>
              <button className="px-3 py-1 border rounded-md">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
