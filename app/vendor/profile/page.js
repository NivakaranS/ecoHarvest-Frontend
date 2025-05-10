"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const [vendor, setVendor] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  useEffect(() => {
    const fetchVendorId = async () => {
      try {
        const res = await fetch("http://localhost:8000/check-cookie", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || data.role !== "Vendor") {
          throw new Error("Not a vendor or unauthorized");
        }

        const userId = data.id;

        const userRes = await fetch(`http://localhost:8000/vendors/${userId}`, {
          credentials: "include",
        });

        const userData = await userRes.json();
        if (!userRes.ok || !userData[1]?.entityId) {
          throw new Error("User entityId (vendorId) not found");
        }

        const UserData = userData[1];
        const vendorInfo = userData[0];
        setVendorId(userData[1].entityId);
        setVendor(vendorInfo);

        setBusinessName(vendorInfo.businessName || "");
        setPhoneNumber(vendorInfo.phoneNumber || "");
        setEmail(vendorInfo.email || "");
        setUsername(UserData.username || ""); 
      } catch (err) {
        console.error("Error fetching vendor ID:", err);
      }
    };

    fetchVendorId();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/vendors/${vendorId}`,
        {
          businessName,
          phoneNumber,
          email,
          username,
          password,
        },
        { withCredentials: true }
      );

      setVendor(res.data.vendor);
      setIsEditing(false);
      toast.success("Vendor profile updated successfully!");
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast.error("Failed to update vendor profile.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex flex-col px-8 py-6">
          <h2 className="text-2xl font-semibold">Profile Details</h2>
          <p className="text-gray-600">Manage your account information</p>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profileUpload">
                    <FiCamera className="text-yellow-500" size={18} />
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  disabled={!isEditing}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  disabled={!isEditing}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={"*******"}
                  disabled={!isEditing}
                  onChange={(e) => setPassword(e.target.value)}
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
                  disabled={!isEditing}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Account Status
                </label>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">
                  Active
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
