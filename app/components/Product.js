'use client'
import React from 'react';
import ProductImage from '../images/product.png';
import Image from 'next/image';
import Start from '../images/log.png';
import {useRouter} from 'next/navigation';


const Product = () => {
    const router = useRouter();

    const handleProductClick = () => {
        router.push('/product')
    }

    return(
        <div onClick={handleProductClick} className='bg-white cursor-pointer ring-gray-500 ring-[0.5px] drop-shadow-lg hover:drop-shadow-2xl rounded-[10px] flex flex-col items-center justify-between p-[10px] w-[14vw]  mt-[10px]'>
            <div className='py-[15px]'>
                <Image src={ProductImage} className='select-none' alt="Product" width={145} height={145} />

            </div>
            <div className='leading-[22px] select-none '>
                <p className='text-[16px]  leading-[21px] '>Anchor Drinking Yoghurt - 180 ml</p>
                <p className='text-[15px] px-[7px] leading-[17px] mb-[3px]  text-[#E08E26]'>Mango Passion</p>
                <div className='flex flex-row items-end  justify-between'>
                    <p className='text-[23px] mt-[5px]'>Rs. 500</p>
                    <div className='flex flex-row items-center  space-x-[3px] '>
                        <Image src={Start} alt="" className='h-[15px] w-[15px]' />
                        <p className='text-gray-700 text-[15px] '>4.5(25)</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product;