"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiCamera } from "react-icons/fi";

export default function ProfilePage() {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const vendorId = "67ebdddc067a1c7f6e6eff86";

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(`http://localhost:8000/vendors/${vendorId}`);
        const data = await res.json();
        setVendor(data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  const handleChange = (e) => {
    setVendor((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/vendors/${vendorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        <Navbar />

        <div className="flex flex-col px-8 py-6">
          <h2 className="text-2xl font-semibold">Profile Details</h2>
          <p className="text-gray-600">Manage your account information</p>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/images/"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                  <FiCamera className="text-yellow-500" size={18} />
                </div>
              </div>
              <button className="text-yellow-500 font-medium">Change Photo</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={vendor.businessName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={vendor.phoneNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={vendor.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  value="********"
                  disabled
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Account Status</label>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">
                  {vendor.status}
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
                    onClick={handleSave}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="border px-4 py-2 rounded-md"
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
