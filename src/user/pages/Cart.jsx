import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaArrowLeft } from 'react-icons/fa'
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

  const delivery = cartTotal >= 1000 || cartTotal === 0 ? 0 : 50
  const total = cartTotal + delivery

  return (
    <>
      <Header />

      <div className="px-6 md:px-16 py-12 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl">
            <h2 className="text-3xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-500 mt-3">
              Find something special for someone you love.
            </p>
            <Link to="/gifts" className="gift-btn mt-6 inline-block">
              Explore Gifts
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-5">

              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white shadow-sm rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover rounded-xl"
                  />

                  <div>
                    <div className="flex justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {item.name}
                        </h2>
                        <p className="text-rose-700 mt-2">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {item.customName && (
                      <p className="text-sm text-gray-500 mt-2">
                        Name: {item.customName}
                      </p>
                    )}

                    {item.message && (
                      <p className="text-sm text-gray-500">
                        Message: {item.message}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border rounded px-3 py-1"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border rounded px-3 py-1"
                      >
                        +
                      </button>

                      <span className="ml-auto font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/gifts" className="text-rose-700 flex items-center gap-2">
                <FaArrowLeft /> Continue Shopping
              </Link>

            </div>

            <div className="bg-white shadow-sm rounded-2xl p-7 h-fit">
              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Free delivery on orders of ₹1,000 or more.
              </p>

              <hr />

              <div className="flex justify-between font-bold text-xl my-5">
                <span>Total</span>
                <span className="text-rose-700">₹{total}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="gift-btn w-full"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </>
  )
}

export default Cart