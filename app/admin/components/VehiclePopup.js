'use client';
import { useState, useEffect } from 'react';
import { VEHICLE } from './api';
import toast, { Toaster } from 'react-hot-toast';

const STATUS = ['Available', 'Assigned', 'Maintenance'];

export default function VehiclePopup({ open, onClose, onSaved, initial }) {
    if (!open) return null;
    const isEdit = Boolean(initial);

    const [form, setForm] = useState({
        plateNumber: '',
        type: '',
        capacityKg: 0,
        status: 'Available',
    });

    const [errors, setErrors] = useState({
        plateNumber: '',
        type: '',
        capacityKg: '',
    });

    useEffect(() => {
        if (initial) setForm(initial);
    }, [initial]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Clear error when user starts typing
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            plateNumber: '',
            type: '',
            capacityKg: '',
        };

        if (!form.plateNumber.trim()) {
            newErrors.plateNumber = 'Plate number is required';
            isValid = false;
        }

        if (!form.type.trim()) {
            newErrors.type = 'Vehicle type is required';
            isValid = false;
        }

        if (!form.capacityKg || form.capacityKg <= 0) {
            newErrors.capacityKg = 'Capacity must be a positive number';
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
            const body = { ...form, capacityKg: Number(form.capacityKg) };

            if (isEdit) {
                await VEHICLE.UPDATE(initial._id, body);
                toast.success('Vehicle updated successfully');
            } else {
                await VEHICLE.CREATE(body);
                toast.success('Vehicle created successfully');
            }

            onSaved();
            onClose();
        } catch (error) {
            if (error.message.includes('409'))
                toast.error('Vehicle with this plate number already exists');
            else
                toast.error(`Error: ${error.message || 'Failed to save vehicle'}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Toaster position="top-right" />
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                    {isEdit ? 'Edit Vehicle' : 'Add Vehicle'}
                </h2>

                {[
                    { name: 'plateNumber', label: 'Plate Number' },
                    { name: 'type', label: 'Vehicle Type' },
                    { name: 'capacityKg', label: 'Capacity (kg)' },
                ].map(f => (
                    <div key={f.name} className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            {f.label}
                        </label>
                        <input
                            name={f.name}
                            type={f.name === 'capacityKg' ? 'number' : 'text'}
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
                        Status
                    </label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        {STATUS.map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
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