
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaGift, FaTruck, FaHeart, FaShieldAlt,
    FaArrowRight, FaBirthdayCake, FaCamera, FaStar
} from 'react-icons/fa'

import Header from '../components/Header'
import GiftCard from '../components/GiftCard'
import apiService from '../../api/apiService'

function Home() {

    const [popularGifts, setPopularGifts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchHomeGifts = async () => {
            setLoading(true)
            setError('')

            try {
                const response = await apiService('GET', '/home-gifts')

                if (response?.response) {
                    throw response
                }

                setPopularGifts(
                    Array.isArray(response.data) ? response.data : []
                )

            } catch (err) {
                console.log('Home Gifts Error:', err)

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    'Unable to load gifts.'
                )

                setPopularGifts([])

            } finally {
                setLoading(false)
            }
        }

        fetchHomeGifts()

    }, [])

    const categories = [
        {
            name: 'Birthday Gifts',
            filter: 'Birthday',
            icon: <FaBirthdayCake />,
            image: 'https://wallpaperbat.com/img/107375900-personalised-birthday-gifts.jpg'
        },
        {
            name: 'Anniversary',
            filter: 'Anniversary',
            icon: <FaHeart />,
            image: 'https://celebrateandhavefun.com/wp-content/uploads/2024/02/DALL%C2%B7E-2024-02-16-11.07.34-Create-an-elegant-and-romantic-featured-image-for-an-article-on-gift-ideas-for-a-30th-wedding-anniversary.-The-image-should-visually-encapsulate-the-e.webp'
        },
        {
            name: 'Photo Gifts',
            filter: 'Photo Gifts',
            icon: <FaCamera />,
            image: 'https://www.thezappybox.com/cdn/shop/files/A5_Picture_Perfect_Frame_Dark_Brown_1.webp?v=1774076000&width=1080'
        },
        {
            name: 'Gift Hampers',
            filter: 'Gift Hampers',
            icon: <FaGift />,
            image: 'https://casolia.com/img/image10_creative-ways-to-wrap-a-gift-basket-ideas_add-a-pop-of-metallic.jpg'
        }
    ]

    const benefits = [
        {
            icon: <FaGift />,
            title: 'Personalized Gifts',
            description: 'Made especially for you'
        },
        {
            icon: <FaTruck />,
            title: 'Fast Delivery',
            description: 'Delivered with care'
        },
        {
            icon: <FaHeart />,
            title: 'Made with Love',
            description: 'For your special moments'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Secure Shopping',
            description: 'Safe and easy checkout'
        }
    ]

    const reviews = [
        [
            'Absolutely beautiful!',
            'The personalized photo frame was perfect. Great quality and lovely packaging.',
            'Ananya'
        ],
        [
            'A wonderful surprise',
            'I ordered a gift hamper for my friend. She loved every detail!',
            'Meera'
        ],
        [
            'Excellent experience',
            'Easy customization and the gift arrived safely. Highly recommended.',
            'Arjun'
        ]
    ]

    const sectionTitle = 'text-3xl md:text-4xl font-bold text-[#49232f] tracking-tight'
    const sectionSubtitle = 'text-rose-700 uppercase tracking-[3px] text-xs md:text-sm font-bold'

    const primaryButton = 'inline-flex items-center justify-center gap-2 bg-[#872d4c] text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-rose-900/20 hover:bg-[#682139] hover:-translate-y-1 transition-all duration-300'

    const secondaryButton = 'inline-flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white hover:text-[#872d4c] transition-all duration-300'

    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <section className="relative min-h-[620px] md:min-h-[690px] flex items-center overflow-hidden">

                <img
                    src="https://png.pngtree.com/thumb_back/fw800/background/20240718/pngtree-3d-scene-of-pink-flowers-and-gifts-on-background-image_16016982.jpg"
                    alt="Beautiful gift boxes"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#29131e]/90 via-[#391b2b]/65 to-black/20"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-24">

                    <div className="max-w-3xl text-white">

                        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-md rounded-full px-5 py-2 mb-7">
                            <FaGift className="text-rose-300" />
                            <span className="text-xs md:text-sm uppercase tracking-[2px] font-semibold">
                                Make every moment special
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.12] tracking-tight">
                            Gifts That Speak
                            <span className="block text-[#ffb8ca] mt-2">
                                From The Heart
                            </span>
                        </h1>

                        <p className="text-base md:text-lg mt-7 text-white/85 leading-8 max-w-xl">
                            Create meaningful memories with personalized gifts
                            made especially for the people you love. Every gift
                            tells a beautiful story.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-9">

                            <Link to="/gifts" className={primaryButton}>
                                Explore Gifts <FaArrowRight />
                            </Link>

                            <Link to="/gifts" className={secondaryButton}>
                                Customize Now <FaGift />
                            </Link>

                        </div>

                        <div className="flex flex-wrap gap-7 mt-12 text-white/80 text-sm">
                            <span className="flex items-center gap-2">
                                <FaHeart className="text-rose-300" />
                                Made with love
                            </span>
                            <span className="flex items-center gap-2">
                                <FaGift className="text-rose-300" />
                                Specially customized
                            </span>
                        </div>

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fffaf9] to-transparent"></div>

            </section>

            {/* BENEFITS */}
            <section className="bg-white px-6 md:px-16 py-12 md:py-14">

                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-7">

                    {benefits.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#fff4f5] transition duration-300"
                        >

                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center text-2xl">
                                {item.icon}
                            </div>

                            <div>
                                <h3 className="font-bold text-[#49232f] text-sm md:text-base">
                                    {item.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">
                                    {item.description}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </section>

            {/* CATEGORIES */}
            <section className="bg-[#fffaf9] px-6 md:px-16 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-12">

                        <p className={sectionSubtitle}>
                            Find the perfect gift
                        </p>

                        <h2 className={`${sectionTitle} mt-3`}>
                            Shop By Category
                        </h2>

                        <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-7">
                            From birthdays to anniversaries, find something
                            special for every occasion and every loved one.
                        </p>

                        <div className="w-16 h-1 bg-[#c66a86] rounded-full mx-auto mt-5"></div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {categories.map((category, index) => (
                            <Link
                                to={`/gifts?category=${encodeURIComponent(category.filter)}`}
                                key={index}
                                className="relative h-[310px] md:h-[350px] rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500"
                            >

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#28121e]/90 via-black/10 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">

                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-4">
                                        {category.icon}
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold">
                                        {category.name}
                                    </h3>

                                    <p className="text-sm text-white/80 mt-2 flex items-center gap-2 group-hover:text-[#ffc3d2] transition">
                                        Explore collection
                                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </p>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>
            </section>

            {/* LATEST GIFTS */}
            <section className="bg-[#f9ecee] px-6 md:px-16 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-12">

                        <div>
                            <p className={sectionSubtitle}>
                                Customer favourites
                            </p>

                            <h2 className={`${sectionTitle} mt-3`}>
                                Latest Gifts
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Discover something special for someone special.
                            </p>
                        </div>

                        <Link
                            to="/gifts"
                            className="inline-flex items-center justify-center gap-2 bg-[#872d4c] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#682139] hover:-translate-y-1 transition-all shadow-md"
                        >
                            View All Gifts <FaArrowRight />
                        </Link>

                    </div>

                    {loading ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(item => (
                                <div key={item} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                                    <div className="h-56 bg-rose-100 rounded-xl"></div>
                                    <div className="h-4 bg-rose-100 rounded mt-5 w-3/4"></div>
                                    <div className="h-4 bg-rose-100 rounded mt-3 w-1/2"></div>
                                </div>
                            ))}
                        </div>

                    ) : error ? (

                        <div className="text-center py-14 bg-white rounded-3xl shadow-sm">
                            <FaGift className="text-4xl text-rose-300 mx-auto mb-4" />
                            <p className="text-red-600 font-medium">
                                {String(error)}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 bg-[#872d4c] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#682139] transition"
                            >
                                Try Again
                            </button>
                        </div>

                    ) : popularGifts.length > 0 ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                            {popularGifts.map(gift => (
                                <GiftCard
                                    key={gift._id}
                                    gift={gift}
                                />
                            ))}
                        </div>

                    ) : (

                        <div className="text-center py-16 bg-white rounded-3xl">
                            <FaGift className="text-5xl text-rose-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#49232f]">
                                No gifts available yet
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Please check back soon for our latest collections.
                            </p>
                            <Link to="/gifts" className={`${primaryButton} mt-6`}>
                                Browse Gifts <FaArrowRight />
                            </Link>
                        </div>

                    )}

                </div>
            </section>

            {/* PERSONALIZATION BANNER */}
            <section className="bg-[#fffaf9] px-6 md:px-16 py-20">

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 rounded-[30px] overflow-hidden bg-[#f2dce2] shadow-xl">

                    <div className="p-8 md:p-16 flex flex-col justify-center">

                        <p className={sectionSubtitle}>
                            Your ideas, our creations
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#49232f] mt-5 leading-tight">
                            Make It Personal.
                            <span className="block text-[#a44768]">
                                Make It Unforgettable.
                            </span>
                        </h2>

                        <p className="text-gray-600 mt-6 leading-8">
                            Add a name, photo or heartfelt message and turn an
                            ordinary present into a memory that lasts forever.
                            Your imagination makes every gift unique.
                        </p>

                        <Link
                            to="/gifts"
                            className={`${primaryButton} mt-8 w-fit`}
                        >
                            Create Your Gift <FaArrowRight />
                        </Link>

                    </div>

                    <div className="min-h-[350px] md:min-h-[550px] relative overflow-hidden">

                        <img
                            src="https://image.slidesdocs.com/responsive-images/background/a-pair-of-pink-balloons-with-gifts-hanging-above-the-pink-powerpoint-background_e385e06f4d__960_540.jpg"
                            alt="Personalized gift"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition duration-700"
                        />

                    </div>

                </div>
            </section>

            {/* REVIEWS */}
            <section className="bg-white px-6 md:px-16 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-12">

                        <p className={sectionSubtitle}>
                            Happy customers
                        </p>

                        <h2 className={`${sectionTitle} mt-3`}>
                            Love Shared Through Gifts
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Every smile makes our work more meaningful.
                        </p>

                        <div className="w-16 h-1 bg-[#c66a86] rounded-full mx-auto mt-5"></div>

                    </div>

                    <div className="grid md:grid-cols-3 gap-7">

                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="p-8 bg-[#fff7f6] rounded-3xl border border-rose-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >

                                <div className="flex text-[#e6a32b] gap-1 mb-5">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <FaStar key={n} />
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-[#49232f]">
                                    {review[0]}
                                </h3>

                                <p className="text-gray-600 mt-4 leading-7">
                                    "{review[1]}"
                                </p>

                                <div className="flex items-center gap-3 mt-7 pt-5 border-t border-rose-100">

                                    <div className="w-11 h-11 rounded-full bg-[#872d4c] text-white flex items-center justify-center font-bold">
                                        {review[2].charAt(0)}
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#49232f]">
                                            {review[2]}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Happy Customer
                                        </p>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-[#49232f] px-6 md:px-16 py-16 text-center">

                <div className="max-w-3xl mx-auto">

                    <FaGift className="text-4xl text-[#ffb8ca] mx-auto mb-5" />

                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Make Someone's Day Special
                    </h2>

                    <p className="text-rose-100/80 mt-4 leading-7">
                        Find a gift that says what words sometimes cannot.
                        Create beautiful memories with GIFTORA.
                    </p>

                    <Link
                        to="/gifts"
                        className="inline-flex items-center gap-2 mt-8 bg-white text-[#872d4c] px-8 py-3.5 rounded-full font-bold hover:bg-[#ffc3d2] hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                        Find Your Perfect Gift <FaArrowRight />
                    </Link>

                </div>

            </section>

        </>
    )
}

export default Home
