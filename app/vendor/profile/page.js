"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [vendor, setVendor] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);


  const [businessName, setBusinesName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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


  const handleUpdateVendor = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/updateVendor', {
        vendorId: id,
        businessName: businessName,
        phoneNumber: phoneNumber,
        email: email,
        username: username,
        password: password

      })
      console.log("Vendor updated successfully:", response.data);

    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  }



  useEffect(() => {
    const fetchVendorId = async () => {
      try {
        const res = await fetch("http://localhost:8000/check-cookie", {
          credentials: "include", 
        });

        const data = await res.json();
        if (res.ok && data.role === "Vendor") {
          setVendorId(data.id);
        } else {
          throw new Error("Not a vendor or unauthorized");
        }
      } catch (err) {
        console.error("Error fetching vendor ID:", err);
      }
    };

    fetchVendorId();
  }, []);

  useEffect(() => {
    if (!vendorId) return;

    const fetchVendor = async () => {
      try {
        const res = await fetch(`http://localhost:8000/vendors/${vendorId}`, {
          // headers: {
          //   Authorization: `Bearer ${getToken()}`,
          // },
        });

        const data = await res.json();
        setVendor(data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [vendorId]);

  const getToken = () => {
    console.log("document.cookie",document.cookie);
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setVendor((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/vendors/${vendorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(vendor),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
        setVendor(data.vendor);
      } else {
        alert(data.message || "Failed to update.");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading || !vendor) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar notifications={notifications} id={id} />
        <div className="flex flex-col px-8 py-6">
          <h2 className="text-2xl font-semibold">Profile Details</h2>
          <p className="text-gray-600">Manage your account information</p>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={vendor.profileImage || "/images/profile.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                {editMode && (
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                    <label htmlFor="profileUpload">
                      <FiCamera className="text-yellow-500" size={18} />
                    </label>
                    <input
                      type="file"
                      id="profileUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              <span className="text-gray-700 font-medium">
                {vendor.businessName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={businessName}
                  placeholder={userInformation[0].businessName}
                  onChange={(e) => setBusinesName(e.currentTarget.value)}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder={userInformation[0].phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder={userInformation[0].email}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  placeholder={userInformation[1].username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  disabled={!editMode}
                  className="w-[100%] mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Account Status
                </label>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">
                  {vendor.status || "Active"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleUpdateVendor()}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="border bg-gray-500 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
