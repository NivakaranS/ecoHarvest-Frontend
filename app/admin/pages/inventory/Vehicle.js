'use client';
import { useState, useEffect } from 'react';
import { VEHICLE } from './api';
import VehiclePopup from './VehiclePopup';
import ConfirmDialog from './ConfirmDialog';
import SearchBar from './SearchBar';
import Script from 'next/script';
import { PrinterIcon, FunnelIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'; 
import { generatePDF } from './pdfUtils';

export default function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [popup, setPopup] = useState({ open: false, initial: null });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const load = async () => {
        const { data } = await VEHICLE.LIST();
        setVehicles(data.vehicles);
        setFilteredVehicles(data.vehicles);
    };

    useEffect(() => { load(); }, []);

    useEffect(() => {
        let filtered = [...vehicles];
        if (searchTerm) {
            filtered = filtered.filter(vehicle =>
                vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (status) {
            filtered = filtered.filter(vehicle =>
                vehicle.status && vehicle.status.toLowerCase() === status.toLowerCase()
            );
        }
        setFilteredVehicles(filtered);
    }, [vehicles, searchTerm, status]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const remove = async id => {
        setConfirmDialog({ open: true, id });
    };

    const handleConfirmDelete = async () => {
        if (confirmDialog.id) {
            await VEHICLE.DELETE(confirmDialog.id);
            load();
        }
        setConfirmDialog({ open: false, id: null });
    };

    const handleCancelDelete = () => {
        setConfirmDialog({ open: false, id: null });
    };

    const handlePrintPDF = () => {
        generatePDF(filteredVehicles, 'Vehicle-Report.pdf', 'vehicle');
    };
    

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="beforeInteractive" />

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
                    Add Vehicle
                </button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <SearchBar
                    placeholder="Search by plate number ..."
                    onSearch={handleSearch}
                />
                {isFilterOpen && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="w-full rounded-lg border-gray-300"
                                >
                                    <option value="">All Status</option>
                                    <option value="Available">Available</option>
                                    <option value="Assigned">Assigned</option>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 overflow-x-auto border rounded-lg shadow-sm bg-white">
                <table id="Vehicle-table" className="min-w-full text-sm text-gray-800">
                    <thead className="bg-gray-100 text-xs uppercase tracking-wide">
                        <tr>
                            {['Plate', 'Type', 'Capacity (kg)', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredVehicles.map(v => (
                            <tr key={v._id} className="hover:bg-gray-50">
                                <td className="px-5 py-3">{v.plateNumber}</td>
                                <td className="px-5 py-3">{v.type}</td>
                                <td className="px-5 py-3">{v.capacityKg}</td>
                                <td className="px-5 py-3">
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                        v.status === 'Available' ? 'bg-green-100 text-green-700' :
                                        v.status === 'In Use' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-200 text-gray-700'
                                    }`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 flex gap-3 no-print text-sm">
                                    <button
                                        onClick={() => setPopup({ open: true, initial: v })}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Edit"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => remove(v._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <VehiclePopup
                open={popup.open}
                onClose={() => setPopup({ open: false, initial: null })}
                onSaved={load}
                initial={popup.initial}
            />

            <ConfirmDialog
                open={confirmDialog.open}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this vehicle?"
            />
        </>
    );
}