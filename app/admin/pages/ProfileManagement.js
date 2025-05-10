
import axios from "axios";
import React, { useEffect, useState } from "react";


const ProfileManagement = ({userInformation, notifications, id}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [onEditClick, setOnEditClick] = useState(false)
    const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false)

    console.log('Notifications:', notifications)

    

    const updateInformation = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/updateAdmin', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                adminId: id
            })
            console.log(response.data)
            window.location.reload()
            setProfileUpdateSuccess(true)
            setTimeout(() => {
                setProfileUpdateSuccess(false)
            }, 3000)
        } catch(err) {
            console.error("Error in updating profile: ", err)
        }
        // if(!firstName || !lastName || !email || !phoneNumber || !gender || !username || !password) {
        //     alert('Please fill all the fields')
        //     return
        // }

        // try {
        //     const response = await axios.post('http://localhost:8000/api/auth/updateAdmin', {
        //         firstName: firstName,
        //         lastName: lastName,
        //         email: email,
        //         phoneNumber: phoneNumber
        //     })
        // } catch(err) {
        //     console.error("Error in updating profile: ", err)
        // }

    }

    const handleDeleteNotification = async (notificationId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/notification/:${notificationId}`)
            console.log(response.data)
            window.location.reload()
        } catch(err) {
            console.error("Error in deleting notification: ", err)
        }
    }

  return (
    <div className="border-t-[1px]  border-gray-400 text-black flex flex-row w-[100%] h-[100vh] bg-gray-100">
      <div className="flex flex-col px-[20px] py-[10px] w-[75%]">
        <p className="text-[25px]">Profile Management</p>
        <p>Manage your account information</p>
        <div className="flex flex-col bg-gray-200 ring-gray-500 ring-[0.5px] px-[20px] py-[15px] rounded-[10px] space-y-[10px] mt-[20px]">
            <div>
                <p className="text-[20px]">Personal Information</p>
                <div className="flex flex-row space-x-[30px] justify-between">
                    <div className="w-[50%]">
                        <p className="ml-[5px] text-[17px]">First name</p>
                        
                        <input
                            value={firstName}
                            placeholder={userInformation[0].firstName}
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                            disabled={!onEditClick} 
                            className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                        
                    </div>
                    <div className="w-[50%]">
                        <p className="ml-[5px] text-[17px]">Last name</p>
                        <input
                            value={lastName}
                            placeholder={userInformation[0].lastName}
                            onChange={(e) => setLastName(e.currentTarget.value)}
                            disabled={!onEditClick} 
                            className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-[20px]">Contact Information</p>
                <div className="flex flex-row space-x-[30px] justify-between">
                    <div className="w-[50%]">
                        <p className="ml-[5px] text-[17px]">Email</p>
                        

                            <input
                                value={email}
                                placeholder={userInformation[0].email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                disabled={!onEditClick} 
                                className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                    </div>
                    <div className="w-[50%]">
                        <p className="ml-[5px] text-[17px]">Phone number</p>
                    
                        <input
                            value={phoneNumber}
                            placeholder={userInformation[0].phoneNumber}
                            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                            disabled={!onEditClick} 
                            className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-[20px]">Account Information</p>
                <div className="flex flex-row space-x-[30px] justify-between">
                    <div className="w-[50%]">
                        <p  className="ml-[5px] text-[17px]">Username</p>
                    
                        <input
                            value={username}
                            placeholder={userInformation[1].username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            disabled={!onEditClick} 
                            className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                    </div>
                    <div className="w-[50%]">
                        <p className="ml-[5px] text-[17px]">Password</p>
                        

                        <input
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            disabled={!onEditClick} 
                            className={`text-black w-[100%] outline-none ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[5px]`}
                            />
                    </div>
                </div>
            </div>

            <div className="w-[100%] pt-[15px] flex flex-row justify-end ">
                
                {onEditClick ?
                <div className="flex space-x-[15px] flex-row justify-end items-center">
                    <div onClick={() => setOnEditClick(false)} className="bg-gray-600 ring-gray-900 cursor-pointer ring-[0.5px] ml-[10px] px-[15px] rounded-[5px] py-[5px]">
                        <p>Cancel</p>
                    </div> 
                    <div onClick={updateInformation} className="bg-yellow-600 ring-yellow-900 cursor-pointer ring-[0.5px] px-[15px] rounded-[5px] py-[5px]">
                       <p>Confirm</p>
                    </div>
                    
                </div>
                :
                <div onClick={() => setOnEditClick(true)} className="bg-gray-400 ring-gray-900 cursor-pointer ring-[0.5px] ml-[10px] px-[15px] rounded-[5px] py-[5px]">
                    <p>Edit</p>
                </div> }
            </div>
            
            
        </div>
        </div>
      <div className="flex px-[20px] py-[10px] bg-gray-300 h-[100%] flex-col w-[25%]">
        <p className="text-[23px]">Notifications</p>

        
        {notifications && notifications.length > 0 ?
        notifications.map((notification, index) => (
            <div key={index} className="bg-gray-400 ring-gray-800 ring-[0.5px] rounded-[5px] px-[10px] py-[10px] ">
              <div className="flex flex-row justify-between items-center">
                <p className="text-[17px] leading-[22px] ">{notification.title}</p>
                <div onClick={() => handleDeleteNotification(notification._id)} className="w-fit bg-gray-400 rounded-full text-[15px] pt-[1px] ring-gray-600 ring-[0.5px] px-[7px] cursor-pointer text-gray-900 rounded-[5px] ">
                    <p>X</p>
                </div>
                
              </div>
              <div>
              
            </div>
              <p className="text-[13px] pl-[10px]">{notification.message}</p>
              <div className="flex flex-row justify-between">
                <p className="text-[13px] flex flex-row justify-end pl-[10px]">
                {new Date(notification.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                
                </p>
                <p className="text-[13px] pr-[10px]">
                    {new Date(notification.createdAt).toLocaleDateString()}
                </p>
            </div>
            </div>
          )) : 
          <div>
            <p className="text-gray-800 text-[15px]">No notifications</p>
          </div>
          
        }
      </div>
      {profileUpdateSuccess && <div className="absolute bottom-0 left-0  text-black mx-[280px] opacity-[94%] my-[15px] bg-green-500 ring-green-800 ring-[1px] rounded-[5px] px-[20px] py-[15px]">
        <p>Admin profile updated successfully</p>
      </div>}
      
    </div> 
  );
}

export default ProfileManagement;