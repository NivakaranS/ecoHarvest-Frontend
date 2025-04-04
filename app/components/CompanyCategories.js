"use client";
import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import Cookies from "js-cookie";

const CompanyCategories = () => {
  const [data, setData] = useState([]);
  console.log('Cookies.get("token")', Cookies.get());

  useEffect(() => {
    const fetchCompanyFoodListing = async () => {
      const response = await axios.post(
        "http://localhost:8000/company/company-food-listing",
        {
          pCategory: "Dairy",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("response.data", response);
      setData(response.data);
    };
    fetchCompanyFoodListing();
  }, []);

  return (
    <div className="w-[100%]  px-[5px] mx-[10px] flex items-center justify-center">
      <div className="grid w-[100%]   gap-[5px] grid-cols-5">
        {data.map((product, index) => (
          <div key={index}>
            <Product
              id={product._id}
              title={product.name}
              imageUrl={product.imageUrl}
              subtitle={product.subtitle}
              unitPrice={product.unitPrice}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCategories;
