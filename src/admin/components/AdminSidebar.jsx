import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaChartBar, FaGift, FaShoppingBag,
  FaUsers, FaCog
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
    <aside className="bg-[#321f27] text-white min-h-full p-5">

      <div className="text-center py-7">
        <div className="w-20 h-20 bg-rose-200 text-rose-800 rounded-full mx-auto flex items-center justify-center text-3xl">
          <FaUsers />
        </div>
        <h2 className="font-semibold text-lg mt-3">Administrator</h2>
        <p className="text-xs text-gray-300">System Manager</p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-700 text-white'
                  : 'hover:bg-white/10 text-gray-200'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}

export default AdminSidebar