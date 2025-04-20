"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Max from "../components/Max";
import { FiCheckCircle } from "react-icons/fi";

const OrderConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const router = useRouter();
  
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/check-cookie/", {
          withCredentials: true,
        });
        
        setId(response.data.id);
        
        if(response.data.role === 'Customer') {
          setUserLoggedIn(true);
          try {
            const cartResponse = await axios.get(`http://localhost:8000/cart/${response.data.id}`);
            setCart(cartResponse.data.cart);
          } catch(err) {
            console.error("Error fetching cart items:", err);
          }
          
          if (orderId) {
            try {
              const orderResponse = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
              setOrderDetails(orderResponse.data);
            } catch (err) {
              console.error("Error fetching order details:", err);
            }
          }
        } else {
          router.push('/login');
        }
        
      } catch (error) {
        console.error("Error fetching cookies:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, [orderId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div>
        <Navigation id={id} userLoggedIn={userLoggedIn} cart={cart} />
        <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
          <div className="w-[95%] py-[20px] flex justify-center">
            <p>Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation id={id} userLoggedIn={userLoggedIn} cart={cart} />
      <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
        <div className="w-[95%] max-w-3xl py-[20px]">
          {orderDetails ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col items-center mb-6">
                <FiCheckCircle className="text-green-500 text-5xl mb-4" />
                <h1 className="text-2xl font-bold">Order Confirmed!</h1>
                <p className="text-gray-600">Thank you for your purchase</p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="font-medium">Order Number: <span className="font-normal">{orderDetails._id}</span></p>
                <p className="font-medium">Order Date: <span className="font-normal">{formatDate(orderDetails.createdAt)}</span></p>
                <p className="font-medium">Payment Status: <span className="font-normal text-green-600">Paid</span></p>
              </div>
              
              <div className="my-4">
                <h2 className="text-lg font-semibold mb-2">Order Items</h2>
                <div className="space-y-3">
                  {orderDetails.products.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p>{item.productName || `Product #${item.productId}`}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p>Rs. {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>Rs. {orderDetails.totalAmount - 500}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery</p>
                    <p>Rs. 500</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-2">
                    <p>Total</p>
                    <p>Rs. {orderDetails.totalAmount}</p>
                  </div>
                </div>
              </div>
              
              <div className="my-4">
                <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
                <div className="bg-gray-50 p-3 rounded">
                  <p>{orderDetails.shippingDetails.fullName}</p>
                  <p>{orderDetails.shippingDetails.address}</p>
                  <p>{orderDetails.shippingDetails.city}, {orderDetails.shippingDetails.postalCode}</p>
                  <p>{orderDetails.shippingDetails.country}</p>
                  <p>Phone: {orderDetails.shippingDetails.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => router.push('/')}
                  className="bg-[#FDAA1C] text-white px-6 py-2 rounded-md font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
              <p className="text-gray-600 mb-6">We couldn't find the order details you're looking for.</p>
              <button 
                onClick={() => router.push('/')}
                className="bg-[#FDAA1C] text-white px-6 py-2 rounded-md font-medium"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
      <Max/>
      <Footer/>
    </div>
  );
};

export default OrderConfirmationPage;