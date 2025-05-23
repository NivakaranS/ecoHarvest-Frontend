'use client';
import Image from 'next/image';
import HeroImage from '../images/teaAndCoffee2.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfLink, setPdfLink] = useState(null);
    const [advertisement, setAdvertisement] = useState([]);

    useEffect(() => {
        const fetchAdvertisement = async () => {
            try {
                const response = await axios.get('http://localhost:8000/advertisement/');
                setAdvertisement(response.data);
            } catch (error) {
                console.error('Error fetching advertisement:', error);
            }
        };

        fetchAdvertisement();
    }, []);

    const handleGeneratePDF = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:8000/report/generateorderreport',
                {},
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setPdfLink(url);
            setIsLoading(false);
        } catch (err) {
            console.error('Error generating PDF:', err);
            setError('Failed to generate PDF');
            setIsLoading(false);
        }
    };

    return (
        <div className="text-black w-full pt-[15vh] bg-gradient-to-b from-gray-400 to-[#F5F5F5] flex items-center justify-center h-[100vh] bg-[#F5F5F5]">
            {advertisement.length > 0 && (
                <div className="w-full px-[100px] flex flex-row items-center h-[95%] rounded-[20px]">
                    <div className="select-none">
                        <div className="w-[90%]">
                            <p className="text-[45px] leading-[53px]">{advertisement[0].title}</p>
                        </div>
                        <div className="w-[80%] pt-[5px]">
                            <p className="text-[20px] leading-[26px] text-gray-800">
                                {advertisement[0].description}
                            </p>
                        </div>
                       
                    </div>

                    <div className="ml-10">
                        {advertisement[0].imageUrl && (
                            <Image
                                alt="Advertisement Image"
                                className="select-none"
                                src={advertisement[0].imageUrl}
                                width={700}
                                height={160}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
