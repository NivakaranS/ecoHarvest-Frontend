"use client";



import React from "react";
import Image from "next/image";
import Profile from "../images/profile5.png";
import Bell from "../images/bell.png";
import LogoutButton from "../../components/Logout";

const TopNavigation = ({ id, isLoggedIn }) => {
  return (
    <div className="w-full text-black h-[10vh] flex items-center justify-between px-[30px] bg-white">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 flex items-center justify-center rounded-full w-[36px] h-[36px]">
          <Image alt="Bell" src={Bell} height={20} />

        </div>
        <div className="flex items-center space-x-3">
          <Image
            alt="Profile"
            height={36}
            width={36}
            src={Profile}
            className="rounded-full"
          />
          <div className="leading-tight">
            <p className="text-[15px] font-medium">John Doe</p>
            <p className="text-[12px] text-gray-600">Admin</p>
          </div>
        </div>
      </div>

      {isLoggedIn && <LogoutButton />}
    </div>
  );
};

export default TopNavigation;
