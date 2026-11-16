
import React, { useEffect, useState } from 'react'
import apiService from '../../api/apiService'

function Edit({ user, onUpdate }) {
  const [name, setName] = useState(user?.name || user?.username || '')
  const [email] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [picture, setPicture] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(user?.name || user?.username || '')
    setPhone(user?.phone || '')
    setAddress(user?.address || '')

    if (user?.picture) {
      setPreview(
        user.picture.startsWith('http')
          ? user.picture
          : `http://localhost:3000/uploads/${user.picture}`
      )
    }
  }, [user])

  const handlePictureChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setPicture(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('username', name)
      formData.append('phone', phone)
      formData.append('address', address)

      if (picture) {
        formData.append('picture', picture)
      }

      const response = await apiService(
        'PUT',
        '/user-profile',
        formData
      )

      if (response?.response) {
        throw response
      }

      const updatedUser = response.data

      const userData = {
        ...user,
        ...updatedUser,
        name: updatedUser.username || updatedUser.name
      }

      localStorage.setItem('giftUser', JSON.stringify(userData))

      if (onUpdate) {
        onUpdate(userData)
      }

      alert('Profile updated successfully!')
      setPicture(null)

    } catch (error) {
      console.error('Profile update error:', error)
      alert(
        error.response?.data?.message ||
        'Unable to update profile. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-7 space-y-5"
    >
      <div className="flex flex-col items-center gap-3">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-3xl font-bold">
            {name.charAt(0).toUpperCase() || 'U'}
          </div>
        )}

        <label className="text-rose-700 font-medium cursor-pointer">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="block mb-2 font-medium">Full Name</label>
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Email Address</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full border rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          Email address cannot be changed here.
        </p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Address</label>
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          rows="3"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="gift-btn disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}

export default Edit
