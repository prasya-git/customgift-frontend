
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaGift, FaSearch, FaShoppingBag, FaHeart,
  FaUser, FaBars, FaTimes, FaSignOutAlt
} from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  const { cartCount, wishlist } = useGift()
  const navigate = useNavigate()

  // Check login status
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const storedUser = localStorage.getItem('giftUser')

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.log('Unable to read user details:', error)
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [])

  // Search gifts
  const handleSearch = (e) => {
    e.preventDefault()

    navigate(`/gifts?search=${encodeURIComponent(search)}`)

    setSearch('')
    setMenuOpen(false)
  }

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('giftUser')

    setUser(null)
    setMenuOpen(false)

    alert('Logged out successfully!')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      <div className="flex justify-between items-center px-5 md:px-16 py-4">

        {/* Logo */}
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

        {/* Desktop Search */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">

          <Link to="/gifts" className="hover:text-rose-700">
            Shop
          </Link>

          <Link to="/contact" className="hover:text-rose-700">
            Contact
          </Link>

          {/* Profile / Admin */}
          {user && user.role === 'admin' ? (
            <Link
              to="/admin"
              className="hover:text-rose-700"
              title="Admin Dashboard"
            >
              Admin
            </Link>
          ) : (
            <Link
              to="/profile"
              className="hover:text-rose-700"
              title="My Profile"
            >
              <FaUser size={19} />
            </Link>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative hover:text-rose-700">
            <FaHeart size={20} />

            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs rounded-full px-1.5">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-rose-700">
            <FaShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="gift-btn flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <Link to="/login" className="gift-btn">
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-5 flex flex-col gap-4">

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex bg-gray-100 rounded p-3"
          >
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search gifts..."
              className="bg-transparent outline-none w-full"
            />

            <button type="submit">
              <FaSearch />
            </button>
          </form>

          <Link onClick={() => setMenuOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/gifts">
            Shop Gifts
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/wishlist">
            Wishlist ({wishlist.length})
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/cart">
            Cart ({cartCount})
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/contact">
            Contact
          </Link>

          {user && user.role === 'admin' ? (
            <Link onClick={() => setMenuOpen(false)} to="/admin">
              Admin Dashboard
            </Link>
          ) : user ? (
            <Link onClick={() => setMenuOpen(false)} to="/profile">
              My Profile
            </Link>
          ) : (
            <Link onClick={() => setMenuOpen(false)} to="/login">
              Login / Register
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-left text-rose-700 font-semibold"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </header>
  )
}

export default Header
