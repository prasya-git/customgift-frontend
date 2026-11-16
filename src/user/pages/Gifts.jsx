
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import apiService from '../../api/apiService'

function Gifts() {

    const [params] = useSearchParams()

    const [search, setSearch] = useState(params.get('search') || '')
    const [category, setCategory] = useState(params.get('category') || 'All')
    const [sort, setSort] = useState('default')

    const [gifts, setGifts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [retry, setRetry] = useState(0)

    const categories = [
        'All',
        'Birthday',
        'Anniversary',
        'Photo Gifts',
        'Gift Hampers',
        'Personalized Gifts',
        'Soft Toys'
    ]

    // Fetch gifts from backend
    useEffect(() => {

        const fetchGifts = async () => {

            setLoading(true)
            setError('')

            try {

                const queryParams = new URLSearchParams()

                if (search.trim()) {
                    queryParams.append('search', search.trim())
                }

                if (category !== 'All') {
                    queryParams.append('category', category)
                }

                const url = `/all-gifts?${queryParams.toString()}`

                const response = await apiService('GET', url)

                if (response?.response) {
                    throw response
                }

                setGifts(Array.isArray(response.data) ? response.data : [])

            } catch (err) {

                console.log('Fetch Gifts Error:', err)

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    'Unable to load gifts. Please try again.'
                )

                setGifts([])

            } finally {
                setLoading(false)
            }
        }

        fetchGifts()

    }, [search, category, retry])

    // Sort fetched gifts
    const filteredGifts = useMemo(() => {

        let result = [...gifts]

        if (sort === 'low') {
            result.sort((a, b) => a.price - b.price)
        }

        if (sort === 'high') {
            result.sort((a, b) => b.price - a.price)
        }

        return result

    }, [gifts, sort])

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

                {loading ? (

                    <div className="text-center py-20">
                        <p className="text-rose-700 text-lg font-semibold">
                            Loading gifts...
                        </p>
                    </div>

                ) : error ? (

                    <div className="text-center py-20">
                        <p className="text-red-600">{String(error)}</p>

                        <button
                          onClick={() => setRetry(prev => prev + 1)}
                          className="gift-btn mt-5"
                      >
                          Try Again
                      </button>
                    </div>

                ) : (

                    <>
                        <p className="text-gray-500 mb-6">
                            Showing {filteredGifts.length} gifts
                        </p>

                        {filteredGifts.length > 0 ? (

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                                {filteredGifts.map(gift => (
                                    <GiftCard
                                        key={gift._id}
                                        gift={gift}
                                    />
                                ))}
                            </div>

                        ) : (

                            <div className="text-center py-20">
                                <h2 className="text-2xl font-semibold">
                                    No gifts found
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Try another search or category.
                                </p>

                                <button
                                    onClick={() => {
                                        setSearch('')
                                        setCategory('All')
                                        setSort('default')
                                    }}
                                    className="gift-btn mt-5"
                                >
                                    Clear Filters
                                </button>
                            </div>

                        )}
                    </>

                )}

            </section>
        </>
    )
}

export default Gifts
