import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGift, FaUser, FaLock, FaEnvelope } from 'react-icons/fa'

function Auth({ insideRegister = false }) {
  const [isRegister, setIsRegister] = useState(insideRegister)
  const [role, setRole] = useState('customer')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !isRegister &&
      form.email === 'admin@giftora.com' &&
      form.password === 'admin123'
    ) {
      localStorage.setItem('giftUser', JSON.stringify({
        name: 'Administrator',
        email: form.email,
        role: 'admin'
      }))

      navigate('/admin')
      return
    }

    if (isRegister) {
      const users = JSON.parse(localStorage.getItem('giftUsers')) || []

      const exists = users.find(user => user.email === form.email)

      if (exists) {
        alert('Email already registered.')
        return
      }

      const newUser = {
        ...form,
        role: 'customer'
      }

      localStorage.setItem(
        'giftUsers',
        JSON.stringify([...users, newUser])
      )

      localStorage.setItem('giftUser', JSON.stringify(newUser))

      alert('Registration successful!')
      navigate('/profile')
      return
    }

    const users = JSON.parse(localStorage.getItem('giftUsers')) || []

    const user = users.find(
      item =>
        item.email === form.email &&
        item.password === form.password
    )

    if (!user) {
      alert('Invalid email or password.')
      return
    }

    localStorage.setItem('giftUser', JSON.stringify(user))
    navigate('/profile')
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#fff7f5]">

      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000"
          alt="Gift boxes"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45 flex flex-col justify-center px-14 text-white">
          <FaGift className="text-5xl mb-5" />
          <h1 className="text-5xl font-bold">
            Make Every Moment Special
          </h1>
          <p className="text-lg mt-5">
            Find thoughtful gifts and create beautiful memories with GIFTORA.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 w-full max-w-lg">

          <Link to="/" className="text-rose-700 flex items-center gap-2 mb-8">
            <FaGift className="text-2xl" />
            <span className="text-2xl font-bold">GIFTORA</span>
          </Link>

          <h1 className="text-3xl font-bold">
            {isRegister ? 'Create Account' : 'Welcome Back!'}
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            {isRegister
              ? 'Join GIFTORA and make gifting more special.'
              : 'Login to continue your shopping journey.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {isRegister && (
              <div>
                <label className="block mb-2">Full Name</label>
                <div className="flex items-center border rounded-lg px-3">
                  <FaUser className="text-gray-400" />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full p-3 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-2">Email Address</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaLock className="text-gray-400" />
                <input
                  required
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block mb-2">Account Type</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="customer">Customer</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Admin accounts are created separately by the system administrator.
                </p>
              </div>
            )}

            <button type="submit" className="gift-btn w-full">
              {isRegister ? 'Create Account' : 'Login'}
            </button>

          </form>

          <p className="text-center mt-7 text-gray-600">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}

            <button
              onClick={() => {
                setIsRegister(!isRegister)
                navigate(isRegister ? '/login' : '/register')
              }}
              className="text-rose-700 font-semibold ml-2"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>

          <Link to="/" className="block text-center text-sm text-gray-500 mt-6">
            Back to Home
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Auth