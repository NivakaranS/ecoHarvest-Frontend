"use client";



import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";



import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import OrdersDashboard from "./pages/OrdersDashboard";
import Advertisements from "./pages/Advertisements";

import Inventory from "./pages/Inventory";
import Discount from "./pages/Discount";
import Payment from "./pages/Payment";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import ProfileManagement from "./pages/ProfileManagement";

import {io} from "socket.io-client";


export default function AdminDashboard() {
  const [navClick, setNavClick] = useState("Inventory");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState([]);

  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  
  const [notifications, setNotifications] = useState([]);

  const router = useRouter()

  const socket = io('http://localhost:8000', {
    query: {
      id: id,
      role: role
    }
  })



  

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
          const response2 = await axios.get('http://localhost:8000/admin/:' + response.data.id)
          console.log('admin', response2.data);
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

        if (response.data.role === "Admin") setIsLoggedIn(true);
        else router.push("/");
      } catch (error) {

        console.error("Error fetching cookies:", error);
        router.push("/login");

      }
    };

    fetchCookies();

  }, [])


  socket.emit('ready');

  socket.on('connect', () => {
    console.log('Connected to socket server with id:',  {id, role});
  })



  if(!isLoggedIn) {
    return null
  }


 


  const handleNavClick = (e) => {
    setNavClick(e.target.innerText);
  };

  const renderPage = () => {
    switch (navClick) {
      case "Inventory":
        return <Inventory />;
      case "Discount":
        return <Discount />;
      case "Payment":
        return <Payment />;
      case "Reports":
        return <Reports />;
      case "User Management":
        return <UserManagement />;

      case "Advertisements":
        return <Advertisements/> 
      case "Order Management":
          return <OrdersDashboard/>
      case "Profile Management":
        return <ProfileManagement id={id} notifications={notifications} userInformation={userInformation}/>

      default:
        return <div className="p-6">Welcome Admin</div>;
    }
  };

  return (

    <div className="flex h-screen">
      <Navigation navClick={navClick} handleNavClick={handleNavClick} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation id={id} isLoggedIn={isLoggedIn} />
        <div className="flex-1 overflow-y-auto">
          {renderPage()}
        </div>

      </div>
    </div>
  );
}
