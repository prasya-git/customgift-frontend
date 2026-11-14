import React from 'react'
import { Link } from 'react-router-dom'
import { FaGift } from 'react-icons/fa'

function Pnf() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-5 bg-[#fff7f5]">

      <FaGift className="text-rose-700 text-6xl mb-6" />

      <h1 className="text-8xl font-bold text-rose-700">404</h1>

      <h2 className="text-3xl font-semibold mt-5">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-3">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="gift-btn mt-7">
        Back to Home
      </Link>

    </div>
  )
}

export default Pnf