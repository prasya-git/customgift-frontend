
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    FaSearch,
    FaGift,
    FaSlidersH,
    FaRedo,
    FaTimes
} from 'react-icons/fa'
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

    // Clear all filters
    const clearFilters = () => {
        setSearch('')
        setCategory('All')
        setSort('default')
    }

    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#fbe8ed] via-[#f8e7e9] to-[#f5dce4] py-20 md:py-24 px-5 text-center">

                <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
                <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-[#d88ba4]/20 blur-3xl"></div>

                <div className="relative z-10 max-w-3xl mx-auto">

                    <div className="inline-flex items-center gap-2 bg-white/70 border border-white px-5 py-2 rounded-full text-[#a84667] text-sm font-semibold mb-5 shadow-sm">
                        <FaGift />
                        Thoughtfully Selected For You
                    </div>

                    <p className="text-[#a84667] uppercase tracking-[4px] text-xs md:text-sm font-bold">
                        Find Something Meaningful
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold mt-4 text-[#40232e] leading-tight">
                        Our Gift <span className="text-[#a84667]">Collection</span>
                    </h1>

                    <p className="text-gray-600 mt-5 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        Discover beautiful gifts and make every special moment unforgettable with a personal touch.
                    </p>

                    <div className="flex justify-center mt-8">
                        <div className="h-1 w-20 rounded-full bg-[#a84667]"></div>
                    </div>

                </div>

            </section>

            {/* GIFTS SECTION */}
            <section className="bg-[#fff9fa] px-5 md:px-10 lg:px-16 py-14">

                <div className="max-w-7xl mx-auto">

                    {/* Section Heading */}
                    <div className="mb-8">

                        <p className="text-sm font-bold tracking-[3px] uppercase text-[#b85d7b] mb-2">
                            Explore & Discover
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-[#40232e]">
                            Find the Perfect Gift
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Browse our collection and find something special.
                        </p>

                    </div>

                    {/* SEARCH AND SORT */}
                    <div className="bg-white border border-[#f3e3e8] shadow-sm rounded-2xl p-4 md:p-5 mb-7">

                        <div className="flex flex-col md:flex-row gap-4 justify-between">

                            {/* Search */}
                            <div className="relative w-full md:max-w-md">

                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b85d7b]" />

                                <input
                                    type="text"
                                    placeholder="Search gifts..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full border border-[#ead5dd] bg-[#fffdfd] rounded-xl pl-11 pr-10 py-3.5 text-[#40232e] outline-none focus:border-[#b85d7b] focus:ring-2 focus:ring-[#fbe8ed] transition-all"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a84667]"
                                        title="Clear search"
                                    >
                                        <FaTimes />
                                    </button>
                                )}

                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-3">

                                <FaSlidersH className="text-[#a84667] hidden sm:block" />

                                <select
                                    value={sort}
                                    onChange={e => setSort(e.target.value)}
                                    className="w-full md:w-auto border border-[#ead5dd] bg-[#fffdfd] rounded-xl px-4 py-3.5 text-[#40232e] outline-none focus:border-[#b85d7b] focus:ring-2 focus:ring-[#fbe8ed] cursor-pointer"
                                >
                                    <option value="default">Sort by: Default</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {/* CATEGORY FILTERS */}
                    <div className="mb-9">

                        <p className="text-sm font-bold text-[#40232e] mb-4">
                            Browse by Category
                        </p>

                        <div className="flex gap-3 flex-wrap">

                            {categories.map(item => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
                                    className={`px-5 py-2.5 rounded-full border font-semibold text-sm transition-all duration-300 ${
                                        category === item
                                            ? 'bg-[#872d4c] text-white border-[#872d4c] shadow-md'
                                            : 'bg-white text-gray-600 border-[#ead5dd] hover:border-[#a84667] hover:text-[#a84667] hover:bg-[#fff2f5]'
                                    }`}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </div>

                    {/* LOADING */}
                    {loading ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

                            {[1, 2, 3, 4].map(item => (

                                <div
                                    key={item}
                                    className="bg-white rounded-3xl border border-[#f3e3e8] p-4 animate-pulse"
                                >
                                    <div className="h-56 bg-[#fbe8ed] rounded-2xl"></div>

                                    <div className="h-4 bg-[#fbe8ed] rounded mt-5 w-1/3"></div>

                                    <div className="h-5 bg-[#fbe8ed] rounded mt-3 w-3/4"></div>

                                    <div className="h-10 bg-[#fbe8ed] rounded-xl mt-5"></div>
                                </div>

                            ))}

                        </div>

                    ) : error ? (

                        /* ERROR */
                        <div className="text-center py-20 bg-white rounded-3xl border border-[#f3e3e8]">

                            <div className="w-20 h-20 bg-[#fff0f2] rounded-full flex items-center justify-center mx-auto mb-5">
                                <FaGift className="text-3xl text-[#c04460]" />
                            </div>

                            <h2 className="text-2xl font-bold text-[#40232e]">
                                Oops! Something went wrong
                            </h2>

                            <p className="text-gray-500 mt-3 px-5">
                                {String(error)}
                            </p>

                            <button
                                type="button"
                                onClick={() => setRetry(prev => prev + 1)}
                                className="inline-flex items-center justify-center gap-2 bg-[#872d4c] text-white px-7 py-3 rounded-xl font-semibold mt-6 hover:bg-[#682139] shadow-md transition-all duration-300"
                            >
                                <FaRedo />
                                Try Again
                            </button>

                        </div>

                    ) : (

                        <>
                            {/* RESULT COUNT */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

                                <p className="text-gray-500">
                                    Showing <span className="font-bold text-[#872d4c]">{filteredGifts.length}</span> gifts
                                </p>

                                {(search || category !== 'All' || sort !== 'default') && (

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="flex items-center gap-2 text-sm font-semibold text-[#a84667] hover:text-[#682139] transition-colors"
                                    >
                                        <FaTimes />
                                        Clear Filters
                                    </button>

                                )}

                            </div>

                            {/* GIFT CARDS */}
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

                                /* NO RESULTS */
                                <div className="text-center py-20 bg-white rounded-3xl border border-[#f3e3e8]">

                                    <div className="w-20 h-20 rounded-full bg-[#fbe8ed] flex items-center justify-center mx-auto mb-5">
                                        <FaSearch className="text-3xl text-[#a84667]" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#40232e]">
                                        No gifts found
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Try another search or choose a different category.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center justify-center gap-2 bg-[#872d4c] text-white px-7 py-3 rounded-xl font-semibold mt-6 hover:bg-[#682139] shadow-md transition-all duration-300"
                                    >
                                        <FaRedo />
                                        Clear Filters
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </section>
        </>
    )
}

export default Gifts
