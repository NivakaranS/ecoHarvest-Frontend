"use client";
import Navigation from "../components/Navigation";

import Footer from "../components/Footer";
import Max from "../components/Max";
import Product from "../components/Product";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Star from "../images/log.png";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const [width, setWidth] = useState(0);
  const selectRef = useRef(null);
  const textRef = useRef(null);

  const searchParms = useSearchParams();
  const categoryId = searchParms.get("categoryId") || "";
  const categoryName = searchParms.get("categoryName") || "All Categories";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState();
  const [productsDetail, setProductsDetail] = useState([]);
  const [discounts, setDiscounts] = useState();
  const [productMinPrice, setProductMinPrice] = useState(0);
  const [productMaxPrice, setProductMaxPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [priceRangeMin, setPriceRangeMin] = useState(0);
  const [priceRangeMax, setPriceRangeMax] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Featured");
  const [sortedProducts, setSortedProducts] = useState([]);

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

        if (
          response.data.role === "Customer" ||
          response.data.role === "Company"
        ) {
          setUserLoggedIn(true);
        } else if (response.data.role === "Vendor") {
          router.push("/vendor");
        } else if (response.data.role === "Admin") {
          router.push("/admin");
        }
      } catch (error) {
        setUserLoggedIn(false);
      }
    };

    fetchCookies();
  }, []);

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
      } catch (errr) {
        console.log("Cart Empty");
      }
    };

    fetchCart();
  }, [id]);

  const updateWidth = () => {
    if (selectRef.current && textRef.current) {
      const selectedText =
        selectRef.current.options[selectRef.current.selectedIndex].text;
      textRef.current.innerText = selectedText;
      setWidth(textRef.current.offsetWidth + 20);
      setSelectedOption(selectedText);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/products/category/" + categoryId
        );

        setProducts(response.data);
        console.log(products);
        const prices = response.data.map((product) => product.unitPrice || 0);
        const max = Math.max(...prices);
        const min = Math.min(...prices);

        setMaxPrice(max);
        setMinPrice(min);
        setPriceRangeMin(min);
        setPriceRangeMax(max);
      } catch (error) {
        setUserLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const sortProducts = () => {
      // Filter products based on price range
      const filteredProducts = products.filter(
        (product) =>
          product.unitPrice >= priceRangeMin &&
          product.unitPrice <= priceRangeMax
      );

      // Sorting logic
      const sorted = [...filteredProducts];

      switch (selectedOption) {
        case "Price: Low to High":
          sorted.sort((a, b) => a.unitPrice - b.unitPrice);
          break;
        case "Price: High to Low":
          sorted.sort((a, b) => b.unitPrice - a.unitPrice);
          break;
        case "Highly Rated":
          sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        // case "Most Popular":
        //   sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        //   break;
        // // case "Newest Arrivals":
        // //   sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // //   break;
        // // case "Best Sellers":
        // //   sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        // //   break;
        default:
          break;
      }

      setSortedProducts(sorted);
    };

    sortProducts();
  }, [selectedOption, products, priceRangeMin, priceRangeMax]);
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/discount/");
        setDiscounts(response.data);
        console.log("discounts", response.data);
      } catch (error) {
        console.error("Error fetching discounts", error);
      }
    };
    fetchDiscounts();
  }, []);

  return (
    <div>
      <Navigation
        productsDetail={productsDetail}
        cart={cart}
        id={id}
        userLoggedIn={userLoggedIn}
      />
      <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
        <div className="w-[95%] h-[100%] flex flex-row py-[15px] ">
          <div className="w-[16%]   h-[100%]">
            <div className="flex text-[15px]  flex-col leading-[20px]">
              <div className="fixed">
                <p className="text-[18px] text-gray-800 ">Category</p>
                <div className="flex pl-[5px] pb-[10px] pt-[2px] flex-col leading-[20px]">
                  <div className="flex flex-row ">
                    <p className="cursor-pointer hover:text-gray-500 ">
                      All Categories
                    </p>
                  </div>
                  <div className="flex flex-row ">
                    <p className="text-[#FDAA1C] cursor-pointer">
                      Daily Grocery
                    </p>
                  </div>
                  <div className="flex flex-row ">
                    <p className="cursor-pointer hover:text-gray-500">Drinks</p>
                  </div>
                  <div className="flex flex-row ">
                    <p className="cursor-pointer hover:text-gray-500">
                      Tea and Coffee
                    </p>
                  </div>
                </div>

                <div className="flex text-[15px] flex-col leading-[20px]">
                  <p className="text-[18px] text-gray-800">Flavour</p>
                  <div className="flex pl-[5px] pb-[10px] pt-[2px] flex-col leading-[20px]">
                    <div className="flex flex-row space-x-[2px]">
                      <input
                        className="cursor-pointer accent-[#FDAA1C] "
                        type="checkbox"
                      />
                      <p>Mango Passion</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input
                        className="cursor-pointer accent-[#FDAA1C]"
                        type="checkbox"
                      />
                      <p>Mango Passion</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input
                        className="cursor-pointer accent-[#FDAA1C]"
                        type="checkbox"
                      />
                      <p>Mango Passion</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input
                        className="cursor-pointer accent-[#FDAA1C]"
                        type="checkbox"
                      />
                      <p>Mango Passion</p>
                    </div>
                  </div>
                </div>
                <div className="pb-[10px]">
                  <p>Price</p>
                  <div>
                    <input
                      type="range"
                      min={minPrice}
                      max={priceRangeMax - 1}
                      value={priceRangeMin}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value < priceRangeMax) setPriceRangeMin(value);
                      }}
                      className="w-[130%] accent-[#FDAA1C] h-[5px] focus:outline-none cursor-pointer"
                    />
                    <div className="flex flex-row justify-between w-[130%] text-[13px]">
                      <p>Min: Rs.{priceRangeMin}</p>
                      <p>Max: Rs.{priceRangeMax}</p>
                    </div>
                  </div>
                  <div className="pt-[6px]">
                    <input
                      type="range"
                      min={priceRangeMin + 1}
                      max={maxPrice}
                      value={priceRangeMax}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value > priceRangeMin) setPriceRangeMax(value);
                      }}
                      className="w-[130%] accent-[#FDAA1C] h-[5px] focus:outline-none cursor-pointer"
                    />
                    {/* <div className="flex flex-row justify-between w-[150%] text-[13px]">
                      <p>Min: Rs.{priceRangeMin}</p>
                      <p>Max: Rs.{priceRangeMax}</p>
                    </div> */}
                  </div>
                </div>
                <div className="flex text-[15px] flex-col leading-[20px]">
                  <p className="text-[17px] ">Brands</p>
                  <div className="flex pl-[5px] pb-[10px] pt-[2px] flex-col leading-[20px]">
                    <div className="flex flex-row space-x-[2px]">
                      <input className="cursor-pointer " type="checkbox" />
                      <p>Anchor</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input className="cursor-pointer" type="checkbox" />
                      <p>Nestle</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input className="cursor-pointer" type="checkbox" />
                      <p>Ambewela</p>
                    </div>
                    <div className="flex flex-row space-x-[2px]">
                      <input className="cursor-pointer" type="checkbox" />
                      <p>Elephant house</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Customer Reviews</p>
                  <div className="flex flex-row space-x-[3px]">
                    <Image
                      className="cursor-pointer"
                      alt="star"
                      src={Star}
                      height={15}
                    />
                    <Image
                      className="cursor-pointer"
                      alt="star"
                      src={Star}
                      height={15}
                    />
                    <Image
                      className="cursor-pointer"
                      alt="star"
                      src={Star}
                      height={15}
                    />
                    <Image
                      className="cursor-pointer"
                      alt="star"
                      src={Star}
                      height={15}
                    />
                    <Image
                      className="cursor-pointer"
                      alt="star"
                      src={Star}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[84%] min-h-[100vh] border-l-[1px]  border-gray-600  px-[20px]">
            <div className="bg-gray-200 flex flex-row justify-between items-center  rounded-[5px] text-[15px] py-[5px] my-[5px] ring-[0.5px] ring-gray-600 px-[10px]">
              <p>1-20 of over 100 results for {categoryName}</p>
              <div className="flex flex-row text-[13px] items-center ">
                <p>Sort by: </p>
                <div className="relative">
                  <span
                    ref={textRef}
                    className="absolute right-0 opacity-0 pointer-events-none z-[20]  whitespace-nowrap"
                  >
                    Featured
                  </span>
                  <select
                    ref={selectRef}
                    onChange={updateWidth}
                    style={{ width }}
                    className="focus:outline-none z-[30] cursor-pointer bg-transparent border-none"
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highly Rated</option>
                    {/* <option>Most Popular</option>
                    <option>Newest Arrivals</option>
                    <option>Best Sellers</option> */}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-[30px]">Results for {categoryName}</p>
            <div className="w-[100%]  px-[5px] mx-[10px] flex items-center justify-center">
              <div className="grid w-[100%]   gap-[5px] grid-cols-5">
                {console.log("products", products)}
                {console.log("role", role)}
                {sortedProducts
                  .filter(({ category }) => {
                    let cate = "";
                    if (role === "Company") {
                      cate = "Recycling";
                    } else if (role === "Customer") {
                      cate = "Resell";
                    }
                    return cate === category;
                  })
                  .map((product, index) => (
                    <div key={index}>
                      <Product
                        id={product._id}
                        title={product.name}
                        imageUrl={product.imageUrl}
                        subtitle={product.subtitle}
                        unitPrice={product.unitPrice}
                        discounts={discounts}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Max />
      <Footer />
    </div>
  );
};

export default CategoryPage;
