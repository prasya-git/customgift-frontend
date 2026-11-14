import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGift, FaTruck, FaHeart, FaShieldAlt,
  FaArrowRight, FaBirthdayCake, FaRing,
  FaCamera, FaStar
} from 'react-icons/fa'

import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import gifts from '../../data/gifts'

function Home() {
  const popularGifts = gifts.filter(gift => gift.popular).slice(0, 4)

  const categories = [
    {
      name: 'Birthday Gifts',
      icon: <FaBirthdayCake />,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500'
    },
    {
      name: 'Anniversary',
      icon: <FaHeart />,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500'
    },
    {
      name: 'Photo Gifts',
      icon: <FaCamera />,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500'
    },
    {
      name: 'Gift Hampers',
      icon: <FaGift />,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500'
    }
  ]

  return (
    <>
      <Header />

      {/* Hero section */}
      <section className="relative min-h-[570px] flex items-center bg-[#f8e9e9] overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1600"
            className="w-full h-full object-cover"
            alt="Beautiful gift boxes"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 px-7 md:px-20 py-20 max-w-3xl text-white">
          <p className="uppercase tracking-[4px] text-sm mb-5">
            Make every moment special
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Gifts That Speak From The Heart
          </h1>

          <p className="text-lg mt-6 text-white/90 max-w-xl">
            Create meaningful memories with personalized gifts made
            especially for the people you love.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <Link to="/gifts" className="bg-white text-rose-800 px-7 py-3 rounded-lg font-semibold hover:bg-rose-100">
              Explore Gifts <FaArrowRight className="inline ml-2" />
            </Link>

            <Link to="/gifts" className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-rose-800">
              Customize Now
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16 py-12 bg-white">

        <div className="flex items-center gap-3">
          <FaGift className="text-rose-600 text-3xl" />
          <div>
            <h3 className="font-semibold">Personalized Gifts</h3>
            <p className="text-sm text-gray-500">Made just for you</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaTruck className="text-rose-600 text-3xl" />
          <div>
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-gray-500">Delivered with care</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaHeart className="text-rose-600 text-3xl" />
          <div>
            <h3 className="font-semibold">Made with Love</h3>
            <p className="text-sm text-gray-500">For special moments</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-rose-600 text-3xl" />
          <div>
            <h3 className="font-semibold">Secure Shopping</h3>
            <p className="text-sm text-gray-500">Safe checkout</p>
          </div>
        </div>

      </section>

      {/* Categories */}
      <section className="px-6 md:px-16 py-16">

        <div className="text-center mb-10">
          <p className="text-rose-600 uppercase tracking-widest text-sm">
            Find the perfect gift
          </p>
          <h2 className="section-heading mt-2">Shop By Category</h2>
          <p className="text-gray-500 mt-3">
            Explore gifts for every occasion and every special person.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {categories.map((category, index) => (
            <Link
              to={`/gifts?category=${encodeURIComponent(category.name)}`}
              key={index}
              className="relative h-64 rounded-2xl overflow-hidden group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5 text-white">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-sm">Explore collection →</p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* Popular gifts */}
      <section className="bg-[#fff4f3] px-6 md:px-16 py-16">

        <div className="flex flex-wrap justify-between items-end mb-10">
          <div>
            <p className="text-rose-600 uppercase tracking-widest text-sm">
              Customer favourites
            </p>
            <h2 className="section-heading mt-2">Popular Gifts</h2>
          </div>

          <Link to="/gifts" className="text-rose-700 font-semibold">
            View All Gifts <FaArrowRight className="inline ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {popularGifts.map(gift => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>

      </section>

      {/* Personalization banner */}
      <section className="px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-[#f5e2e5]">

          <div className="p-9 md:p-16 flex flex-col justify-center">
            <p className="text-rose-700 uppercase tracking-widest text-sm">
              Your ideas, our creations
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              Make It Personal. Make It Unforgettable.
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              Add a name, photo or heartfelt message and turn an ordinary
              present into a memory that lasts forever.
            </p>

            <Link to="/gifts" className="gift-btn mt-7 w-fit">
              Create Your Gift <FaArrowRight className="inline ml-2" />
            </Link>
          </div>

          <div className="min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900"
              alt="Personalized gift"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Reviews section */}
      <section className="px-6 md:px-16 py-16 text-center bg-white">
        <p className="text-rose-600 uppercase tracking-widest text-sm">
          Happy customers
        </p>
        <h2 className="section-heading mt-2">Love Shared Through Gifts</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {[
            ['Absolutely beautiful!', 'The personalized photo frame was perfect. Great quality and lovely packaging.', 'Ananya'],
            ['A wonderful surprise', 'I ordered a gift hamper for my friend. She loved every detail!', 'Meera'],
            ['Excellent experience', 'Easy customization and the gift arrived safely. Highly recommended.', 'Arjun']
          ].map((review, index) => (
            <div key={index} className="p-7 bg-[#fff7f6] rounded-2xl">
              <div className="flex justify-center text-yellow-500 gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(n => <FaStar key={n} />)}
              </div>
              <h3 className="text-xl font-semibold">{review[0]}</h3>
              <p className="text-gray-500 mt-3">{review[1]}</p>
              <p className="font-semibold text-rose-700 mt-5">{review[2]}</p>
            </div>
          ))}

        </div>
      </section>

    </>
  )
}

export default Home