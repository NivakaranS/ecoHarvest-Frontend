
'use client'
import React from 'react';
import Product from './Product';
import Category from './Category';
import Bakery from '../images/bakeryFoodAndPastries.jpg'
import Beverages from '../images/beverages.jpg';
import Rice from '../images/RiceGrainsNoodles.jpg';
import Sauces from '../images/Sauces.jpg'
import SideDishes from '../images/sideDishes.jpg';
import Desserts from '../images/Desserts.jpg';
import MainCourses from '../images/maincourses.jpg';
import Meat from '../images/meatAndSeaFood.jpg';
import RecycleProduct from '../images/recycleProduct.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AllCategories = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/productcategories/" );

                
                setProductCategories(response.data);
                
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    })


    return(
        <div className="text-black  bg-[#F5F5F5] flex items-center justify-center">
            <div className="w-[94vw] h-[100%]">
                <div className=" py-[5px] w-fit flex items-center justify-center text-[22px] pl-[35px] pr-[80px]  rounded-l-[5px] rounded-tr-[5px] rounded-br-[35px] ">
                    <p className="text-[40px] text-gray-800 select-none">All Categories</p>
                </div>

                <div className="flex items-center justify-center" >
                    <div className=" grid grid-cols-6 w-[95%] gap-[5px] pt-[15px] pb-[45px]">
                         
                         {productCategories.map((category) => (
                            <Category key={category._id} title={category.name} id={category._id} image={category.imageUrl} />
                         ))}
                        
                        
                    </div>
                </div>
            </div>
                
            </div>
            
            

        
    )
}

export default AllCategories;