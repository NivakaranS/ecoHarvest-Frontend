'use client';
import { useState, useEffect } from 'react';
import { INVENTORY, VEHICLE } from './api';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['Resale', 'Recycle', 'Fertilizer'];

export default function ProductPopup({ open, onClose, onSaved, initial }) {
    if (!open) return null;
    const isEdit = Boolean(initial);

    /* ---------- state ---------- */
    const [form, setForm] = useState({
        productName: '',
        category: 'Resale',
        quantity: 0,
        vendorName: '',
        vehicle: '',
    });
    const [vehicles, setVehicles] = useState([]);
    const [errors, setErrors] = useState({
        productName: '',
        quantity: '',
        vendorName: '',
        vehicle: '',
    });

    /* ---------- load vehicles & pre-fill ---------- */
    useEffect(() => {
        (async () => {
            try {
                const { data } = await VEHICLE.LIST();
                setVehicles(data.vehicles.filter(v => v.status === 'Available'));
            } catch (error) {
                toast.error('Failed to load vehicles');
            }
        })();
    }, []);

    useEffect(() => {
        if (initial) {
            setForm({
                productName: initial.productName,
                category: initial.category,
                quantity: initial.quantity,
                vendorName: initial.vendorName,
                vehicle: initial.vehicle || '',
            });
        }
    }, [initial]);

    /* ---------- helpers ---------- */
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            productName: '',
            quantity: '',
            vendorName: '',
            vehicle: '',
        };

        if (!form.productName.trim()) {
            newErrors.productName = 'Product name is required';
            isValid = false;
        }

        if (!form.quantity || form.quantity <= 0) {
            newErrors.quantity = 'Quantity must be a positive number';
            isValid = false;
        }

        if (!form.vendorName.trim()) {
            newErrors.vendorName = 'Vendor name is required';
            isValid = false;
        }

        if (!form.vehicle) {
            newErrors.vehicle = 'Vehicle selection is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Please fill all required fields correctly');
            return;
        }

        try {
            const body = { ...form, quantity: Number(form.quantity) };

            if (isEdit) {
                await INVENTORY.UPDATE(initial._id, body);
                toast.success('Product updated successfully');
            } else {
                await INVENTORY.CREATE(body);
                toast.success('Product created successfully');
            }

            onSaved();
            onClose();
        } catch (error) {
            toast.error(`Error: ${error.message || 'Failed to save product'}`);
        }
    };

    /* ---------- UI ---------- */
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Toaster position="top-right" />
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    {isEdit ? 'Edit Product' : 'Add Product'}
                </h2>

                {[
                    { name: 'productName', label: 'Product Name' },
                    { name: 'quantity', label: 'Quantity', type: 'number' },
                    { name: 'vendorName', label: 'Vendor Name' },
                ].map(f => (
                    <div key={f.name} className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            {f.label}
                        </label>
                        <input
                            name={f.name}
                            type={f.type || 'text'}
                            placeholder={f.label}
                            value={form[f.name]}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2 ${errors[f.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors[f.name] && (
                            <p className="mt-1 text-sm text-red-500">{errors[f.name]}</p>
                        )}
                    </div>
                ))}

                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        {CATEGORIES.map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Vehicle
                    </label>
                    <select
                        name="vehicle"
                        value={form.vehicle}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-3 py-2 ${errors.vehicle ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">— Select vehicle —</option>
                        {vehicles.map(v => (
                            <option key={v._id} value={v._id}>
                                {v.plateNumber} ({v.type})
                            </option>
                        ))}
                    </select>
                    {errors.vehicle && (
                        <p className="mt-1 text-sm text-red-500">{errors.vehicle}</p>
                    )}
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-gray-200 px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        {isEdit ? 'Save' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
}