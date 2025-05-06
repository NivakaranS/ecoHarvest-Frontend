

import React, { useEffect, useState } from "react"
import axios from "axios"



export default function UserManagement() {
  const [userInformation, setUserInformation] = useState([]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    const fetchUserManagement = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/auth');
        console.log(response.data);
        setUserInformation(response.data);
      } catch (error) {
        console.log('Error fetching user management:', error);
      } finally {
        setLoading(false);
      }
    }
    

    fetchUserManagement();
  },[])
  

  const registerAdmin = async () => {
    if(!firstName || !lastName || !email || !phoneNumber || !gender || !username || !password) {
      alert('Please fill all the fields')
      return
    }

    console.log(firstName, lastName, email, phoneNumber, gender, username, password)

    try {
      const response = await axios.post('http://localhost:8000/api/auth/registerAdmin', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        username: username,
        password: password
    })
      console.log(response.data)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhoneNumber('')
      setGender('')
      setUsername('')
      setPassword('')

    } catch (error) {
      console.log('Error registering admin:', error);
    }
  }





  return (
    <div className="flex flex-row">
      <div className="w-[75%] h-[90vh] py-[20px] overflow-y-scroll px-[25px] bg-[#F5F5F5] flex flex-col">
        <p className="text-black text-[21px]">User Management System</p>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600 text-[18px]">Loading users...</p>
          </div>
        ) : (
          userInformation.map((user) => (
            user.userDetails && (
              <div key={user.id} className="bg-white text-black border-[1px] border-gray-300 rounded-[10px] py-[10px] px-[15px] mt-[10px] flex flex-col">
                <p className="text-[20px] leading-[17px] ">
                  {user.userDetails.firstName + ' ' + user.userDetails.lastName}
                </p>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-black text-[18px]">{user.username}</p>
                <div className="px-[10px]">
                  <div className="flex flex-row justify-between items-center">
                    <p>Phone number: {user.userDetails.phoneNumber}</p>
                    <p>Email: {user.userDetails.email}</p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p>Date of birth: {user.userDetails.dateOfBirth}</p>
                    <p>Gender: {user.userDetails.gender}</p>
                  </div>
                  <p>Address: {user.userDetails.address}</p>
                </div>
              </div>
            )
          ))
        )}
      </div>

      <div className="w-[25%] py-[10px] px-[15px] h-[100vh] bg-gray-300 flex flex-col text-black">
          <p className="text-[25px]">Register Admin</p>
          <div className="mt-[5px]">
            <p className="text-[15px]">First name</p>
            <input onChange={(e) => setFirstName(e.currentTarget.value)} type="text" className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]"  />
          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Last name</p>
            <input type="text" onChange={(e) => setLastName(e.currentTarget.value) } className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]" />
          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Email</p>
            <input type="text" onChange={(e) => setEmail(e.currentTarget.value)} className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]"  />
          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Phone number</p>
            <input type="text" onChange={(e) => setPhoneNumber(e.currentTarget.value)} className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]"  />
          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Gender</p>
            <select
              className="border-[1px] cursor-pointer outline-none border-gray-400 rounded-[5px] px-[10px] py-[5px] w-[100%]"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Username</p>
            <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]"  />
          </div>
          <div className="mt-[5px]">
            <p className="text-[15px]">Password</p>
            <input type="text"onChange={(e) => setPassword(e.currentTarget.value)} className="border-[1px] outline-none border-gray-400 rounded-[5px] px-[10px] py-[2px] w-[100%]"  />
          </div>
          <div onClick={registerAdmin} className="mt-[15px] bg-yellow-500 flex items-center ring-yellow-800 ring-[0.5px] cursor-pointer justify-center py-[5px] rounded-[5px] ">
            <p>Register</p>
          </div>
      </div>

    </div>
  
  )
}
