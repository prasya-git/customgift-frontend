
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
    FaUser,
    FaBox,
    FaHeart,
    FaSignOutAlt,
    FaShoppingBag,
    FaEdit,
    FaCheckCircle,
    FaExclamationCircle
} from 'react-icons/fa'

import Header from '../components/Header'
import Purchase from '../components/Purchase'
import Edit from '../components/Edit'
import apiService from '../../api/apiService'

function Profile() {

    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('giftUser')) || null
    )

    const [orders, setOrders] = useState([])
    const [activeTab, setActiveTab] = useState('orders')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch profile and order details from backend
    useEffect(() => {
        const fetchAccountData = async () => {

            const token = sessionStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

            try {
                const [profileResponse, ordersResponse] = await Promise.all([
                    apiService('GET', '/user-profile'),
                    apiService('GET', '/user-orders')
                ])

                if (profileResponse?.response) throw profileResponse
                if (ordersResponse?.response) throw ordersResponse

                const profileData = profileResponse.data

                const updatedUser = {
                    ...profileData,
                    name: profileData.username || profileData.name
                }

                setUser(updatedUser)
                localStorage.setItem('giftUser', JSON.stringify(updatedUser))

                setOrders(
                    Array.isArray(ordersResponse.data)
                        ? ordersResponse.data
                        : []
                )

            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Unable to load your account details'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchAccountData()
    }, [])

    // Logout
    const logout = () => {
        sessionStorage.removeItem('token')
        localStorage.removeItem('giftUser')
        navigate('/login')
    }

    // Login Required
    if (!sessionStorage.getItem('token')) {
        return (
            <>
                <Header />

                <div className="min-h-[70vh] bg-[#fff8f6] flex items-center justify-center px-5 py-16">

                    <div className="bg-white max-w-md w-full rounded-3xl shadow-lg border border-rose-100 p-10 text-center">

                        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                            <FaUser className="text-[#872d4c] text-3xl" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#291d20] mt-6">
                            Please Login First
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Login to view your profile, orders and wishlist.
                        </p>

                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 mt-7 bg-[#872d4c] hover:bg-[#682039] text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
                        >
                            Login to Continue
                        </Link>

                    </div>

                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <section className="min-h-screen bg-[#fff8f6] px-5 md:px-10 lg:px-16 py-10 md:py-12">

                {/* Order Success Message */}
                {location.state?.orderPlaced && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-sm">

                        <FaCheckCircle className="text-green-600 text-2xl mt-1 shrink-0" />

                        <div>
                            <h3 className="font-bold text-lg">
                                Order Placed Successfully!
                            </h3>

                            <p className="text-sm mt-1">
                                Thank you for shopping with GIFTORA. Your order has been received.
                            </p>

                            <p className="text-sm font-semibold mt-2">
                                Order ID: {location.state.orderId}
                            </p>
                        </div>

                    </div>
                )}

                {/* Page Heading */}
                <div className="mb-9">

                    <p className="text-sm font-semibold text-[#872d4c] uppercase tracking-widest">
                        Welcome Back
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#291d20] mt-2">
                        My Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your profile, orders and personal details.
                    </p>

                </div>

                {/* Loading */}
                {loading ? (

                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 py-20 text-center">

                        <div className="w-10 h-10 border-4 border-rose-200 border-t-[#872d4c] rounded-full animate-spin mx-auto"></div>

                        <p className="text-gray-500 mt-4">
                            Loading your account...
                        </p>

                    </div>

                ) : error ? (

                    /* Error */
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 py-16 px-5 text-center">

                        <FaExclamationCircle className="text-red-400 text-4xl mx-auto mb-4" />

                        <p className="text-red-600 font-medium">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 bg-[#872d4c] hover:bg-[#682039] text-white px-7 py-2.5 rounded-lg font-semibold transition duration-300"
                        >
                            Try Again
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

                        {/* Sidebar / Profile Card */}
                        <aside className="lg:col-span-1">

                            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

                                {/* Profile Banner */}
                                <div className="h-24 bg-gradient-to-r from-[#872d4c] to-[#bd718b]"></div>

                                {/* User Information */}
                                <div className="px-6 pb-6">

                                    <div className="w-24 h-24 rounded-full border-4 border-white bg-rose-100 text-[#872d4c] flex items-center justify-center text-4xl mx-auto -mt-12 relative overflow-hidden shadow-md">

                                        {user?.picture ? (
                                            <img
                                                src={
                                                    user.picture.startsWith('http')
                                                        ? user.picture
                                                        : `http://localhost:3000/uploads/${user.picture}`
                                                }
                                                alt={user?.name || 'Profile'}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FaUser />
                                        )}

                                    </div>

                                    <div className="text-center mt-4">

                                        <h2 className="text-xl font-bold text-[#291d20]">
                                            {user?.name || user?.username || 'User'}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-1 break-all">
                                            {user?.email}
                                        </p>

                                        <span className="inline-block mt-3 bg-rose-50 text-[#872d4c] text-xs font-semibold px-4 py-1.5 rounded-full">
                                            GIFTORA Member
                                        </span>

                                    </div>

                                    <hr className="my-6 border-gray-100" />

                                    {/* Navigation */}
                                    <nav className="flex flex-col gap-2">

                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className={`w-full p-3.5 rounded-xl flex items-center gap-3 font-semibold transition duration-300 ${
                                                activeTab === 'orders'
                                                    ? 'bg-[#872d4c] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-rose-50 hover:text-[#872d4c]'
                                            }`}
                                        >
                                            <FaBox className="text-lg" />
                                            My Orders
                                        </button>

                                        <button
                                            onClick={() => setActiveTab('profile')}
                                            className={`w-full p-3.5 rounded-xl flex items-center gap-3 font-semibold transition duration-300 ${
                                                activeTab === 'profile'
                                                    ? 'bg-[#872d4c] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-rose-50 hover:text-[#872d4c]'
                                            }`}
                                        >
                                            <FaEdit className="text-lg" />
                                            Edit Profile
                                        </button>

                                        <Link
                                            to="/wishlist"
                                            className="w-full p-3.5 rounded-xl flex items-center gap-3 font-semibold text-gray-600 hover:bg-rose-50 hover:text-[#872d4c] transition duration-300"
                                        >
                                            <FaHeart className="text-lg" />
                                            My Wishlist
                                        </Link>

                                        <button
                                            onClick={logout}
                                            className="w-full p-3.5 rounded-xl flex items-center gap-3 font-semibold text-red-600 hover:bg-red-50 transition duration-300"
                                        >
                                            <FaSignOutAlt className="text-lg" />
                                            Logout
                                        </button>

                                    </nav>

                                </div>

                            </div>

                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-3">

                            {activeTab === 'orders' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

                                    <div className="p-5 md:p-7 border-b border-rose-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                        <div>
                                            <h2 className="text-2xl font-bold text-[#291d20] flex items-center gap-3">
                                                <FaShoppingBag className="text-[#872d4c]" />
                                                My Orders
                                            </h2>

                                            <p className="text-gray-500 text-sm mt-2">
                                                Track and manage your purchases.
                                            </p>
                                        </div>

                                        <span className="bg-rose-100 text-[#872d4c] px-4 py-2 rounded-full text-sm font-bold">
                                            {orders.length} Orders
                                        </span>

                                    </div>

                                    <div className="p-5 md:p-7">
                                        <Purchase orders={orders} />
                                    </div>

                                </div>
                            )}

                            {activeTab === 'profile' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

                                    <div className="p-5 md:p-7 border-b border-rose-100">

                                        <h2 className="text-2xl font-bold text-[#291d20] flex items-center gap-3">
                                            <FaEdit className="text-[#872d4c]" />
                                            Profile Information
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-2">
                                            Update your personal information.
                                        </p>

                                    </div>

                                    <div className="p-5 md:p-7">
                                        <Edit
                                            user={user}
                                            onUpdate={setUser}
                                        />
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                )}

            </section>
        </>
    )
}

export default Profile
