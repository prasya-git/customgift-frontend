
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaHeart,
    FaShoppingBag,
    FaArrowRight,
    FaShoppingCart
} from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function GiftCard({ gift }) {

    const {
        addToCart,
        cart,
        wishlist,
        toggleWishlist
    } = useGift()

    const navigate = useNavigate()

    const giftId = gift._id || gift.id

    const imageUrl = gift.image
        ? gift.image.startsWith('http')
            ? gift.image
            : `http://localhost:3000/uploads/${gift.image}`
        : ''

    const isWishlisted = wishlist.some(
        item => String(item.id || item._id) === String(giftId)
    )

    // Check whether this gift is already in the cart
    const isInCart = cart.some(
        item => String(item.id || item._id) === String(giftId)
    )

    const giftForContext = {
        ...gift,
        id: giftId,
        image: imageUrl
    }

    // Add gift or navigate to cart
    const handleCartClick = () => {

        if (isInCart) {
            navigate('/cart')
        } else {
            addToCart(giftForContext)
        }

    }

    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            {/* Gift Image */}
            <div className="relative overflow-hidden">

                <Link to={`/gifts/${giftId}`}>

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={gift.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-64 bg-rose-50 flex items-center justify-center text-gray-400">
                            Image unavailable
                        </div>
                    )}

                </Link>

                {/* Wishlist Button */}
                <button
                    type="button"
                    onClick={() => toggleWishlist(giftForContext)}
                    className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                        isWishlisted
                            ? 'bg-rose-600 text-white'
                            : 'bg-white text-gray-500 hover:bg-rose-100 hover:text-rose-600'
                    }`}
                    title="Add to wishlist"
                >
                    <FaHeart className="text-lg" />
                </button>

                {/* Category */}
                <div className="absolute bottom-4 left-4 bg-white/95 text-[#872d4c] text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full shadow">
                    {gift.category}
                </div>

            </div>

            {/* Gift Details */}
            <div className="p-5">

                <Link to={`/gifts/${giftId}`}>
                    <h3 className="text-lg font-bold text-[#49232f] hover:text-[#a44768] transition-colors">
                        {gift.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4 mb-5">

                    <div>
                        <p className="text-xs text-gray-400 font-medium">
                            Price
                        </p>

                        <span className="font-bold text-2xl text-[#872d4c]">
                            ₹{gift.price}
                        </span>
                    </div>

                    <div className="text-xs text-rose-700 bg-rose-50 px-3 py-2 rounded-full font-semibold">
                        <FaHeart className="inline mr-1" />
                        Made with love
                    </div>

                </div>

                {/* Add to Cart / Go to Cart */}
                <button
                    type="button"
                    onClick={handleCartClick}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${
                        isInCart
                            ? 'bg-[#d66b8c] text-white hover:bg-[#bd5275]'
                            : 'bg-[#872d4c] text-white hover:bg-[#682139]'
                    }`}
                >
                    {isInCart ? (
                        <>
                            <FaShoppingCart />
                            Go to Cart
                        </>
                    ) : (
                        <>
                            <FaShoppingBag />
                            Add to Cart
                        </>
                    )}
                </button>

                {/* Customize Gift */}
                <Link
                    to={`/gifts/${giftId}`}
                    className="w-full mt-3 flex items-center justify-center gap-2 bg-[#fbe8ed] text-[#872d4c] border border-rose-200 py-3.5 px-4 rounded-xl font-semibold hover:bg-[#f3d1dc] transition-all duration-300"
                >
                    Customize Gift
                    <FaArrowRight className="text-sm" />
                </Link>

            </div>

        </div>
    )
}

export default GiftCard
