"use client";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import RecentOrders from "../components/RecentOrders";
import sales from "../images/sales.png"
import saved from "../images/saved.png"
import orders from "../images/orders.png"
import reduced from "../images/reduced.png"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Dashboard() {
  const router = useRouter(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
      const fetchCookies = async () => {
        try {
          const response = await axios.get("http://localhost:8000/check-cookie/", {
            withCredentials: true,
  
          });
          
          console.log(response.data);
          setId(response.data.id);
          setRole(response.data.role);
  
          if(response.data.role === 'Customer') {
            router.push('/')
          }
          else if(response.data.role === 'Vendor') {
            
            router.push('/vendor/dashboard');
          }
          else if(response.data.role === 'Admin') {
            setIsLoggedIn(true);
            
          }
          else {
            router.push('/login')
          }
  
        } catch (error) {
          console.error("Error fetching cookies:", error);
          router.push('/login')
        }
      }
  
      fetchCookies();
    }, [router])


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Navbar />
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card title="Total Sales" value="$12,458" percentage="+12.5%" imageSrc = {sales} />
          <Card title="Food Saved" value="2,345 kg" percentage="+8.1%" imageSrc = {saved} />
          <Card title="Active Orders" value="48" percentage="+2.4%" imageSrc = {orders} />
          <Card title="CO2 Reduced" value="1,234 kg" percentage="+15.2%" imageSrc = {reduced} />
        </div>
        <div className="mt-6">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
