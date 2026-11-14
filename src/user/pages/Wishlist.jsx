import React from 'react'
import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import { Link } from 'react-router-dom'
import { useGift } from '../../context/GiftContext'

function Wishlist() {
  const { wishlist } = useGift()

  return (
    <>
      <Header />

      <section className="px-6 md:px-16 py-14 min-h-screen">
        <h1 className="text-4xl font-bold mb-3">My Wishlist</h1>
        <p className="text-gray-500 mb-10">
          Your favourite gifts, saved in one place.
        </p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold">
              No saved gifts yet
            </h2>
            <p className="text-gray-500 mt-3">
              Tap the heart icon on a gift to save it here.
            </p>
            <Link to="/gifts" className="gift-btn inline-block mt-5">
              Explore Gifts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {wishlist.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Wishlist