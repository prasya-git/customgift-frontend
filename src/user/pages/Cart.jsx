
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaTrash,
    FaArrowLeft,
    FaShoppingBag,
    FaMinus,
    FaPlus,
    FaGift,
    FaTruck
} from 'react-icons/fa'
import Header from '../components/Header'
import { useGift } from '../../context/GiftContext'

function Cart() {

    const {
        cart,
        cartTotal,
        removeFromCart,
        updateQuantity
    } = useGift()

    const navigate = useNavigate()

    const delivery = cart.length === 0 ? 0 : 50
    const total = cartTotal + delivery

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#fff9fa] px-5 md:px-12 lg:px-16 py-12">

                {/* Page Heading */}
                <div className="mb-10">
                    <p className="text-sm font-semibold tracking-[3px] text-[#b85d7b] uppercase mb-2">
                        Your Shopping Bag
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#40232e]">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review your gifts before placing your order.
                    </p>
                </div>

                {cart.length === 0 ? (

                    /* Empty Cart */
                    <div className="max-w-2xl mx-auto text-center py-20 px-6 bg-white rounded-3xl shadow-sm border border-[#f5e5e9]">

                        <div className="w-24 h-24 mx-auto rounded-full bg-[#fbe8ed] flex items-center justify-center mb-6">
                            <FaShoppingBag className="text-4xl text-[#a84667]" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-[#40232e]">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-md mx-auto">
                            Find something special for someone you love. Make their day memorable with a personalized gift.
                        </p>

                        <Link
                            to="/gifts"
                            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#872d4c] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#682139] hover:-translate-y-0.5 shadow-md transition-all duration-300"
                        >
                            <FaGift />
                            Explore Gifts
                        </Link>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-5">

                            {cart.map(item => {

                                const itemId = item.id || item._id

                                const imageUrl = item.image
                                    ? item.image.startsWith('http')
                                        ? item.image
                                        : `http://localhost:3000/uploads/${item.image}`
                                    : ''

                                return (
                                    <div
                                        key={`${itemId}-${item.customName || ''}-${item.message || ''}-${item.photo || ''}`}
                                        className="bg-white border border-[#f3e3e8] shadow-sm rounded-2xl p-5 md:p-6 grid grid-cols-1 sm:grid-cols-[145px_1fr] gap-5 hover:shadow-md transition-all duration-300"
                                    >

                                        {/* Gift Image */}
                                        <div className="overflow-hidden rounded-xl bg-[#fbeef1]">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-44 sm:h-full min-h-[145px] object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-44 sm:h-full min-h-[145px] flex items-center justify-center">
                                                    <FaGift className="text-4xl text-[#d9a4b4]" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-between">

                                            {/* Product Details */}
                                            <div>

                                                <div className="flex justify-between gap-3">

                                                    <div>
                                                        <h2 className="text-lg md:text-xl font-bold text-[#40232e]">
                                                            {item.name}
                                                        </h2>

                                                        <p className="text-[#a84667] font-semibold mt-2">
                                                            ₹{item.price}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(itemId)}
                                                        className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-[#fff0f2] text-[#c04460] hover:bg-[#c04460] hover:text-white transition-all duration-300"
                                                        title="Remove item"
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </div>

                                                {/* Customization Details */}
                                                {(item.customName || item.message || item.photo) && (
                                                    <div className="mt-4 p-3 rounded-xl bg-[#fff8fa] border border-[#f5e5e9]">

                                                        <p className="text-xs font-bold uppercase tracking-wider text-[#a84667] mb-2">
                                                            Customization Details
                                                        </p>

                                                        {item.customName && (
                                                            <p className="text-sm text-gray-600 mb-1">
                                                                <span className="font-semibold text-[#40232e]">Name:</span> {item.customName}
                                                            </p>
                                                        )}

                                                        {item.message && (
                                                            <p className="text-sm text-gray-600 mb-1">
                                                                <span className="font-semibold text-[#40232e]">Message:</span> {item.message}
                                                            </p>
                                                        )}

                                                        {item.photo && (
                                                            <div className="mt-3">
                                                                <p className="text-sm text-gray-600 mb-2 font-medium">
                                                                    Uploaded customization photo
                                                                </p>

                                                                <img
                                                                    src={
                                                                        item.photo.startsWith('http')
                                                                            ? item.photo
                                                                            : `http://localhost:3000/uploads/${item.photo}`
                                                                    }
                                                                    alt="Customization"
                                                                    className="w-20 h-20 object-cover rounded-lg border border-[#f0dce3]"
                                                                />
                                                            </div>
                                                        )}

                                                    </div>
                                                )}

                                            </div>

                                            {/* Quantity and Price */}
                                            <div className="flex flex-wrap items-center gap-4 mt-5">

                                                <div className="flex items-center border border-[#ead3dc] rounded-xl overflow-hidden">

                                                    <button
                                                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-10 h-10 flex items-center justify-center bg-[#fff5f7] text-[#872d4c] hover:bg-[#f5dce4] disabled:opacity-40 disabled:cursor-not-allowed transition"
                                                    >
                                                        <FaMinus size={11} />
                                                    </button>

                                                    <span className="w-12 text-center font-semibold text-[#40232e]">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="w-10 h-10 flex items-center justify-center bg-[#fff5f7] text-[#872d4c] hover:bg-[#f5dce4] disabled:opacity-40 disabled:cursor-not-allowed transition"
                                                    >
                                                        <FaPlus size={11} />
                                                    </button>

                                                </div>

                                                <span className="ml-auto font-bold text-[#40232e] text-lg">
                                                    ₹{item.price * item.quantity}
                                                </span>

                                            </div>

                                        </div>

                                    </div>
                                )
                            })}

                            {/* Continue Shopping */}
                            <Link
                                to="/gifts"
                                className="inline-flex items-center gap-2 text-[#872d4c] font-semibold hover:text-[#bd5275] transition-colors duration-300 mt-3"
                            >
                                <FaArrowLeft />
                                Continue Shopping
                            </Link>

                        </div>

                        {/* Order Summary */}
                        <div className="bg-white border border-[#f3e3e8] shadow-sm rounded-2xl p-6 md:p-7 lg:sticky lg:top-24">

                            <h2 className="text-2xl font-bold text-[#40232e] mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between items-center mb-5 text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-[#40232e]">
                                    ₹{cartTotal}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mb-5 text-gray-600">
                                <span className="flex items-center gap-2">
                                    <FaTruck className="text-[#b85d7b]" />
                                    Delivery charge
                                </span>

                                <span className="font-semibold text-[#40232e]">
                                    ₹{delivery}
                                </span>
                            </div>

                            <div className="border-t border-dashed border-[#e8cbd5] my-5"></div>

                            <div className="flex justify-between items-center font-bold text-xl mb-6">
                                <span className="text-[#40232e]">
                                    Total
                                </span>

                                <span className="text-[#a84667]">
                                    ₹{total}
                                </span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full flex items-center justify-center gap-2 bg-[#872d4c] text-white py-4 px-5 rounded-xl font-bold shadow-md hover:bg-[#682139] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                            >
                                <FaShoppingBag />
                                Proceed to Checkout
                            </button>

                            <div className="mt-5 p-4 rounded-xl bg-[#fff5f7] text-center">
                                <p className="text-sm text-[#872d4c] font-medium">
                                    <FaGift className="inline mr-2" />
                                    Every gift carries a special memory!
                                </p>
                            </div>

                        </div>

                    </div>

                )}

            </div>
        </>
    )
}

export default Cart
