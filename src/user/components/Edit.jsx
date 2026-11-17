
import React, { useEffect, useState } from 'react'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
  FaUserEdit
} from 'react-icons/fa'
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
    } else {
      setPreview('')
    }

    setPicture(null)
  }, [user])

  const handlePictureChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image.')
        return
      }

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

  const inputStyle = "w-full border border-[#ead5dc] bg-[#fffafb] rounded-xl px-4 py-3.5 text-[#3b202b] outline-none focus:border-[#a94b6c] focus:ring-2 focus:ring-[#f7dce5] transition-all duration-300"

  const labelStyle = "flex items-center gap-2 text-sm font-semibold text-[#684452] mb-2"

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-[#f2e2e7] shadow-lg p-6 md:p-9 space-y-6"
    >

      {/* Form Heading */}
      <div className="border-b border-[#f1e3e7] pb-5">
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center text-xl">
            <FaUserEdit />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3b202b]">
              Edit Profile
            </h2>

            <p className="text-sm text-[#a1848e] mt-1">
              Update your personal information
            </p>
          </div>

        </div>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center py-3">

        <div className="relative">

          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#fbe8ed] shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center text-4xl font-bold border-4 border-[#f3dce4]">
              {name.charAt(0).toUpperCase() || 'U'}
            </div>
          )}

          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#872d4c] text-white flex items-center justify-center cursor-pointer border-4 border-white shadow-md hover:bg-[#682139] transition-all duration-300"
          >
            <FaCamera />

            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden"
            />
          </label>

        </div>

        <h3 className="text-lg font-bold text-[#3b202b] mt-4">
          {name || 'Your Name'}
        </h3>

        <p className="text-sm text-[#a1848e] mt-1">
          Your GIFTORA profile picture
        </p>

      </div>

      {/* Full Name */}
      <div>
        <label className={labelStyle}>
          <FaUser className="text-[#b45b78]" />
          Full Name
        </label>

        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your full name"
          className={inputStyle}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelStyle}>
          <FaEnvelope className="text-[#b45b78]" />
          Email Address
        </label>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full border border-[#ead5dc] rounded-xl px-4 py-3.5 bg-[#f5f1f2] text-[#9d8790] cursor-not-allowed outline-none"
        />

        <p className="text-xs text-[#a1848e] mt-2">
          Your email address cannot be changed here.
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className={labelStyle}>
          <FaPhone className="text-[#b45b78]" />
          Phone Number
        </label>

        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className={inputStyle}
        />
      </div>

      {/* Address */}
      <div>
        <label className={labelStyle}>
          <FaMapMarkerAlt className="text-[#b45b78]" />
          Address
        </label>

        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          rows="4"
          placeholder="Enter your delivery address"
          className={`${inputStyle} resize-none`}
        />
      </div>

      {/* Save Button */}
      <div className="pt-3 border-t border-[#f1e3e7]">

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-[#872d4c] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:bg-[#682139] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save Changes
            </>
          )}
        </button>

      </div>

    </form>
  )
}

export default Edit
