
import React from 'react'
import { Link } from 'react-router-dom'
import { FaGift, FaArrowLeft, FaSearch } from 'react-icons/fa'

function Pnf() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff8f6] via-[#fff0f3] to-[#fce4ec] flex flex-col justify-center items-center text-center px-5 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-16 left-10 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-16 right-10 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-xl">

                {/* Gift Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#872d4c] to-[#bd718b] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-rose-300/40 mb-7 rotate-[-8deg]">
                    <FaGift className="text-white text-5xl" />
                </div>

                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-[#872d4c] tracking-tight">
                    404
                </h1>

                <div className="w-20 h-1.5 bg-[#bd718b] rounded-full mx-auto mt-3"></div>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#291d20] mt-7">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-500 mt-3 leading-7 max-w-md mx-auto">
                    Looks like this gift went missing! The page you are looking for doesn't exist or may have been moved.
                </p>

                {/* Home Button */}
                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-3 mt-8 bg-[#872d4c] hover:bg-[#682039] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <FaArrowLeft />
                    Back to Home
                </Link>

                {/* Bottom Message */}
                <p className="text-sm text-rose-400 mt-8 flex items-center justify-center gap-2">
                    <FaSearch />
                    Let's find something special for you!
                </p>

            </div>

        </div>
    )
}

export default Pnf
