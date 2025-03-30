'use client'

import Image from "next/image";
import Cart from '../images/cartLogo.png'
import Menu from '../images/menu.png'
import { useRouter } from "next/navigation";

const Navigation = () => {

    const Router = useRouter();

    const handleNavLoginClick = () => {
        Router.push('/login');
    }

    return(
        <div className="flex flex-col justify-center  fixed z-[100]  w-[100%] items-center ">

            <nav className="bg-white w-[95vw] drop-shadow-md ring-gray-600 ring-[0.5px] mt-[5px] h-[14vh] rounded-[10px]" >
                <div className="flex px-[30px] rounded-t-[10px] space-x-[10px] text-white bg-[#0A0A0A] justify-between items-center h-[67%]">
                    <div className="cursor-pointer" onClick={() => Router.push('/')}>
                        <p className="text-[30px]">Everest</p>
                    </div>
                    <div className="flex flex-row ml-[10px]  w-[100%]">
                        <div className="bg-[#E6E6E6] border border-r-gray-400 h-[5.6vh]  flex items-center justify-center rounded-l-[5px] ">
                            <select className="focus:outline-none text-[15px] h-[100%] cursor-pointer pl-[10px] mr-[5px] text-black">
                                <option>All Categories</option>
                            </select>
                        </div>
                        <div className="bg-white flex flex-row w-[100%] items-center">
                            <input className="placeholder-gray-600 focus:outline-none w-[100%] px-[18px] py-[5px] text-black" placeholder="Search Anything"/>
                        </div>
                        <div className="bg-[#FDAA1C] cursor-pointer h-[5.6vh] w-[8vh] rounded-r-[5px] ">

                        </div>

                    </div>
                    <div className="flex flex-col items-center justify-center leading-[18px] pl-[10px]" >
                        {/* <p className="leading-[16px] text-[15px]">Hello Nivakaran!</p> */}
                        <p className="text-[12px]">Hello!</p>
                        <div className="bg-[#FDAA1C] cursor-pointer text-black px-[14px] py-[3px] text-[13px] rounded-full  flex items-center justify-center" onClick={handleNavLoginClick}>
                            <p>Login</p>
                        </div>
                    </div>
                    <div className="relative group">
                    
                        <Image className="cursor-pointer" src={Cart} alt="Cart" width={60} height={60} />
                        
                        <div className=" w-[50vh] bg-[#F5F5F5] hidden group-hover:block p-[10px] absolute right-[2%] top-[6.4vh] drop-shadow-sm rounded-[10px] ring-gray-800 ring-[0.5px] ">
                            <div className="bg-white w-[100%] h-[10%] flex space-x-[5px] cursor-pointer flex-row justify-between h-[75px] rounded-[5px] ring-[0.5px] ring-gray-800 items-center text-black p-[5px]">
                                <div className="h-[65px] w-[24%] bg-[#808080] rounded-[5px]">

                                </div>
                                <div className="w-[76%]">
                                <p className="text-[15px] px-[5px] leading-[17px]">Anchor Low Fat Youghurt Drink - 180 ml</p>
                                <p className="text-[13px] px-[5px]">Quantity: 5</p>
                                </div>
                                

                            </div>
                            <div onClick={() => Router.push('/cart')} className="text-black  bg-[#FDAA1C] w-[100%] py-[4px] flex items-center justify-center rounded-[5px] cursor-pointer mt-[8px]">
                                <p className="select-none">View All Products</p>
                            </div>

                        </div>
                    </div>
                
                </div>
                <div className="flex rounded-b-[9px] flex-row items-center px-[20px] text-[14.5px] text-black space-x-[20px] w-[100%] h-[33%] bg-[#808080]">
                    <div className="flex flex-row cursor-pointer space-x-[4px] items-center">
                        <Image alt="Menu" src={Menu} className="h-[15px] w-[19px]"   />
                        <p>All Categories</p>
                    </div>
                    <div className="cursor-pointer">
                        <p>Latest deals</p>
                    </div>
                    <div className="cursor-pointer">
                        <p>Buy again</p>
                    </div>
                    <div className="cursor-pointer">
                        <p>Order History</p>
                    </div>
                    <div className="cursor-pointer">
                        <p>Favourites</p>
                    </div>
                </div>
                
                
            </nav>
            

            <div className="hidden bg-white text-black rounded-[10px] z-[100] w-[95%] space-x-[10px] ">
                <div className="flex py-[10px] flex-col w-[20%] justify-center items-center ">
                    <div className="py-[10px]">
                        <p>Tea & Coffee</p>
                    </div>
                    <div className="bg-gray-500 w-[90%] h-[0.5px]"></div>
                    <div className="py-[10px]">
                        <p>Tea & Coffee</p>
                    </div>
                    <div className="bg-gray-500 w-[90%] h-[0.5px]"></div>
                    <div className="py-[10px]">
                        <p>Tea & Coffee</p>
                    </div>
                    <div className="bg-gray-500 w-[90%] h-[0.5px]"></div>
                    <div className="py-[10px]">
                        <p>Tea & Coffee</p>
                    </div>
                    <div className="bg-gray-500 w-[90%] h-[0.5px]"></div>
                    <div className="py-[10px]">
                        <p>Tea & Coffee</p>
                    </div>
                </div>
                <div className="w-[80%]">

                </div>
            </div>

        </div>
    )
}

export default Navigation;