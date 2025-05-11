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


export default function AccountManagement() {

  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();



  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  
   
  
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
    
            console.log(response.data);
            setId(response.data.id);
            setRole(response.data.role);
    
            if (response.data.role === "Customer") {
              setUserLoggedIn(true);
              try {
                const response2 = await axios.get(
                  `http://localhost:8000/cart/${response.data.id}`
                );
                setCart(response2.data.cart);
                setProductsDetail(response2.data.products);
                console.log(
                  "Product items fetched successfully:",
                  response2.data.products
                );
                console.log(
                  "Cart items fetched successfully:",
                  response2.data.cart
                );
              } catch (errr) {
                console.log("Cart Empty");
           
            
              }
            } else if (response.data.role === "Vendor") {
              router.push("/vendor");
            } else if (response.data.role === "Admin") {
              router.push("/admin");
            }
          } catch (error) {
            router.push("/login");
          }
        };
    
        fetchCookies();
      }, []);
    
  
    

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


  const handleUpdateProfile = async () => {
    if (phoneNumber) {
      if(phoneNumber.length < 10 || phoneNumber.length > 10) {
        setError("Phone number must be 10 digits");
        return;
      }
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email format");
        return;
      }
    }

    try {
      const response = await axios.post(`http://localhost:8000/customers/update`, {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        username,
        password
      });
      console.log("Profile updated successfully:", response.data);
      setEditProfile(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }


     const handleDeleteNotification = async (notificationId) => {
          try {
              const response = await axios.delete(`http://localhost:8000/notification/:${notificationId}`)
              console.log(response.data)
              window.location.reload()
          } catch(err) {
              console.error("Error in deleting notification: ", err)
          }
      }


  return (
    <div >
      <Navigation numberOfCartItems={numberOfCartItems} productsDetail={productsDetail} id={id} cart={cart} userLoggedIn={userLoggedIn} />
      <div className="flex flex-col items-center justify-center text-black min-h-screen bg-gray-100">
        <div className="w-[90vw] flex pb-[5vh] flex-row min-h-[90vh] mt-[18vh]">
            <div className="w-[70vw] pt-[20px]">
                <p className=" leading-[35px] text-[30px]">Account Management</p>
                <p>Manage your account details</p>
                {userInformation && userInformation.length> 0 ? <div className="pr-[30px]">
                  <p className="text-[45px] leading-[50px]">{userInformation[2].firstName} {userInformation[2].lastName}</p>
                  <p className="text-[13px] text-gray-500">Member since {new Date(userInformation[0].createdTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <div className="flex flex-row space-x-[20px] w-fit justify-between mt-[5px]">
                      <p className="bg-yellow-500 px-[20px] py-[2px] rounded-[5px] ring-yellow-800 ring-[0.5px]">{userInformation[1].type}</p>
                      <p className="bg-orange-500 px-[20px] py-[2px] rounded-[5px] ring-orange-800 ring-[0.5px]">{userInformation[0].role}</p>
                      
                    </div>

                    
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>First name</p>
                            <input type="text" 
                            disabled={!editProfile}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={userInformation[2].firstName}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" />
                        </div>
                        <div className="w-[50%]">
                            <p>Last name</p>
                            <input type="text"
                            onChange={(e) => setLastName(e.target.value)} 
                            disabled={!editProfile}
                            placeholder={userInformation[2].lastName}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Date of birth</p>
                            <input type="text" 
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            disabled={!editProfile}
                            placeholder={userInformation[2].dateOfBirth}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" />
                        </div>
                        
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Email</p>
                            <input type="text" 
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!editProfile}
                            placeholder={userInformation[2].email}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]"  />
                        </div>
                        <div className="w-[50%]">
                            <p>Phone number</p>
                            <input type="text"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={!editProfile} 
                            placeholder={userInformation[2].phoneNumber}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]"  />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Address</p>
                            <input type="text" 
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!editProfile}
                            placeholder={userInformation[2].address}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName} />
                        </div>
                        
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]">
                        <div className="w-[50%]">
                            <p>Username</p>
                            <input type="text" 
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!editProfile}
                            placeholder={userInformation[0].username}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].firstName}/>
                        </div>
                        <div className="w-[50%]">
                            <p>Password</p>
                            <input type="text" 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            disabled={!editProfile}
                            className="border-2 outline-none border-gray-300 rounded-md p-2 w-[100%] mt-[5px]" value={userInformation[0].lastName} />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-[20px]  justify-between mt-[20px]"> 
                      <div className="flex flex-col">
                      {error && <p style={{ color: "red" }}>{error}</p>}

                      </div>



                      {!editProfile ? 
                      <div className="flex flex-row space-x-[20px]  justify-end mt-[20px]">
                        <div onClick={() => setEditProfile(true)} className=" bg-orange-500 w-fit px-[20px] py-[5px] rounded-[5px] ring-orange-800 ring-[0.5px] cursor-pointer mt-[20px]">
                          <p>Edit Profile</p>
                        </div> 
                      </div>
                      : <div className="flex flex-row space-x-[20px]  justify-end mt-[20px]">
                          <div className="bg-gray-500 px-[20px] py-[5px] rounded-[5px] ring-gray-800 ring-[0.5px] cursor-pointer" onClick={() => setEditProfile(false)}>
                            <p>Cancel</p>
                          </div>
                          <div onClick={handleUpdateProfile} className="bg-orange-500 px-[20px] py-[5px] rounded-[5px] ring-orange-800 ring-[0.5px] cursor-pointer" >
                            <p>Confirm</p>
                          </div>

                        </div>}


                    </div>

                    
                    
             

                </div> : null
}            </div>
            <div className="w-[30vw] h-[90vh] py-[15px] px-[20px] bg-gray-300 rounded-[15px] ring-[0.5px] ring-gray-800">
                <p className="text-[20px]">Notifications</p>

                {notifications && notifications.length > 0 ? <div>
                  {  notifications.map((notification, index) => (
                      <div key={index} className="bg-white p-[10px] rounded-[5px] mt-[10px]">
                        <div className="flex flex-row justify-between">
                          <div>
                            <p>{notification.title}</p>
                            <p className="text-[14px]">{notification.message}</p>
                          </div>
                          <div className="bg-gray-200 rounded-full text-[12px] ring-gray-800 ring-[0.5px] w-[20px] h-[20px] flex items-center justify-center cursor-pointer" onClick={() => handleDeleteNotification(notification._id)}>
                            <p>X</p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between pr-[10px]">
                          <p className="text-gray-500 text-[12px]">{new Date(notification.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <p className="text-gray-500 text-[12px]">{new Date(notification.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                </div> :
                <div>
                  <p>No notifications</p>
                    
                </div>}

            </div>
            
        </div>
        
      </div>

      <Max/>
      <Footer/>

    </div>
  );
}

