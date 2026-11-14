import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('giftOrders')) || []
  })

  const updateStatus = (id, status) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status } : order
    )

    setOrders(updatedOrders)
    localStorage.setItem('giftOrders', JSON.stringify(updatedOrders))
  }

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <p className="text-gray-500 mt-2">View customer orders and update delivery status.</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3 font-semibold">{order.id}</td>
                    <td className="p-3">{order.customer?.name}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">₹{order.total}</td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="border rounded-lg p-2"
                      >
                        <option>Order Placed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <p className="text-center text-gray-500 py-10">No orders available.</p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminOrders