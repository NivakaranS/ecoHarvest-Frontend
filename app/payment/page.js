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
      <div>
        <p>Payment</p>
      </div>
     
      <Max />
      <Footer />
    </div>
  );
};

export default OrderHistory;
