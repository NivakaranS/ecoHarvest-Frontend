// app/inventory/page.js
'use client';
import { useState } from 'react';
import Products from '../components/Products';
import Vehicle from '../components/Vehicle';
import { CubeIcon, TruckIcon } from '@heroicons/react/24/outline'; 

export default function InventoryPage() {
    const [tab, setTab] = useState('products');


    const TabBtn = ({ id, label }) => {
        const icons = {
            products: <CubeIcon className="w-5 h-5 mr-2" />,
            vehicles: <TruckIcon className="w-5 h-5 mr-2" />,
        };
        return (
            <button
                onClick={() => setTab(id)}
                className={`flex items-center px-6 py-1 rounded-full text-lg font-bold transition-colors duration-200
                ${tab === id
                        ? 'bg-black text-white shadow'
                        : 'bg-white text-black border border-gray-300 hover:bg-gray-200 hover:text-black'}
            `}
            >
                {icons[id]}
                {label}
            </button>
        );
    };

    return (
        <div className=" bg-gray-100 text-gray-800 flex flex-col">
            <div className="mt-6 border-b border-gray-300 flex-shrink-0 flex justify-center space-x-8">
                <TabBtn id="products" label="Products" />
                <TabBtn id="vehicles" label="Vehicles" />
            </div>

            <div className="flex-grow p-4 bg-white shadow-md rounded-md m-4">
                {tab === 'products' ? <Products /> : <Vehicle />}
            </div>
        </div>
    );
}
