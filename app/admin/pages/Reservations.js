




import Image from "next/image"
import Bed from '../images/aii.jpg'


const Reservations = () => {
    return(
        <div>
            <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
                <div className="bg-gray-200 rounded-[10px] py-[10px] px-[15px] w-[80%]">
                    <p className="text-[18px]">Reservations</p>
                    <div className="flex flex-col space-y-[235px] justify-between">
                        <div className="flex flex-col space-y-[5px] w-[100%] ">
                            <div className="flex flex-row text-[13px] ">
                                <div className=" pl-[8px] w-[265px]">
                                    <p>Image</p>
                                </div>
                                <div className="w-[135px]">
                                    <p>Type</p>
                                </div>
                                <div className="w-[198px]">
                                    <p>Meal</p>
                                </div>
                                <div className="w-[122px]">
                                    <p>Rate</p>
                                </div>
                                <div className="w-[90px] ">
                                    <p>Status</p>
                                </div>
                                <div className="w-[auto]">
                                    <p>Action</p>
                                </div>
                                
                            </div>
                            <div className="flex flex-row bg-gray-100 rounded-[10px]  text-[13px]">
                                <div className="flex flex-row w-[265px] pl-[10px] py-[10px]  justify-center">
                                    <div className=" overflow-hidden rounded-[10px] w-[55%]">
                                        <Image src={Bed} alt="bed" className="h-[80px] w-[auto]" />
                                    </div>
                                    <div className="flex flex-col pl-[8px] pr-[10px] w-[45%] justify-center">
                                        <p>#B17</p>
                                        <p>Luxury Queen Bed With Garden View</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-[135px] ">
                                    <div className="bg-yellow-200 px-[10px] py-[2px] rounded text-yellow-600">
                                        <p>Queen Bed</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[198px] justify-center">
                                    <p>Complementary Breakfast</p>
                                    <p>Afternoon Snacks</p>
                                </div>
                                <div className="flex w-[122px] flex-col  justify-center">
                                    <p>$225.50/Day</p>
                                </div>
                                <div className="flex w-[90px] flex-col  justify-center">
                                    <div className="bg-green-200 w-fit px-[10px] py-[2px] rounded text-green-600">
                                        <p>Allocated</p>
                                    </div>
                                </div>
                                <div className="flex flex-col  justify-center">
                                    <p>Icon</p>
                                </div>
                                
                            </div>
                            <div className="flex flex-row bg-white rounded-[10px]  text-[13px]">
                                <div className="flex flex-row w-[265px] pl-[10px] py-[10px]  justify-center">
                                    <div className=" overflow-hidden rounded-[10px] w-[55%]">
                                        <Image src={Bed} alt="bed" className="h-[80px] w-[auto]" />
                                    </div>
                                    <div className="flex flex-col pl-[8px] pr-[10px] w-[45%] justify-center">
                                        <p>#C29</p>
                                        <p>Luxury King With Private pool</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-[135px] ">
                                    <div className="bg-orange-200 px-[10px] py-[2px] rounded text-orange-600">
                                        <p>Single Bed</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[198px] justify-center">
                                    <p>Complementary Breakfast</p>
                                    
                                </div>
                                <div className="flex w-[122px] flex-col  justify-center">
                                    <p>$1280.50/Day</p>
                                </div>
                                <div className="flex w-[90px] flex-col  justify-center">
                                    <div className="bg-green-200 w-fit px-[10px] py-[2px] rounded text-green-600">
                                        <p>Allocated</p>
                                    </div>
                                </div>
                                <div className="flex flex-col  justify-center">
                                    <p>Icon</p>
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
                    <p>Add Reservation</p>
                    <div className="flex flex-row space-x-[5px] py-[8px]">
                        <div className="text-[13px] w-[50%]  flex flex-col space-y-[2px]">
                            <p>Room Type</p>
                            <div className="ml-[3px] px-[5px] py-[4px] border-gray-400 border-[1px] bg-white cursor-pointer w-fit rounded">
                                <select className="focus:outline-none">
                                    <option>Single Bed</option>
                                    <option>Queen Bed</option>
                                    <option>Luxury King</option>
                                    <option>Double Bed</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Room Number</p>
                            <div className="ml-[3px] ">
                                <input  className="px-[5px] focus:outline-none py-[4px] w-[100px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[5px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Room Name</p>
                            <div className="ml-[3px] ">
                                <input  className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Rate</p>
                            <div className="ml-[3px] ">
                                <input  className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="text-[13px] bg-white mb-[8px] py-[7px] rounded-[8px] border-gray-400 border-[1px] ">
                        <p className="px-[10px] mb-[5px]">Upload</p>
                        <div className="text-center h-[100px] flex flex-col border-gray-400 items-center justify-center border-y-[1px]">
                            <p><span className="text-blue-700 cursor-pointer">Click to upload</span> or drag and drop</p>
                            <p className="text-[11px]">[Max File size: 25 MB]</p>
                        </div>
                        <div>
                            <div className="leading-[14px] pt-[8px] px-[10px]">
                                <p>Room image 1.jpge</p>
                                <p className="text-[10px]  text-gray-500">200 KB</p>
                            </div>
                            <div className="flex flex-row items-center  justify-center space-x-[5px]">
                                <div className="w-[79%] h-[3px] bg-black rounded-[10px]"></div>
                                <p className="text-[10px] text-gray-700 ">40%</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row justify-end  space-x-[5px] text-[13px] ">
                        <div className="bg-white px-[10px] py-[3px] flex items-center justify-center cursor-pointer rounded border-[1px] text-gray-600 border-gray-500">
                            <p>Save as Draft</p>
                        </div>
                        <div className="bg-blue-600 text-white flex items-center justify-center px-[10px] py-[3px] cursor-pointer rounded border-[1px] border-gray-500">
                            <p>Add Room</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservations