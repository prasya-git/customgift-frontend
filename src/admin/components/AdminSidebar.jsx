
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    FaChartBar,
    FaGift,
    FaShoppingBag,
    FaUsers,
    FaCog,
    FaUserShield,
    FaChevronRight
} from 'react-icons/fa'

function AdminSidebar() {

    const links = [
        { path: '/admin', label: 'Dashboard', icon: <FaChartBar /> },
        { path: '/admin/resources', label: 'Manage Gifts', icon: <FaGift /> },
        { path: '/admin/orders', label: 'Manage Orders', icon: <FaShoppingBag /> },
        { path: '/admin/users', label: 'Customers', icon: <FaUsers /> },
        { path: '/admin/settings', label: 'Settings', icon: <FaCog /> }
    ]

    return (
        <aside className="bg-gradient-to-b from-[#70263f] via-[#812d4b] to-[#4b1c30] text-white min-h-full p-5 md:p-6">

            {/* Admin Profile */}
            <div className="text-center py-7 mb-6 border-b border-white/15">

                <div className="w-20 h-20 bg-gradient-to-br from-white to-[#f8cbd9] text-[#812d4b] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg shadow-black/20">
                    <FaUserShield />
                </div>

                <h2 className="font-bold text-lg mt-4 text-white">
                    Administrator
                </h2>

                <p className="text-xs text-pink-200 mt-1">
                    System Manager
                </p>

                <div className="inline-flex items-center gap-2 mt-4 bg-white/15 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-[10px] text-pink-50 font-medium">
                        Active Session
                    </span>
                </div>

            </div>

            {/* Navigation Heading */}
            <div className="mb-4 px-3">
                <p className="text-[10px] font-bold tracking-[2px] text-pink-200 uppercase">
                    Main Menu
                </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">

                {links.map(link => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === '/admin'}
                        className={({ isActive }) =>
                            `group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                                isActive
                                    ? 'bg-white text-[#812d4b] shadow-lg shadow-black/20'
                                    : 'text-pink-100 hover:bg-white/15 hover:text-white'
                            }`
                        }
                    >

                        {({ isActive }) => (
                            <>
                                <div className="flex items-center gap-3">

                                    <span className={`text-lg transition-colors ${
                                        isActive ? 'text-[#812d4b]' : 'text-pink-200 group-hover:text-white'
                                    }`}>
                                        {link.icon}
                                    </span>

                                    <span className="text-sm font-semibold">
                                        {link.label}
                                    </span>

                                </div>

                                <FaChevronRight className={`text-xs transition-all ${
                                    isActive
                                        ? 'opacity-100 text-[#812d4b]'
                                        : 'opacity-0 group-hover:opacity-100'
                                }`} />

                            </>
                        )}

                    </NavLink>

                ))}

            </nav>

            {/* Bottom Branding */}
            <div className="mt-10 pt-6 border-t border-white/15 text-center">

                <div className="flex items-center justify-center gap-2 text-pink-100">
                    <FaGift />
                    <span className="font-bold tracking-widest text-sm">
                        GIFTORA
                    </span>
                </div>

                <p className="text-[10px] text-pink-200 mt-2">
                    Admin Dashboard
                </p>

            </div>

        </aside>
    )
}

export default AdminSidebar
