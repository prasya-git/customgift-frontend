
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

function UploadGift({ onAddGift }) {
    const [form, setForm] = useState({
        name: '',
        category: 'Birthday',
        occasion: '',
        price: '',
        stock: '',
        description: '',
        image: null,
        customizable: true,
        customizationOptions: ['name', 'message', 'photo']
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImage = (e) => {
        setForm(prev => ({
            ...prev,
            image: e.target.files[0]
        }))
    }

    const handleOptionChange = (option) => {
        setForm(prev => ({
            ...prev,
            customizationOptions: prev.customizationOptions.includes(option)
                ? prev.customizationOptions.filter(item => item !== option)
                : [...prev.customizationOptions, option]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.image) {
            alert('Please select a gift image')
            return
        }

        const formData = new FormData()

        formData.append('name', form.name)
        formData.append('category', form.category)
        formData.append('occasion', form.occasion)
        formData.append('price', form.price)
        formData.append('stock', form.stock || 0)
        formData.append('description', form.description)
        formData.append('image', form.image)
        formData.append('customizable', String(form.customizable))
        formData.append(
            'customizationOptions',
            JSON.stringify(form.customizationOptions)
        )

        setLoading(true)

        try {
            await onAddGift(formData)

            setForm({
                name: '',
                category: 'Birthday',
                occasion: '',
                price: '',
                stock: '',
                description: '',
                image: null,
                customizable: true,
                customizationOptions: ['name', 'message', 'photo']
            })

            e.target.reset()
        } catch (error) {
            console.error('Add gift error:',error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-sm rounded-2xl p-7"
        >

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
                    <label className="block mb-2">Occasion</label>
                    <input
                        name="occasion"
                        value={form.occasion}
                        onChange={handleChange}
                        placeholder="Example: Birthday"
                        className="w-full border rounded-lg p-3"
                    />
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
                    <label className="block mb-2">Stock</label>
                    <input
                        type="number"
                        min="0"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Available quantity"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-2">Gift Image</label>
                    <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="w-full border rounded-lg p-3"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Select an image file (maximum 5MB).
                    </p>
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

                <div className="md:col-span-2 border-t pt-5">
                    <label className="flex items-center gap-3 font-medium">
                        <input
                            type="checkbox"
                            checked={form.customizable}
                            onChange={e => setForm(prev => ({
                                ...prev,
                                customizable: e.target.checked
                            }))}
                        />
                        Allow customers to customize this gift
                    </label>

                    {form.customizable && (
                        <div className="mt-4">
                            <p className="font-medium mb-3">
                                Customization Options
                            </p>

                            <div className="flex flex-wrap gap-5">
                                {['name', 'message', 'photo'].map(option => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.customizationOptions.includes(option)}
                                            onChange={() => handleOptionChange(option)}
                                        />
                                        <span className="capitalize">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <button
                type="submit"
                disabled={loading}
                className="gift-btn mt-6 flex items-center gap-2 disabled:opacity-50"
            >
                <FaPlus />
                {loading ? 'Adding Gift...' : 'Add Gift'}
            </button>

        </form>
    )
}

export default UploadGift
