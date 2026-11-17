
import React from 'react'
import { FaGift } from 'react-icons/fa'

function Preloader() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff8f6] via-[#fff0f3] to-[#fce4ec] flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-20 left-16 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-16 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl"></div>

            {/* Logo */}
            <div className="relative z-10 flex flex-col items-center">

                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#872d4c] to-[#bd718b] flex items-center justify-center shadow-xl shadow-rose-300/40 animate-bounce">
                    <FaGift className="text-white text-5xl" />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-[5px] text-[#872d4c] mt-7">
                    GIFTORA
                </h1>

                <p className="text-gray-500 text-sm md:text-base mt-3 tracking-wide">
                    Making moments memorable...
                </p>

                {/* Loading Indicator */}
                <div className="flex items-center gap-2 mt-9">

                    <span className="w-2.5 h-2.5 rounded-full bg-[#872d4c] animate-bounce"></span>

                    <span className="w-2.5 h-2.5 rounded-full bg-[#a94b69] animate-bounce [animation-delay:150ms]"></span>

                    <span className="w-2.5 h-2.5 rounded-full bg-[#bd718b] animate-bounce [animation-delay:300ms]"></span>

                </div>

                <p className="text-xs text-rose-400 mt-4 tracking-widest uppercase">
                    Loading your experience
                </p>

            </div>

        </div>
    )
}

export default Preloader
