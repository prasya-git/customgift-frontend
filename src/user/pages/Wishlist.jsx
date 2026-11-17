
import React from 'react'
import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import { Link } from 'react-router-dom'
import { FaHeart, FaGift } from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function Wishlist() {
  const { wishlist } = useGift()

  return (
    <>
      <Header />

      <section className="min-h-screen bg-[#fff9fa] px-5 md:px-12 lg:px-16 py-12 md:py-16">

        {/* Heading */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] flex items-center justify-center">
              <FaHeart className="text-[#872d4c] text-xl" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3b202b]">
                My Wishlist
              </h1>
              <p className="text-sm text-[#a16f7f] mt-1">
                Your favourite gifts, saved in one place.
              </p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <div className="mt-7 flex items-center justify-between border-b border-[#f1dce3] pb-4">
              <p className="text-[#684452] font-medium">
                Saved Gifts
              </p>

              <span className="bg-[#fbe8ed] text-[#872d4c] px-4 py-1.5 rounded-full text-sm font-semibold">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
          )}
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16 md:py-20 px-6 bg-white rounded-3xl border border-[#f3e2e7] shadow-sm">

            <div className="w-24 h-24 mx-auto rounded-full bg-[#fff0f3] flex items-center justify-center mb-6">
              <FaHeart className="text-4xl text-[#d98da5]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#3b202b]">
              No saved gifts yet!
            </h2>

            <p className="text-[#987985] mt-3 leading-7">
              You haven't added any gifts to your wishlist.
              Explore our collection and save your favourite gifts here.
            </p>

            <Link
              to="/gifts"
              className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-[#872d4c] text-white font-semibold shadow-md hover:bg-[#682139] hover:shadow-lg transition-all duration-300"
            >
              <FaGift />
              Explore Gifts
            </Link>
          </div>
        ) : (

          /* Wishlist Products */
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {wishlist.map((gift, index) => (
                <GiftCard
                  key={gift.id || gift._id || index}
                  gift={gift}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/gifts"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-[#872d4c] text-[#872d4c] font-semibold hover:bg-[#872d4c] hover:text-white transition-all duration-300"
              >
                <FaGift />
                Explore More Gifts
              </Link>
            </div>
          </div>
        )}

      </section>
    </>
  )
}

export default Wishlist
