"use client";
import Image from "next/image";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AllCategories from "./components/AllCategories";
import TopSellers from "./components/TopSellers";
import PopularProducts from "./components/PopularProducts";
import Footer from "./components/Footer";
import YouMightLike from "./components/YouMightLike";
import Max from "./components/Max";
import { request } from "http";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CustomerHome() {
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const router = useRouter();


  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            const response2 = await axios.get('http://localhost:8000/customers/details/:' + response.data.id)
            console.log('customer details', response2.data);
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
          setIsLoggedIn(true);
          setUserLoggedIn(true);
  
          if (response.data.role === "Customer") setIsLoggedIn(true);
          
        } catch (error) {
  
          setIsLoggedIn(false);
          console.log("Error fetching cookies:", error);
          
  
        }
      };
  
      fetchCookies();
  
    }, [])


  useEffect(() => {
    const fetchCart = async () => {
      if (!userLoggedIn) {
        return;
      }
      try {
        console.log("iddd", id);
        const response2 = await axios.get(`http://localhost:8000/cart/${id}`);
        setCart(response2.data.cart);
        setProductsDetail(response2.data.products);
        console.log(
          "Product items fetched successfully:",
          response2.data.products
        );
        console.log("Cart items fetched successfully:", response2.data.cart);
        setNumberOfCartItems(response2.data.cart.products.length);
        console.log("Length", response2.data.cart.products.length);
      } catch (errr) {
        console.log("Cart Empty");
      }
    };

    fetchCart();
  }, [id]);

  return (
    <div>
      <Navigation
        numberOfCartItems={numberOfCartItems}
        productsDetail={productsDetail}
        id={id}
        cart={cart}
        userLoggedIn={userLoggedIn}
      />
      <Hero />
      <AllCategories />
      {/* <TopSellers/>
      <PopularProducts/>
      <YouMightLike/> */}
      <Max />
      <Footer />
    </div>
  );
}
