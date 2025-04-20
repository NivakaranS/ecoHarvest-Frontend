"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import emailjs from '@emailjs/browser';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Max from "../components/Max";
import StripeWrapper from "../Payments/stripe.wrapper";
import StripeCheckoutForm from "../Payments/stripe.client";

const EMAILJS_SERVICE_ID = "service_ou0qtd8";
const EMAILJS_TEMPLATE_ID = "template_w99a0kt";
const EMAILJS_PUBLIC_KEY = "M4Yu0OH0XvpV93rRZ";

const CheckoutPage = () => {
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const subtotal = 2000; // Hardcoded test value
  const deliveryCharge = 500;
  const total = subtotal + deliveryCharge;

  const router = useRouter();

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.length < 3 ? "Full name must be at least 3 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email address" : "";
      case "phoneNumber":
        return !/^[0-9]{10}$/.test(value) ? "Phone number must be 10 digits" : "";
      case "address":
        return value.length < 5 ? "Please enter a valid address" : "";
      case "city":
        return value.length < 2 ? "Please enter a valid city" : "";
      case "postalCode":
        return !/^[0-9]{5}$/.test(value) ? "Postal code must be 5 digits" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Validate on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(shippingDetails).forEach(field => {
      if (field !== 'country') {  // Skip country as it's read-only
        const error = validateField(field, shippingDetails[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    try {
      try {
        const emailParams = {
          email: shippingDetails.email,
        };

        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailParams,
          EMAILJS_PUBLIC_KEY
        );

        console.log("Email sent successfully:", response);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue with order process even if email fails
      }

      setOrderCompleted(true);

      // Redirect to a success page or order confirmation
      setTimeout(() => {
        router.push(`/`);
      }, 2000);
    } catch (error) {
      console.error("Error processing order:", error);
      // Show error message to the user
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  return (
    <div>
      <Navigation cart={cart} id={id} userLoggedIn={userLoggedIn} />
      <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
        <div className="w-[95%] py-[20px]">
          <h1 className="text-[30px] font-semibold mb-6">Checkout</h1>

          {orderCompleted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-bold">Order Placed Successfully!</p>
              <p>Redirecting to order confirmation...</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingDetails.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingDetails.email}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={shippingDetails.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingDetails.postalCode}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.postalCode ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingDetails.country}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    {cart.products && productsDetail.length > 0 ? (
                      cart.products.map((item) => {
                        const product = productsDetail.find(
                          (p) => p._id === item.id
                        );
                        if (!product) return null;

                        return (
                          <div
                            key={item.id}
                            className="flex justify-between border-b pb-3"
                          >
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">
                              Rs. {product.unitPrice * item.quantity}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">No items in cart</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>Rs. {subtotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Delivery</p>
                      <p>Rs. {deliveryCharge}</p>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between font-semibold text-lg">
                      <p>Total</p>
                      <p>Rs. {total}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <StripeWrapper>
                      <StripeCheckoutForm
                        totalAmount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </StripeWrapper>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Max />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
