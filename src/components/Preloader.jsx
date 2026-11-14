import React from 'react'
import { FaGift } from 'react-icons/fa'

function Preloader() {
  return (
    <div className="min-h-screen bg-[#fff7f5] flex flex-col justify-center items-center">
      <FaGift className="text-rose-700 text-6xl animate-bounce" />
      <h1 className="text-4xl font-bold text-rose-800 mt-5">GIFTORA</h1>
      <p className="text-gray-500 mt-2">Making moments memorable...</p>
    </div>
  )
}

export default Preloader