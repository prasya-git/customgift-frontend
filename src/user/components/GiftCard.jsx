
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingBag } from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function GiftCard({ gift }) {

    const { addToCart, wishlist, toggleWishlist } = useGift()

    const giftId = gift._id || gift.id

    const imageUrl = gift.image
        ? gift.image.startsWith('http')
            ? gift.image
            : `http://localhost:3000/uploads/${gift.image}`
        : ''

    const isWishlisted = wishlist.some(
        item => String(item.id || item._id) === String(giftId)
    )

    // Keep compatibility with the existing cart and wishlist context
    const giftForContext = {
        ...gift,
        id: giftId,
        image: imageUrl
    }

    return (
        <div className="gift-card bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-50">

            <div className="relative">

                <Link to={`/gifts/${giftId}`}>

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={gift.name}
                            className="w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-rose-50 flex items-center justify-center text-gray-400">
                            Image unavailable
                        </div>
                    )}

                </Link>

                <button
                    onClick={() => toggleWishlist(giftForContext)}
                    className="absolute top-3 right-3 bg-white p-3 rounded-full shadow"
                    title="Add to wishlist"
                >
                    <FaHeart
                        className={isWishlisted ? 'text-rose-600' : 'text-gray-400'}
                    />
                </button>

            </div>

            <div className="p-5">

                <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide">
                    {gift.category}
                </p>

                <Link to={`/gifts/${giftId}`}>
                    <h3 className="text-lg font-semibold mt-2 hover:text-rose-700">
                        {gift.name}
                    </h3>
                </Link>

                <div className="flex justify-between items-center mt-4">

                    <span className="font-bold text-xl text-rose-800">
                        ₹{gift.price}
                    </span>

                </div>

                <div className="flex gap-2 mt-4">

                    <button
                        onClick={() => addToCart(giftForContext)}
                        className="gift-btn flex-1 flex justify-center items-center gap-2 text-sm"
                    >
                        <FaShoppingBag />
                        Add to Cart
                    </button>

                </div>

                <Link
                    to={`/gifts/${giftId}`}
                    className="block text-center text-sm text-rose-700 mt-3 hover:underline"
                >
                    Customize Gift
                </Link>

            </div>
        </div>
    )
}

export default GiftCard
