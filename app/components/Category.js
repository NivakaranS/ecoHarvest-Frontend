
import Image from 'next/image';
import ProductImage from '../images/product.png';
import Start from '../images/log.png';
import Tea from '../images/teaAndCoffee2.png';

const Category = () => {
    return(
        <div className='bg-white cursor-pointer space-y-[15px] ring-gray-500 ring-[0.5px] drop-shadow-lg hover:drop-shadow-2xl rounded-[10px] flex flex-col items-center justify-center p-[10px] w-[14vw] h-[14vw]  mt-[10px]'>
            <div className=''>
                <Image src={Tea} className='select-none' alt="Product" width={160} height={160} />

            </div>
            <div className=' '>
                <p className='text-[20px] select-none '>Tea and Coffee</p>
                
            </div>

        </div>
    )
}

export default Category;