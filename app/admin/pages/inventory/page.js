// app/inventory/page.js
'use client';

import { useState, useEffect } from 'react';
import Products from './Products';
import Vehicle from './Vehicle';
import { CubeIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/24/outline'; 
import { INVENTORY, VEHICLE } from './api';

export default function InventoryPage() {
    const [tab, setTab] = useState('products');
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeVehicles: 0,
        pendingDispatch: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            // Fetch products
            const prodRes = await INVENTORY.LIST();
            const products = prodRes.data.inventories || [];
            // Fetch vehicles
            const vehRes = await VEHICLE.LIST();
            const vehicles = vehRes.data.vehicles || [];
            // Calculate stats
            setStats({
                totalProducts: products.length,
                activeVehicles: vehicles.filter(v => (v.status || '').toLowerCase() === 'available' || (v.status || '').toLowerCase() === 'active').length,
                pendingDispatch: products.filter(p => (p.status || '').toLowerCase() === 'active').length,
            });
        }
        fetchStats();
    }, []);

    const TabBtn = ({ id, label }) => {
        const icons = {
            products: <CubeIcon className="w-5 h-5 mr-2" />,
            vehicles: <TruckIcon className="w-5 h-5 mr-2" />,
        };
        return (
            <button
                onClick={() => setTab(id)}
                className={`flex items-center px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-200
                ${tab === id
                    ? 'bg-yellow-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-yellow-50 hover:border-yellow-200'}
                `}

            >
                {icons[id]}
                {label}
            </button>
        );
    };

    function autoAssignVehicle(vehicles, quantity) {
        if (quantity < 100) {
            // Find first available van
            return vehicles.find(v => v.type.toLowerCase() === 'van' && v.status === 'Available');
        } else {
            // Find first available truck
            return vehicles.find(v => v.type.toLowerCase() === 'truck' && v.status === 'Available');
        }
    }

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage Fertilizer products and  Assign vehicles</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                                <ChartBarIcon className="w-5 h-5 mr-2" />
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <CubeIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Products</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <TruckIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Active Vehicles</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.activeVehicles}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <ChartBarIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Pending Dispatch</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pendingDispatch}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="px-6 py-4 flex space-x-4">
                            <TabBtn id="products" label="Products" />
                            <TabBtn id="vehicles" label="Vehicles" />
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {tab === 'products' ? <Products /> : <Vehicle />}
                    </div>
                </div>
            </div>
        </div>
    );
}
