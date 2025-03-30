'use client'

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {

    const Router = useRouter();

    const [loginClick, setLoginClick] = useState(false);

    const handleLoginClick = () => {
        setLoginClick(!loginClick);
    }

    const handleLoginSubmit = () => {
        Router.push('/');


    }

    return (
        <div className='w-[100%] flex items-center justify-center h-[100vh] text-black'>
            <div className='w-[38.2%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center'>
                <div className='w-[43%]'>
                    <p className='text-[35px] mb-[20px]'>Login</p>
                    <div className='flex flex-col space-y-[17px]'>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Username</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                        </div>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Password</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                            <p className='text-[12px] mt-[1px] w-[100%] flex items-center hover:underline cursor-pointer justify-end'>Forgot password?</p>
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div onClick={handleLoginSubmit} className='flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]'> 
                            <p>Login</p>
                        </div>
                        <p className='mt-[2px] text-[13px]'>Don't have an account?<span onClick={handleLoginClick} className=' ml-[2px] text-blue-800 cursor-pointer'>Register</span></p>
                    </div>
                    

                </div>
            </div>
            <div className='w-[23.6%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center'>
                
            </div>
            <div className='w-[38.2%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center'>
                <div className='w-[43%]'>
                    <p className='text-[35px] mb-[20px]'>Register</p>
                    <div className='flex flex-col space-y-[17px]'>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>First name</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                        </div>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Last name</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                        </div>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Username</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                        </div>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Password</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                            
                        </div>
                        <div className='flex relative flex-col'>
                            <label className='absolute top-[-13px] left-[10px] px-[3px] bg-gray-200'>Repeat password</label>
                            <input type='text'  className=' ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none' placeholder='' />
                        </div>
                        
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]'> 
                            <p>Register</p>
                        </div>
                        <p className='mt-[2px] text-[13px]'>Already have an account?<span onClick={handleLoginClick} className=' ml-[2px] text-blue-800 cursor-pointer'>Login</span></p>
                    </div>
                    

                </div>
            </div>
        <div className={`${loginClick? 'translate-x-[-267px]' : 'right-0'} transition-transform ease-out duration-500 w-[61.8%] absolute  h-[100%] bg-[#101010] text-white flex ring-[0.5px] ring-gray-500 items-center justify-center`}>
                <p className='text-[50px]'>Everest</p>
            </div>  

        </div>
    )
}

export default Login