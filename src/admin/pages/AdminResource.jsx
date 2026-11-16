
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import UploadGift from '../../user/components/UploadGift'
import apiService from '../../api/apiService'

function AdminResource() {

    const [gifts, setGifts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [deletingId, setDeletingId] = useState(null)

    // Fetch all gifts from MongoDB
    const fetchGifts = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await apiService(
                'GET',
                '/gift-list'
            )

            if (response?.response) throw response

            setGifts(Array.isArray(response.data) ? response.data : [])

        } catch (err) {
            console.log('Fetch gifts error:', err)

            setError(
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Unable to load gifts'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGifts()
    }, [refresh])

    // Add new gift
    const addGift = async (formData) => {
        try {
            const response = await apiService(
                'POST',
                '/add-gift',
                formData
            )

            if (response?.response) throw response

            alert('Gift added successfully!')

            // Refresh inventory from MongoDB
            setRefresh(prev => prev + 1)

            return response.data

        } catch (err) {
            console.log('Add gift error:', err)

            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Failed to add gift'

            alert(message)
            throw err
        }
    }

    // Delete gift
    const deleteGift = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this gift?'
        )

        if (!confirmDelete) return

        try {
            setDeletingId(id)

            const response = await apiService(
                'DELETE',
                `/delete-gift/${id}`
            )

            if (response?.response) throw response

            alert('Gift deleted successfully!')

            setGifts(prev =>
                prev.filter(gift => gift._id !== id)
            )

        } catch (err) {
            console.log('Delete gift error:', err)

            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Failed to delete gift'

            alert(message)

        } finally {
            setDeletingId(null)
        }
    }

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff8f6] p-6 md:p-10">

                    <h1 className="text-3xl font-bold">
                        Manage Gifts
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add and manage your gift products.
                    </p>

                    <div className="mt-8">
                        <UploadGift onAddGift={addGift} />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 mt-9">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">
                                Gift Inventory ({gifts.length})
                            </h2>

                            <button
                                onClick={fetchGifts}
                                disabled={loading}
                                className="gift-btn"
                            >
                                Refresh
                            </button>
                        </div>

                        {loading ? (

                            <p className="text-center py-10 text-rose-700">
                                Loading gifts...
                            </p>

                        ) : error ? (

                            <div className="text-center py-10">
                                <p className="text-red-600">{error}</p>

                                <button
                                    onClick={() => setRefresh(prev => prev + 1)}
                                    className="gift-btn mt-4"
                                >
                                    Try Again
                                </button>
                            </div>

                        ) : gifts.length === 0 ? (

                            <p className="text-center py-10 text-gray-500">
                                No gifts found. Add your first gift.
                            </p>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full text-left min-w-[650px]">

                                    <thead>
                                        <tr className="border-b text-gray-500">
                                            <th className="p-3">Gift</th>
                                            <th className="p-3">Category</th>
                                            <th className="p-3">Price</th>
                                            <th className="p-3">Stock</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {gifts.map(gift => {

                                            const imageUrl = gift.image
                                                ? gift.image.startsWith('http')
                                                    ? gift.image
                                                    : `http://localhost:3000/uploads/${gift.image}`
                                                : ''

                                            return (
                                                <tr key={gift._id} className="border-b">

                                                    <td className="p-3">
                                                        <div className="flex items-center gap-3">

                                                            {imageUrl && (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={gift.name}
                                                                    className="w-14 h-14 object-cover rounded-lg"
                                                                />
                                                            )}

                                                            <span className="font-semibold">
                                                                {gift.name}
                                                            </span>

                                                        </div>
                                                    </td>

                                                    <td className="p-3">
                                                        {gift.category}
                                                    </td>

                                                    <td className="p-3">
                                                        ₹{gift.price}
                                                    </td>

                                                    <td className="p-3">
                                                        {gift.stock}
                                                    </td>

                                                    <td className="p-3">
                                                        <button
                                                            onClick={() => deleteGift(gift._id)}
                                                            disabled={deletingId === gift._id}
                                                            className="text-red-600 p-2 disabled:opacity-50"
                                                            title="Delete gift"
                                                        >
                                                            {deletingId === gift._id
                                                                ? 'Deleting...'
                                                                : <FaTrash />
                                                            }
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </main>
            </div>
        </>
    )
}

export default AdminResource
