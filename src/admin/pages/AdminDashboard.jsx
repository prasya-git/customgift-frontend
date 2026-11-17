
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaGift,
    FaShoppingBag,
    FaUsers,
    FaRupeeSign,
    FaArrowRight,
    FaSyncAlt,
    FaChartLine,
    FaBoxOpen,
    FaCalendarAlt
} from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminDashboard() {

    const [gifts, setGifts] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch dashboard data
    const fetchDashboardData = async () => {

        try {
            setLoading(true)
            setError('')

            const [giftResponse, orderResponse, userResponse] =
                await Promise.all([
                    apiService('GET', '/gift-list'),
                    apiService('GET', '/order-list'),
                    apiService('GET', '/user-list')
                ])

            if (giftResponse?.response) throw giftResponse
            if (orderResponse?.response) throw orderResponse
            if (userResponse?.response) throw userResponse

            setGifts(Array.isArray(giftResponse.data) ? giftResponse.data : [])
            setOrders(Array.isArray(orderResponse.data) ? orderResponse.data : [])
            setUsers(Array.isArray(userResponse.data) ? userResponse.data : [])

        } catch (err) {

            console.error('Dashboard API Error:', err)

            setError(
                err.response?.data?.message ||
                (typeof err.response?.data === 'string'
                    ? err.response.data
                    : '') ||
                'Unable to load dashboard data. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    // Total sales excluding cancelled orders
    const totalSales = orders
        .filter(order => order.orderStatus !== 'Cancelled')
        .reduce(
            (total, order) => total + Number(order.totalAmount || 0),
            0
        )

    const stats = [
        {
            title: 'Total Gifts',
            value: gifts.length,
            icon: <FaGift />,
            iconBg: 'bg-[#fbe8ed]',
            iconColor: 'text-[#872d4c]',
            description: 'Products in your store'
        },
        {
            title: 'Total Orders',
            value: orders.length,
            icon: <FaShoppingBag />,
            iconBg: 'bg-[#f0eafa]',
            iconColor: 'text-[#7951a5]',
            description: 'Orders received'
        },
        {
            title: 'Customers',
            value: users.length,
            icon: <FaUsers />,
            iconBg: 'bg-[#e8f5ee]',
            iconColor: 'text-[#39845c]',
            description: 'Registered customers'
        },
        {
            title: 'Total Sales',
            value: `₹${totalSales.toLocaleString('en-IN')}`,
            icon: <FaRupeeSign />,
            iconBg: 'bg-[#fff2df]',
            iconColor: 'text-[#bd812d]',
            description: 'Excluding cancelled orders'
        }
    ]

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-50 text-green-700'

            case 'Shipped':
                return 'bg-blue-50 text-blue-700'

            case 'Processing':
                return 'bg-yellow-50 text-yellow-700'

            case 'Cancelled':
                return 'bg-red-50 text-red-600'

            default:
                return 'bg-[#fbe8ed] text-[#872d4c]'
        }
    }

    const formatDate = (date) => {
        if (!date) return 'Date unavailable'

        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff9fa] p-5 md:p-8 lg:p-10 min-w-0">

                    {/* Dashboard Heading */}
                    <div className="flex flex-wrap justify-between items-center gap-4">

                        <div>
                            <div className="flex items-center gap-2 text-[#a64d6d] text-sm font-semibold mb-2">
                                <FaChartLine />
                                Store Overview
                            </div>

                            <h1 className="text-3xl font-extrabold text-[#3b202b]">
                                Dashboard
                            </h1>

                            <p className="text-[#987985] mt-2 text-sm md:text-base">
                                Welcome back! Here's an overview of your GIFTORA store.
                            </p>
                        </div>

                        <button
                            onClick={fetchDashboardData}
                            disabled={loading}
                            className="flex items-center gap-2 bg-[#872d4c] hover:bg-[#682139] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md shadow-[#872d4c]/20 transition-all duration-300 disabled:opacity-50"
                        >
                            <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>

                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-5 rounded-2xl mt-7">

                            <p className="font-semibold">{error}</p>

                            <button
                                onClick={fetchDashboardData}
                                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {/* Statistics Cards */}
                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-9">

                        {stats.map((stat, index) => (

                            <div
                                key={index}
                                className="bg-white border border-[#f1e2e7] rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >

                                <div className="flex justify-between items-start">

                                    <div>
                                        <p className="text-sm font-medium text-[#987985]">
                                            {stat.title}
                                        </p>

                                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#3b202b] mt-3 break-words">
                                            {loading ? '...' : stat.value}
                                        </h2>
                                    </div>

                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.iconBg} ${stat.iconColor}`}>
                                        {stat.icon}
                                    </div>

                                </div>

                                <p className="text-xs text-[#b69aa4] mt-5">
                                    {stat.description}
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Recent Orders and Quick Actions */}
                    <div className="grid xl:grid-cols-2 gap-6 mt-10">

                        {/* Recent Orders */}
                        <div className="bg-white border border-[#f1e2e7] rounded-2xl p-5 md:p-6 shadow-sm">

                            <div className="flex justify-between items-center gap-3 mb-6">

                                <div>
                                    <h2 className="text-xl font-bold text-[#3b202b]">
                                        Recent Orders
                                    </h2>

                                    <p className="text-xs text-[#987985] mt-1">
                                        Latest customer purchases
                                    </p>
                                </div>

                                <div className="w-11 h-11 rounded-xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center">
                                    <FaShoppingBag className="text-lg" />
                                </div>

                            </div>

                            {loading ? (

                                <div className="py-10 text-center text-[#987985]">
                                    Loading orders...
                                </div>

                            ) : orders.length === 0 ? (

                                <div className="py-10 text-center">

                                    <FaBoxOpen className="text-4xl text-[#d8bdc7] mx-auto mb-3" />

                                    <p className="text-[#987985] text-sm">
                                        No orders received yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="divide-y divide-[#f3e7eb]">

                                    {orders.slice(0, 5).map(order => (

                                        <div
                                            key={order._id}
                                            className="flex justify-between items-center py-4 gap-3"
                                        >

                                            <div className="min-w-0">

                                                <p className="font-bold text-[#54313e] text-sm truncate">
                                                    {order.orderId || order._id}
                                                </p>

                                                <p className="text-xs text-[#987985] mt-1 truncate">
                                                    {order.deliveryAddress?.name ||
                                                        order.userId?.username ||
                                                        'Customer'}
                                                </p>

                                                <p className="text-[11px] text-[#b69aa4] mt-1 flex items-center gap-1">
                                                    <FaCalendarAlt />
                                                    {formatDate(order.createdAt)}
                                                </p>

                                            </div>

                                            <div className="text-right shrink-0">

                                                <p className="font-bold text-[#3b202b] text-sm">
                                                    ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                                                </p>

                                                <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mt-2 ${getStatusStyle(order.orderStatus)}`}>
                                                    {order.orderStatus || 'Pending'}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                            <Link
                                to="/admin/orders"
                                className="flex items-center justify-center gap-2 mt-5 w-full bg-[#fbe8ed] hover:bg-[#f5d6e0] text-[#872d4c] font-bold text-sm py-3 rounded-xl transition"
                            >
                                View All Orders
                                <FaArrowRight />
                            </Link>

                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white border border-[#f1e2e7] rounded-2xl p-5 md:p-6 shadow-sm">

                            <div className="flex justify-between items-center gap-3 mb-6">

                                <div>
                                    <h2 className="text-xl font-bold text-[#3b202b]">
                                        Quick Actions
                                    </h2>

                                    <p className="text-xs text-[#987985] mt-1">
                                        Manage your store easily
                                    </p>
                                </div>

                                <div className="w-11 h-11 rounded-xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center">
                                    <FaGift className="text-lg" />
                                </div>

                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">

                                <Link
                                    to="/admin/resources"
                                    className="group bg-[#fff5f7] border border-[#f3dfe6] rounded-2xl p-5 hover:bg-[#fbe8ed] hover:border-[#e8bdcb] transition-all duration-300 hover:-translate-y-1"
                                >

                                    <div className="w-12 h-12 rounded-xl bg-[#872d4c] text-white flex items-center justify-center text-xl group-hover:scale-110 transition">
                                        <FaGift />
                                    </div>

                                    <h3 className="font-bold text-[#54313e] mt-4">
                                        Manage Gifts
                                    </h3>

                                    <p className="text-xs text-[#987985] mt-2 leading-5">
                                        Add, update or remove gifts from your store.
                                    </p>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#872d4c] mt-5">
                                        Explore
                                        <FaArrowRight className="group-hover:translate-x-1 transition" />
                                    </span>

                                </Link>

                                <Link
                                    to="/admin/orders"
                                    className="group bg-[#f8f4fb] border border-[#e9dff1] rounded-2xl p-5 hover:bg-[#f0eafa] hover:border-[#d9c7e8] transition-all duration-300 hover:-translate-y-1"
                                >

                                    <div className="w-12 h-12 rounded-xl bg-[#7951a5] text-white flex items-center justify-center text-xl group-hover:scale-110 transition">
                                        <FaShoppingBag />
                                    </div>

                                    <h3 className="font-bold text-[#54313e] mt-4">
                                        Manage Orders
                                    </h3>

                                    <p className="text-xs text-[#987985] mt-2 leading-5">
                                        View customer orders and update their status.
                                    </p>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#7951a5] mt-5">
                                        Explore
                                        <FaArrowRight className="group-hover:translate-x-1 transition" />
                                    </span>

                                </Link>

                            </div>

                            {/* Dashboard Note */}
                            <div className="mt-6 bg-gradient-to-r from-[#682139] to-[#a64d6d] rounded-2xl p-5 text-white">

                                <div className="flex items-center gap-3">
                                    <FaGift className="text-2xl text-[#ffc5d5]" />

                                    <div>
                                        <h3 className="font-bold">
                                            Make Every Gift Special
                                        </h3>

                                        <p className="text-xs text-white/80 mt-1">
                                            Keep your GIFTORA store updated and organized.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>
        </>
    )
}

export default AdminDashboard
