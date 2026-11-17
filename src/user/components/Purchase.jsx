
import React from 'react'
import {
    FaBoxOpen,
    FaShoppingBag,
    FaCalendarAlt,
    FaCreditCard,
    FaGift,
    FaRupeeSign,
    FaReceipt
} from 'react-icons/fa'
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
            <div className="bg-white rounded-3xl border border-[#f2e2e7] shadow-sm p-10 md:p-16 text-center">

                <div className="w-24 h-24 mx-auto rounded-full bg-[#fbe8ed] flex items-center justify-center mb-6">
                    <FaShoppingBag className="text-4xl text-[#872d4c]" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#3b202b]">
                    No Orders Yet!
                </h2>

                <p className="text-[#987985] mt-3 leading-7">
                    You haven't placed any orders yet.
                    Your purchases will appear here once you order something.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-[#872d4c] font-semibold">
                    <FaGift />
                    Happy Shopping with GIFTORA!
                </div>

            </div>
        )
    }

    return (
        <div className="space-y-7">

            {orders.map(order => (

                <div
                    key={order._id}
                    className="bg-white border border-[#f1e1e6] shadow-sm hover:shadow-lg rounded-3xl overflow-hidden transition-all duration-300"
                >

                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-[#fff0f4] to-[#fbe8ed] px-5 md:px-7 py-5">

                        <div className="flex flex-wrap justify-between items-start gap-4">

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-9 h-9 rounded-xl bg-white text-[#872d4c] flex items-center justify-center shadow-sm">
                                        <FaReceipt />
                                    </div>

                                    <h3 className="font-bold text-lg md:text-xl text-[#3b202b]">
                                        Order #{order.orderId || order._id}
                                    </h3>
                                </div>

                                <p className="flex items-center gap-2 text-sm text-[#987985]">
                                    <FaCalendarAlt className="text-[#b45b78]" />
                                    Ordered on {
                                        order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString()
                                            : 'Date unavailable'
                                    }
                                </p>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-xs uppercase tracking-wider font-semibold text-[#a1848e] mb-1">
                                    Total Amount
                                </p>

                                <p className="text-2xl font-extrabold text-[#872d4c] flex items-center sm:justify-end">
                                    <FaRupeeSign className="text-lg" />
                                    {order.totalAmount}
                                </p>

                                <p className="flex items-center sm:justify-end gap-2 text-sm text-[#987985] mt-1">
                                    <FaCreditCard className="text-[#b45b78]" />
                                    {order.paymentMethod}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Order Items */}
                    <div className="p-5 md:p-7">

                        <div className="flex items-center gap-2 mb-5">
                            <FaBoxOpen className="text-[#872d4c]" />

                            <h4 className="font-bold text-[#3b202b]">
                                Ordered Items
                            </h4>

                            <span className="text-xs bg-[#fbe8ed] text-[#872d4c] px-2.5 py-1 rounded-full font-semibold">
                                {order.items?.length || 0} Items
                            </span>
                        </div>

                        <div className="space-y-5">

                            {order.items?.map((item, index) => {

                                const gift = item.giftId

                                const giftName = item.name || gift?.name || 'Gift'
                                const giftImage = item.image || gift?.image

                                return (
                                    <div
                                        key={`${gift?._id || gift || index}-${index}`}
                                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#fffafb] border border-[#f4e7eb]"
                                    >

                                        {/* Gift Image */}
                                        <div className="shrink-0">
                                            {giftImage ? (
                                                <img
                                                    src={getImageUrl(giftImage)}
                                                    alt={giftName}
                                                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-[#f1e1e6]"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                                    <FaGift className="text-3xl text-[#b45b78]" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Gift Details */}
                                        <div className="flex-1 min-w-0">

                                            <h4 className="font-bold text-lg text-[#3b202b]">
                                                {giftName}
                                            </h4>

                                            <div className="grid grid-cols-2 gap-3 mt-3">

                                                <div>
                                                    <p className="text-xs text-[#a1848e]">
                                                        Quantity
                                                    </p>

                                                    <p className="text-sm font-semibold text-[#684452] mt-1">
                                                        {item.quantity}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-[#a1848e]">
                                                        Unit Price
                                                    </p>

                                                    <p className="text-sm font-semibold text-[#872d4c] mt-1">
                                                        ₹{item.price}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* Customization Details */}
                                            {(item.customization?.name ||
                                                item.customization?.message ||
                                                item.customization?.photo) && (

                                                <div className="mt-4 bg-[#fbeef2] rounded-xl p-3">

                                                    <p className="text-xs font-bold text-[#872d4c] mb-2">
                                                        Customized Gift Details
                                                    </p>

                                                    {item.customization?.name && (
                                                        <p className="text-sm text-[#684452] mb-1">
                                                            <span className="font-semibold">Name:</span> {item.customization.name}
                                                        </p>
                                                    )}

                                                    {item.customization?.message && (
                                                        <p className="text-sm text-[#684452] mb-2">
                                                            <span className="font-semibold">Message:</span> {item.customization.message}
                                                        </p>
                                                    )}

                                                    {item.customization?.photo && (
                                                        <div className="mt-2">
                                                            <p className="text-xs text-[#987985] mb-2">
                                                                Uploaded Photo
                                                            </p>

                                                            <img
                                                                src={getImageUrl(item.customization.photo)}
                                                                alt="Customized gift"
                                                                className="w-20 h-20 object-cover rounded-xl border border-[#e9cbd5]"
                                                            />
                                                        </div>
                                                    )}

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                        {/* Order Status */}
                        <div className="mt-6 pt-5 border-t border-[#f1e3e7]">

                            <div className="flex items-center gap-2 mb-3">
                                <FaBoxOpen className="text-[#872d4c]" />

                                <h4 className="font-bold text-[#3b202b]">
                                    Order Status
                                </h4>
                            </div>

                            <GiftStatus status={order.orderStatus} />

                        </div>

                    </div>

                </div>

            ))}

        </div>
    )
}

export default Purchase
