

import Image from "next/image"
import Bed from '../images/aii.jpg'

import { useEffect, useState } from "react";

const Parking = () => {

    const [users, setUsers] = useState([]);
    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [editClick, setEditClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);

    const handleFirstNameChange = (e) => {
        setFirstName(e.currentTarget.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.currentTarget.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.currentTarget.value)
    }

    const handleDobChange = (e) => {
        setDob(e.currentTarget.value)
    }


    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const data = await getUsers();
    //             setUsers(data)
    //         } catch(err) {
    //             console.error("Error in fetching users: ", err)
    //         }
    //     }

    //     fetchUsers()

    // }, [users])


    // const onAddUserClick = async () => {
    //     try {
    //         const data = {
    //             type: userType,
    //             firstName: firstName,
    //             lastName: lastName,
    //             email: email,
    //             password: password,
    //             phoneNumber: phone,
    //             dob: dob,
    //             gender: gender
    //         }

    //         const response = await createUser(data);
    //         console.log(response)
    //         setEmail('');
    //         setPassword('');
    //         setFirstName('');
    //         setLastName('');
    //         setPhone('');
    //         setDob('');
    //         setGender('');
    //         setUserType('');

    //     }catch(err) {
    //         console.error("Error in adding user: ", err)
    //     }
    // }

    const handleEditClick = () => {
        console.log("Edit clicked")
        setEditClick(!editClick)
    }

    const handleDeleteClick = () => {
        console.log("Delete clicked")
        setDeleteClick(true)
    }

    return(
        <div>
            <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
                <div className="bg-gray-200 rounded-[10px] py-[10px] px-[15px] w-[80%]">
                    <div className="flex flex-row justify-between">
                        <div>
                            <p className="text-[18px]">Users</p>
                        </div>
                        
                    </div>
                    
                    <div className="flex flex-col space-y-[235px] justify-between">
                        <div className="flex flex-col space-y-[5px] w-[100%] ">
                            <div className="flex flex-row text-[13px] ">
                                <div className=" pl-[8px] w-[180px]">
                                    <p>Full name</p>
                                </div>
                                <div className="w-[120px]">
                                    <p>Type</p>
                                </div>
                                <div className="w-[135px]">
                                    <p>Gender</p>
                                </div>
                                <div className="w-[120px]">
                                    <p>DOB</p>
                                </div>
                                <div className="w-[198px]">
                                    <p>Email</p>
                                </div>
                                <div className="w-[139px]">
                                    <p>Phone</p>
                                </div>
                                
                                <div className="w-[120px]">
                                    <p>Action</p>
                                </div>
                                
                            </div>
                            <div className="flex flex-col space-y-[5px] h-[475px] no-scrollbar overflow-y-scroll">
                            {users.map((user, index) => (
                                <div key={index} className="flex flex-row bg-white rounded-[10px]  text-[13px]">
                                <div className="flex flex-col w-[180px] pl-[10px] py-[10px]  ">
                                    <div className=" overflow-hidden rounded-[10px] w-[90%]">
                                        <Image src={Bed} alt="bed" className="h-[80px] w-[auto]" />
                                    </div>
                                    <div className="mt-[5px]">
                                        <p>{user.firstName}</p>
                                        <p>{user.lastName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-[120px] ">
                                    <div className="bg-orange-200 px-[10px] py-[2px] rounded text-orange-600">
                                        <p>{user.type}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[135px] justify-center">
                                    <p>{user.gender}</p>
                                    
                                </div>
                                <div className="flex w-[120px] flex-col  justify-center">
                                    <p>{user.dob}</p>
                                </div>
                                <div className="w-[198px] flex flex-col justify-center">
                                    
                                    
                                        <p>{user.email}</p>
                                        
                                </div>
                                <div className="w-[139px] flex flex-col justify-center">
                                  
                                        <p>{user.phoneNumber}</p>
                                    

                                </div>
                                
                                <div className="w-[120px] flex flex-col justify-center">
                                    
                                    <div onClick={handleDeleteClick} className="cursor-pointer w-fit bg-red-500 px-[10px] py-[5px] rounded text-white mt-[5px]">
                                        <p>Delete</p>
                                    </div>
                                </div>
                                
                            </div>
                            ))
                                }
                                </div>
                            
                        </div>
                      
                    </div>
                    

                </div>
                <div className=" py-[10px] px-[10px] bg-gray-200 rounded-[10px] h-[85%] w-[40%]">
                    <p>Add User</p>
                    <div className="h-[420px] overflow-y-scroll no-scrollbar">
                    <div className="flex flex-row  py-[8px]">
                        <div className="text-[13px] w-[50%]  flex flex-col space-y-[2px]">
                            <p>User Type</p>
                            <div className="ml-[3px] px-[5px] py-[4px] border-gray-400 border-[1px] bg-white cursor-pointer w-fit rounded">
                                <select value={userType} onChange={(e) => setUserType(e.target.value)} className="focus:outline-none">
                                    <option value="">Select User</option>
                                    <option value="Admin" >Admin</option>
                                    <option value="User">User</option>
                                    
                                    
                                </select>
                            </div>
                        </div>
                        <div className="text-[13px] w-[55%]  flex flex-col space-y-[2px]">
                            <p>Gender </p>
                            <div className="ml-[3px] px-[5px] py-[4px] border-gray-400 border-[1px] bg-white cursor-pointer w-fit rounded">
                                <select value={gender} onChange={(e) => setGender(e.target.value)} className="focus:outline-none">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[5px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>First Name</p>
                            <div className="ml-[3px] ">
                                <input  value={firstName} onChange={handleFirstNameChange}  className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[5px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Last Name</p>
                            <div className="ml-[3px] ">
                                <input value={lastName} onChange={handleLastNameChange} className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Email</p>
                            <div className="ml-[3px] ">
                                <input value={email} onChange={handleEmailChange}  className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Password</p>
                            <div className="ml-[3px] ">
                                <input value={password} onChange={handlePasswordChange} className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Phone</p>
                            <div className="ml-[3px] ">
                                <input value={phone} onChange={handlePhoneChange} className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>DOB</p>
                            <div className="ml-[3px] ">
                                <input value={dob} onChange={handleDobChange} className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                    <div className="text-[13px] bg-white mb-[8px] py-[7px] rounded-[8px] border-gray-400 border-[1px] ">
                        <p className="px-[10px] mb-[5px]">Upload</p>
                        <div className="text-center h-[100px] flex flex-col border-gray-400 items-center justify-center border-y-[1px]">
                            <p><span className="text-blue-700 cursor-pointer">Click to upload</span> or drag and drop</p>
                            <p className="text-[11px]">[Max File size: 25 MB]</p>
                        </div>
                        <div>
                            <div className="leading-[14px] pt-[8px] px-[10px]">
                                <p>Room image 1.jpge</p>
                                <p className="text-[10px]  text-gray-500">200 KB</p>
                            </div>
                            <div className="flex flex-row items-center  justify-center space-x-[5px]">
                                <div className="w-[79%] h-[3px] bg-black rounded-[10px]"></div>
                                <p className="text-[10px] text-gray-700 ">40%</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row justify-center  space-x-[5px] text-[13px] ">
                        
                        <div className="bg-blue-600 text-white flex items-center justify-center px-[10px] py-[3px] cursor-pointer rounded border-[1px] border-gray-500">
                            <p>Add User</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Parking