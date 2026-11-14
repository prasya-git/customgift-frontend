import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem('giftSettings')) || {
      storeName: 'GIFTORA',
      email: 'hello@giftora.com',
      phone: '+91 98765 43210',
      deliveryCharge: 50
    }
  })

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    })
  }

  const saveSettings = (e) => {
    e.preventDefault()
    localStorage.setItem('giftSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">
          <h1 className="text-3xl font-bold">Store Settings</h1>
          <p className="text-gray-500 mt-2">Manage basic store information.</p>

          <form
            onSubmit={saveSettings}
            className="bg-white rounded-2xl shadow-sm p-7 mt-8 max-w-2xl space-y-5"
          >
            <div>
              <label className="block mb-2">Store Name</label>
              <input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2">Store Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2">Delivery Charge (₹)</label>
              <input
                type="number"
                min="0"
                name="deliveryCharge"
                value={settings.deliveryCharge}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button className="gift-btn">Save Settings</button>
          </form>
        </main>
      </div>
    </>
  )
}

export default AdminSettings