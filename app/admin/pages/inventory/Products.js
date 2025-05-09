'use client';
import { useState, useEffect } from 'react';
import { INVENTORY, VEHICLE } from './api';
import ProductPopup from './ProductPopup';
import ConfirmDialog from './ConfirmDialog';
import SearchBar from './SearchBar';
import { generatePDF } from './pdfUtils';
import Script from 'next/script';
import { PrinterIcon, PlusIcon, FunnelIcon, PencilSquareIcon, TrashIcon, PaperAirplaneIcon, ChartBarIcon } from '@heroicons/react/24/solid'; 


export default function Products() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [popup, setPopup] = useState({ open: false, initial: null });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        status: '',
    });
    const [searchTerm, setSearchTerm] = useState('');


    const load = async () => {
        const { data } = await INVENTORY.LIST();
        setItems(data.inventories);
        setFilteredItems(data.inventories);
    };

    useEffect(() => { load(); }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = [...items];
        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // Category filter
        if (filters.category) {
            filtered = filtered.filter(item =>
                item.category && item.category.toLowerCase() === filters.category.toLowerCase()
            );
        }
        // Status filter
        if (filters.status) {
            filtered = filtered.filter(item =>
                item.status && item.status.toLowerCase() === filters.status.toLowerCase()
            );
        }
        setFilteredItems(filtered);
    }, [items, filters, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const remove = async id => {
        setConfirmDialog({ open: true, id });
    };

    const handleConfirmDelete = async () => {
        if (confirmDialog.id) {
            await INVENTORY.DELETE(confirmDialog.id);
            load();
        }
        setConfirmDialog({ open: false, id: null });
    };

    const handleCancelDelete = () => {
        setConfirmDialog({ open: false, id: null });
    };

    const dispatchItem = async (prod) => {
        if (!prod.vehicle) return alert('Assign a vehicle first');
        await INVENTORY.UPDATE(prod._id, {
            status: 'Dispatched',
            dispatchedTime: new Date(),
        });

        await VEHICLE.UPDATE(prod.vehicle._id, {
            status: 'Assigned',
            $push: { assignedInventories: prod._id }
        });

        load();
    };

    const handlePrintPDF = () => {
        generatePDF(filteredItems, 'products.pdf');
    };
    

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
                onLoad={() => {
                    console.log("html2canvas loaded");
                    window.html2canvas = window.html2canvas;
                }}
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
                onLoad={() => {
                    console.log("jsPDF loaded");
                    window.jspdf = window.jspdf?.jsPDF ? window.jspdf : window.jspdf?.default || window.jspdf;
                }}
            />

            <div className="space-y-4">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <FunnelIcon className="w-5 h-5 mr-2" />
                            Filters
                        </button>
                        <button
                            onClick={handlePrintPDF}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <PrinterIcon className="w-5 h-5 mr-2" />
                            Export
                        </button>
                    </div>
                    <button
                        onClick={() => setPopup({ open: true, initial: null })}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add Product
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="space-y-4">
                    <SearchBar
                        placeholder="Search by product name..."
                        onSearch={handleSearch}
                    />
                    {isFilterOpen && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-lg border-gray-300"
                                    >
                                        <option value="">All Categories</option>
                                        <option value="Resale">Resale</option>
                                        <option value="Recycle">Recycle</option>
                                        <option value="Fertilizer">Fertilizer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-lg border-gray-300"
                                    >
                                        <option value="">All Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Dispatched">Dispatched</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>

               
                {/* Products Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table id="products-table" className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Product', 'Category', 'Qty', 'Vendor', 'Vehicle', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredItems.map(it => (
                                    <tr key={it._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{it.productName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{it.category}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{it.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{it.vendorName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{it.vehicle?.plateNumber ?? '—'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                it.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                it.status === 'Dispatched' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {it.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => setPopup({ open: true, initial: it })}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => remove(it._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                                {it.status === 'Active' && (
                                                    <button
                                                        onClick={() => dispatchItem(it)}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Dispatch"
                                                    >
                                                        <PaperAirplaneIcon className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ProductPopup
                open={popup.open}
                onClose={() => setPopup({ open: false, initial: null })}
                onSaved={load}
                initial={popup.initial}
            />

            <ConfirmDialog
                open={confirmDialog.open}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this product?"
            />
        </>
    );
}