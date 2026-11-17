
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaGift,
  FaSearch,
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserShield
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

  const closeMenu = () => setMenuOpen(false)

  const navStyle = "text-[#684452] font-medium hover:text-[#a94769] transition-colors duration-300"

  const iconStyle = "relative flex items-center justify-center w-10 h-10 rounded-xl text-[#684452] hover:bg-[#fbe8ed] hover:text-[#872d4c] transition-all duration-300"

  return (
    <header className="bg-white sticky top-0 z-50 shadow-[0_3px_15px_rgba(80,30,50,0.08)]">

      {/* Main Header */}
      <div className="max-w-[1500px] mx-auto flex justify-between items-center px-5 md:px-10 lg:px-16 py-3.5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">

          <div className="w-12 h-12 bg-[#872d4c] text-white rounded-2xl flex items-center justify-center shadow-md hover:bg-[#682139] transition-all duration-300">
            <FaGift size={23} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#872d4c]">
              GIFTORA
            </h1>

            <p className="text-[9px] md:text-[10px] tracking-[3px] font-semibold text-[#a1848e]">
              GIFTS MADE PERSONAL
            </p>
          </div>

        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-[#fff7f9] border border-[#f0dce3] rounded-full px-5 py-3 w-[30%] focus-within:border-[#c47b94] focus-within:ring-2 focus-within:ring-[#fbe8ed] transition-all duration-300"
        >
          <FaSearch className="text-[#a87989]" />

          <input
            type="text"
            placeholder="Search for gifts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none px-3 w-full text-sm text-[#3b202b] placeholder:text-[#b69aa4]"
          />

          <button
            type="submit"
            className="text-[#872d4c] hover:text-[#c05b7d] transition-colors"
            aria-label="Search gifts"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">

          <Link to="/gifts" className={navStyle}>
            Shop
          </Link>

          <Link to="/contact" className={navStyle}>
            Contact
          </Link>

          {/* Profile / Admin */}
          {user && user.role === 'admin' ? (
            <Link
              to="/admin"
              className={`${navStyle} flex items-center gap-2`}
              title="Admin Dashboard"
            >
              <FaUserShield className="text-lg" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/profile"
              className={iconStyle}
              title="My Profile"
              aria-label="My Profile"
            >
              <FaUser size={18} />
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className={iconStyle}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <FaHeart size={19} />

            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#d65c83] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={iconStyle}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <FaShoppingBag size={19} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#d65c83] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#872d4c] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-[#682139] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-[#872d4c] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-[#682139] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#fbe8ed] text-[#872d4c] text-xl hover:bg-[#f3d5df] transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#f2e2e7] px-5 py-5 shadow-lg">

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#fff7f9] border border-[#f0dce3] rounded-xl px-4 py-3 mb-5 focus-within:border-[#c47b94]"
          >
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search gifts..."
              className="bg-transparent outline-none w-full text-sm text-[#3b202b]"
            />

            <button
              type="submit"
              className="text-[#872d4c] text-lg"
              aria-label="Search gifts"
            >
              <FaSearch />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">

            <Link
              onClick={closeMenu}
              to="/"
              className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all"
            >
              Home
            </Link>

            <Link
              onClick={closeMenu}
              to="/gifts"
              className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all"
            >
              Shop Gifts
            </Link>

            <Link
              onClick={closeMenu}
              to="/wishlist"
              className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all flex justify-between"
            >
              Wishlist
              <span className="bg-[#fbe8ed] text-[#872d4c] px-2.5 py-0.5 rounded-full text-xs">
                {wishlist.length}
              </span>
            </Link>

            <Link
              onClick={closeMenu}
              to="/cart"
              className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all flex justify-between"
            >
              Shopping Cart
              <span className="bg-[#fbe8ed] text-[#872d4c] px-2.5 py-0.5 rounded-full text-xs">
                {cartCount}
              </span>
            </Link>

            <Link
              onClick={closeMenu}
              to="/contact"
              className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all"
            >
              Contact
            </Link>

            {user && user.role === 'admin' ? (
              <Link
                onClick={closeMenu}
                to="/admin"
                className="px-4 py-3 rounded-xl text-[#872d4c] bg-[#fff1f4] font-semibold"
              >
                <FaUserShield className="inline mr-2" />
                Admin Dashboard
              </Link>
            ) : user ? (
              <Link
                onClick={closeMenu}
                to="/profile"
                className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all"
              >
                <FaUser className="inline mr-2" />
                My Profile
              </Link>
            ) : (
              <Link
                onClick={closeMenu}
                to="/login"
                className="px-4 py-3 rounded-xl text-[#684452] hover:bg-[#fff1f4] hover:text-[#872d4c] font-medium transition-all"
              >
                Login / Register
              </Link>
            )}

          </div>

          {/* Mobile Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#872d4c] text-white font-semibold py-3 rounded-xl hover:bg-[#682139] transition-all duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>
      )}

    </header>
  )
}

export default Header
