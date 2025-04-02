'use client'

import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";
import Rooms from "./pages/Rooms"; // Fixed import

import { useState } from "react";
import Restuarant from "./pages/Restuarant";
import Dashboard from "./pages/Home";
import Guests from "./pages/Guests";
import Reservations from "./pages/Reservations";
import Settings from "./pages/Settings";
import Message from "./pages/Message";
import Parking from "./pages/Parking"
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [navClick, setNavClick] = useState("User Management");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  
  const router = useRouter()

  // useEffect(() => {
  //   const checkSessionCookie = async () => {
  //       try {
  //           const response = await axios.get("https://news-app-backend-4rb1.vercel.app/auth/user", {
  //               withCredentials: true
  //           })
  //           console.log(response.data);
  //           setIsLoggedIn(response.data.isAuthenticated);
  //       } catch(err) {
  //           setIsLoggedIn(false);
  //           Router.push('/login')
  //       }
  //   };

  //   checkSessionCookie(); 

// }, []);

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
          
          router.push('/vendor');
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
  }, [])


  const handleNavClick = (e) => {
    setNavClick((e.target .innerText));
    
  };

  return (
    <div className="flex flex-row overflow-hidden">
      <Navigation navClick={navClick} handleNavClick={handleNavClick} />
      <div className="w-[83vw] h-[100vh]">
        <TopNavigation id={id} isLoggedIn={isLoggedIn} />
        {navClick === "Rooms" ? 
        <Rooms /> : (
        navClick === "Restuarant" ?
        <Restuarant /> 
        : ( 
          navClick === "Dashboard" ? 
          <Dashboard/> : (
            navClick === "Articles Management" ?
            <Guests/> : (
              navClick === "Media Library" ?
              <Reservations/> : (
                navClick === "Settings" ?
                <Settings/>
                : (
                  navClick === "Analytics & Reports" ?
                  <Message/> : (
                    navClick === "User Management" ?
                    <Parking/> : (
                      navClick === "News Organization" ?
                      <Rooms/> : (
                        <div>Home Content</div>
                    ))
                     
                  
                  )
                  
                )
              )
              
            )
            
          )
          

        )
          
      )
        }
      </div>
      
    </div>
  );
}
