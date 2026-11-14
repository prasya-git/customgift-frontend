import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import UploadGift from '../../user/components/UploadGift'
import defaultGifts from '../../data/gifts'

function AdminResource() {
  const [gifts, setGifts] = useState(() => {
    return JSON.parse(localStorage.getItem('adminGifts')) || defaultGifts
  })

  useEffect(() => {
    localStorage.setItem('adminGifts', JSON.stringify(gifts))
  }, [gifts])

  const addGift = (gift) => {
    setGifts(prev => [gift, ...prev])
    alert('Gift added successfully!')
  }

  const deleteGift = (id) => {
    if (window.confirm('Are you sure you want to delete this gift?')) {
      setGifts(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">

          <h1 className="text-3xl font-bold">Manage Gifts</h1>
          <p className="text-gray-500 mt-2">
            Add and manage your gift products.
          </p>

          <div className="mt-8">
            <UploadGift onAddGift={addGift} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-9">

            <h2 className="text-2xl font-semibold mb-6">
              Gift Inventory ({gifts.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[650px]">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="p-3">Gift</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {gifts.map(gift => (
                    <tr key={gift.id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={gift.image}
                            alt={gift.name}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                          <span className="font-semibold">{gift.name}</span>
                        </div>
                      </td>

                      <td className="p-3">{gift.category}</td>
                      <td className="p-3">₹{gift.price}</td>

                      <td className="p-3">
                        <button
                          onClick={() => deleteGift(gift.id)}
                          className="text-red-600 p-2"
                          title="Delete gift"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

        </main>
      </div>
    </>
  )
}

export default AdminResource