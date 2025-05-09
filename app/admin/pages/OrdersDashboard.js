"use client";
import React, { useState, useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import autoTable from "jspdf-autotable";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders/");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Summary Report", 15, 15);

    autoTable(doc, {
      head: [["Order #", "Date", "Status", "Total", "Products"]],
      body: orders.map((order) => [
        order.orderNumber,
        new Date(order.orderTime).toLocaleDateString(),
        order.status,
        `Rs. ${order.totalAmount.toFixed(2)}`,
        order.products
          .map(
            (p) =>
              `${p.quantity} x ${p.productId} @ Rs. ${p.unitPrice.toFixed(2)}`
          )
          .join("\n"),
      ]),
      startY: 25,
      styles: {
        cellPadding: 1,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        4: { cellWidth: 60 },
      },
    });

    doc.save("orders-report.pdf");
  };

  return (
    <div>
      <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
        <div className=" rounded-[10px] pb-[10px] pt-[5px] px-[15px] w-[100%] ">
          <div>
            <div>
              <p className="text-[25px]">Orders Summary</p>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between bg-[#F5F5F5] rounded-[10px] px-[10px] py-[10px] text-[15px]">
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>Order Number</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>Date</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>Products</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>Status</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>Total Amount</p>
                </div>
                <div className="flex flex-row items-center justify-center w-[20%]">
                  <p>User</p>
                </div>
              </div>

              {orders.map((order, index) => (
                <div className="flex bg-gray-200 pl-[30px] mb-[3px] flex-row items-center justify-between bg-[#F5F5F5] rounded-[10px] px-[10px] py-[10px] text-[15px]">
                  <div className="flex flex-row items-center justify-center w-[20%]">
                    <p className="text-[13px]">{order.orderNumber}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[20%]">
                    <p className="text-[13px]">
                      {new Date(order.orderTime).toLocaleDateString()}
                    </p>
                    <p className="text-[13px]">
                      {new Date(order.orderTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center w-[20%]">
                    <p className="text-[13px]">
                      {order.products.map(
                        (p) =>
                          p.productId +
                          " x " +
                          p.quantity +
                          " @ Rs." +
                          p.unitPrice.toFixed(2)
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center w-[20%]">
                    <p className="text-[13px]">{order.status}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center w-[20%]">
                    <p className="text-[13px]">Rs. {order.totalAmount}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center w-[20%]">
                    <p className="text-[13px]">{order.userId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={generatePDF}
            className="flex flex-row items-center cursor-pointer bg-[#FDAA1C] py-[5px] px-[20px] rounded-[5px] text-[15px] w-fit mt-[10px]"
          >
            <p>Download Report</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
