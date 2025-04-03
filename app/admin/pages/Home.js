import Profile from "../images/profile5.png";
import Image from "next/image";

import Select from "react-select";

const options = [
  { value: "none", label: "None" },
  {
    value: "kristin",
    label: (
      <div className="flex items-center">
        <Image src={Profile} alt="profile" width={20} height={20} />
        <span className="ml-2">Kristin Watson</span>
      </div>
    ),
  },
  {
    value: "cameron",
    label: (
      <div className="flex items-center">
        <Image src={Profile} alt="profile" width={20} height={20} />
        <span className="ml-2">Cameron Will</span>
      </div>
    ),
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
        <div className="bg-gray-200 rounded-[10px] pb-[10px] pt-[12px] px-[15px] w-[70%] ">
          <div className="flex justify-between items-center ">
            <p className="text-[18px]">Overview</p>
            <div className="bg-white text-[14px] text-black flex items-center justify-center px-[5px] py-[3px] cursor-pointer rounded border-[1px] border-gray-500">
              <select className="focus:outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          <div className="grid bg-white px-[10px] py-[10px] rounded-[10px] grid-cols-4 gap-2 text-[13px] mt-[10px]">
            <div className="bg-green-200 p-[8px] h-[80px] rounded-[10px]">
              <p>Today&apos;s Check in</p>
              <div className="flex flex-row items-center px-[5px] justify-between mt-[5px] text-[12px]">
                <div className="leading-[14px]">
                  <p>24 %</p>
                  <p>Last 7 Days</p>
                </div>
                <p className="text-[25px]">23</p>
              </div>
            </div>
            <div className="bg-red-200 p-[8px] h-[80px] rounded-[10px]">
              <p>Today&apos;s Check out</p>
              <div className="flex flex-row items-center px-[5px] justify-between mt-[5px] text-[12px]">
                <div className="leading-[14px]">
                  <p>11 %</p>
                  <p>Last 7 Days</p>
                </div>
                <p className="text-[25px]">21</p>
              </div>
            </div>
            <div className="bg-blue-200 p-[8px] h-[80px] rounded-[10px]">
              <p>Rooms Available</p>
              <div className="flex flex-row items-center px-[5px] justify-between mt-[5px] text-[12px]">
                <div className="leading-[14px]">
                  <p>41 %</p>
                  <p>Last 7 Days</p>
                </div>
                <p className="text-[25px]">25</p>
              </div>
            </div>
            <div className="bg-yellow-200 p-[8px] h-[80px] rounded-[10px]">
              <p>Rooms Reserved</p>
              <div className="flex flex-row items-center px-[5px] justify-between mt-[5px] text-[12px]">
                <div className="leading-[14px]">
                  <p>59 %</p>
                  <p>Last 7 Days</p>
                </div>
                <p className="text-[25px]">12</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 text-[13px] text-white gap-4 mt-[10px]">
            <div className="bg-[url('/aii.png')] bg-black flex items-end  p-[8px] h-[120px] rounded-[10px]">
              <p>#B17-Double Bed</p>
            </div>
            <div className="bg-black p-[8px] h-[120px] flex items-end rounded-[10px]">
              <p>#B18-Luxury Queen</p>
            </div>
            <div className="bg-black p-[8px] h-[120px] flex items-end rounded-[10px]">
              <p>#B19-Double Bed</p>
            </div>
            <div className="bg-black flex text-[15px] items-center justify-center p-[8px] h-[120px] rounded-[10px]">
              <p>154+</p>
            </div>
          </div>
          <div className="flex flex-col px-[15px] rounded-[10px] py-[10px] mt-[10px] bg-white">
            <div className="flex flex-row justify-between">
              <p className="">Guest List</p>
              <div className="bg-blue-600 text-[14px] text-white flex items-center justify-center px-[10px] py-[3px] cursor-pointer rounded border-[1px] border-gray-500">
                <p>New Guest</p>
              </div>
            </div>
            <div>
              <div className="flex flex-row  justify-between mt-[10px] text-[13px]">
                <div className="w-[115px]">
                  <p>Guest Name</p>
                </div>
                <div className=" w-[115px]">
                  <p>Check in</p>
                </div>
                <div className=" w-[100px]">
                  <p>Check out</p>
                </div>
                <div className=" w-[100px]">
                  <p>Room Type</p>
                </div>
                <div className=" w-[100px]">
                  <p>Allocated Room</p>
                </div>
                <div className="w-[100px]">
                  <p>Due Amount</p>
                </div>
              </div>
              <div className="flex text-gray-600 flex-row mt-[5px]  text-[12px]">
                <div className="w-[115px]">
                  <p>Therasa Webb</p>
                </div>
                <div className=" w-[118px]">
                  <p>Aug 23; 21:15:33</p>
                </div>
                <div className=" w-[100px]">
                  <p>-</p>
                </div>
                <div className=" w-[100px]">
                  <p>Single Bed</p>
                </div>
                <div className=" w-[103px]">
                  <p>#B25</p>
                </div>
                <div className=" w-[97px]">
                  <p>Rs. 256</p>
                </div>
              </div>
              <div className="w-[100%] bg-gray-500 h-[0.5px] mt-[5px]"></div>
              <div className="flex text-gray-600 flex-row mt-[5px] text-[12px]">
                <div className="w-[115px] ">
                  <p>Jerome Bell</p>
                </div>
                <div className=" w-[118px] ">
                  <p>Aug 23; 24:19:47</p>
                </div>
                <div className=" w-[100px]">
                  <p>-</p>
                </div>
                <div className=" w-[100px]">
                  <p>Single Bed</p>
                </div>
                <div className=" w-[103px]">
                  <p>#H29</p>
                </div>
                <div className=" w-[97px]">
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-[10px] pb-[0px] px-[15px] bg-gray-200 rounded-[10px] h-[100%] w-[40%]">
          <p>Room Clean</p>
          <div className="bg-white rounded-[10px] mt-[5px] px-[10px] py-[5px] ">
            <div className="flex flex-row mb-[3px] text-[13px]">
              <div className="w-[70px] ">
                <p>Room</p>
              </div>
              <div className="w-[110px]">
                <p>Status</p>
              </div>
              <div className="w-[80px] ">
                <p>Task</p>
              </div>
              <div className="w-[120px]">
                <p>Assignee</p>
              </div>
            </div>
            <div className="flex text-gray-700 flex-row items-center  mb-[5px] text-[11px]">
              <div className="w-[70px] ">
                <p>#B25</p>
              </div>
              <div className="w-[110px]">
                <p>Not Allocated</p>
              </div>
              <div className="w-[80px] ">
                <p>Dirty</p>
              </div>
              <div className="w-[120px]">
                <Select
                  classNames={{
                    control: () =>
                      "bg-white h-3 min-h-0 border-red-300 hover:border-blue-500",
                    menu: () =>
                      "bg-white he- border border-gray-200 shadow-lg rounded-lg",
                    option: ({ isFocused, isSelected }) =>
                      `cursor-pointer  ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : isFocused
                          ? "bg-gray-200"
                          : "bg-white"
                      }`,
                    valueContainer: () => "py-0",
                    input: () => "py-0",
                  }}
                  options={options}
                />
              </div>
            </div>
            <div className="w-[100%] h-[0.5px] mb-[5px] bg-gray-400"></div>
            <div className="flex text-gray-700 flex-row items-center  mb-[5px] text-[11px]">
              <div className="w-[70px] ">
                <p>#B25</p>
              </div>
              <div className="w-[110px]">
                <p>Not Allocated</p>
              </div>
              <div className="w-[80px] ">
                <p>Dirty</p>
              </div>
              <div className="w-[120px]">
                <Select
                  classNames={{
                    control: () =>
                      "bg-white h-3 min-h-0 border-red-300 hover:border-blue-500",
                    menu: () =>
                      "bg-white he- border border-gray-200 shadow-lg rounded-lg",
                    option: ({ isFocused, isSelected }) =>
                      `cursor-pointer  ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : isFocused
                          ? "bg-gray-200"
                          : "bg-white"
                      }`,
                    valueContainer: () => "py-0",
                    input: () => "py-0",
                  }}
                  options={options}
                />
              </div>
            </div>
            <div className="w-[100%] h-[0.5px] mb-[5px] bg-gray-400"></div>
            <div className="flex text-gray-700 flex-row items-center  mb-[5px] text-[11px]">
              <div className="w-[70px] ">
                <p>#B25</p>
              </div>
              <div className="w-[110px]">
                <p>Not Allocated</p>
              </div>
              <div className="w-[80px] ">
                <p>Dirty</p>
              </div>
              <div className="w-[120px]">
                <Select
                  classNames={{
                    control: () =>
                      "bg-white h-3 min-h-0 border-red-300 hover:border-blue-500",
                    menu: () =>
                      "bg-white he- border border-gray-200 shadow-lg rounded-lg",
                    option: ({ isFocused, isSelected }) =>
                      `cursor-pointer  ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : isFocused
                          ? "bg-gray-200"
                          : "bg-white"
                      }`,
                    valueContainer: () => "py-0",
                    input: () => "py-0",
                  }}
                  options={options}
                />
              </div>
            </div>
            <div className="w-[100%] h-[0.5px] mb-[5px] bg-gray-400"></div>
            <div className="flex text-gray-700 flex-row items-center  mb-[5px] text-[11px]">
              <div className="w-[70px] ">
                <p>#B25</p>
              </div>
              <div className="w-[110px]">
                <p>Not Allocated</p>
              </div>
              <div className="w-[80px] ">
                <p>Dirty</p>
              </div>
              <div className="w-[120px]">
                <Select
                  classNames={{
                    control: () =>
                      "bg-white h-3 min-h-0 border-red-300 hover:border-blue-500",
                    menu: () =>
                      "bg-white he- border border-gray-200 shadow-lg rounded-lg",
                    option: ({ isFocused, isSelected }) =>
                      `cursor-pointer  ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : isFocused
                          ? "bg-gray-200"
                          : "bg-white"
                      }`,
                    valueContainer: () => "py-0",
                    input: () => "py-0",
                  }}
                  options={options}
                />
              </div>
            </div>
          </div>

          <div className="mt-[10px] ">
            <p>Quick Action</p>

            <div className="bg-white rounded-[10px] mt-[5px] px-[10px] py-[10px] ">
              <div className="flex text-[13px] flex-row">
                <div className="bg-white cursor-pointer mr-[8px] ring-1 ring-gray-300 rounded-[5px] py-[3px] px-[10px] ">
                  <p>Check in</p>
                </div>
                <div className="bg-blue-600 cursor-pointer text-white ring-1 ring-gray-300 rounded-[5px] py-[3px] px-[10px] ">
                  <p>Check out</p>
                </div>
              </div>
              <div className="text-[12px] flex flex-row space-x-4 my-[10px]">
                <div>
                  <p>Room No.</p>
                  <div className="bg-white mt-[5px] px-[10px] py-[3px] ring-[0.8px] rounded ring-gray-400 w-fit">
                    <select className="focus:outline-none">
                      <option>Select a room number</option>
                      <option>#B24</option>
                      <option>#H29</option>
                      <option>#C41</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p>Room Type</p>
                  <div className="bg-white mt-[5px] px-[10px] py-[3px] ring-[0.8px] rounded ring-gray-400 w-fit">
                    <select className="focus:outline-none">
                      <option>Select a room room type</option>
                      <option>Single Bed</option>
                      <option>Double Bed</option>
                      <option>Luxury King</option>
                      <option>Queen Bed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-[12px] flex flex-col  my-[10px]">
                <p>Guest Name</p>
                <input
                  className="mt-[5px] ring-1 focus:outline-none ring-gray-500 w-[91%] py-[5px] px-[10px] rounded "
                  placeholder="Guest name"
                />
              </div>

              <div className="h-[0.5px] w-[100%] bg-gray-500"></div>
              <div className="text-[12px] flex flex-row items-center justify-between w-[91%]  my-[5px]">
                <p>Total Charge</p>
                <p className="text-[15px]">Rs.1500.25</p>
              </div>
              <div className="h-[0.5px] mb-[8px] w-[100%] bg-gray-500"></div>
              <div className="flex text-[13px] justify-end w-[91%] flex-row">
                <div className="bg-white cursor-pointer mr-[8px] ring-1 ring-gray-300 rounded-[5px] py-[3px] px-[10px] ">
                  <p>Print Summary</p>
                </div>
                <div className="bg-blue-600 cursor-pointer text-white ring-1 ring-gray-300 rounded-[5px] py-[3px] px-[10px] ">
                  <p>Proceed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
