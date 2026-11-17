
import React, { useEffect, useState } from 'react'
import {
    FaShoppingBag,
    FaSyncAlt,
    FaCalendarAlt,
    FaRupeeSign,
    FaBoxOpen,
    FaClipboardList
} from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminOrders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    // Fetch all orders
    const getAllOrders = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await apiService('GET', '/order-list')

            if (response?.response) {
                throw response
            }

            setOrders(Array.isArray(response.data) ? response.data : [])

        } catch (err) {
            console.log('Get orders error:', err)

            setError(
                err.response?.data?.message ||
                (typeof err.response?.data === 'string'
                    ? err.response.data
                    : '') ||
                'Unable to load orders. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    // Update order status
    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id)
            setError('')

            const response = await apiService(
                'PUT',
                `/update-order/${id}`,
                { orderStatus: status }
            )

            if (response?.response) {
                throw response
            }

            const updatedOrder = response.data.order

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === id ? updatedOrder : order
                )
            )

        } catch (err) {
            console.log('Update order error:', err)

            setError(
                err.response?.data?.message ||
                (typeof err.response?.data === 'string'
                    ? err.response.data
                    : '') ||
                'Unable to update order status.'
            )

            getAllOrders()

        } finally {
            setUpdatingId(null)
        }
    }

    // Status badge colors
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-50 text-green-700 border-green-200'

            case 'Shipped':
                return 'bg-blue-50 text-blue-700 border-blue-200'

            case 'Processing':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'

            case 'Cancelled':
                return 'bg-red-50 text-red-600 border-red-200'

            default:
                return 'bg-[#fbe8ed] text-[#872d4c] border-[#f1d5df]'
        }
    }

    // Payment badge colors
    const getPaymentStyle = (status) => {
        return status === 'Paid'
            ? 'bg-green-50 text-green-700'
            : status === 'Failed'
                ? 'bg-red-50 text-red-600'
                : 'bg-yellow-50 text-yellow-700'
    }

    const formatDate = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
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

                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between items-center gap-4">

                        <div>
                            <div className="flex items-center gap-2 text-[#a64d6d] text-sm font-semibold mb-2">
                                <FaClipboardList />
                                Order Management
                            </div>

                            <h1 className="text-3xl font-extrabold text-[#3b202b]">
                                Manage Orders
                            </h1>

                            <p className="text-[#987985] mt-2 text-sm md:text-base">
                                View customer orders and update delivery status.
                            </p>
                        </div>

                        <button
                            onClick={getAllOrders}
                            disabled={loading}
                            className="flex items-center gap-2 bg-[#872d4c] hover:bg-[#682139] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md shadow-[#872d4c]/20 transition-all disabled:opacity-50"
                        >
                            <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Refreshing...' : 'Refresh Orders'}
                        </button>

                    </div>

                    {/* Order Count */}
                    <div className="mt-7 bg-gradient-to-r from-[#682139] to-[#a64d6d] rounded-2xl p-5 md:p-6 text-white flex items-center justify-between gap-4">

                        <div>
                            <p className="text-sm text-white/80 font-medium">
                                Total Orders
                            </p>

                            <h2 className="text-3xl font-extrabold mt-1">
                                {loading ? '...' : orders.length}
                            </h2>

                            <p className="text-xs text-white/70 mt-1">
                                Orders received in your store
                            </p>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                            <FaShoppingBag className="text-2xl text-[#ffc5d5]" />
                        </div>

                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">

                            <p className="text-sm font-medium">
                                {error}
                            </p>

                            {!loading && (
                                <button
                                    onClick={getAllOrders}
                                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                                >
                                    Try Again
                                </button>
                            )}

                        </div>
                    )}

                    {/* Orders Table */}
                    <div className="bg-white border border-[#f1e2e7] rounded-2xl shadow-sm mt-7 overflow-hidden">

                        <div className="p-5 md:p-6 border-b border-[#f1e2e7] flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center">
                                <FaBoxOpen className="text-lg" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-[#3b202b]">
                                    All Customer Orders
                                </h2>

                                <p className="text-xs text-[#987985] mt-1">
                                    Manage and track your customer purchases
                                </p>
                            </div>

                        </div>

                        {loading ? (

                            <div className="text-center py-16">
                                <FaSyncAlt className="animate-spin text-3xl text-[#872d4c] mx-auto mb-4" />

                                <p className="text-[#987985] text-sm">
                                    Loading orders...
                                </p>
                            </div>

                        ) : error && orders.length === 0 ? (

                            <div className="text-center py-14 px-5">

                                <p className="text-red-500 mb-4">
                                    Unable to display orders.
                                </p>

                                <button
                                    onClick={getAllOrders}
                                    className="bg-[#872d4c] hover:bg-[#682139] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                                >
                                    Retry
                                </button>

                            </div>

                        ) : orders.length === 0 ? (

                            <div className="text-center py-16 px-5">

                                <div className="w-16 h-16 rounded-full bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center text-2xl mx-auto mb-4">
                                    <FaBoxOpen />
                                </div>

                                <h3 className="text-lg font-bold text-[#54313e]">
                                    No Orders Yet
                                </h3>

                                <p className="text-sm text-[#987985] mt-2">
                                    Customer orders will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[1050px] text-left">

                                    <thead>
                                        <tr className="bg-[#fff5f7] text-[#987985] text-xs uppercase tracking-wider">

                                            <th className="p-4 font-bold">
                                                Order Details
                                            </th>

                                            <th className="p-4 font-bold">
                                                Customer
                                            </th>

                                            <th className="p-4 font-bold">
                                                Order Date
                                            </th>

                                            <th className="p-4 font-bold">
                                                Amount
                                            </th>

                                            <th className="p-4 font-bold">
                                                Payment
                                            </th>

                                            <th className="p-4 font-bold">
                                                Order Status
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {orders.map(order => (

                                            <tr
                                                key={order._id}
                                                className="border-t border-[#f3e7eb] hover:bg-[#fffafb] transition"
                                            >

                                                {/* Order ID */}
                                                <td className="p-4">

                                                    <p className="font-bold text-[#54313e] text-sm">
                                                        {order.orderId || order._id}
                                                    </p>

                                                    <p className="text-[11px] text-[#b69aa4] mt-1">
                                                        Order ID
                                                    </p>

                                                </td>

                                                {/* Customer */}
                                                <td className="p-4">

                                                    <p className="font-semibold text-[#54313e] text-sm">
                                                        {order.deliveryAddress?.name ||
                                                            order.userId?.username ||
                                                            'Customer'}
                                                    </p>

                                                    <p className="text-xs text-[#987985] mt-1">
                                                        {order.userId?.email || 'Email unavailable'}
                                                    </p>

                                                </td>

                                                {/* Date */}
                                                <td className="p-4">

                                                    <div className="flex items-center gap-2 text-sm text-[#765461]">
                                                        <FaCalendarAlt className="text-[#c28da0]" />
                                                        {formatDate(order.createdAt)}
                                                    </div>

                                                </td>

                                                {/* Amount */}
                                                <td className="p-4">

                                                    <div className="flex items-center gap-1 font-bold text-[#3b202b]">
                                                        <FaRupeeSign className="text-xs" />
                                                        {Number(order.totalAmount || 0).toLocaleString('en-IN')}
                                                    </div>

                                                </td>

                                                {/* Payment */}
                                                <td className="p-4">

                                                    <p className="text-xs font-semibold text-[#54313e]">
                                                        {order.paymentMethod || '-'}
                                                    </p>

                                                    <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold ${getPaymentStyle(order.paymentStatus)}`}>
                                                        {order.paymentStatus || 'Pending'}
                                                    </span>

                                                </td>

                                                {/* Status Update */}
                                                <td className="p-4">

                                                    <select
                                                        value={order.orderStatus || 'Order Placed'}
                                                        disabled={
                                                            updatingId === order._id ||
                                                            order.orderStatus === 'Cancelled'
                                                        }
                                                        onChange={e =>
                                                            updateStatus(order._id, e.target.value)
                                                        }
                                                        className={`w-40 border rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#fbe8ed] disabled:opacity-60 disabled:cursor-not-allowed ${getStatusStyle(order.orderStatus)}`}
                                                    >
                                                        <option value="Order Placed">Order Placed</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>

                                                    {updatingId === order._id && (
                                                        <p className="text-[10px] text-[#a64d6d] mt-2 font-semibold">
                                                            Updating...
                                                        </p>
                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                        {/* Table Footer */}
                        {!loading && orders.length > 0 && (
                            <div className="px-5 py-4 border-t border-[#f1e2e7] bg-[#fffafb]">

                                <p className="text-xs text-[#987985]">
                                    Showing <span className="font-bold text-[#872d4c]">{orders.length}</span> orders
                                </p>

                            </div>
                        )}

                    </div>

                </main>

            </div>
        </>
    )
}

export default AdminOrders
