
import Image from 'next/image';
import HeroImage from '../images/teaAndCoffee2.png'

const Hero = () => {
    return (
        <div className="text-black  w-[100%] pt-[15vh] bg-gradient-to-b  from-gray-400 to-[#F5F5F5] flex items-center justify-center h-[100vh] bg-[#F5F5F5]">
            <div className="w-[100%] px-[100px]   flex flex-row items-center h-[95%] rounded-[20px] ">
                <div className='select-none'>
                    <div className="  w-[90%]">
                        <p className="text-[45px] leading-[53px] ">Your One-Stop Shop for Groceries & Daily Essentials</p>
                    </div>
                    <div className="w-[80%] pt-[5px]">
                        <p className="text-[20px] leading-[26px] text-gray-800">Fresh produce, pantry staples and households
                            essentials delivered to your doorstep at 
                            unbeatable prices.
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <Image alt='' className='select-none' src={HeroImage} height={500} />
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Hero;