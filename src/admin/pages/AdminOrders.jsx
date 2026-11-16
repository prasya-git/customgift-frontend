
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  // Fetch all orders from backend
  const getAllOrders = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiService('GET', '/order-list')

      if (response?.response) {
        throw response
      }

      setOrders(response.data || [])

    } catch (err) {
      console.log('Get orders error:', err)
      setError(
        err.response?.data?.message ||
        err.response?.data ||
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
        err.response?.data ||
        'Unable to update order status.'
      )
      getAllOrders()
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">

          <h1 className="text-3xl font-bold">Manage Orders</h1>

          <p className="text-gray-500 mt-2">
            View customer orders and update delivery status.
          </p>

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8 overflow-x-auto">

            {loading ? (
              <p className="text-center py-10 text-gray-500">
                Loading orders...
              </p>
            ) : error && orders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={getAllOrders}
                  className="bg-pink-700 text-white px-5 py-2 rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <p className="text-red-500 mb-4">{error}</p>
                )}

                <table className="w-full min-w-[950px] text-left">

                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-b">

                        <td className="p-3 font-semibold">
                          {order.orderId || order._id}
                        </td>

                        <td className="p-3">
                          <p className="font-medium">
                            {order.deliveryAddress?.name ||
                              order.userId?.username ||
                              'Customer'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.userId?.email || ''}
                          </p>
                        </td>

                        <td className="p-3">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : '-'}
                        </td>

                        <td className="p-3 font-semibold">
                          ₹{order.totalAmount}
                        </td>

                        <td className="p-3">
                          {order.paymentMethod} - {order.paymentStatus}
                        </td>

                        <td className="p-3">
                          <select
                            value={order.orderStatus}
                            disabled={
                              updatingId === order._id ||
                              order.orderStatus === 'Cancelled'
                            }
                            onChange={e =>
                              updateStatus(order._id, e.target.value)
                            }
                            className="border rounded-lg p-2 disabled:bg-gray-100"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {updatingId === order._id && (
                            <p className="text-xs text-gray-500 mt-1">
                              Updating...
                            </p>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

                {orders.length === 0 && (
                  <p className="text-center text-gray-500 py-10">
                    No orders available.
                  </p>
                )}
              </>
            )}

          </div>
        </main>
      </div>
    </>
  )
}

export default AdminOrders
