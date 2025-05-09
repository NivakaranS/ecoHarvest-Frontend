"use client";

import Footer from "../components/Footer";
import Max from "../components/Max";
import Navigation from "../components/Navigation";
import Product from "../components/Product";
import Image from "next/image";
import ProductImage from "../images/product.png";
import YouMightLike from "../components/YouMightLike";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmptyCart from '../images/emptyCart.png'

const OrderHistory = () => {
  const [isFixed, setIsFixed] = useState(true);
  const targetRef = useRef(null);
  const fixedRef = useRef(null);

  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState({
    products: [],
  });

  const [OrderHistory, setOrderHistory] = useState([]);


  const [productsDetail, setProductsDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [updateBtnVisible, setUpdateBtnVisible] = useState(false);
  const [advertisement, setAdvertisement] = useState([]);

  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const router = useRouter();


  useEffect(() => {
    const fetchAdvertisement = async () => {
        try {
            const response = await axios.get('http://localhost:8000/advertisement/');
            setAdvertisement(response.data);
        } catch (error) {
            console.error('Error fetching advertisement:', error);
        }
    } 

    fetchAdvertisement();

}, [])


  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/check-cookie/",
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
        setId(response.data.id);
        setRole(response.data.role);

        if (response.data.role === "Customer") {
          setUserLoggedIn(true);
          try {
            const response2 = await axios.get(
              `http://localhost:8000/cart/${response.data.id}`
            );
            setCart(response2.data.cart);
            setProductsDetail(response2.data.products);
            console.log(
              "Product items fetched successfully:",
              response2.data.products
            );
            console.log(
              "Cart items fetched successfully:",
              response2.data.cart
            );
          } catch (errr) {
            console.log("Cart Empty");
       
        
          }
        } else if (response.data.role === "Vendor") {
          router.push("/vendor");
        } else if (response.data.role === "Admin") {
          router.push("/admin");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    fetchCookies();
  }, []);

  

  const handleCheckout = () => {
    if (userLoggedIn) {
      const response = axios.post("http://localhost:8000/orders/checkout", {
        cart
      })

      console.log("Checkout response:", response);
      router.push("/checkout")

    } else {
      router.push("/login");
    }
  }




  useEffect(() => {
    const handleScroll = () => {
      if (fixedRef.current && targetRef.current) {
        const fixedHeight = fixedRef.current.clientHeight;
        const targetTop = targetRef.current.getBoundingClientRect().top;

        setIsFixed(targetTop > fixedHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleIncreaseQuantity = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
    setUpdateBtnVisible(true);
  };
  
  const handleDecreaseQuantity = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ),
    }));
    setUpdateBtnVisible(true);
  };



  useEffect(() => {
    const fetchOrderHistory = async () => {
      if(!userLoggedIn) {
        return
      }
      try {
        const response2 = await axios.get(`http://localhost:8000/orders/history/:${id}`);
                    setOrderHistory(response2.data);
                    console.log("Order history fetched successfully:", response2.data);
                    console.log("Length", response2.data.cart.products.length)
      } catch(errr) {
        console.log("No order history")

      }
    }

    fetchOrderHistory();

  }, [id])

  useEffect(() => {
    const fetchCart = async () => {
      if(!userLoggedIn) {
        return
      }
      try {
        console.log("iddd", id)
        const response2 = await axios.get(`http://localhost:8000/cart/${id}`);
                    setCart(response2.data.cart);
                    setProductsDetail(response2.data.products);
                    console.log("Product items fetched successfully:", response2.data.products);
                    console.log("Cart items fetched successfully:", response2.data.cart);
                    setNumberOfCartItems(response2.data.cart.products.length);
                    console.log("Length", response2.data.cart.products.length)
      } catch(errr) {
        console.log("Cart Empty")

      }
    }

    fetchCart();

  }, [id])

  return (
    <div>
      <Navigation
      numberOfCartItems={numberOfCartItems}
        productsDetail={productsDetail}
        cart={cart}
        id={id}
        userLoggedIn={userLoggedIn}
      />
      <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
        <div className="w-[95%] min-h-[100vh] flex flex-row ">
          <div className="w-[76.4%] pr-[20px] h-[100%]">
            <div className="w-[100%] flex flex-row h-[200px] bg-gray-300 rounded-[10px] mt-[10px] ring-[0.5px] ring-gray-800 ">
              <div className="w-[60%] h-[100%] flex flex-col items-center justify-center">
                <div className="w-[80%]">
                  <p className="text-[25px] leading-[30px]">{advertisement[0] && advertisement[0].title}</p>
                  <p className="text-gray-600 leading-[20px] mt-[5px]">{advertisement[0] && advertisement[0].description}</p>
                </div>
              </div>
              <div className="w-[40%] h-[100%] flex items-center justify-center">
                <Image src={advertisement[0] && advertisement[0].imageUrl} width={220} height={150} alt="Advertisement" className="rounded-[10px]" />
              </div>
            </div>
            <p className="text-[35px] px-[20px] mt-[10px] mb-[5px] ">
              Order History
            </p>
            <div className="w-[100%] mt-[10px] mb-[20px] h-[100%]">
              <div className="flex  flex-col space-y-[8px] w-[100%] bg-gray-300 rounded-[10px] px-[10px]  py-[9px] ring-[0.5px] ring-gray-500">
                {OrderHistory && OrderHistory.length > 0 ? (
                  OrderHistory.map((item) => {
                    const dateObj = new Date(item.orderTime);
                    const date = dateObj.toISOString().split('T')[0];
                    const time = dateObj.toTimeString().split(' ')[0];
                  
                    return (
                      <div
                        key={item._id}
                        className="w-[100%] h-[220px] pl-[5px] pr-[20px] py-[10px] bg-white rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-col justify-between"
                      >
                        <div className="flex flex-row px-[10px] justify-between items-center">
                            <div className="text-[20px]">Order #{item.orderNumber}</div>
                            <div className="bg-gray-300 ring-gray-800 ring-[0.5px] px-[10px] text-[15px] rounded-[3px] w-fit">
                                {item.status}
                            </div>
                        </div>
                        <div className="flex flex-row px-[10px] justify-between">
                            <div>Date: {date}</div>
                            <div>Time: {time}</div>
                        </div>
                        <div className="px-[10px]">Total amount: Rs. {item.totalAmount}</div>
                        <div className="flex flex-row bg-gray-200 py-[10px] mt-[5px] w-[100%] ml-[8px] rounded-[10px] ring-[0.5px] ring-gray-800 ">
                            {item.products.map((product) => (
                            <div key={product.productId._id} className="flex flex-row items-center space-x-[10px]">
                                <Image
                                src={product.productId.imageUrl}
                                width={80}
                                height={80}
                                alt="Product"
                                className="rounded-[10px]"
                                />

                                <div className="flex flex-col w-[350px] ">
                                    <p className="text-[20px] leading-[20px]">{product.productId.name}</p>
                                    <p className="text-gray-600 text-[18px] pl-[10px]">{product.productId.subtitle}</p>
                                    <p className="text-gray-600 pl-[10px]">{product.productId.averageRating}</p>
                                </div>
                                <div className="flex flex-col w-[130px] ">
                                    <p>Total Amount</p>
                                    <p className="text-gray-600">Rs. {product.unitPrice * product.quantity}</p>
                                </div>
                                
                                <div className="flex flex-col w-[130px] ">
                                    <p>M.R.P.</p>
                                    <p className="text-gray-600">Rs. {product.productId.MRP}</p>
                                </div>
                                
                                <div className="flex flex-col w-[130px] ">
                                    <p>Unit Price</p>
                                    <p className="text-gray-600">Rs. {product.productId.unitPrice}</p>
                                </div>
                                <div className="flex flex-col w-[130px] ">
                                    <p>Quantity</p>
                                    <p className="text-gray-600"> {product.quantity}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                  
                        
                        
                      </div>
                    );
                  })
                  
                ) : (
                  <p>No order history</p>
                )}
              </div>
            </div>
          </div>
          {cart && cart.length >  0  ? (<div className="w-[38%] h-[100vh]  py-[15px]  ">
            <div
              ref={fixedRef}
              className={`${


                isFixed ? "fixed w-[30%]" : " static w-[100%]  "
              } py-[10px] px-[20px] rounded-[15px] ring-[0.5px]  bg-gray-300 h-[80%] `}


            >
              <p className="text-[20px] text-gray-700">Shopping Cart</p>
              <div className="h-[0.5px] w-[100%]  mt-[10px] bg-black"></div>
              <div className="flex flex-col my-[10px]">
                <div className="flex flex-row justify-between ">
                  <p>Sub total</p>

                  <p>Rs. {cart.totalAmount}</p>

                </div>
                <div className="flex flex-row justify-between ">
                  <p>Delivery Charge</p>
                  <p>Rs. 500</p>
                </div>
              </div>
              <div className="h-[0.5px] w-[100%] bg-black"></div>
              <div className="flex flex-row justify-between my-[18px]">
                <input
                  className="border-[0.5px] w-[250px] rounded-[5px] px-[10px] focus:outline-none "
                  placeholder="Enter coupon number"
                />
                <div className="bg-gray-500 rounded-[5px] py-[5px] px-[10px] text-[15px] cursor-pointer flex items-center justify-center">
                  <p>Apply Coupon</p>
                </div>
              </div>
              <div className="h-[0.5px] w-[100%] bg-black"></div>
              <div>
                
                <div className="flex flex-row justify-between text-[20px] mt-[10px]">
                  <p>Grand total</p>
                  <p>Rs. {cart.totalAmount}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-[10px] mt-[20px]">

                <div onClick={handleCheckout} className="bg-gray-500 rounded-[10px] py-[10px] cursor-pointer flex items-center justify-center ">
                  <p>Checkout</p>

                </div>
                <div onClick={() => router.push('/')} className="bg-yellow-600 rounded-[10px] py-[10px] cursor-pointer flex items-center justify-center ">
                  <p>Continue Shopping</p>
                </div>
              </div>
            </div>
          </div>) : (
            <div className="w-[36%] bg-gray-300 flex flex-col items-center justify-center h-[100vh] my-[10px] rounded-[10px] ring-gray-800 ring-[0.5px] px-[20px] py-[15px]  ">
                
                <Image src={EmptyCart} width={200} height={200} alt="Empty Cart" className="rounded-[10px] mt-[10px]" />
                <p className="text-[25px] mt-[10px]">Your cart is empty</p>
            </div>
            )}
        </div>
      </div>
      <div ref={targetRef} className="flex items-center justify-center">
        <div className="w-[95%]">{/* <YouMightLike/> */}</div>
      </div>
     
      <Max />
      <Footer />
    </div>
  );
};

export default OrderHistory;
