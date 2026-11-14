import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaStar, FaShoppingBag } from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function GiftCard({ gift }) {
  const { addToCart, wishlist, toggleWishlist } = useGift()

  const isWishlisted = wishlist.some(item => item.id === gift.id)

  return (
    <div className="gift-card bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-50">

      <div className="relative">
        <Link to={`/gifts/${gift.id}`}>
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-64 object-cover"
          />
        </Link>

        {gift.popular && (
          <span className="absolute top-3 left-3 bg-rose-700 text-white text-xs px-3 py-1 rounded-full">
            Popular
          </span>
        )}

        <button
          onClick={() => toggleWishlist(gift)}
          className="absolute top-3 right-3 bg-white p-3 rounded-full shadow"
          title="Add to wishlist"
        >
          <FaHeart className={isWishlisted ? 'text-rose-600' : 'text-gray-400'} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide">
          {gift.category}
        </p>

        <Link to={`/gifts/${gift.id}`}>
          <h3 className="text-lg font-semibold mt-2 hover:text-rose-700">
            {gift.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-yellow-500 mt-2 text-sm">
          <FaStar />
          <span className="text-gray-600">{gift.rating}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="font-bold text-xl text-rose-800">
              ₹{gift.price}
            </span>
            <span className="text-gray-400 line-through text-sm ml-2">
              ₹{gift.oldPrice}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(gift)}
            className="gift-btn flex-1 flex justify-center items-center gap-2 text-sm"
          >
            <FaShoppingBag /> Add to Cart
          </button>
        </div>

        <Link
          to={`/gifts/${gift.id}`}
          className="block text-center text-sm text-rose-700 mt-3 hover:underline"
        >
          Customize Gift
        </Link>
      </div>
    </div>
  )
}

export default GiftCard