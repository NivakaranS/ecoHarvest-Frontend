"use client";
import AllCategories from "../components/AllCategories";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Max from "../components/Max";
import LogoutButton from "../components/Logout";
import Navigation from "../components/Navigation";
import PopularProducts from "../components/PopularProducts";
import TopSellers from "../components/TopSellers";
import YouMightLike from "../components/YouMightLike";
import CompanyCategories from "../components/CompanyCategories";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

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

        if (response.data.role === "Company") {
          setUserLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching cookies:", error);
      }
    };

    fetchCookies();
  }, []);

  return (
    <div>
      <Navigation userLoggedIn={userLoggedIn} />
      <Hero />
      Company Page
      <CompanyCategories />
      {/*  <TopSellers />
      <PopularProducts />
      <YouMightLike /> */}
      <Max />
      <Footer />
    </div>
  );
}
