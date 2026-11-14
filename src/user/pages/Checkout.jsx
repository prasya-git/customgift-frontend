import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useGift } from '../../context/GiftContext'

function Checkout() {
  const { cart, cartTotal, setCart } = useGift()
  const navigate = useNavigate()

  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [payment, setPayment] = useState('COD')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const delivery = cartTotal >= 1000 || cartTotal === 0 ? 0 : 50
  const finalTotal = cartTotal + delivery - discount

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'GIFT10' && cartTotal >= 500) {
      setDiscount(Math.round(cartTotal * 0.10))
      setCouponMessage('Coupon applied! You saved 10%.')
    } else {
      setDiscount(0)
      setCouponMessage('Invalid coupon or minimum order value is ₹500.')
    }
  }

  const placeOrder = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const orders = JSON.parse(localStorage.getItem('giftOrders')) || []

    const newOrder = {
      id: 'GFT' + Date.now(),
      items: cart,
      customer: form,
      payment,
      subtotal: cartTotal,
      delivery,
      discount,
      total: finalTotal,
      status: 'Order Placed',
      date: new Date().toLocaleDateString()
    }

    localStorage.setItem(
      'giftOrders',
      JSON.stringify([newOrder, ...orders])
    )

    setCart([])

    navigate('/profile', {
      state: { orderPlaced: true, orderId: newOrder.id }
    })
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="text-center py-28">
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
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
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={placeOrder}>
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-7">
              <h2 className="text-2xl font-semibold mb-6">
                Delivery Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2">Full Name</label>
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
                  <label className="block mb-2">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block mb-2">Phone Number</label>
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

                <div>
                  <label className="block mb-2">City</label>
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="City"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2">Full Address</label>
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
                  <label className="block mb-2">State</label>
                  <input
                    required
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block mb-2">PIN Code</label>
                  <input
                    required
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="PIN code"
                  />
                </div>

              </div>

              <hr className="my-8" />

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
                    <h3 className="font-semibold">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">
                      Pay when your gift arrives.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    value="Online Demo"
                    checked={payment === 'Online Demo'}
                    onChange={e => setPayment(e.target.value)}
                  />
                  <div>
                    <h3 className="font-semibold">Online Payment (Demo)</h3>
                    <p className="text-sm text-gray-500">
                      Demonstration option only. No real payment is processed.
                    </p>
                  </div>
                </label>

              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-7 h-fit">
              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              {cart.map(item => (
                <div key={item.id} className="flex justify-between gap-3 mb-4">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <hr className="my-5" />

              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="border rounded-lg p-3 w-full min-w-0"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-rose-700 text-white px-4 rounded-lg"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p className="text-sm mt-2 text-rose-700">
                  {couponMessage}
                </p>
              )}

              <div className="flex justify-between mt-6">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-rose-700">₹{finalTotal}</span>
              </div>

              <button
                type="submit"
                className="gift-btn w-full mt-7"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your order will be saved in this browser for demonstration.
              </p>
            </div>

          </div>
        </form>
      </section>
    </>
  )
}

export default Checkout