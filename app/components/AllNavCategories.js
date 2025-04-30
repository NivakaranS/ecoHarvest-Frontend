
'use client'
import React from 'react';
import Product from './Product';
import ANavCategory from './ANavCategory';
import Bakery from '../images/bakeryFoodAndPastries.jpg'

import Rice from '../images/RiceGrainsNoodles.jpg';

import SideDishes from '../images/sideDishes.jpg';
import Desserts from '../images/Desserts.jpg';
import MainCourses from '../images/maincourses.jpg';
import Meat from '../images/meatAndSeaFood.jpg';
import RecycleProduct from '../images/recycleProduct.jpg';
import mainMealsWallpaper from '../images/mainMealsWallpaper.jpg'
import bakedFood from '../images/backedFood.jpg'
import sideDishes from '../images/sideDishes.jpg'
import meatSeaFood from '../images/meatAndSeaFood.jpg'
import dairyProducts from '../images/Desserts.jpg'
import riceAndGrains from '../images/RiceGrainsNoodles.jpg'
import Beverages from '../images/beverages.jpg'
import Sauces from '../images/Sauces.jpg'
import AllNavCategory from "./ANavCategory";
import Image from 'next/image';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AllNavCategories = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navCategorySelect, setNavCategorySelect] = useState('Meals & Main Courses');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/productcategories/" );

                
                setProductCategories(response.data);
                console.log(response.data)
                
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [])

    const handleCategoryHover = (val) => {
        setNavCategorySelect(val)
        console.log('mouse entered', val)
    }


    return(
        
            <div className=" flex flex-row w-[100%] h-[100%] ">
                <div className='flex flex-col w-[50%]'>       

                {productCategories.map((category) => (
                    <ANavCategory style={{ pointerEvents: 'auto' }} onMouseEnter={() => handleCategoryHover(category.name)} key={category._id} title={category.name} id={category._id} image={category.imageUrl} />
                ))}
                </div>

            
                <div className="w-[100%] h-[100%] overflow-hidden   ">
                

                    {navCategorySelect === 'Meals & Main Courses' &&
                    <Image className="flex translate-y-[-10%]" src={mainMealsWallpaper}/>}

                    {navCategorySelect === 'Baked Goods & Pastries' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={bakedFood}/>}

                    {navCategorySelect === 'Appetizer & Side Dishes' &&
                    <Image className="flex translate-y-[-35%] h-[350%] w-[100%]" src={sideDishes}/>}

                    {navCategorySelect === 'Meat & Seafood' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={meatSeaFood}/>}

                    {navCategorySelect === 'Dairy Products & Desserts' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={dairyProducts}/>}

                    {navCategorySelect === 'Rice, Grains & Noodles' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={riceAndGrains}/>}
                  
                    {navCategorySelect === 'Beverages' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={Beverages}/>}

                    {navCategorySelect === 'Fruits & Vegetables' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={bakedFood}/>}

                    {navCategorySelect === 'Sauces, Condiments & Seasonings' &&
                    <Image className="flex translate-y-[-20%] h-[140%] w-[100%]" src={Sauces}/>}




              </div>
           
                        
            </div>
              
         
            

        
    )
}

export default AllNavCategories;