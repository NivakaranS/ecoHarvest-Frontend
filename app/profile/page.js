
import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Max from '../components/Max'

const ProfilePage = () => {
    return (
        <div>
            <Navigation/>
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