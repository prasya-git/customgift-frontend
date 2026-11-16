
import React, { useEffect, useState } from 'react'
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

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff8f6] p-6 md:p-10">

                    <h1 className="text-3xl font-bold">
                        Store Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage basic store information.
                    </p>

                    {loading ? (

                        <p className="text-center text-rose-700 mt-10">
                            Loading settings...
                        </p>

                    ) : error ? (

                        <div className="bg-white rounded-2xl shadow-sm p-7 mt-8 max-w-2xl">

                            <p className="text-red-600">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="gift-btn mt-4"
                            >
                                Try Again
                            </button>

                        </div>

                    ) : (

                        <form
                            onSubmit={saveSettings}
                            className="bg-white rounded-2xl shadow-sm p-7 mt-8 max-w-2xl space-y-5"
                        >

                            <div>
                                <label className="block mb-2">
                                    Store Name
                                </label>

                                <input
                                    name="storeName"
                                    value={settings.storeName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Store Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Contact Number
                                </label>

                                <input
                                    name="phone"
                                    value={settings.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Delivery Charge (₹)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="deliveryCharge"
                                    value={settings.deliveryCharge}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="gift-btn disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Settings'}
                            </button>

                        </form>

                    )}

                </main>

            </div>
        </>
    )
}

export default AdminSettings
