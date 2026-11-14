import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaGift, FaSearch, FaShoppingBag, FaHeart,
  FaUser, FaBars, FaTimes
} from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { cartCount, wishlist } = useGift()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/gifts?search=${encodeURIComponent(search)}`)
    setSearch('')
    setMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      <div className="flex justify-between items-center px-5 md:px-16 py-4">

        <Link to="/" className="flex items-center gap-2">
          <div className="bg-rose-100 text-rose-700 p-3 rounded-full">
            <FaGift size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-rose-800">
              GIFTORA
            </h1>
            <p className="text-xs tracking-widest text-gray-500">
              GIFTS MADE PERSONAL
            </p>
          </div>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3"
        >
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for gifts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none px-3 w-full"
          />
        </form>

        <div className="hidden md:flex items-center gap-7">

          <Link to="/gifts" className="hover:text-rose-700">
            Shop
          </Link>

          <Link to="/contact" className="hover:text-rose-700">
            Contact
          </Link>

          <Link to="/profile" className="hover:text-rose-700">
            <FaUser size={19} />
          </Link>

          <Link to="/wishlist" className="relative hover:text-rose-700">
            <FaHeart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs rounded-full px-1.5">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-rose-700">
            <FaShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="gift-btn">
            Login
          </Link>

        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-5 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex bg-gray-100 rounded p-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search gifts..."
              className="bg-transparent outline-none w-full"
            />
            <button><FaSearch /></button>
          </form>

          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/gifts">Shop Gifts</Link>
          <Link onClick={() => setMenuOpen(false)} to="/wishlist">Wishlist</Link>
          <Link onClick={() => setMenuOpen(false)} to="/cart">Cart ({cartCount})</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to="/login">Login / Register</Link>
        </div>
      )}

    </header>
  )
}

export default Header