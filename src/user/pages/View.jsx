import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaHeart, FaShoppingBag } from 'react-icons/fa'
import Header from '../components/Header'
import gifts from '../../data/gifts'
import { useGift } from '../../context/GiftContext'

function View() {
  const { id } = useParams()
  const navigate = useNavigate()

  const gift = gifts.find(item => item.id === Number(id))

  const { addToCart, toggleWishlist, wishlist } = useGift()

  const [customName, setCustomName] = useState('')
  const [message, setMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [photo, setPhoto] = useState(null)

  if (!gift) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl">Gift not found</h2>
        <Link to="/gifts" className="gift-btn mt-5 inline-block">
          Back to Gifts
        </Link>
      </div>
    )
  }

  const isWishlisted = wishlist.some(item => item.id === gift.id)

  const handleAddToCart = () => {
    const customizedGift = {
      ...gift,
      quantity,
      customName,
      message,
      photo
    }

    addToCart(customizedGift)
    navigate('/cart')
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]

    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  return (
    <>
      <Header />

      <div className="px-6 md:px-16 py-10">

        <Link to="/gifts" className="text-rose-700 flex items-center gap-2 mb-8">
          <FaArrowLeft /> Back to Gifts
        </Link>

        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <img
              src={gift.image}
              alt={gift.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />

            {photo && (
              <div className="mt-5">
                <p className="font-semibold mb-2">Your uploaded photo preview</p>
                <img
                  src={photo}
                  alt="Your uploaded preview"
                  className="w-40 h-40 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-rose-700 uppercase tracking-widest text-sm">
              {gift.category}
            </p>

            <h1 className="text-4xl font-bold mt-3">{gift.name}</h1>

            <p className="text-yellow-500 mt-3">
              ★★★★★ <span className="text-gray-500">{gift.rating} rating</span>
            </p>

            <div className="mt-5">
              <span className="text-3xl text-rose-800 font-bold">
                ₹{gift.price}
              </span>
              <span className="text-gray-400 line-through ml-3">
                ₹{gift.oldPrice}
              </span>
            </div>

            <p className="text-gray-600 leading-7 mt-5">
              {gift.description}
            </p>

            <div className="border-t border-b py-6 my-7">
              <h2 className="text-2xl font-semibold mb-5">
                Personalize Your Gift
              </h2>

              <label className="block font-medium mb-2">
                Name to print
              </label>
              <input
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="Enter a name"
                className="w-full border rounded-lg p-3 mb-5 outline-rose-500"
              />

              <label className="block font-medium mb-2">
                Personal message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your special message..."
                rows="4"
                className="w-full border rounded-lg p-3 mb-5 outline-rose-500"
              />

              <label className="block font-medium mb-2">
                Upload your photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="w-full border rounded-lg p-3 mb-5"
              />

              <label className="block font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border rounded px-4 py-2"
                >
                  -
                </button>

                <span className="font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border rounded px-4 py-2"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="gift-btn flex-1 flex items-center justify-center gap-2"
              >
                <FaShoppingBag /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(gift)}
                className="border border-rose-700 text-rose-700 px-5 rounded-lg"
              >
                <FaHeart className={isWishlisted ? 'text-rose-700' : ''} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default View