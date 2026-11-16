
import React from 'react'
import GiftStatus from './GiftStatus'

function Purchase({ orders = [] }) {

    const getImageUrl = (image) => {
        if (!image) return ''

        return image.startsWith('http')
            ? image
            : `http://localhost:3000/uploads/${image}`
    }

    if (orders.length === 0) {
        return (
            <div className="text-center bg-white rounded-2xl p-10">
                <h2 className="text-2xl font-semibold">
                    No orders yet
                </h2>

                <p className="text-gray-500 mt-2">
                    Your purchases will appear here.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">

            {orders.map(order => (

                <div
                    key={order._id}
                    className="bg-white shadow-sm rounded-2xl p-6"
                >

                    <div className="flex flex-wrap justify-between gap-3">

                        <div>
                            <h3 className="font-semibold text-lg">
                                Order #{order.orderId || order._id}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Ordered on {
                                    order.createdAt
                                        ? new Date(order.createdAt).toLocaleDateString()
                                        : 'Date unavailable'
                                }
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-rose-700">
                                ₹{order.totalAmount}
                            </p>

                            <p className="text-sm text-gray-500">
                                {order.paymentMethod}
                            </p>
                        </div>

                    </div>

                    <div className="mt-5 space-y-4">

                        {order.items?.map((item, index) => {

                            const gift = item.giftId

                            const giftName = item.name || gift?.name || 'Gift'
                            const giftImage = item.image || gift?.image

                            return (
                                <div
                                    key={`${gift?._id || gift || index}-${index}`}
                                    className="flex items-center gap-4"
                                >

                                    <img
                                        src={getImageUrl(giftImage)}
                                        alt={giftName}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />

                                    <div>
                                        <h4 className="font-semibold">
                                            {giftName}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Price: ₹{item.price}
                                        </p>

                                        {item.customization?.name && (
                                            <p className="text-sm text-gray-500">
                                                Name: {item.customization.name}
                                            </p>
                                        )}

                                        {item.customization?.message && (
                                            <p className="text-sm text-gray-500">
                                                Message: {item.customization.message}
                                            </p>
                                        )}

                                        {item.customization?.photo && (
                                            <img
                                                src={getImageUrl(item.customization.photo)}
                                                alt="Customized gift"
                                                className="w-16 h-16 object-cover rounded-lg mt-2"
                                            />
                                        )}
                                    </div>

                                </div>
                            )
                        })}

                    </div>

                    <div className="mt-5 border-t pt-4">
                        <GiftStatus status={order.orderStatus} />
                    </div>

                </div>

            ))}

        </div>
    )
}

export default Purchase
