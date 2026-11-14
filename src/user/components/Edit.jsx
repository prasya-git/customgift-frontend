import React, { useState } from 'react'

function Edit({ user }) {
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedUser = { ...user, name, email }

    localStorage.setItem('giftUser', JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem('giftUsers')) || []

    const updatedUsers = users.map(item =>
      item.email === user.email ? { ...item, name, email } : item
    )

    localStorage.setItem('giftUsers', JSON.stringify(updatedUsers))

    alert('Profile updated successfully!')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-7 space-y-5"
    >
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
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button className="gift-btn">Save Changes</button>
    </form>
  )
}

export default Edit