import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGift, FaShoppingBag, FaUsers,
  FaRupeeSign, FaArrowRight
} from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminDashboard() {
  const orders = JSON.parse(localStorage.getItem('giftOrders')) || []
  const users = JSON.parse(localStorage.getItem('giftUsers')) || []

  const totalSales = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  )

  const stats = [
    {
      title: 'Total Gifts',
      value: 8,
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
      value: `₹${totalSales}`,
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

          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Here's an overview of your store.
          </p>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-9">

            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                  {stat.icon}
                </div>

                <p className="text-gray-500 mt-5">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
              </div>
            ))}

          </div>

          <div className="grid lg:grid-cols-2 gap-7 mt-10">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-5">Recent Orders</h2>

              {orders.length === 0 ? (
                <p className="text-gray-500">No orders received yet.</p>
              ) : (
                orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex justify-between border-b py-4 gap-3">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {order.customer?.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">₹{order.total}</p>
                      <p className="text-xs text-rose-700">{order.status}</p>
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

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <Link to="/admin/resources" className="bg-rose-50 rounded-xl p-5 hover:bg-rose-100">
                  <FaGift className="text-rose-700 text-2xl" />
                  <h3 className="font-semibold mt-3">Manage Gifts</h3>
                  <p className="text-sm text-gray-500 mt-1">Add or edit products</p>
                </Link>

                <Link to="/admin/orders" className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100">
                  <FaShoppingBag className="text-blue-700 text-2xl" />
                  <h3 className="font-semibold mt-3">Manage Orders</h3>
                  <p className="text-sm text-gray-500 mt-1">Update order status</p>
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