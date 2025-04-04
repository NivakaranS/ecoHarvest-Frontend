"use client";

import React from "react";

const Navigation = ({ handleNavClick, navClick }) => {
  return (
    <div>
      <div className="bg-white border-r-[1px] w-[17vw]  border-gray-400 flex flex-col justify-between text-black py-[15px]  h-[100vh]">
        <div>
          <div className="pb-[15px] rounded-[px]  px-[30px]">
            <p className="text-[35px] font-bold">NEWS</p>
          </div>
          {/* <div className="bg-black h-[1px] "></div> */}
          <div className=" h-[100%]">
            <div
              onClick={handleNavClick}
              className={`${
                navClick == "Guests" ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick == "User Management" ? "border-l-4 " : "ml-[14px]"
                } border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>User Management</p>
              </div>
            </div>
            <div
              onClick={handleNavClick}
              className={`${
                navClick == "Reservations" ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick == "Articles Management"
                    ? "border-l-4 "
                    : "ml-[14px]"
                }   border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>Articles Management</p>
              </div>
            </div>
            <div
              onClick={handleNavClick}
              className={`${
                navClick == "Rooms" ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick == "News Organization" ? "border-l-4 " : "ml-[14px]"
                }   border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>News Organization </p>
              </div>
            </div>
            <div
              onClick={handleNavClick}
              className={`${
                navClick == "Rooms" ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick == "Discount" ? "border-l-4 " : "ml-[14px]"
                }   border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>Discount</p>
              </div>
            </div>

            <div
              onClick={handleNavClick}
              className={`${
                navClick == "Settings" ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick == "Settings" ? "border-l-4 " : "ml-[14px]"
                }   border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>Settings</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-400 h-[0.5px] "></div>

          <div
            onClick={handleNavClick}
            className={`${
              navClick == "Setting" ? "bg-gray-200" : ""
            } hover:bg-gray-100 py-[5px]`}
          >
            <div
              className={`${
                navClick == "Setting" ? "border-l-4 " : "ml-[14px]"
              }   border-gray-700 cursor-pointer ml-[10px] py-[5px] px-[25px]`}
            >
              <p>Settings</p>
            </div>
          </div>
          <p className="text-[11px] text-center">
            Copyright &copy; Codebug.lk. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
