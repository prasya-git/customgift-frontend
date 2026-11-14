import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGift, FaPowerOff } from 'react-icons/fa'

function AdminHeader() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('giftUser')
    navigate('/login')
  }

  return (
    <>
      <div className="flex justify-between items-center px-5 md:px-12 py-4 bg-white">
        <Link to="/admin" className="flex items-center gap-3">
          <FaGift className="text-rose-700 text-3xl" />
          <h1 className="text-2xl font-bold text-rose-800">
            GIFTORA <span className="text-gray-500 text-sm">ADMIN</span>
          </h1>
        </Link>

        <button
          onClick={logout}
          className="bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          Logout <FaPowerOff />
        </button>
      </div>

      <div className="bg-[#79233e] text-white p-3 text-center">
        Welcome to the GIFTORA Admin Panel. Manage your gifts and orders here.
      </div>
    </>
  )
}

export default AdminHeader