
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
    FaCreditCard,
    FaMoneyBillWave,
    FaLock,
    FaTruck,
    FaGift,
    FaShoppingBag,
    FaCheckCircle
} from 'react-icons/fa'
import Header from '../components/Header'
import { useGift } from '../../context/GiftContext'
import {
    placeOrderAPI,
    createCheckoutSessionAPI
} from '../../services/allAPI'

function Checkout() {

    const { cart, cartTotal, setCart } = useGift()
    const navigate = useNavigate()

    const [payment, setPayment] = useState('COD')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Get saved checkout details
    const [form, setForm] = useState(() => {

        try {
            const saved = sessionStorage.getItem('giftCheckoutForm')

            if (saved) {
                return JSON.parse(saved)
            }
        } catch {
            // Use default form
        }

        return {
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: ''
        }
    })

    // Delivery charge
    const delivery = cart.length > 0 ? 50 : 0

    const finalTotal = Number(cartTotal) + delivery

    // Handle form changes
    const handleChange = (e) => {

        const updated = {
            ...form,
            [e.target.name]: e.target.value
        }

        setForm(updated)

        sessionStorage.setItem(
            'giftCheckoutForm',
            JSON.stringify(updated)
        )
    }

    // Place Order
    const placeOrder = async (e) => {

        e.preventDefault()

        if (loading) return

        setError('')

        // Check login
        if (!sessionStorage.getItem('token')) {
            alert('Please login before placing your order.')
            navigate('/login')
            return
        }

        // Check cart
        if (cart.length === 0) {
            setError('Your cart is empty.')
            return
        }

        // Validate required fields
        const requiredFields = [
            { key: 'name', label: 'Full Name' },
            { key: 'phone', label: 'Phone Number' },
            { key: 'address', label: 'Full Address' },
            { key: 'city', label: 'City' },
            { key: 'pincode', label: 'PIN Code' }
        ]

        for (const field of requiredFields) {

            if (!form[field.key]?.trim()) {
                setError(`Please enter your ${field.label}.`)
                return
            }
        }

        // Validate phone number
        if (!/^[0-9]{10}$/.test(form.phone.trim())) {
            setError('Please enter a valid 10-digit phone number.')
            return
        }

        // Validate PIN code
        if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
            setError('Please enter a valid 6-digit PIN code.')
            return
        }

        // Save checkout details
        sessionStorage.setItem(
            'giftCheckoutForm',
            JSON.stringify(form)
        )

        setLoading(true)

        try {

            // Convert cart items into backend format
            const orderItems = cart.map(item => ({

                giftId: item.id || item._id,

                quantity: Number(item.quantity),

                customization: {
                    name: item.customName || '',
                    message: item.message || '',
                    photo: item.photo || ''
                }

            }))

            // Delivery address
            const deliveryAddress = {

                name: form.name.trim(),
                phone: form.phone.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim()

            }

            // CASH ON DELIVERY
            if (payment === 'COD') {

                const response = await placeOrderAPI({
                    items: orderItems,
                    deliveryAddress,
                    paymentMethod: 'COD'
                })

                if (response?.response) {
                    throw new Error(
                        response.response.data?.message ||
                        response.response.data ||
                        'Unable to place your order.'
                    )
                }

                const order = response?.data?.order

                if (!order) {
                    throw new Error(
                        'Order response was not received.'
                    )
                }

                // Clear cart after successful order
                setCart([])

                sessionStorage.removeItem('giftCheckoutForm')

                alert('Your order has been placed successfully!')

                navigate('/profile', {
                    state: {
                        orderPlaced: true,
                        orderId: order.orderId || order._id
                    }
                })

            }

            // STRIPE ONLINE PAYMENT
            else {

                const response = await createCheckoutSessionAPI({
                    items: orderItems,
                    deliveryAddress
                })

                if (response?.response) {
                    throw new Error(
                        response.response.data?.message ||
                        response.response.data ||
                        'Unable to create Stripe payment session.'
                    )
                }

                const checkoutURL = response?.data?.url

                if (!checkoutURL) {
                    throw new Error(
                        'Stripe checkout URL was not received.'
                    )
                }

                // Redirect to Stripe Checkout
                // Cart will be cleared after payment verification.
                window.location.href = checkoutURL

            }

        } catch (err) {

            console.error('Checkout Error:', err)

            const errorMessage =
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                'Unable to process your order. Please try again.'

            setError(
                typeof errorMessage === 'string'
                    ? errorMessage
                    : 'Unable to process your order. Please try again.'
            )

            setLoading(false)

        }

    }

    // EMPTY CART
    if (cart.length === 0) {

        return (
            <>
                <Header />

                <div className="min-h-screen bg-[#fff9fa] flex items-center justify-center px-5 py-20">

                    <div className="text-center bg-white border border-[#f3e3e8] shadow-sm rounded-3xl p-10 max-w-lg w-full">

                        <div className="w-24 h-24 rounded-full bg-[#fbe8ed] flex items-center justify-center mx-auto mb-6">
                            <FaShoppingBag className="text-4xl text-[#a84667]" />
                        </div>

                        <h2 className="text-3xl font-bold text-[#40232e]">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Add some beautiful gifts before proceeding to checkout.
                        </p>

                        <Link
                            to="/gifts"
                            className="inline-flex items-center justify-center gap-2 mt-7 bg-[#872d4c] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#682139] hover:-translate-y-0.5 shadow-md transition-all duration-300"
                        >
                            <FaGift />
                            Shop Gifts
                        </Link>

                    </div>

                </div>
            </>
        )
    }

    // Input styling
    const inputStyle = "w-full border border-[#ead5dd] bg-[#fffdfd] rounded-xl px-4 py-3.5 text-[#40232e] outline-none focus:border-[#b85d7b] focus:ring-2 focus:ring-[#fbe8ed] transition-all duration-200 placeholder:text-gray-400"

    const labelStyle = "block text-sm font-semibold text-[#40232e] mb-2"

    return (
        <>
            <Header />

            <section className="min-h-screen bg-[#fff9fa] px-5 md:px-10 lg:px-16 py-12">

                {/* Page Heading */}
                <div className="mb-10">

                    <p className="text-sm font-semibold tracking-[3px] text-[#b85d7b] uppercase mb-2">
                        Almost There!
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#40232e]">
                        Checkout
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Complete your delivery details and choose your payment method.
                    </p>

                </div>

                {/* Checkout Form */}
                <form onSubmit={placeOrder}>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        {/* DELIVERY INFORMATION */}
                        <div className="lg:col-span-2 space-y-7">

                            <div className="bg-white rounded-3xl border border-[#f3e3e8] shadow-sm p-6 md:p-8">

                                <div className="flex items-center gap-3 mb-7">

                                    <div className="w-12 h-12 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-xl text-[#a84667]" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-[#40232e]">
                                            Delivery Information
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Where should we deliver your gift?
                                        </p>
                                    </div>

                                </div>

                                <div className="grid md:grid-cols-2 gap-5">

                                    {/* Full Name */}
                                    <div>

                                        <label className={labelStyle}>
                                            <FaUser className="inline mr-2 text-[#b85d7b]" />
                                            Full Name
                                        </label>

                                        <input
                                            required
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="Enter your name"
                                        />

                                    </div>

                                    {/* Phone */}
                                    <div>

                                        <label className={labelStyle}>
                                            <FaPhone className="inline mr-2 text-[#b85d7b]" />
                                            Phone Number
                                        </label>

                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="10-digit phone number"
                                        />

                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">

                                        <label className={labelStyle}>
                                            Full Address
                                        </label>

                                        <textarea
                                            required
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            rows="3"
                                            className={`${inputStyle} resize-none`}
                                            placeholder="House name, street, landmark..."
                                        />

                                    </div>

                                    {/* City */}
                                    <div>

                                        <label className={labelStyle}>
                                            City
                                        </label>

                                        <input
                                            required
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="Enter your city"
                                        />

                                    </div>

                                    {/* State */}
                                    <div>

                                        <label className={labelStyle}>
                                            State
                                        </label>

                                        <input
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="Enter your state"
                                        />

                                    </div>

                                    {/* PIN Code */}
                                    <div>

                                        <label className={labelStyle}>
                                            PIN Code
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="6"
                                            name="pincode"
                                            value={form.pincode}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="6-digit PIN code"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="bg-white rounded-3xl border border-[#f3e3e8] shadow-sm p-6 md:p-8">

                                <div className="flex items-center gap-3 mb-7">

                                    <div className="w-12 h-12 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                        <FaCreditCard className="text-xl text-[#a84667]" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-[#40232e]">
                                            Payment Method
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Select how you want to pay.
                                        </p>
                                    </div>

                                </div>

                                <div className="space-y-4">

                                    {/* COD */}
                                    <label className={`flex items-center gap-4 border-2 p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                                        payment === 'COD'
                                            ? 'border-[#a84667] bg-[#fff5f7] shadow-sm'
                                            : 'border-[#eee1e5] hover:border-[#d9a4b4] bg-white'
                                    }`}>

                                        <input
                                            type="radio"
                                            value="COD"
                                            checked={payment === 'COD'}
                                            onChange={e => setPayment(e.target.value)}
                                            className="w-5 h-5 accent-[#872d4c]"
                                        />

                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                            <FaMoneyBillWave className="text-xl text-[#a84667]" />
                                        </div>

                                        <div className="flex-1">

                                            <h3 className="font-bold text-[#40232e]">
                                                Cash on Delivery
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Pay when your gift arrives.
                                            </p>

                                        </div>

                                        {payment === 'COD' && (
                                            <FaCheckCircle className="text-[#a84667] text-xl" />
                                        )}

                                    </label>

                                    {/* STRIPE */}
                                    <label className={`flex items-center gap-4 border-2 p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                                        payment === 'Online'
                                            ? 'border-[#a84667] bg-[#fff5f7] shadow-sm'
                                            : 'border-[#eee1e5] hover:border-[#d9a4b4] bg-white'
                                    }`}>

                                        <input
                                            type="radio"
                                            value="Online"
                                            checked={payment === 'Online'}
                                            onChange={e => setPayment(e.target.value)}
                                            className="w-5 h-5 accent-[#872d4c]"
                                        />

                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                            <FaCreditCard className="text-xl text-[#a84667]" />
                                        </div>

                                        <div className="flex-1">

                                            <h3 className="font-bold text-[#40232e]">
                                                Online Payment (Stripe)
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Secure payment using Stripe Checkout.
                                            </p>

                                        </div>

                                        {payment === 'Online' && (
                                            <FaCheckCircle className="text-[#a84667] text-xl" />
                                        )}

                                    </label>

                                </div>

                            </div>

                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="bg-white rounded-3xl border border-[#f3e3e8] shadow-sm p-6 md:p-7 lg:sticky lg:top-24">

                            <div className="flex items-center gap-3 mb-7">

                                <div className="w-11 h-11 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                                    <FaShoppingBag className="text-lg text-[#a84667]" />
                                </div>

                                <h2 className="text-xl md:text-2xl font-bold text-[#40232e]">
                                    Order Summary
                                </h2>

                            </div>

                            {/* Cart Items */}
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">

                                {cart.map((item, index) => (

                                    <div
                                        key={`${item.id || item._id}-${index}`}
                                        className="flex justify-between gap-3 items-start"
                                    >

                                        <div>
                                            <p className="text-sm font-semibold text-[#40232e]">
                                                {item.name}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <span className="font-semibold text-[#40232e] whitespace-nowrap">
                                            ₹{Number(item.price) * Number(item.quantity)}
                                        </span>

                                    </div>

                                ))}

                            </div>

                            <div className="border-t border-dashed border-[#e8cbd5] my-5"></div>

                            {/* Subtotal */}
                            <div className="flex justify-between mt-4 text-gray-600">
                                <span>Subtotal</span>

                                <span className="font-semibold text-[#40232e]">
                                    ₹{cartTotal}
                                </span>
                            </div>

                            {/* Delivery */}
                            <div className="flex justify-between mt-4 text-gray-600">

                                <span className="flex items-center gap-2">
                                    <FaTruck className="text-[#b85d7b]" />
                                    Delivery
                                </span>

                                <span className="font-semibold text-[#40232e]">
                                    ₹{delivery}
                                </span>

                            </div>

                            <div className="border-t border-dashed border-[#e8cbd5] my-5"></div>

                            {/* Total */}
                            <div className="flex justify-between items-center text-xl font-bold">

                                <span className="text-[#40232e]">
                                    Total
                                </span>

                                <span className="text-[#a84667]">
                                    ₹{finalTotal}
                                </span>

                            </div>

                            {/* Error Message */}
                            {error && (

                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mt-5">
                                    {error}
                                </div>

                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-7 flex items-center justify-center gap-2 bg-[#872d4c] text-white py-4 px-5 rounded-xl font-bold shadow-md hover:bg-[#682139] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >

                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {payment === 'COD'
                                            ? <FaShoppingBag />
                                            : <FaLock />
                                        }

                                        {payment === 'COD'
                                            ? 'Place Order'
                                            : 'Pay with Stripe'
                                        }
                                    </>
                                )}

                            </button>

                            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">

                                <FaLock className="text-[#a84667]" />

                                {payment === 'Online'
                                    ? 'Secure online payment powered by Stripe.'
                                    : 'Your order will be securely saved.'
                                }

                            </div>

                            <div className="mt-5 p-4 rounded-xl bg-[#fff5f7] text-center">

                                <p className="text-sm text-[#872d4c] font-medium">
                                    <FaGift className="inline mr-2" />
                                    Every gift carries a special memory!
                                </p>

                            </div>

                        </div>

                    </div>

                </form>

            </section>
        </>
    )
}

export default Checkout
