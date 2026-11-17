
import React, { useEffect, useState } from 'react'
import {
    FaStore,
    FaEnvelope,
    FaPhone,
    FaTruck,
    FaSave,
    FaCog,
    FaExclamationCircle
} from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminSettings() {

    const [settings, setSettings] = useState({
        storeName: '',
        email: '',
        phone: '',
        deliveryCharge: 50
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    // Fetch settings from MongoDB
    useEffect(() => {

        const fetchSettings = async () => {

            setLoading(true)
            setError('')

            try {

                const response = await apiService(
                    'GET',
                    '/settings'
                )

                if (response?.response) {
                    throw response
                }

                setSettings({
                    storeName: response.data.storeName || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    deliveryCharge: response.data.deliveryCharge ?? 50
                })

            } catch (err) {

                console.error('Fetch settings error:', err)

                setError(
                    typeof err.response?.data === 'string'
                        ? err.response.data
                        : err.response?.data?.message || 'Unable to load settings'
                )

            } finally {

                setLoading(false)

            }

        }

        fetchSettings()

    }, [])

    // Handle input changes
    const handleChange = (e) => {

        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })

    }

    // Save settings to MongoDB
    const saveSettings = async (e) => {

        e.preventDefault()

        setSaving(true)

        try {

            const response = await apiService(
                'PUT',
                '/settings',
                {
                    storeName: settings.storeName,
                    email: settings.email,
                    phone: settings.phone,
                    deliveryCharge: Number(settings.deliveryCharge)
                }
            )

            if (response?.response) {
                throw response
            }

            const savedSettings = response.data.settings

            setSettings({
                storeName: savedSettings.storeName,
                email: savedSettings.email,
                phone: savedSettings.phone,
                deliveryCharge: savedSettings.deliveryCharge
            })

            alert('Settings saved successfully!')

        } catch (err) {

            console.error('Save settings error:', err)

            alert(
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Failed to save settings'
            )

        } finally {

            setSaving(false)

        }

    }

    const inputClass = "w-full border border-gray-200 bg-[#fffafb] rounded-xl py-3 px-4 text-[#291d20] outline-none transition duration-200 focus:border-[#872d4c] focus:ring-2 focus:ring-rose-100"

    const labelClass = "block text-sm font-semibold text-[#291d20] mb-2"

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff8f6] p-5 md:p-8 lg:p-10">

                    {/* Page Heading */}
                    <div className="mb-8">

                        <p className="text-sm font-semibold text-[#872d4c] uppercase tracking-widest">
                            Administration
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-[#291d20] mt-2 flex items-center gap-3">
                            <FaCog className="text-[#872d4c] text-2xl" />
                            Store Settings
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your store information and delivery preferences.
                        </p>

                    </div>

                    {/* Loading */}
                    {loading ? (

                        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-12 max-w-3xl text-center">

                            <div className="w-10 h-10 border-4 border-rose-200 border-t-[#872d4c] rounded-full animate-spin mx-auto"></div>

                            <p className="text-gray-500 mt-4">
                                Loading store settings...
                            </p>

                        </div>

                    ) : error ? (

                        /* Error */
                        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 max-w-3xl">

                            <FaExclamationCircle className="text-red-500 text-3xl mb-3" />

                            <h2 className="text-lg font-bold text-[#291d20]">
                                Unable to Load Settings
                            </h2>

                            <p className="text-red-600 mt-2">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 bg-[#872d4c] hover:bg-[#682039] text-white px-6 py-2.5 rounded-lg font-semibold transition duration-300"
                            >
                                Try Again
                            </button>

                        </div>

                    ) : (

                        <div className="max-w-3xl">

                            {/* Settings Card */}
                            <form
                                onSubmit={saveSettings}
                                className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden"
                            >

                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-[#872d4c] to-[#a94b69] p-6 md:p-8 text-white">

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                                            <FaStore className="text-2xl" />
                                        </div>

                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold">
                                                Store Information
                                            </h2>

                                            <p className="text-rose-100 text-sm mt-1">
                                                Update your GIFTORA store details.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Form Fields */}
                                <div className="p-6 md:p-8 space-y-6">

                                    {/* Store Name */}
                                    <div>

                                        <label className={labelClass}>
                                            Store Name
                                        </label>

                                        <div className="relative">

                                            <FaStore className="absolute left-4 top-1/2 -translate-y-1/2 text-[#872d4c]" />

                                            <input
                                                name="storeName"
                                                value={settings.storeName}
                                                onChange={handleChange}
                                                placeholder="Enter store name"
                                                required
                                                className={`${inputClass} pl-11`}
                                            />

                                        </div>

                                    </div>

                                    {/* Email */}
                                    <div>

                                        <label className={labelClass}>
                                            Store Email
                                        </label>

                                        <div className="relative">

                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#872d4c]" />

                                            <input
                                                type="email"
                                                name="email"
                                                value={settings.email}
                                                onChange={handleChange}
                                                placeholder="Enter store email"
                                                required
                                                className={`${inputClass} pl-11`}
                                            />

                                        </div>

                                    </div>

                                    {/* Phone */}
                                    <div>

                                        <label className={labelClass}>
                                            Contact Number
                                        </label>

                                        <div className="relative">

                                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#872d4c]" />

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={settings.phone}
                                                onChange={handleChange}
                                                placeholder="Enter contact number"
                                                required
                                                className={`${inputClass} pl-11`}
                                            />

                                        </div>

                                    </div>

                                    {/* Delivery Charge */}
                                    <div>

                                        <label className={labelClass}>
                                            Delivery Charge (₹)
                                        </label>

                                        <div className="relative">

                                            <FaTruck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#872d4c]" />

                                            <input
                                                type="number"
                                                min="0"
                                                name="deliveryCharge"
                                                value={settings.deliveryCharge}
                                                onChange={handleChange}
                                                placeholder="Enter delivery charge"
                                                required
                                                className={`${inputClass} pl-11`}
                                            />

                                        </div>

                                        <p className="text-xs text-gray-400 mt-2">
                                            This charge is used when calculating customer order totals.
                                        </p>

                                    </div>

                                </div>

                                {/* Footer / Save Button */}
                                <div className="px-6 md:px-8 py-5 bg-[#fffafb] border-t border-rose-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <p className="text-xs text-gray-500">
                                        Make sure your store details are correct.
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center justify-center gap-2 bg-[#872d4c] hover:bg-[#682039] text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaSave />

                                        {saving ? 'Saving Changes...' : 'Save Settings'}
                                    </button>

                                </div>

                            </form>

                        </div>

                    )}

                </main>

            </div>
        </>
    )
}

export default AdminSettings
