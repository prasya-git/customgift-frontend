import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

function UploadGift({ onAddGift }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Birthday',
    price: '',
    oldPrice: '',
    description: '',
    image: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newGift = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || form.price),
      rating: 5,
      popular: false
    }

    onAddGift(newGift)

    setForm({
      name: '',
      category: 'Birthday',
      price: '',
      oldPrice: '',
      description: '',
      image: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-2xl p-7">

      <h2 className="text-2xl font-semibold mb-6">
        Add New Gift
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2">Gift Name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Photo Gifts</option>
            <option>Gift Hampers</option>
            <option>Personalized Gifts</option>
            <option>Soft Toys</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Price</label>
          <input
            required
            type="number"
            min="1"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">Old Price</label>
          <input
            type="number"
            min="0"
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">Image URL</label>
          <input
            required
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste gift image URL"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">Description</label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <button className="gift-btn mt-6 flex items-center gap-2">
        <FaPlus /> Add Gift
      </button>

    </form>
  )
}

export default UploadGift