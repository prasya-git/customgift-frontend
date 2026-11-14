import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import gifts from '../../data/gifts'

function Gifts() {
  const [params] = useSearchParams()

  const [search, setSearch] = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState('default')

  const categories = [
    'All',
    'Birthday',
    'Anniversary',
    'Photo Gifts',
    'Gift Hampers',
    'Personalized Gifts',
    'Soft Toys'
  ]

  const filteredGifts = useMemo(() => {
    let result = gifts.filter(gift => {
      const matchesSearch = gift.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'All' || gift.category === category ||
        (category === 'Birthday Gifts' && gift.category === 'Birthday')

      return matchesSearch && matchesCategory
    })

    if (sort === 'low') result.sort((a, b) => a.price - b.price)
    if (sort === 'high') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)

    return result
  }, [search, category, sort])

  return (
    <>
      <Header />

      <section className="bg-[#f8e7e9] py-16 text-center">
        <p className="text-rose-700 uppercase tracking-widest text-sm">
          Find something meaningful
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Our Gift Collection
        </h1>
        <p className="text-gray-600 mt-3">
          Thoughtful gifts for every occasion.
        </p>
      </section>

      <section className="px-6 md:px-16 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">

          <input
            type="text"
            placeholder="Search gifts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-1/3 outline-rose-500"
          />

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="default">Sort by: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

        </div>

        <div className="flex gap-3 flex-wrap mb-9">
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full border ${
                category === item
                  ? 'bg-rose-700 text-white border-rose-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-rose-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-gray-500 mb-6">
          Showing {filteredGifts.length} gifts
        </p>

        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredGifts.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No gifts found</h2>
            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="gift-btn mt-5"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>
    </>
  )
}

export default Gifts