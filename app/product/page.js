import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

import Image from "next/image"
import ProductImage2 from '../images/product.png'
import Star from '../images/log.png'
import { ST } from "next/dist/shared/lib/utils"
import Max from "../components/Max";
import Product from "../components/Product"


const ProductPage = () => {
    return (
        <div>
            <Navigation/>
            <div className="text-black  bg-[#F5F5F5] w-[100%] flex flex-col space-y-[10px] justify-center items-center ">
                <div className="bg-gradient-to-b pt-[16vh] flex flex-col items-center justify-center   from-gray-400 to-[#F5F5F5] h-[100%] w-[100%] ">
                    
                    <div className="w-[94vw]   flex flex-row justify-center items-center rounded-[15px] overflow-hidden  ">
                        <div className=" select-none w-[38.2%] ml-[10px] border-[0.5px] border-gray-500 rounded-[10px] bg-[#F5F5F5] h-[80vh] ">
                            <div className="leading-[25px]  py-[20px] px-[25px]">
                                <p className="leading-[32px] text-[28px] w-[80%]">Anchor Low Fat Yoghurt Drink - 180 ml</p>
                                
                                <div className="flex relative flex-row items-center justify-between">
                                    <div>
                                        <p className=" text-[20px] ml-[10px] text-orange-500">Mango Passion</p>
                                        <div className="flex flex-row items-center  space-x-[3px]">
                                            <Image alt="" src={Star} height={14}/>
                                            <Image alt="" src={Star} height={14}/>
                                            <Image alt="" src={Star} height={14}/>
                                            <Image alt="" src={Star} height={14}/>
                                            <Image alt="" src={Star} height={14}/>
                                            <p className="text-gray-700 text-[13px]">4.8(50)</p>
                                        </div>
                                    </div>

                                    <div className="absolute text-black flex flex-col items-center top-[10px] right-[0px]">
                                
                                        <div className="rounded-full text-black ring-gray-800 ring-[0.5px] px-[15px] py-[0px] cursor-pointer  bg-[#FDAA1C] ">
                                            <p className="text-[13px]">Ask Max</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center justify-between">
                                    <div className="mt-[20px]">
                                        <p className="text-[35px] mt-[5px]">Rs. 500</p>
                                        <p className="text-[15px] pl-[5px] text-gray-600"><s>MRP: Rs. 850</s></p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center leading-[20px]">
                                        <p>Heart</p>
                                        <p className="text-green-800 text-[17px]">In Stock</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center my-[10px]">
                                    <div className="bg-gray-500 h-[0.5px] w-[98%]"></div>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center justiify-center space-x-[10px]">
                                        <p className="text-[20px]">Quantity</p>
                                       
                                            
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
                                <div className="text-[15px] leading-[22px]">
                                    <div className="flex flex-row items-center justify-between">
                                        <p>Delivery</p>
                                        <p>Colombo-15, Sri Lanka</p>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <p>Sub Total</p>
                                        <p>Rs. 500</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row space-x-[8px] flex items-center justify-center mt-[10px]">
                                    <div className="w-[50%] bg-[#FDAA1C] py-[5px] cursor-pointer rounded flex items-center justify-center">
                                        <p>Add to Cart</p>
                                    </div>
                                    <div className="w-[50%] cursor-pointer bg-[#101010] text-white flex py-[5px]  rounded items-center justify-center ">
                                        <p>Buy now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[61.8%] flex flex-col space-y-[30px] items-center justify-center  h-[83vh] ">
                            <div className="w-[100%] relative h-[350px] flex flex-row justify-center items-end">
                                <Image alt="" src={ProductImage2} height={350} />
                                
                                

                                <div className="absolute text-black flex flex-col items-center  right-[100px] ">
                                <p>VR</p>
                                    <div className="rounded-[7px] h-[60px] bg-white ring-[0.5px] ring-gray-500 w-[60px]">
                                    
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-row justify-center items-center space-x-[10px]">
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                                <div className="w-[50px] cursor-pointer bg-gray-300 ring-gray-800 ring-[0.5px] rounded h-[50px]">

                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="w-[94vw]  flex flex-col ">
                    
                    <div className="bg-white  py-[20px] px-[25px] ring-[0.5px] ring-gray-500 rounded-[15px] mt-[10px]  w-[100%]">
                        <p className="text-[25px]">Product Details</p>
                        
                        <div className="h-[50vh] my-[10px] bg-gray-100 rounded-[10px] ring-[0.5px] ring-gray-500 w-[100%]">

                        </div>
                        
                        <p className="text-[25px]">Reviews & Ratings</p>
                        <div className=" w-[100%] ">
                            <div className="flex space-x-[10px] py-[15px] pl-[20px] flex-row">
                                <div>
                                    <p className="text-[130px] leading-[120px]  text-[#FDAA1C]">4.8</p>
                                </div>
                                <div className="flex flex-col leading-[20px] justify-center">
                                    <div className="flex flex-row space-x-[3px]  items-center ">
                                        <p className="text-[10px] text-gray-700"><span className="text-[17px] text-orange-500 pr-[2px] ">5.0</span>(28)</p>
                                        <div className="bg-[#FDAA1C] rounded-full w-[110px] h-[10px]"></div>
                                    </div>
                                    <div className="flex flex-row space-x-[3px] items-center ">
                                        <p className="text-[10px] text-gray-700"><span className="text-[17px] text-orange-500 pr-[2px] ">4.0</span>(28)</p>
                                        <div className="bg-[#FDAA1C] rounded-full w-[90px] h-[10px]"></div>
                                    </div>
                                    <div className="flex flex-row space-x-[3px] items-center ">
                                        <p className="text-[10px] text-gray-700"><span className="text-[17px] text-orange-500 pr-[2px] ">3.0</span>(28)</p>
                                        <div className="bg-[#FDAA1C] rounded-full w-[70px] h-[10px]"></div>
                                    </div>
                                    <div className="flex flex-row space-x-[3px] items-center ">
                                        <p className="text-[10px] text-gray-700"><span className="text-[17px] text-orange-500 pr-[2px] ">2.0</span>(28)</p>
                                        <div className="bg-[#FDAA1C] rounded-full w-[50px] h-[10px]"></div>
                                    </div>
                                    <div className="flex flex-row space-x-[3px] items-center">
                                        <p className="text-[10px] text-gray-700"><span className="text-[17px] text-orange-500 pr-[2px] ">1.0</span>(28)</p>
                                        <div className="bg-[#FDAA1C] rounded-full w-[30px] h-[10px]"></div>
                                    </div>
                                </div>
                            </div>
                        <div className="flex flex-col pb-[18px] space-y-[10px] ">
                            <div className="flex flex-col ring-gray-500 ring-[0.5px] p-[10px] space-y-[10px] w-[100%] h-[22vh] bg-gray-100 rounded-[10px]">
                                <div className="flex flex-row justify-between items-center px-[10px] py-[5px]">
                                    <div className="flex flex-row items-center space-x-[8px]">
                                        <div className="rounded-full bg-white ring-[0.5px] ring-gray-500 h-[40px] w-[40px]"></div>
                                        <div className="flex flex-col leading-[21px]">
                                            <p className="text-[19px]">John Doe</p>
                                            <p className="text-[10px] bg-green-600 h-[16px] flex items-center justify-center px-[6px] rounded-[2px] ">Authorized Buyer</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-[5px]">
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col ring-gray-500 ring-[0.5px] p-[10px] space-y-[10px] w-[100%] h-[22vh] bg-gray-100 rounded-[10px]">
                                <div className="flex flex-row justify-between items-center px-[10px] py-[5px]">
                                    <div className="flex flex-row items-center space-x-[8px]">
                                        <div className="rounded-full bg-white ring-[0.5px] ring-gray-500 h-[40px] w-[40px]"></div>
                                        <div className="flex flex-col leading-[21px]">
                                            <p className="text-[19px]">John Doe</p>
                                            <p className="text-[10px] bg-green-600 h-[16px] flex items-center justify-center px-[6px] rounded-[2px] ">Authorized Buyer</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-[5px]">
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col ring-gray-500 ring-[0.5px] p-[10px] space-y-[10px] w-[100%] h-[22vh] bg-gray-100 rounded-[10px]">
                                <div className="flex flex-row justify-between items-center px-[10px] py-[5px]">
                                    <div className="flex flex-row items-center space-x-[8px]">
                                        <div className="rounded-full bg-white ring-[0.5px] ring-gray-500 h-[40px] w-[40px]"></div>
                                        <div className="flex flex-col leading-[21px]">
                                            <p className="text-[19px]">John Doe</p>
                                            <p className="text-[10px] bg-green-600 h-[16px] flex items-center justify-center px-[6px] rounded-[2px] ">Authorized Buyer</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-[5px]">
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="w-[100%] flex items-center justify-end px-[20px]">
                                <div className="bg-gray-400 ring-[0.5px] ring-gray-700 w-fit px-[13px] py-[5px] rounded-[5px] text-[15px] cursor-pointer">
                                    <p>View more</p>
                                </div>
                            </div>

                        
                           
                        </div>
                        </div>
                    </div>
                </div>
                <div className="w-[94vw]  flex flex-col  rounded-[15px]  ">
                        <p className="text-[25px]">Customers Also Bought</p>
                        <div className="flex items-center justify-center" >
                        <div className=" grid grid-cols-6 w-[95%] gap-[5px] pt-[15px] pb-[45px]">
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            
                        
                        </div>
                    </div>
                </div>

                <div className="w-[94vw]  flex flex-col  rounded-[15px]  ">
                        <p className="text-[25px]">Products Related to This Product</p>
                        <div className="flex items-center justify-center" >
                        <div className=" grid grid-cols-6 w-[95%] gap-[5px] pt-[15px] pb-[45px]">
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            
                        
                        </div>
                    </div>
                </div>

                
            </div>
            <Max/>
            <Footer/>

            
            
        </div>
    )

}

export default ProductPage