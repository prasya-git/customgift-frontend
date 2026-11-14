import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGift, FaInstagram, FaFacebookF,
  FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-[#291d20] text-white pt-14">

      <div className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">

        <div>
          <div className="flex items-center gap-3">
            <FaGift className="text-rose-400 text-3xl" />
            <h2 className="text-3xl font-bold">GIFTORA</h2>
          </div>

          <p className="text-gray-300 mt-5 leading-7">
            Making every celebration more memorable with thoughtful,
            personalized gifts made with love.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-rose-400">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-rose-400">
              <FaFacebookF />
            </a>
            <a href="mailto:hello@giftora.com" aria-label="Email" className="hover:text-rose-400">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
          <div className="flex flex-col gap-3 text-gray-300">
            <Link to="/" className="hover:text-rose-300">Home</Link>
            <Link to="/gifts" className="hover:text-rose-300">Shop Gifts</Link>
            <Link to="/wishlist" className="hover:text-rose-300">Wishlist</Link>
            <Link to="/cart" className="hover:text-rose-300">Shopping Cart</Link>
            <Link to="/contact" className="hover:text-rose-300">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Customer Service</h3>
          <div className="flex flex-col gap-3 text-gray-300">
            <Link to="/profile" className="hover:text-rose-300">My Account</Link>
            <Link to="/profile" className="hover:text-rose-300">My Orders</Link>
            <Link to="/contact" className="hover:text-rose-300">Help & Support</Link>
            <Link to="/contact" className="hover:text-rose-300">Delivery Information</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Get in Touch</h3>

          <p className="flex gap-3 text-gray-300 mb-4">
            <FaMapMarkerAlt className="text-rose-400 mt-1" />
            Kerala, India
          </p>

          <p className="flex gap-3 text-gray-300 mb-4">
            <FaPhone className="text-rose-400 mt-1" />
            +91 98765 43210
          </p>

          <p className="flex gap-3 text-gray-300">
            <FaEnvelope className="text-rose-400 mt-1" />
            hello@giftora.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 px-6 md:px-16 py-6 text-center text-gray-400 text-sm">
        © 2026 GIFTORA. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer