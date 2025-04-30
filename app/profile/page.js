
import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Max from '../components/Max'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const ProfilePage = () => {
    const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [productsDetail, setProductsDetail] = useState([]);
  

  
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
          setUserLoggedIn(true)
          try {
            const response2 = await axios.get(`http://localhost:8000/cart/${response.data.id}`);
            setCart(response2.data);
            console.log("Cart items fetched successfully:", response2.data);

          } catch(errr) {
            console.error("Error fetching cart items:", errr);
          }
          

        }
        else if(response.data.role === 'Vendor') {
          
          router.push('/vendor');
        }
        else if(response.data.role === 'Admin') {

          router.push('/admin');
        }

      } catch (error) {
        console.error("Error fetching cookies:", error);
      }
    }

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
        <div>
            <Navigation numberOfCartItems={numberOfCartItems} cart={cart} id={id} userLoggedIn={userLoggedIn}/>
            <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
                <div className="w-[95%] h-[100vh] ">
                    <p>This is the profile</p>
                </div>
            </div>
            <Max/>
            <Footer/>
        </div>
    )

}

export default ProfilePage