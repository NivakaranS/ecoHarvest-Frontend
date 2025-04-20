
import React from "react"
import Image from "next/image"
import Profile from '../images/profile5.png'
import Bell from '../images/bell.png'
import LogoutButton from "../../components/Logout"

const TopNavigation = ({id, isLoggedIn}) => {
    

    return(
        <div >
            <div className="w-full text-black h-[10vh] flex items-center justify-end px-[30px] bg-white ">
                {!isLoggedIn 
                ? <div className="bg-gray-100  px-[10px] rounded-[50px] flex  flex-row">
                    
                    <div className="my-[5px] bg-gray-300 cursor-pointer flex items-center justify-center rounded-full w-[36px]">
                        <Image alt="" src={Bell} height={20}/>
                    </div>
                    <div className="  leading-[15px] flex  my-[3px] rounded-[30px] px-[10px] flex-row space-x-[5px]  items-center justify-center" >
                        <Image alt="Profile" height={20} width={40} src={Profile}/>
                        <div>
                            <p className="text-[15px]">John Doe</p>
                            <p className="text-[10px]">Admin</p>
                        </div>
                    </div>
                </div>
                : <LogoutButton/>}
            </div>
        </div>
    )
}

export default TopNavigation