"use client";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

export function generateSalesReport(data) {
  const doc = new jsPDF("l", "pt", "a4");

  autoTable(doc, {
    head: [["Order #", "Order Date", "Status", "Total Amount"]],
    body: data.map(order => [
      order.orderNumber,
      new Date(order.orderTime).toLocaleString(),
      order.status,
      order.totalAmount
    ]),
    startY: 30,
    theme: "grid"
  });

  doc.save("Sales_Report.pdf");
}

export function generateProductReport(data) {
  const doc = new jsPDF("l", "pt", "a4");

  autoTable(doc, {
  head: [["Name", "Category", "Stock", "Unit Price", "MRP", "Status"]],
  body: data.map(product => [
    product.name,
    product.category,
    product.quantity,
    product.unitPrice,
    product.MRP,
    product.status
  ]),
    startY: 50,
    theme: "grid"
  });

  doc.save("Product_Report.pdf");
}

const handleSalesReport = async () => {
  const response = await fetch('http://localhost:8000/orders');
  const data = await response.json();
  generateSalesReport(data);
};

const handleProductReport = async () => {
  const response = await fetch('http://localhost:8000/products');
  const data = await response.json();
  generateProductReport(data);
};


export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
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
              <button onClick = {handleSalesReport} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded inline-flex items-center">
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
              <button onClick = {handleProductReport} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded inline-flex items-center">
                Generate Report <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}
