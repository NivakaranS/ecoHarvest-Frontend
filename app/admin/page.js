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



export default function AdminDashboard() {
  const [navClick, setNavClick] = useState("Inventory");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  
  const router = useRouter()


  useEffect(() => {

    const fetchCookies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/check-cookie/",
          {
            withCredentials: true,
          }
        );

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

      default:
        return <div className="p-6">Welcome Admin</div>;
    }
  };

  return (
    <div className="flex flex-row overflow-hidden">
      <Navigation navClick={navClick} handleNavClick={handleNavClick} />
      <div className="w-[83vw] min-h-screen h-[100vh] bg-gray-50 overflow-auto">
        <TopNavigation id={id} isLoggedIn={isLoggedIn} />

        <div className="p-6">{renderPage()}</div>

      </div>
    </div>
  );
}
