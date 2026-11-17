
import React, { useState } from 'react'
import {
    FaPlus,
    FaGift,
    FaImage,
    FaTimes,
    FaCheckCircle,
    FaCloudUploadAlt
} from 'react-icons/fa'

function UploadGift({ onAddGift }) {

    const initialForm = {
        name: '',
        category: 'Birthday',
        occasion: '',
        price: '',
        stock: '',
        description: '',
        image: null,
        customizable: true,
        customizationOptions: ['name', 'message', 'photo']
    }

    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState('')

    const inputStyle = "w-full border border-[#ead7df] rounded-xl px-4 py-3 text-sm text-[#3b202b] bg-white outline-none focus:border-[#a64d6d] focus:ring-2 focus:ring-[#fbe8ed] transition-all"

    const labelStyle = "block text-sm font-semibold text-[#54313e] mb-2"

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImage = (e) => {
        const file = e.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file')
            e.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should not exceed 5MB')
            e.target.value = ''
            return
        }

        setForm(prev => ({
            ...prev,
            image: file
        }))

        setPreview(URL.createObjectURL(file))
    }

    const removeImage = () => {
        setForm(prev => ({
            ...prev,
            image: null
        }))

        setPreview('')
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

            setForm(initialForm)
            setPreview('')

            e.target.reset()

        } catch (error) {
            console.error('Add gift error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-[#f1e2e7] shadow-sm overflow-hidden"
        >

            {/* Header */}
            <div className="bg-gradient-to-r from-[#fbe8ed] to-[#fff5f7] px-6 md:px-8 py-6 border-b border-[#f3e3e8]">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-white text-[#872d4c] flex items-center justify-center shadow-sm">
                        <FaGift className="text-xl" />
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#3b202b]">
                            Add New Gift
                        </h2>

                        <p className="text-sm text-[#987985] mt-1">
                            Add a beautiful gift to your GIFTORA collection.
                        </p>
                    </div>

                </div>

            </div>

            <div className="p-6 md:p-8">

                {/* Basic Details */}
                <div className="mb-7">

                    <h3 className="text-base font-bold text-[#872d4c] mb-5 flex items-center gap-2">
                        <FaGift />
                        Gift Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className={labelStyle}>Gift Name *</label>

                            <input
                                required
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter gift name"
                                className={inputStyle}
                            />
                        </div>

                        <div>
                            <label className={labelStyle}>Category *</label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputStyle}
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
                            <label className={labelStyle}>Occasion</label>

                            <input
                                name="occasion"
                                value={form.occasion}
                                onChange={handleChange}
                                placeholder="Example: Birthday"
                                className={inputStyle}
                            />
                        </div>

                        <div>
                            <label className={labelStyle}>Price (₹) *</label>

                            <input
                                required
                                type="number"
                                min="1"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className={inputStyle}
                            />
                        </div>

                        <div>
                            <label className={labelStyle}>Available Stock</label>

                            <input
                                type="number"
                                min="0"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Available quantity"
                                className={inputStyle}
                            />
                        </div>

                    </div>

                </div>

                {/* Image Upload */}
                <div className="mb-7">

                    <h3 className="text-base font-bold text-[#872d4c] mb-4 flex items-center gap-2">
                        <FaImage />
                        Gift Image
                    </h3>

                    <div className="border-2 border-dashed border-[#e8cbd5] bg-[#fffafb] rounded-2xl p-5 md:p-7 text-center">

                        {preview ? (

                            <div className="relative inline-block">

                                <img
                                    src={preview}
                                    alt="Gift preview"
                                    className="w-48 h-48 object-cover rounded-2xl shadow-md"
                                />

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition"
                                >
                                    <FaTimes />
                                </button>

                                <p className="text-sm text-green-700 font-semibold mt-3 flex items-center justify-center gap-2">
                                    <FaCheckCircle />
                                    Image selected
                                </p>

                            </div>

                        ) : (

                            <label className="cursor-pointer flex flex-col items-center">

                                <div className="w-16 h-16 rounded-full bg-[#fbe8ed] text-[#872d4c] flex items-center justify-center mb-4">
                                    <FaCloudUploadAlt className="text-3xl" />
                                </div>

                                <p className="text-[#54313e] font-semibold">
                                    Click to upload gift image
                                </p>

                                <p className="text-xs text-[#a1848e] mt-2">
                                    PNG, JPG or JPEG (Maximum 5MB)
                                </p>

                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />

                                <span className="mt-4 bg-[#fbe8ed] text-[#872d4c] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#f5d6e0] transition">
                                    Choose Image
                                </span>

                            </label>

                        )}

                    </div>

                </div>

                {/* Description */}
                <div className="mb-7">

                    <label className={labelStyle}>Gift Description *</label>

                    <textarea
                        required
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Write a short description about this gift..."
                        className={`${inputStyle} resize-none`}
                    />

                </div>

                {/* Customization */}
                <div className="border border-[#f0dfe5] bg-[#fffafb] rounded-2xl p-5 md:p-6">

                    <h3 className="text-base font-bold text-[#872d4c] mb-4">
                        Customization Settings
                    </h3>

                    <label className="flex items-start gap-3 cursor-pointer">

                        <input
                            type="checkbox"
                            checked={form.customizable}
                            onChange={e => setForm(prev => ({
                                ...prev,
                                customizable: e.target.checked
                            }))}
                            className="w-5 h-5 mt-0.5 accent-[#872d4c] cursor-pointer"
                        />

                        <div>
                            <p className="text-sm font-semibold text-[#54313e]">
                                Allow customers to customize this gift
                            </p>

                            <p className="text-xs text-[#a1848e] mt-1">
                                Customers can personalize this gift before ordering.
                            </p>
                        </div>

                    </label>

                    {form.customizable && (

                        <div className="mt-5 pt-5 border-t border-[#f0dfe5]">

                            <p className="text-sm font-semibold text-[#54313e] mb-4">
                                Select Customization Options
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                {['name', 'message', 'photo'].map(option => (

                                    <label
                                        key={option}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                            form.customizationOptions.includes(option)
                                                ? 'border-[#d99aae] bg-[#fbe8ed]'
                                                : 'border-[#ead7df] bg-white hover:border-[#d99aae]'
                                        }`}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={form.customizationOptions.includes(option)}
                                            onChange={() => handleOptionChange(option)}
                                            className="w-4 h-4 accent-[#872d4c]"
                                        />

                                        <span className="text-sm font-medium text-[#54313e] capitalize">
                                            {option}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    )}

                </div>

                {/* Submit */}
                <div className="mt-8 flex justify-end">

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#872d4c] hover:bg-[#682139] text-white px-8 py-3.5 rounded-xl font-semibold shadow-md shadow-[#872d4c]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        <FaPlus />

                        {loading ? 'Adding Gift...' : 'Add Gift'}

                    </button>

                </div>

            </div>

        </form>
    )
}

export default UploadGift
