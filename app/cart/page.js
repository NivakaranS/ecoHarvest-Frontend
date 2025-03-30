'use client'

import Footer from "../components/Footer";
import Max from "../components/Max";
import Navigation from "../components/Navigation";
import Product from "../components/Product";
import Image from "next/image";
import ProductImage from '../images/product.png'
import YouMightLike from "../components/YouMightLike";
import React, {useState, useRef, useEffect} from "react";

const CartPage = () => {

    const [isFixed, setIsFixed] = useState(true);
    const targetRef = useRef(null);
    const fixedRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if(fixedRef.current && targetRef.current) {
                const fixedHeight = fixedRef.current.clientHeight;
                const targetTop = targetRef.current.getBoundingClientRect().top;

                setIsFixed(targetTop >fixedHeight)
            }
        };
        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    
    return(
        <div>
            <Navigation/>
            <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
                <div className="w-[95%] min-h-[100vh] flex flex-row ">
                    <div className="w-[76.4%] pr-[20px] h-[100%]">
                        <div className="w-[100%]  h-[200px] bg-gray-300 rounded-[10px] mt-[10px] ring-[0.5px] ring-gray-800 ">

                        </div>
                        <p className="text-[35px] px-[20px] mt-[10px] mb-[5px] ">Shopping Cart</p>
                        <div className="w-[100%] mt-[10px] mb-[20px] h-[100%]">
                            <div className="flex flex-col space-y-[8px] w-[100%] bg-gray-300 rounded-[10px] px-[10px]  py-[9px] ring-[0.5px] ring-gray-500">
                                <div className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between ">
                                    <div className="flex flex-row  space-x-[10px]">
                                        <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                                            <Image alt="" src={ProductImage} height={90} />
                                        </div>
                                        <div className="py-[8px] leading-[24px]">
                                            <p className="text-[20px] text-gray-800">Anchor Drinking Yoghurt - 180 ml</p>
                                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                                                <p className="text-[16px] text-gray-600">Rs.100</p>
                                                <p className="text-gray-600">|</p>
                                                <p className=" text-green-700">In Stock</p>
                                            </div>
                                            <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                                <div className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center">
                                                    <div className="bg-black h-[1px] w-[10px]"></div>
                                                </div>
                                                <div className="w-[100%] flex items-center justify-center">
                                                    <input className="w-[100%] text-[20px] text-center focus:outline-none"/>
                                                </div>
                                                <div className="px-[10px] cursor-pointer">
                                                    <p className="text-[20px]">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="text-[23px]  py-[8px]">Rs. 500</p>
                                        <div className="flex flex-col leading-[22px]">
                                            <div className="cursor-pointer w-fit">
                                                <p className="">Favourites</p>
                                            </div>
                                            <div className="cursor-pointer w-fit">
                                                <p className="text-red-600">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between ">
                                    <div className="flex flex-row  space-x-[10px]">
                                        <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                                            <Image alt="" src={ProductImage} height={90} />
                                        </div>
                                        <div className="py-[8px] leading-[24px]">
                                            <p className="text-[20px] text-gray-800">Anchor Drinking Yoghurt - 180 ml</p>
                                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                                                <p className="text-[16px] text-gray-600">Rs.100</p>
                                                <p className="text-gray-600">|</p>
                                                <p className=" text-green-700">In Stock</p>
                                            </div>
                                            <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                                <div className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center">
                                                    <div className="bg-black h-[1px] w-[10px]"></div>
                                                </div>
                                                <div className="w-[100%] flex items-center justify-center">
                                                    <input className="w-[100%] text-[20px] text-center focus:outline-none"/>
                                                </div>
                                                <div className="px-[10px] cursor-pointer">
                                                    <p className="text-[20px]">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="text-[23px]  py-[8px]">Rs. 500</p>
                                        <div className="flex flex-col leading-[22px]">
                                            <div className="cursor-pointer w-fit">
                                                <p className="">Favourites</p>
                                            </div>
                                            <div className="cursor-pointer w-fit">
                                                <p className="text-red-600">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between ">
                                    <div className="flex flex-row  space-x-[10px]">
                                        <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                                            <Image alt="" src={ProductImage} height={90} />
                                        </div>
                                        <div className="py-[8px] leading-[24px]">
                                            <p className="text-[20px] text-gray-800">Anchor Drinking Yoghurt - 180 ml</p>
                                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                                                <p className="text-[16px] text-gray-600">Rs.100</p>
                                                <p className="text-gray-600">|</p>
                                                <p className=" text-green-700">In Stock</p>
                                            </div>
                                            <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                                <div className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center">
                                                    <div className="bg-black h-[1px] w-[10px]"></div>
                                                </div>
                                                <div className="w-[100%] flex items-center justify-center">
                                                    <input className="w-[100%] text-[20px] text-center focus:outline-none"/>
                                                </div>
                                                <div className="px-[10px] cursor-pointer">
                                                    <p className="text-[20px]">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="text-[23px]  py-[8px]">Rs. 500</p>
                                        <div className="flex flex-col leading-[22px]">
                                            <div className="cursor-pointer w-fit">
                                                <p className="">Favourites</p>
                                            </div>
                                            <div className="cursor-pointer w-fit">
                                                <p className="text-red-600">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between ">
                                    <div className="flex flex-row  space-x-[10px]">
                                        <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                                            <Image alt="" src={ProductImage} height={90} />
                                        </div>
                                        <div className="py-[8px] leading-[24px]">
                                            <p className="text-[20px] text-gray-800">Anchor Drinking Yoghurt - 180 ml</p>
                                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                                                <p className="text-[16px] text-gray-600">Rs.100</p>
                                                <p className="text-gray-600">|</p>
                                                <p className=" text-green-700">In Stock</p>
                                            </div>
                                            <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                                <div className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center">
                                                    <div className="bg-black h-[1px] w-[10px]"></div>
                                                </div>
                                                <div className="w-[100%] flex items-center justify-center">
                                                    <input className="w-[100%] text-[20px] text-center focus:outline-none"/>
                                                </div>
                                                <div className="px-[10px] cursor-pointer">
                                                    <p className="text-[20px]">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="text-[23px]  py-[8px]">Rs. 500</p>
                                        <div className="flex flex-col leading-[22px]">
                                            <div className="cursor-pointer w-fit">
                                                <p className="">Favourites</p>
                                            </div>
                                            <div className="cursor-pointer w-fit">
                                                <p className="text-red-600">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="w-[100%] h-[120px] pl-[5px] pr-[20px] py-[4.5px] bg-white h-[100%]  rounded-[8px] ring-gray-500 ring-[0.5px] flex flex-row   justify-between ">
                                    <div className="flex flex-row  space-x-[10px]">
                                        <div className="bg-gray-200 ring-[0px] ring-gray-500 w-[110px] flex items-center justify-center h-[110px] rounded-[6px]">
                                            <Image alt="" src={ProductImage} height={90} />
                                        </div>
                                        <div className="py-[8px] leading-[24px]">
                                            <p className="text-[20px] text-gray-800">Anchor Drinking Yoghurt - 180 ml</p>
                                            <div className="flex flex-row items-center  space-x-[10px] ml-[10px]">
                                                <p className="text-[16px] text-gray-600">Rs.100</p>
                                                <p className="text-gray-600">|</p>
                                                <p className=" text-green-700">In Stock</p>
                                            </div>
                                            <div className="bg-white ring-[1px] ring-gray-400 h-[30px] mt-[10px] ml-[10px] w-[90px] rounded-[5px] flex flex-row items-center justify-center">
                                                <div className="px-[10px] cursor-pointer h-[100%] flex items-center justify-center">
                                                    <div className="bg-black h-[1px] w-[10px]"></div>
                                                </div>
                                                <div className="w-[100%] flex items-center justify-center">
                                                    <input className="w-[100%] text-[20px] text-center focus:outline-none"/>
                                                </div>
                                                <div className="px-[10px] cursor-pointer">
                                                    <p className="text-[20px]">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="text-[23px]  py-[8px]">Rs. 500</p>
                                        <div className="flex flex-col leading-[22px]">
                                            <div className="cursor-pointer w-fit">
                                                <p className="">Favourites</p>
                                            </div>
                                            <div className="cursor-pointer w-fit">
                                                <p className="text-red-600">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[38%] h-[100vh]  py-[15px]  ">
                        <div ref={fixedRef} className={`${isFixed? 'fixed' : ' static '} py-[10px] px-[20px] rounded-[15px] ring-[0.5px] w-[30%] bg-gray-300 h-[80%] `}>
                            <p className="text-[20px] text-gray-700">Order Summary</p>
                            <div className="h-[0.5px] w-[100%]  mt-[10px] bg-black"></div>
                            <div className="flex flex-col my-[10px]">
                                <div className="flex flex-row justify-between ">
                                    <p>Sub total</p>
                                    <p>Rs. 20000</p>
                                </div>
                                <div className="flex flex-row justify-between ">
                                    <p>Delivery Charge</p>
                                    <p>Rs. 500</p>
                                </div>
                                
                            </div>
                            <div className="h-[0.5px] w-[100%] bg-black"></div>
                                <div className="flex flex-row justify-between my-[18px]">
                                    <input className="border-[0.5px] w-[250px] rounded-[5px] px-[10px] focus:outline-none " placeholder="Enter coupon number"/>
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
                                <div className="bg-gray-500 rounded-[10px] py-[10px] cursor-pointer flex items-center justify-center ">
                                    <p>Proceed to Checkout</p>
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
                <div className="w-[95%]">
                    <YouMightLike/>
                </div>
            </div>
            <Max/>
            <Footer/>
        </div>
    )
}

export default CartPage;