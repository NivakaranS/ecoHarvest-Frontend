

import React from "react"

import Image from "next/image"
import Bed from '../images/aii.jpg'


const Restuarant = () => {
    return(
        <div>
            <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
                <div className="bg-gray-200 rounded-[10px] pb-[10px] pt-[5px] px-[15px] w-[85%] ">
                    <div className="flex justify-between items-center ">
                        <p className="text-[18px]">Food List</p>
                        <div className="bg-blue-600 text-[14px] text-white flex items-center justify-center px-[10px] py-[1.5px] cursor-pointer rounded border-[1px] border-gray-500">
                            <p >Add Food</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-[97%] ">
                        <div className="flex flex-col  space-y-[5px] w-[100%] items-center mt-[2px] ">
                            <div className="flex my-[5px] text-[14px] flex-row w-[90%] justify-around">
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p >All</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Pizza</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Drinks</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Sushi</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Burger</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Set Menu</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Pasta</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>Momos</p>
                                </div>
                                <div className="bg-white cursor-pointer border-gray-400 border-[1px] pt-[2px] px-[12px] flex items-center justify-center h-[25px] rounded ">
                                    <p>View List</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] grid gap-2 mt-[5px] grid-cols-3  h-fit  mb-[10px] rounded-[10px]">
                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[8px] border-gray-400 pb-[8px] h-fit border-[1px]">
                                <div className="m-[5px] rounded-[8px] w-[96%] h-[130px] overflow-hidden ">
                                    <Image alt="food" src={Bed} className="w-[100%] h-fit"/>
                                </div>
                                <div className="text-[14px] mb-[5px] px-[10px] flex justify-between ">
                                    <p>Pama Paw Salad</p>
                                    <p>4.7</p>
                                </div>
                                <div className="flex text-[12px] flex-row justify-between px-[10px]">
                                    <div className="leading-[16px]">
                                        <p className="text-gray-600 text-[13px]">Price</p>
                                        <p className="font-semi-bold text-[13px]">Rs.25.50</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Order</p>
                                        <p className="font-semi-bold text-[13px]">5452</p>
                                    </div>
                                    <div className="h-[35px] w-[0.5px] bg-black"></div>
                                    <div className="leading-[15px]">
                                        <p className="text-gray-600 text-[13px]">Repeat Buyers</p>
                                        <p className="font-semi-bold text-[13px]">35%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-[8px]  flex justify-end border-gray-500 border-t-[1px] px-[15px] ">
                            <div className="flex flex-row text-[13px] space-x-1">
                                <div className="bg-white hover:bg-gray-300 cursor-pointer px-[10px]  flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>Prev</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer w-[24px] flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>1</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer w-[24px] flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>2</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer w-[24px] flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>...</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer w-[24px] flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>9</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer w-[24px] flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>10</p>
                                </div>
                                <div className="bg-white hover:bg-gray-300 cursor-pointer px-[10px]  flex items-center justify-center border-[1px] border-gray-600 rounded h-[24px]">
                                    <p>Next</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                <div className=" py-[10px] px-[10px] bg-gray-200 rounded-[10px] h-[85%] w-[30%]">
                    <p>Orders</p>
                    
                    <div className=" flex flex-row mt-[5px] mb-[10px]  space-x-[5px] text-[13px] ">
                        
                        <div className="bg-blue-600 text-white flex items-center justify-center px-[10px] py-[3px] cursor-pointer rounded border-[1px] border-gray-500">
                            <p>Active</p>
                        </div>
                        <div className="bg-white px-[10px] py-[3px] flex items-center justify-center cursor-pointer rounded border-[1px] text-gray-600 border-gray-500">
                            <p>Past</p>
                        </div>
                        <div className="bg-white px-[10px] py-[3px] flex items-center justify-center cursor-pointer rounded border-[1px] text-gray-600 border-gray-500">
                            <p>Cancelled</p>
                        </div>
                    </div>
                    <div className="flex space-y-[5px] flex-col overflow-y-scroll scroll-w-[5px] h-[85%]">
                        <div className="flex flex-row bg-white p-[5px] rounded-[8px]">
                            <div className="bg-gray-300 w-[80px] h-[70px] overflow-hidden rounded-[5px]">
                                <Image src={Bed} alt="bed" className="h-[100%] w-fit" />
                            </div>
                            <div className="flex flex-row justify-between p-[5px]  w-[80%] text-[13px]">
                                <div>
                                    <p className="text-[11px]">#4586559234</p>
                                    <p className="">Eggs Aulete</p>
                                </div>
                                <div>Rs. 45.45</div>
                            </div>
                        </div>
                        <div className="flex flex-row bg-white p-[5px] rounded-[8px]">
                            <div className="bg-gray-300 w-[80px] h-[70px] overflow-hidden rounded-[5px]">
                                <Image src={Bed} alt="bed" className="h-[100%] w-fit" />
                            </div>
                            <div className="flex flex-row justify-between p-[5px]  w-[80%] text-[13px]">
                                <div>
                                    <p className="text-[11px]">#4586559234</p>
                                    <p className="">Sushi Blast</p>
                                </div>
                                <div>Rs. 45.45</div>
                            </div>
                        </div>
                        <div className="flex flex-row bg-white p-[5px] rounded-[8px]">
                            <div className="bg-gray-300 w-[80px] h-[70px] overflow-hidden rounded-[5px]">
                                <Image src={Bed} alt="bed" className="h-[100%] w-fit" />
                            </div>
                            <div className="flex flex-row justify-between p-[5px]  w-[80%] text-[13px]">
                                <div>
                                    <p className="text-[11px]">#4586559234</p>
                                    <p className="">Egg Nuska</p>
                                </div>
                                <div>Rs. 45.45</div>
                            </div>
                        </div>
                        <div className="flex flex-row bg-white p-[5px] rounded-[8px]">
                            <div className="bg-gray-300 w-[80px] h-[70px] overflow-hidden rounded-[5px]">
                                <Image src={Bed} alt="bed" className="h-[100%] w-fit" />
                            </div>
                            <div className="flex flex-row justify-between p-[5px]  w-[80%] text-[13px]">
                                <div>
                                    <p className="text-[11px]">#4586559234</p>
                                    <p className="">Veg Pasta</p>
                                </div>
                                <div>Rs. 45.45</div>
                            </div>
                        </div>
                        <div className="flex flex-row bg-white p-[5px] rounded-[8px]">
                            <div className="bg-gray-300 w-[80px] h-[70px] overflow-hidden rounded-[5px]">
                                <Image src={Bed} alt="bed" className="h-[100%] w-fit" />
                            </div>
                            <div className="flex flex-row justify-between p-[5px]  w-[80%] text-[13px]">
                                <div>
                                    <p className="text-[11px]">#4586559234</p>
                                    <p className="">Prome Night</p>
                                </div>
                                <div>Rs. 45.45</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restuarant