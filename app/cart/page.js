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

const CartPage = () => {
  const [isFixed, setIsFixed] = useState(true);
  const targetRef = useRef(null);
  const fixedRef = useRef(null);

  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState({
    products: [],
  });
  const [productsDetail, setProductsDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [updateBtnVisible, setUpdateBtnVisible] = useState(false);

  const router = useRouter();

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
            console.error("Error fetching cart items:", errr);
          }
        } else if (response.data.role === "Vendor") {
          router.push("/vendor");
        } else if (response.data.role === "Admin") {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching cookies:", error);
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
    } else {
      router.push("/login");
    }
  }

  const handleUpdateCart = async (cartId1, productId1, quantity1) => {
    try {
      console.log("Updating cart with:", cartId1, productId1, quantity1);
      const response = await axios.post("http://localhost:8000/cart/update/", {
        cartId: cartId1,
        productId: productId1,
        updatedQuantity: String(quantity1),
      });
      setUpdateBtnVisible(false);
      window.location.reload();
      console.log("Cart updated successfully:", response);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const handleDeleteProduct = async (cartId1, productId1) => {
    try {
      console.log("Deleting product from cart with:", cartId1, productId1);
      const response = await axios.post("http://localhost:8000/cart/delete/", {
        cartId: cartId1,
        productId: productId1,
      });
      console.log("Product deleted successfully:", response);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting product from cart:", err);
    }
  };

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

  const updateQuantity = (itemId, newQuantity) => {
    setCart((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  return (
    <div>
      <Navigation
        productsDetail={productsDetail}
        cart={cart}
        id={id}
        userLoggedIn={userLoggedIn}
      />
      <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
        <div className="w-[95%] min-h-[100vh] flex flex-row ">
          <div className="w-[76.4%] pr-[20px] h-[100%]">
            <div className="w-[100%]  h-[200px] bg-gray-300 rounded-[10px] mt-[10px] ring-[0.5px] ring-gray-800 "></div>
            <p className="text-[35px] px-[20px] mt-[10px] mb-[5px] ">
              Shopping Cart
            </p>
            <div className="w-[100%] mt-[10px] mb-[20px] h-[100%]">
              <div className="flex flex-col space-y-[8px] w-[100%] bg-gray-300 rounded-[10px] px-[10px]  py-[9px] ring-[0.5px] ring-gray-500">
                {cart && cart.products && cart.products.length > 0 ? (
                  cart.products.map((item) =>
                    productsDetail.map((product) => (
                      <div
                        key={item._id}
                        className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between "
                      >
                        <div className="flex flex-row  space-x-[10px]">
                          <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                            <Image alt="" src={ProductImage} height={90} />
                          </div>
                          <div className="py-[8px] leading-[24px]">
                            <p className="text-[20px] text-gray-800">
                              {product.name}
                            </p>
                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                              <p className="text-[16px] text-gray-600">
                                Rs.{product.unitPrice}
                              </p>
                              <p className="text-gray-600">|</p>
                              <p className=" text-green-700">
                                {product.status}
                              </p>
                            </div>
                            <div className="flex flex-row items-center  space-x-[10px] ">
                              <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                <div
                                  onClick={() =>
                                    handleDecreaseQuantity(item.id)
                                  }
                                  className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center"
                                >
                                  <div className="bg-black h-[1px] w-[10px]"></div>

                                </div>
                                <div className="w-[100%] flex items-center justify-center">
                                  <input
                                    value={item.quantity}
                                    onChange={(e) => {
                                      setUpdateBtnVisible(true);
                                      updateQuantity(
                                        item.id,
                                        Math.max(1, Number(e.target.value) || 1)
                                      );
                                    }}
                                    className="w-full text-[20px] text-center focus:outline-none"
                                  />
                                </div>
                                <div
                                  onClick={() =>
                                    handleIncreaseQuantity(item.id)
                                  }
                                  className="px-[10px] cursor-pointer"
                                >
                                  <p className="text-[20px]">+</p>
                                </div>

                              </div>
                              {updateBtnVisible ? (
                                <div
                                  onClick={() =>
                                    handleUpdateCart(
                                      cart._id,
                                      product._id,
                                      item.quantity
                                    )
                                  }
                                  className="bg-gray-400 ring-[0.5px] ring-gray-800 mt-[10px] cursor-pointer px-[20px] rounded-[4px] text-[15px] py-[2px]"
                                >
                                  <p>Upate</p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-[23px]  py-[8px]">
                            Rs. {product.unitPrice * item.quantity}
                          </p>
                          <div className="flex flex-col leading-[22px]">
                            <div className="cursor-pointer w-fit">
                              <p className="">Favourites</p>
                            </div>
                            <div
                              onClick={() =>
                                handleDeleteProduct(cart._id, product._id)
                              }
                              className="cursor-pointer w-fit"
                            >
                              <p className="text-red-600">Delete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <p>No products in the cart</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-[38%] h-[100vh]  py-[15px]  ">
            <div
              ref={fixedRef}
              className={`${

                isFixed ? "fixed" : " hidden "

              } py-[10px] px-[20px] rounded-[15px] ring-[0.5px] w-[30%] bg-gray-300 h-[80%] `}
            >
              <p className="text-[20px] text-gray-700">Order Summary</p>
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
                <div className="flex flex-row justify-between mt-[10px]">
                  <p>Sub total</p>
                  <p>Rs. 20000</p>
                </div>
                <div className="flex flex-row justify-between text-[20px] mt-[10px]">
                  <p>Total</p>
                  <p>Rs. 20500</p>
                </div>
              </div>
              <div className="flex flex-col space-y-[10px] mt-[20px]">
                <div onClick={handleCheckout} className="bg-gray-500 rounded-[10px] py-[10px] cursor-pointer flex items-center justify-center ">
                  <p>Checkout</p>

                </div>
                <div className="bg-yellow-600 rounded-[10px] py-[10px] cursor-pointer flex items-center justify-center ">
                  <p>Continue Shopping</p>
                </div>
              </div>
            </div>
          </div>
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

export default CartPage;
