import React from 'react'
import GiftStatus from './GiftStatus'

function Purchase({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center bg-white rounded-2xl p-10">
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          Your purchases will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {orders.map(order => (
        <div key={order.id} className="bg-white shadow-sm rounded-2xl p-6">

          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-500">
                Ordered on {order.date}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-rose-700">
                ₹{order.total}
              </p>
              <p className="text-sm text-gray-500">
                {order.payment}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {order.items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <GiftStatus status={order.status} />

        </div>
      ))}

    </div>
  )
}

export default Purchase