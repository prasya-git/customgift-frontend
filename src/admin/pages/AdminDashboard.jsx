
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaGift,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
  FaArrowRight
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

      // Handle API errors because apiService returns errors
      if (giftResponse?.response) {
        throw giftResponse
      }

      if (orderResponse?.response) {
        throw orderResponse
      }

      if (userResponse?.response) {
        throw userResponse
      }

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

  // Calculate total sales, excluding cancelled orders
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
      color: 'bg-rose-100 text-rose-700'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <FaShoppingBag />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Customers',
      value: users.length,
      icon: <FaUsers />,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Total Sales',
      value: `₹${totalSales.toLocaleString('en-IN')}`,
      icon: <FaRupeeSign />,
      color: 'bg-yellow-100 text-yellow-700'
    }
  ]

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">

          <div className="flex flex-wrap justify-between items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Welcome back! Here's an overview of your store.
              </p>
            </div>

            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="bg-rose-700 text-white px-5 py-2 rounded-lg hover:bg-rose-800 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>

          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6">
              <p>{error}</p>

              <button
                onClick={fetchDashboardData}
                className="underline font-semibold mt-2"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Dashboard Statistics */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-9">

            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <p className="text-gray-500 mt-5">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {loading ? '...' : stat.value}
                </h2>

              </div>
            ))}

          </div>

          {/* Recent Orders and Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-7 mt-10">

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <h2 className="text-xl font-semibold mb-5">
                Recent Orders
              </h2>

              {loading ? (

                <p className="text-gray-500">
                  Loading orders...
                </p>

              ) : orders.length === 0 ? (

                <p className="text-gray-500">
                  No orders received yet.
                </p>

              ) : (

                orders.slice(0, 5).map(order => (

                  <div
                    key={order._id}
                    className="flex justify-between border-b py-4 gap-3"
                  >

                    <div>
                      <p className="font-semibold">
                        {order.orderId || order._id}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.deliveryAddress?.name ||
                          order.userId?.username ||
                          'Customer'}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="font-semibold">
                        ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                      </p>

                      <p className="text-xs text-rose-700">
                        {order.orderStatus}
                      </p>

                    </div>

                  </div>

                ))

              )}

              <Link
                to="/admin/orders"
                className="text-rose-700 font-semibold mt-5 inline-flex items-center gap-2"
              >
                View All Orders <FaArrowRight />
              </Link>

            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <h2 className="text-xl font-semibold mb-5">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <Link
                  to="/admin/resources"
                  className="bg-rose-50 rounded-xl p-5 hover:bg-rose-100"
                >
                  <FaGift className="text-rose-700 text-2xl" />

                  <h3 className="font-semibold mt-3">
                    Manage Gifts
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Add or edit products
                  </p>
                </Link>

                <Link
                  to="/admin/orders"
                  className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100"
                >
                  <FaShoppingBag className="text-blue-700 text-2xl" />

                  <h3 className="font-semibold mt-3">
                    Manage Orders
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Update order status
                  </p>
                </Link>

              </div>

            </div>

          </div>

        </main>

      </div>
    </>
  )
}

export default AdminDashboard
