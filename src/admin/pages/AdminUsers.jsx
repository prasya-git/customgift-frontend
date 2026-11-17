
import React, { useEffect, useState } from 'react'
import {
    FaUsers,
    FaUser,
    FaEnvelope,
    FaSyncAlt,
    FaUserShield,
    FaExclamationCircle
} from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(0)

    // Fetch customers from MongoDB
    const fetchUsers = async () => {

        setLoading(true)
        setError('')

        try {

            const response = await apiService(
                'GET',
                '/user-list'
            )

            if (response?.response) {
                throw response
            }

            setUsers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            )

        } catch (err) {

            console.error('Fetch users error:', err)

            setError(
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Unable to load customers'
            )

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {
        fetchUsers()
    }, [refresh])

    // Get initials for customer avatar
    const getInitials = (name) => {
        if (!name) return 'U'

        return name
            .trim()
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join('')
    }

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
                                Customer Management
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#291d20] mt-2">
                                Customers
                            </h1>

                            <p className="text-gray-500 mt-2">
                                View and manage registered customer accounts.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-rose-100 rounded-xl px-4 py-3 shadow-sm">
                            <FaUsers className="text-[#872d4c] text-xl" />
                            <span className="font-semibold text-[#291d20]">
                                GIFTORA Customers
                            </span>
                        </div>

                    </div>

                    {/* Customer Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 flex items-center gap-4">

                            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
                                <FaUsers className="text-[#872d4c] text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Customers
                                </p>

                                <h2 className="text-3xl font-bold text-[#291d20] mt-1">
                                    {users.length}
                                </h2>
                            </div>

                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 flex items-center gap-4">

                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                                <FaUserShield className="text-purple-600 text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Admin Accounts
                                </p>

                                <h2 className="text-3xl font-bold text-[#291d20] mt-1">
                                    {users.filter(user => user.role === 'admin').length}
                                </h2>
                            </div>

                        </div>

                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

                        {/* Table Header */}
                        <div className="p-5 md:p-6 border-b border-rose-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-[#291d20]">
                                    Registered Users
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Customer account information
                                </p>
                            </div>

                            <button
                                onClick={fetchUsers}
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
                                    Loading customers...
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

                        ) : users.length === 0 ? (

                            /* Empty State */
                            <div className="text-center py-16 px-5">

                                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaUsers className="text-[#872d4c] text-2xl" />
                                </div>

                                <h3 className="text-xl font-bold text-[#291d20]">
                                    No Customers Yet
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Registered customer accounts will appear here.
                                </p>

                            </div>

                        ) : (

                            /* Customer Table */
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[650px] text-left">

                                    <thead>
                                        <tr className="bg-[#fff4f5] text-[#872d4c] text-sm uppercase tracking-wide">

                                            <th className="p-4">
                                                Customer
                                            </th>

                                            <th className="p-4">
                                                Email Address
                                            </th>

                                            <th className="p-4">
                                                Role
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {users.map((user) => (

                                            <tr
                                                key={user._id}
                                                className="border-b border-gray-100 hover:bg-[#fffafb] transition duration-200"
                                            >

                                                {/* Customer Name */}
                                                <td className="p-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#872d4c] to-[#bd718b] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                                            {getInitials(user.username)}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-[#291d20]">
                                                                {user.username || 'Unknown User'}
                                                            </p>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Customer Account
                                                            </p>
                                                        </div>

                                                    </div>

                                                </td>

                                                {/* Email */}
                                                <td className="p-4">

                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <FaEnvelope className="text-[#bd718b] text-sm" />
                                                        {user.email}
                                                    </div>

                                                </td>

                                                {/* Role */}
                                                <td className="p-4">

                                                    {user.role === 'admin' ? (

                                                        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold capitalize">
                                                            <FaUserShield />
                                                            {user.role}
                                                        </span>

                                                    ) : (

                                                        <span className="inline-flex items-center gap-2 bg-rose-50 text-[#872d4c] px-3 py-1.5 rounded-full text-xs font-semibold capitalize">
                                                            <FaUser />
                                                            {user.role || 'user'}
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                        {/* Table Footer */}
                        {!loading && !error && users.length > 0 && (
                            <div className="px-5 py-4 bg-[#fffafb] border-t border-rose-100">
                                <p className="text-xs text-gray-500">
                                    Showing {users.length} registered accounts from your database.
                                </p>
                            </div>
                        )}

                    </div>

                </main>

            </div>
        </>
    )
}

export default AdminUsers
