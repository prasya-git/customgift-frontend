
import React, { useEffect, useState } from 'react'
import {
    FaTrash,
    FaSyncAlt,
    FaGift,
    FaBoxOpen,
    FaRupeeSign,
    FaExclamationCircle
} from 'react-icons/fa'

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

    const lowStockCount = gifts.filter(
        gift => Number(gift.stock) > 0 && Number(gift.stock) <= 5
    ).length

    const outOfStockCount = gifts.filter(
        gift => Number(gift.stock) <= 0
    ).length

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff8f6] p-5 md:p-8 lg:p-10">

                    {/* Page Heading */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                        <div>
                            <p className="text-sm font-semibold text-[#872d4c] uppercase tracking-widest">
                                Inventory Management
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#291d20] mt-2">
                                Manage Gifts
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Add, view and manage your gift products.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-rose-100">
                            <FaGift className="text-[#872d4c] text-xl" />
                            <span className="font-semibold text-[#291d20]">
                                GIFTORA Inventory
                            </span>
                        </div>

                    </div>

                    {/* Inventory Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                                <FaGift className="text-[#872d4c] text-xl" />
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Gifts
                                </p>
                                <h2 className="text-2xl font-bold text-[#291d20]">
                                    {gifts.length}
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                <FaExclamationCircle className="text-amber-600 text-xl" />
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Low Stock
                                </p>
                                <h2 className="text-2xl font-bold text-[#291d20]">
                                    {lowStockCount}
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                <FaBoxOpen className="text-red-600 text-xl" />
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Out of Stock
                                </p>
                                <h2 className="text-2xl font-bold text-[#291d20]">
                                    {outOfStockCount}
                                </h2>
                            </div>
                        </div>

                    </div>

                    {/* Add Gift Form */}
                    <div className="mb-9">
                        <UploadGift onAddGift={addGift} />
                    </div>

                    {/* Gift Inventory */}
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

                        <div className="p-5 md:p-6 border-b border-rose-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-[#291d20]">
                                    Gift Inventory
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage your available gift products
                                </p>
                            </div>

                            <button
                                onClick={fetchGifts}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 bg-[#872d4c] hover:bg-[#682039] text-white px-5 py-2.5 rounded-lg font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                                {loading ? 'Refreshing...' : 'Refresh'}
                            </button>

                        </div>

                        {/* Loading */}
                        {loading ? (

                            <div className="text-center py-16">
                                <div className="w-10 h-10 border-4 border-rose-200 border-t-[#872d4c] rounded-full animate-spin mx-auto"></div>

                                <p className="text-gray-500 mt-4">
                                    Loading gifts...
                                </p>
                            </div>

                        ) : error ? (

                            /* Error */
                            <div className="text-center py-16 px-5">

                                <FaExclamationCircle className="text-red-400 text-4xl mx-auto mb-3" />

                                <p className="text-red-600 font-medium">
                                    {error}
                                </p>

                                <button
                                    onClick={() => setRefresh(prev => prev + 1)}
                                    className="mt-5 bg-[#872d4c] hover:bg-[#682039] text-white px-6 py-2.5 rounded-lg font-semibold transition duration-300"
                                >
                                    Try Again
                                </button>

                            </div>

                        ) : gifts.length === 0 ? (

                            /* Empty State */
                            <div className="text-center py-16 px-5">

                                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaGift className="text-[#872d4c] text-2xl" />
                                </div>

                                <h3 className="text-xl font-bold text-[#291d20]">
                                    No Gifts Available
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Add your first gift using the form above.
                                </p>

                            </div>

                        ) : (

                            /* Inventory Table */
                            <div className="overflow-x-auto">

                                <table className="w-full text-left min-w-[700px]">

                                    <thead>
                                        <tr className="bg-[#fff4f5] text-[#872d4c] text-sm uppercase tracking-wide">
                                            <th className="p-4">Gift</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Stock</th>
                                            <th className="p-4">Availability</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {gifts.map(gift => {

                                            const imageUrl = gift.image
                                                ? gift.image.startsWith('http')
                                                    ? gift.image
                                                    : `http://localhost:3000/uploads/${gift.image}`
                                                : ''

                                            const stock = Number(gift.stock) || 0

                                            return (
                                                <tr
                                                    key={gift._id}
                                                    className="border-b border-gray-100 hover:bg-[#fffafb] transition duration-200"
                                                >

                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">

                                                            {imageUrl ? (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={gift.name}
                                                                    className="w-14 h-14 object-cover rounded-xl border border-rose-100"
                                                                />
                                                            ) : (
                                                                <div className="w-14 h-14 rounded-xl bg-rose-100 flex items-center justify-center">
                                                                    <FaGift className="text-[#872d4c] text-xl" />
                                                                </div>
                                                            )}

                                                            <div>
                                                                <p className="font-semibold text-[#291d20]">
                                                                    {gift.name}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    ID: {gift._id?.slice(-6)}
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td className="p-4">
                                                        <span className="bg-rose-50 text-[#872d4c] px-3 py-1.5 rounded-full text-sm font-medium">
                                                            {gift.category}
                                                        </span>
                                                    </td>

                                                    <td className="p-4">
                                                        <span className="font-semibold text-[#291d20] flex items-center gap-1">
                                                            <FaRupeeSign className="text-xs" />
                                                            {gift.price}
                                                        </span>
                                                    </td>

                                                    <td className="p-4">
                                                        <span className="font-semibold text-gray-700">
                                                            {stock}
                                                        </span>
                                                    </td>

                                                    <td className="p-4">
                                                        {stock <= 0 ? (
                                                            <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                                                                Out of Stock
                                                            </span>
                                                        ) : stock <= 5 ? (
                                                            <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                                                                Low Stock
                                                            </span>
                                                        ) : (
                                                            <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                                                                Available
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="p-4">
                                                        <div className="flex justify-center">

                                                            <button
                                                                onClick={() => deleteGift(gift._id)}
                                                                disabled={deletingId === gift._id}
                                                                className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                title="Delete gift"
                                                            >
                                                                {deletingId === gift._id ? (
                                                                    'Deleting...'
                                                                ) : (
                                                                    <>
                                                                        <FaTrash />
                                                                        Delete
                                                                    </>
                                                                )}
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>

                            </div>
                        )}

                        <div className="px-5 py-4 bg-[#fffafb] border-t border-rose-100">
                            <p className="text-xs text-gray-500">
                                Inventory data is fetched directly from your database.
                            </p>
                        </div>

                    </div>

                </main>
            </div>
        </>
    )
}

export default AdminResource
