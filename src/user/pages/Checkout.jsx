
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useGift } from '../../context/GiftContext'
import apiService from '../../api/apiService'

function Checkout() {

    const { cart, cartTotal, setCart } = useGift()
    const navigate = useNavigate()

    const [payment, setPayment] = useState('COD')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    })

    // Backend delivery charge is fixed at ₹50
    const delivery = cart.length > 0 ? 50 : 0
    const finalTotal = cartTotal + delivery

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const placeOrder = async (e) => {
        e.preventDefault()

        if (loading) return

        if (!sessionStorage.getItem('token')) {
            alert('Please login before placing your order.')
            navigate('/login')
            return
        }

        if (cart.length === 0) {
            setError('Your cart is empty.')
            return
        }

        if (!/^[0-9]{10}$/.test(form.phone.trim())) {
            setError('Please enter a valid 10-digit phone number.')
            return
        }

        if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
            setError('Please enter a valid 6-digit PIN code.')
            return
        }

        setLoading(true)
        setError('')

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

            const deliveryAddress = {
                name: form.name.trim(),
                phone: form.phone.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim()
            }

            const reqBody = {
                items: orderItems,
                deliveryAddress,
                paymentMethod: payment
            }

            const response = await apiService(
                'POST',
                '/place-order',
                reqBody
            )

            // apiService returns an error object instead of throwing it
            if (response?.response) {
                throw response
            }

            const order = response?.data?.order

            if (!order) {
                throw new Error('Order response was not received.')
            }

            // Clear cart only after successful order placement
            setCart([])

            alert('Your order has been placed successfully!')

            navigate('/profile', {
                state: {
                    orderPlaced: true,
                    orderId: order.orderId || order._id
                }
            })

        } catch (err) {

            console.error('Place order error:', err)

            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                'Unable to place your order. Please try again.'

            setError(errorMessage)

        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <>
                <Header />

                <div className="text-center py-28">

                    <h2 className="text-3xl font-bold">
                        Your cart is empty
                    </h2>

                    <Link to="/gifts" className="gift-btn inline-block mt-6">
                        Shop Gifts
                    </Link>

                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <section className="px-6 md:px-16 py-12">

                <h1 className="text-4xl font-bold mb-8">
                    Checkout
                </h1>

                <form onSubmit={placeOrder}>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Delivery Information */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-7">

                            <h2 className="text-2xl font-semibold mb-6">
                                Delivery Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">
                                        Phone Number
                                    </label>

                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-2">
                                        Full Address
                                    </label>

                                    <textarea
                                        required
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full border rounded-lg p-3"
                                        placeholder="House name, street, landmark..."
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">
                                        City
                                    </label>

                                    <input
                                        required
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                        placeholder="City"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">
                                        State
                                    </label>

                                    <input
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                        placeholder="State"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">
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
                                        className="w-full border rounded-lg p-3"
                                        placeholder="PIN code"
                                    />
                                </div>

                            </div>

                            <hr className="my-8" />

                            {/* Payment Method */}
                            <h2 className="text-2xl font-semibold mb-5">
                                Payment Method
                            </h2>

                            <div className="space-y-4">

                                <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">

                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={payment === 'COD'}
                                        onChange={e => setPayment(e.target.value)}
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            Cash on Delivery
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Pay when your gift arrives.
                                        </p>
                                    </div>

                                </label>

                                <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">

                                    <input
                                        type="radio"
                                        value="Online"
                                        checked={payment === 'Online'}
                                        onChange={e => setPayment(e.target.value)}
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            Online Payment (Demo)
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Demonstration option only. No real payment is processed.
                                        </p>
                                    </div>

                                </label>

                            </div>

                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-sm p-7 h-fit">

                            <h2 className="text-2xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            {cart.map((item, index) => (
                                <div
                                    key={`${item.id || item._id}-${index}`}
                                    className="flex justify-between gap-3 mb-4"
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>

                                    <span>
                                        ₹{item.price * item.quantity}
                                    </span>
                                </div>
                            ))}

                            <hr className="my-5" />

                            <div className="flex justify-between mt-3">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>

                            <div className="flex justify-between mt-3">
                                <span>Delivery</span>
                                <span>₹{delivery}</span>
                            </div>

                            <hr className="my-5" />

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>

                                <span className="text-rose-700">
                                    ₹{finalTotal}
                                </span>
                            </div>

                            {error && (
                                <p className="text-red-600 text-sm mt-4">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="gift-btn w-full mt-7 disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Your order will be securely saved in the database.
                            </p>

                        </div>

                    </div>

                </form>

            </section>
        </>
    )
}

export default Checkout
