"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import EcoHarvest from "../images/ecoHarvestLogo.png";
import Image from "next/image";

const Login = () => {
  const Router = useRouter();

  const [loginClick, setLoginClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationType, setRegistrationType] = useState("Individual");
  const [registrationPage, setRegistrationPage] = useState(1);

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regDateOfBirth, setRegDateOfBirth] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regUserName, setRegUserName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRepeatPassword, setRegRepeatPassword] = useState("");

  const [comFirstName, setComFirstName] = useState("");
  const [comLastName, setComLastName] = useState("");
  const [comDateOfBirth, setComDateOfBirth] = useState("");
  const [comGender, setComGender] = useState("");
  const [comAddress, setComAddress] = useState("");
  const [comEmail, setComEmail] = useState("");
  const [comPhoneNumber, setComPhoneNumber] = useState("");
  const [comUserName, setComUserName] = useState("");
  const [comPassword, setComPassword] = useState("");
  const [comRepeatPassword, setComRepeatPassword] = useState("");
  const [comCompanyName, setComCompanyName] = useState("");
  const [comCategory, setComCategory] = useState("");

  const [loginError, setLoginError] = useState(false);

  const [registrationError, setRegistrationError] = useState(false);

  const router = useRouter();

  const handleLoginClick = () => {
    setLoginClick(!loginClick);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      switch (response.data.role) {
        case "Vendor":
          router.push("/vendor");
          break;

        case "Company":
        case "Customer":
          router.push("/");
          break;
        case "Admin":
          router.push("/admin");
          break;
      }
      console.log("Login successful");
      setLoginError(false);
    } catch (err) {
      setLoginError(true);
    }
  };

  const handleRegistrationTypeClick = (e) => {
    setRegistrationType(e.currentTarget.innerText);
  };

  const handleIndividualRegistration = async () => {
    if (regPassword !== regRepeatPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!regUserName || !regPassword || !regRepeatPassword) {
      setRegistrationError(true);
      return;
    }

    try {
      console.log("Registration attempt");
      const response = await axios.post(
        "http://localhost:8000/api/auth/registerIndividualCustomer",
        {
          firstName: regFirstName,
          lastName: regLastName,
          phoneNumber: regPhoneNumber,
          email: regEmail,
          dateOfBirth: regDateOfBirth,
          gender: regGender,
          address: regAddress,
          username: regUserName,
          password: regPassword,
        }
      );

      console.log("Registration successful:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        alert(
          `Registration failed: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        alert("Registration failed: No response from server");
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  };

  const handleBusinessRegistration = async () => {
    if (comPassword !== comRepeatPassword) {
      alert("Passwords do not match");
      return;
    } else if (!comUserName || !comPassword || !comRepeatPassword) {
      console.log(
        comFirstName,
        comLastName,
        comAddress,
        comDateOfBirth,
        comGender,
        comEmail,
        comPhoneNumber,
        comUserName,
        comPassword,
        comCompanyName,
        comCategory
      );
      setRegistrationError(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/registerCompanyCustomer",
          {
            firstName: comFirstName,
            lastName: comLastName,
            companyName: comCompanyName,
            phoneNumber: comPhoneNumber,
            email: comEmail,
            dateOfBirth: comDateOfBirth,
            gender: comGender,
            address: comAddress,
            category: comCategory,
            username: comUserName,
            password: comPassword,
          }
        );
        console.log(response.data);

        window.location.reload();
      } catch (error) {
        console.error("Error in registering:", error);
      }
    }
  };

  const handleRegistrationOne = () => {
    setRegistrationPage(1);
  };

  const handleRegistrationTwo = () => {
    setRegistrationPage(2);
  };

  return (
    <div className="w-[100%] flex items-center justify-center h-[100vh] text-black">
      <div className="w-[38.2%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center">
        <div className="w-[43%]">
          <p className="text-[35px] mb-[20px]">Login</p>
          <div className="flex flex-col space-y-[17px]">
            <div className="flex relative flex-col">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                placeholder=" "
              />
              <label
                className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
              >
                Username
              </label>
            </div>

            <div className="flex relative flex-col">
              <div className="flex relative flex-col">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                  placeholder=" "
                />
                <label
                  className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                >
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={handleLoginSubmit}
              className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
            >
              <p>Login</p>
            </div>
            <p className="mt-[2px] text-[13px]">
              Don&apos;t have an account?
              <span
                onClick={handleLoginClick}
                className=" ml-[2px] text-blue-800 cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
          {loginError && (
            <div className="relative flex mt-[10px] items-center justify-center text-red-900 text-[13px] py-[3px] rounded-[3px] ring-[0.5px] ring-red-900 bg-red-400">
              <p>Invalid Username or Password</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-[23.6%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center"></div>
      <div className="w-[38.2%] h-[100%] bg-gray-200 flex ring-[0.5px] ring-gray-500 items-center justify-center">
        <div className="w-[50%]">
          <p className="text-[35px] mb-[20px]">Register</p>

          <div className="flex flex-col  space-y-[10px]">
            <div className="flex relative mb-[5px] flex-row space-x-[3px] bg-gray-400 rounded-[10px] p-[3px] ring-[0.5px] ring-gray-600 items-center ">
              <div
                onClick={handleRegistrationTypeClick}
                className={`${
                  registrationType === "Individual" ? "text-white" : ""
                } py-[5px] z-[10] w-[50%] flex items-center justify-center cursor-pointer`}
              >
                <p>Individual</p>
              </div>
              <div
                onClick={handleRegistrationTypeClick}
                className={`${
                  registrationType === "Business" ? "text-white" : ""
                } w-[50%]  z-[10] flex items-center justify-center cursor-pointer`}
              >
                <p>Business</p>
              </div>
              <div
                className={`${
                  registrationType === "Individual" ? " " : "right-[6px]"
                } transition-transform animation duration-500 bg-gray-500  ring-[0.5px] ring-gray-700 absolute h-[30px] rounded-[5px] py-[5px] w-[50%] flex items-center justify-center cursor-pointer`}
              ></div>
            </div>

            <div
              className={`${
                registrationType === "Individual"
                  ? "flex flex-col space-y-[10px]"
                  : "hidden"
              }`}
            >
              {registrationPage === 1 ? (
                <div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(2)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(3)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>3</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[15px]">
                    <div>
                      <p>Personal Information</p>
                    </div>
                    <div className="flex  relative flex-col">
                      <input
                        type="text"
                        value={regFirstName}
                        onChange={(e) => setRegFirstName(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        First name
                      </label>
                    </div>

                    <div className="flex relative flex-col">
                      <input
                        type="text"
                        value={regLastName}
                        onChange={(e) => setRegLastName(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Last name
                      </label>
                    </div>
                    <div className="flex relative flex-col">
                      <input
                        type="date"
                        value={regDateOfBirth}
                        onChange={(e) => setRegDateOfBirth(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Date of birth
                      </label>
                    </div>

                    <div className="flex relative flex-col">
                      <div
                        type="text"
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none bg-white"
                      >
                        <select
                          value={regGender}
                          onChange={(e) => setRegGender(e.target.value)}
                          className="w-full focus:outline-none"
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex relative flex-col">
                      <input
                        type="text"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Address
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => {
                        if (
                          regFirstName &&
                          regLastName &&
                          regDateOfBirth &&
                          regGender &&
                          regAddress
                        ) {
                          setRegistrationPage(2);
                          setRegistrationError(false);
                        } else {
                          setRegistrationError(true);
                        }
                      }}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Continue</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                      {registrationError && (
                        <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                          <p>Please fill all the fields</p>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              ) : registrationPage === 2 ? (
                <div className="flex flex-col space-y-[13px]">
                  <div className="flex flex-row items-center justify-center">
                    <div
                      onClick={() => setRegistrationPage(1)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(3)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>3</p>
                    </div>
                  </div>
                  <div>
                    <p>Contact Information</p>
                  </div>
                  <div className="flex  relative flex-col">
                    <input
                      type="text"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Email
                    </label>
                  </div>

                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={regPhoneNumber}
                      onChange={(e) => setRegPhoneNumber(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Phone number
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => {
                        if (regEmail && regPhoneNumber) {
                          setRegistrationPage(3);
                          setRegistrationError(false);
                        } else {
                          setRegistrationError(true);
                        }
                      }}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Continue</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                    </p>

                    {registrationError && (
                      <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                        <p>Please fill all the fields</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-[13px]">
                  <div className="flex flex-row items-center justify-center">
                    <div
                      onClick={() => setRegistrationPage(1)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(2)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>3</p>
                    </div>
                  </div>
                  <div>
                    <p>Account Information</p>
                  </div>
                  <div className="flex  relative flex-col">
                    <input
                      type="text"
                      value={regUserName}
                      onChange={(e) => setRegUserName(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Username
                    </label>
                  </div>

                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={regRepeatPassword}
                      onChange={(e) => setRegRepeatPassword(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Repeat password
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={handleIndividualRegistration}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Register</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                    </p>

                    {registrationError && (
                      <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                        <p>Please fill all the fields</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${
                registrationType === "Business"
                  ? "flex flex-col space-y-[10px]"
                  : "hidden"
              }`}
            >
              {registrationPage === 1 ? (
                <div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(2)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(3)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>3</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[15px]">
                    <div>
                      <p>Personal Information</p>
                    </div>
                    <div className="flex  relative flex-col">
                      <input
                        type="text"
                        value={comCompanyName}
                        onChange={(e) => setComCompanyName(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Company name
                      </label>
                    </div>

                    <div className="flex  relative flex-col">
                      <input
                        type="text"
                        value={comFirstName}
                        onChange={(e) => setComFirstName(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        First name
                      </label>
                    </div>

                    <div className="flex relative flex-col">
                      <input
                        type="text"
                        value={comLastName}
                        onChange={(e) => setComLastName(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Last name
                      </label>
                    </div>
                    <div className="flex relative flex-col">
                      <input
                        type="date"
                        value={comDateOfBirth}
                        onChange={(e) => setComDateOfBirth(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Date of birth
                      </label>
                    </div>

                    <div className="flex relative flex-col">
                      <div
                        type="text"
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none bg-white"
                      >
                        <select
                          value={comGender}
                          onChange={(e) => setComGender(e.target.value)}
                          className="w-full focus:outline-none"
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex relative flex-col">
                      <input
                        type="text"
                        value={comCategory}
                        onChange={(e) => setComCategory(e.target.value)}
                        className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                        placeholder=" "
                      />
                      <label
                        className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                      >
                        Category
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => {
                        if (
                          comCompanyName &&
                          comFirstName &&
                          comLastName &&
                          comDateOfBirth &&
                          comGender &&
                          comCategory
                        ) {
                          setRegistrationPage(2);
                        } else {
                          setRegistrationError(true);
                        }
                      }}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Continue</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                    </p>

                    {registrationError && (
                      <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                        <p>Please fill all the fields</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : registrationPage === 2 ? (
                <div className="flex flex-col space-y-[13px]">
                  <div className="flex flex-row items-center justify-center">
                    <div
                      onClick={() => setRegistrationPage(1)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(3)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>3</p>
                    </div>
                  </div>
                  <div>
                    <p>Contact Information</p>
                  </div>
                  <div className="flex  relative flex-col">
                    <input
                      type="text"
                      value={comEmail}
                      onChange={(e) => setComEmail(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Email
                    </label>
                  </div>

                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={comAddress}
                      onChange={(e) => setComAddress(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Address
                    </label>
                  </div>

                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={comPhoneNumber}
                      onChange={(e) => setComPhoneNumber(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Phone number
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => {
                        if (comEmail && comAddress && comPhoneNumber) {
                          setRegistrationPage(3);
                          setRegistrationError(false);
                        } else {
                          setRegistrationError(true);
                        }
                      }}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Continue</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                    </p>

                    {registrationError && (
                      <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                        <p>Please fill all the fields</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-[13px]">
                  <div className="flex flex-row items-center justify-center">
                    <div
                      onClick={() => setRegistrationPage(1)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>1</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div
                      onClick={() => setRegistrationPage(2)}
                      className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[0.5px] ring-gray-600 text-[14px] h-[20px] rounded-full bg-gray-400"
                    >
                      <p>2</p>
                    </div>
                    <div className="w-[10px] h-[3px] bg-gray-600"></div>
                    <div className="flex items-center cursor-pointer justify-center w-[20px] pt-[1.5px] ring-[1px] ring-black text-[14px] h-[20px] rounded-full bg-yellow-500 z-[10]">
                      <p>3</p>
                    </div>
                  </div>
                  <div>
                    <p>Account Information</p>
                  </div>
                  <div className="flex  relative flex-col">
                    <input
                      type="text"
                      value={comUserName}
                      onChange={(e) => setComUserName(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Username
                    </label>
                  </div>

                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={comPassword}
                      onChange={(e) => setComPassword(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex relative flex-col">
                    <input
                      type="text"
                      value={comRepeatPassword}
                      onChange={(e) => setComRepeatPassword(e.target.value)}
                      className="peer ring-[0.5px] rounded-[5px] py-[5px] px-[10px] focus:outline-none placeholder-transparent"
                      placeholder=" "
                    />
                    <label
                      className="absolute left-[10px] text-gray-500 rounded-[5px] px-[10px] bg-white transition-all duration-200 transform
                    -translate-y-1/2                            
                    peer-placeholder-shown:top-1/2              
                    peer-placeholder-shown:translate-y-[-50%]   
                    peer-focus:top-0                            
                    peer-focus:text-[13px]
                    peer-focus:text-blue-500
                    peer-focus:bg-gray-200
                    peer-not-placeholder-shown:top-0            
                    top-0                                       
                    text-[13px]
                    pointer-events-none"
                    >
                      Repeat password
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={handleBusinessRegistration}
                      className="flex mt-[19px] ring-yellow-700 ring-[0.5px] flex-col items-center justify-center w-[100%] bg-[#FDAA1C] text-[15px] cursor-pointer py-[4px] rounded-[3px]"
                    >
                      <p>Register</p>
                    </div>
                    <p className="mt-[2px] text-[13px]">
                      Already have an account?
                      <span
                        onClick={handleLoginClick}
                        className=" ml-[2px] text-blue-800 cursor-pointer"
                      >
                        Login
                      </span>
                    </p>

                    {registrationError && (
                      <div className="bg-red-300 mt-[5px] py-[3px] px-[20px] ring-[1px] ring-red-800 text-red-950 rounded-[5px]">
                        <p>Please fill all the fields</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          loginClick ? "translate-x-[-294px]" : "right-0"
        } transition-transform z-[200] ease-out duration-500 w-[61.8%] absolute  h-[100%] bg-[#101010] text-white flex ring-[0.5px] ring-gray-500 items-center justify-center`}
      >
        <Image height={280} src={EcoHarvest} />
      </div>
    </div>
  );
};

export default Login;
