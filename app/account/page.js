'use client'
import Image from "next/image";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AllCategories from "../components/AllCategories";
import TopSellers from "../components/TopSellers";
import PopularProducts from "../components/PopularProducts";
import Footer from "../components/Footer";
import YouMightLike from "../components/YouMightLike";
import Max from "../components/Max";
import { request } from "http";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function CustomerHome() {

  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const router = useRouter();


  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState([]);
    const [notifications, setNotifications] = useState([]);
  
   
  
  
    
    useEffect(() => {
  
      const fetchCookies = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/check-cookie/",
            {
              withCredentials: true,
            }
          );
  
          try {
            console.log('id', response.data.id)
            const response2 = await axios.get('http://localhost:8000/customers/details/:' + response.data.id)
            console.log('customer details', response2.data);
            setUserInformation(response2.data);
  
            try {
              const response3 = await axios.get('http://localhost:8000/notification/:' + response.data.id)
              console.log('notifications', response3.data);
              setNotifications(response3.data);
            } catch(err) {
              console.error("Error in fetching notifications: ", err)
            }
          } catch(err) {
            console.error("Error in fetching user information: ", err)
          }
          
  
          setId(response.data.id);
          setRole(response.data.role);
  
          if (response.data.role === "Customer") setIsLoggedIn(true);
          else router.push("/");
        } catch (error) {
  
          console.error("Error fetching cookies:", error);
          router.push("/login");
  
        }
      };
  
      fetchCookies();
  
    }, [])


  useEffect(() => {
    const fetchCart = async () => {
      if(!userLoggedIn) {
        return
      }
      try {
        console.log("iddd", id)
        const response2 = await axios.get(`http://localhost:8000/cart/${id}`);
                    setCart(response2.data.cart);
                    setProductsDetail(response2.data.products);
                    console.log("Product items fetched successfully:", response2.data.products);
                    console.log("Cart items fetched successfully:", response2.data.cart);
                    setNumberOfCartItems(response2.data.cart.products.length);
                    console.log("Length", response2.data.cart.products.length)
      } catch(errr) {
        console.log("Cart Empty")

      }
    }

    fetchCart();

  }, [id])


  return (
    <div >
      <Navigation numberOfCartItems={numberOfCartItems} productsDetail={productsDetail} id={id} cart={cart} userLoggedIn={userLoggedIn} />
      <div className="flex flex-col items-center justify-center text-black min-h-screen bg-gray-100">
        <div className="w-[90vw] flex pb-[5vh] flex-row min-h-[90vh] mt-[18vh]">
            <div className="w-[70vw] pt-[20px]">
                <p className="text-[30px]">Account Management</p>
                <div className="pr-[30px]">
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>First name</p>
                            <input type="text" 
                            placeholder={userInformation[2].firstName}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} readOnly/>
                        </div>
                        <div className="w-[50%]">
                            <p>Last name</p>
                            <input type="text" 
                            placeholder={userInformation[2].lastName}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].lastName} readOnly/>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Date of birth</p>
                            <input type="text" 
                            placeholder={userInformation[2].dateOfBirth}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} readOnly/>
                        </div>
                        
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Email</p>
                            <input type="text" 
                            placeholder={userInformation[2].email}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} readOnly/>
                        </div>
                        <div className="w-[50%]">
                            <p>Phone number</p>
                            <input type="text" 
                            placeholder={userInformation[2].phoneNumber}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].lastName} readOnly/>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Address</p>
                            <input type="text" 
                            placeholder={userInformation[2].address}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} readOnly/>
                        </div>
                        
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Username</p>
                            <input type="text" 
                            placeholder={userInformation[0].username}
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} readOnly/>
                        </div>
                        <div className="w-[50%]">
                            <p>Password</p>
                            <input type="text" 
                            placeholder="******"
                            className="border-2 border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].lastName} readOnly/>
                        </div>
                    </div>

                    <p>Created timestamp {userInformation[0].createdTimestamp}</p>
                    <p>Role {userInformation[0].role}</p>
                    
                    <p>Type {userInformation[1].type}</p>
                    <p>Last login {userInformation[1].lastLogin}</p>
                    
                    <p>Gender {userInformation[2].gender}</p>
             

                </div>
            </div>
            <div className="w-[30vw] h-[90vh] py-[15px] px-[25px] bg-gray-300 rounded-[15px] ring-[0.5px] ring-gray-800">
                <p className="text-[20px]">Notifications</p>
                <div>
                    <p>No notifications</p>
                </div>

            </div>
            
        </div>
        
      </div>

      <Max/>
      <Footer/>

    </div>
  );
}
