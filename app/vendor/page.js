"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState([]);
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [notifications, setNotifications] = useState([]);

  const router = useRouter();


  
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
          const response2 = await axios.get('http://localhost:8000/vendors/:' + response.data.id)
          console.log('vendor', response2.data);
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

        if (response.data.role === "Vendor") setIsLoggedIn(true);
        else router.push("/");
      } catch (error) {

        console.error("Error fetching cookies:", error);
        router.push("/login");

      }
    };

    fetchCookies();

  }, [])

  useEffect(() => {
    router.replace("/vendor/dashboard");
  }, []);

  return <div>Redirecting to Dashboard...</div>;
}
