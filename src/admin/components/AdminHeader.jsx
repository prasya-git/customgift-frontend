
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaGift,
    FaPowerOff,
    FaUserShield,
    FaTachometerAlt
} from 'react-icons/fa'

function AdminHeader() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('giftUser')
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-[#f1e2e7] shadow-sm">

                <div className="flex justify-between items-center px-5 md:px-10 lg:px-14 py-4">

                    {/* Logo */}
                    <Link to="/admin" className="flex items-center gap-3 group">

                        <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center group-hover:bg-[#872d4c] group-hover:text-white transition-all duration-300">
                            <FaGift className="text-2xl" />
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-extrabold text-[#3b202b] tracking-wide">
                                GIFTORA
                            </h1>

                            <p className="text-[10px] md:text-xs font-bold tracking-[3px] text-[#a64d6d]">
                                ADMIN PANEL
                            </p>
                        </div>

                    </Link>

                    {/* Admin Info and Logout */}
                    <div className="flex items-center gap-3 md:gap-6">

                        <div className="hidden sm:flex items-center gap-2 bg-[#fff5f7] border border-[#f1e2e7] px-4 py-2 rounded-xl">

                            <div className="w-8 h-8 rounded-full bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center">
                                <FaUserShield />
                            </div>

                            <div>
                                <p className="text-xs font-bold text-[#54313e]">
                                    Administrator
                                </p>

                                <p className="text-[10px] text-[#a1848e]">
                                    Manage GIFTORA
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-[#872d4c] hover:bg-[#682139] text-white px-4 md:px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#872d4c]/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <FaPowerOff />
                            <span>Logout</span>
                        </button>

                    </div>

                </div>

            </header>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#682139] via-[#872d4c] to-[#a64d6d] text-white px-5 md:px-10 py-3.5">

                <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">

                    <FaTachometerAlt className="text-[#ffc5d5] hidden sm:block" />

                    <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide">
                        Welcome to the GIFTORA Admin Panel. Manage your gifts and orders here.
                    </p>

                    <FaGift className="text-[#ffc5d5] hidden sm:block" />

                </div>

            </div>
        </>
    )
}

export default AdminHeader
