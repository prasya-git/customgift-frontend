
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    FaArrowLeft,
    FaHeart,
    FaShoppingBag,
    FaMinus,
    FaPlus,
    FaGift,
    FaUpload,
    FaCheckCircle,
    FaTruck,
    FaShieldAlt
} from 'react-icons/fa'
import Header from '../components/Header'
import { useGift } from '../../context/GiftContext'
import apiService from '../../api/apiService'

function View() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { addToCart, toggleWishlist, wishlist } = useGift()

    const [gift, setGift] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [customName, setCustomName] = useState('')
    const [message, setMessage] = useState('')
    const [quantity, setQuantity] = useState(1)

    const [photo, setPhoto] = useState('')
    const [preview, setPreview] = useState('')
    const [uploading, setUploading] = useState(false)

    // Fetch selected gift from MongoDB
    useEffect(() => {
        const fetchGift = async () => {
            setLoading(true)
            setError('')

            try {
                const response = await apiService(
                    'GET',
                    `/view-gift/${id}`
                )

                if (response?.response) throw response

                setGift(response.data)
            } catch (err) {
                setError(
                    err.response?.data?.message || 'Unable to load gift details'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchGift()
    }, [id])

    const imageUrl = gift?.image
        ? gift.image.startsWith('http')
            ? gift.image
            : `http://localhost:3000/uploads/${gift.image}`
        : ''

    const isWishlisted = gift
        ? wishlist.some(
            item => String(item.id || item._id) === String(gift._id)
        )
        : false

    // Upload photo to backend
    const handlePhoto = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should not exceed 5MB')
            return
        }

        // Show local preview
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)

        // Reset previous upload
        setPhoto('')

        // Upload actual file
        const formData = new FormData()
        formData.append('photo', file)

        setUploading(true)

        try {
            const response = await apiService(
                'POST',
                '/upload-customization',
                formData
            )

            if (response?.response) throw response

            // Backend returns the uploaded image filename
            setPhoto(response.data.image)
            alert('Photo uploaded successfully')
        } catch (err) {
            setPhoto('')
            setPreview('')
            alert(
                err.response?.data?.message ||
                'Photo upload failed. Please login and try again.'
            )
        } finally {
            setUploading(false)
        }
    }

    const handleAddToCart = () => {
        if (gift.stock < quantity) {
            alert('Requested quantity is not available')
            return
        }

        if (gift.customizable && gift.customizationOptions?.includes('photo') && uploading) {
            alert('Please wait until the photo upload is complete')
            return
        }

        if (gift.customizable && gift.customizationOptions?.includes('photo') && preview && !photo) {
            alert('Please upload your photo successfully before adding to cart')
            return
        }

        const customizedGift = {
            ...gift,
            id: gift._id,
            image: imageUrl,
            quantity,
            customName,
            message,
            photo
        }

        addToCart(customizedGift)
        navigate('/cart')
    }

    // Loading
    if (loading) {
        return (
            <>
                <Header />

                <div className="min-h-screen bg-[#fff9fa] flex flex-col items-center justify-center">

                    <div className="w-12 h-12 border-4 border-[#f5dce4] border-t-[#872d4c] rounded-full animate-spin"></div>

                    <p className="text-[#872d4c] font-semibold mt-5">
                        Loading gift details...
                    </p>

                </div>
            </>
        )
    }

    // Error
    if (error || !gift) {
        return (
            <>
                <Header />

                <div className="min-h-screen bg-[#fff9fa] flex items-center justify-center px-5">

                    <div className="text-center bg-white border border-[#f3e3e8] shadow-sm rounded-3xl p-10 max-w-lg w-full">

                        <div className="w-20 h-20 bg-[#fbe8ed] rounded-full flex items-center justify-center mx-auto mb-5">
                            <FaGift className="text-3xl text-[#a84667]" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#40232e]">
                            {error || 'Gift not found'}
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Sorry, we couldn't find this gift.
                        </p>

                        <Link
                            to="/gifts"
                            className="inline-flex items-center gap-2 mt-6 bg-[#872d4c] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#682139] transition-all"
                        >
                            <FaArrowLeft />
                            Back to Gifts
                        </Link>

                    </div>

                </div>
            </>
        )
    }

    const options = gift.customizationOptions || []
    const canCustomize = gift.customizable

    return (
        <>
            <Header />

            <section className="min-h-screen bg-[#fff9fa] px-5 md:px-10 lg:px-16 py-10">

                <div className="max-w-7xl mx-auto">

                    {/* Back Button */}
                    <Link
                        to="/gifts"
                        className="inline-flex items-center gap-2 text-[#872d4c] font-semibold hover:text-[#bd5275] transition-colors mb-8"
                    >
                        <FaArrowLeft />
                        Back to Gifts
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">

                        {/* LEFT: GIFT IMAGE */}
                        <div>

                            <div className="relative bg-white border border-[#f3e3e8] rounded-3xl p-3 shadow-sm">

                                <div className="overflow-hidden rounded-2xl bg-[#fbe8ed]">

                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={gift.name}
                                            className="w-full h-[380px] md:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-[380px] md:h-[480px] flex items-center justify-center">
                                            <FaGift className="text-6xl text-[#d9a4b4]" />
                                        </div>
                                    )}

                                </div>

                                <div className="absolute top-6 left-6 bg-white/95 text-[#872d4c] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    {gift.category}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggleWishlist({
                                        ...gift,
                                        id: gift._id,
                                        image: imageUrl
                                    })}
                                    className={`absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                                        isWishlisted
                                            ? 'bg-[#c04460] text-white'
                                            : 'bg-white text-[#a84667] hover:bg-[#fbe8ed]'
                                    }`}
                                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <FaHeart className="text-lg" />
                                </button>

                            </div>

                            {/* Uploaded Photo Preview */}
                            {preview && (

                                <div className="mt-6 bg-white border border-[#f3e3e8] rounded-2xl p-5">

                                    <div className="flex items-center justify-between mb-3">

                                        <p className="font-bold text-[#40232e]">
                                            Your Uploaded Photo
                                        </p>

                                        {photo && (
                                            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                                <FaCheckCircle />
                                                Uploaded
                                            </span>
                                        )}

                                    </div>

                                    <img
                                        src={preview}
                                        alt="Your uploaded preview"
                                        className="w-32 h-32 object-cover rounded-xl border border-[#f3e3e8]"
                                    />

                                </div>

                            )}

                            {/* Benefits */}
                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="flex items-center gap-3 bg-white border border-[#f3e3e8] rounded-xl p-4">

                                    <FaTruck className="text-2xl text-[#a84667]" />

                                    <div>
                                        <p className="text-sm font-bold text-[#40232e]">
                                            Safe Delivery
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            To your doorstep
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3 bg-white border border-[#f3e3e8] rounded-xl p-4">

                                    <FaShieldAlt className="text-2xl text-[#a84667]" />

                                    <div>
                                        <p className="text-sm font-bold text-[#40232e]">
                                            Quality Gifts
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Made with care
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT: GIFT DETAILS */}
                        <div className="bg-white border border-[#f3e3e8] rounded-3xl shadow-sm p-6 md:p-8">

                            <p className="text-[#a84667] uppercase tracking-[3px] text-xs font-bold">
                                Make Someone Smile
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#40232e] mt-3 leading-tight">
                                {gift.name}
                            </h1>

                            {/* Price */}
                            <div className="mt-5 flex items-center gap-3">

                                <span className="text-3xl font-bold text-[#a84667]">
                                    ₹{gift.price}
                                </span>

                                {gift.stock > 0 ? (
                                    <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                                        Out of Stock
                                    </span>
                                )}

                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-7 mt-6">
                                {gift.description}
                            </p>

                            <div className="mt-5 flex items-center justify-between bg-[#fff5f7] rounded-xl px-4 py-3">

                                <span className="text-sm text-gray-600">
                                    Available Stock
                                </span>

                                <span className="font-bold text-[#872d4c]">
                                    {gift.stock} units
                                </span>

                            </div>

                            {/* CUSTOMIZATION */}
                            {canCustomize && (

                                <div className="border-t border-[#f0dce3] mt-7 pt-7">

                                    <div className="mb-6">

                                        <p className="text-xs font-bold uppercase tracking-[2px] text-[#b85d7b] mb-2">
                                            Add a Personal Touch
                                        </p>

                                        <h2 className="text-2xl font-bold text-[#40232e]">
                                            Personalize Your Gift
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-2">
                                            Make this gift extra special with your own details.
                                        </p>

                                    </div>

                                    {/* Name */}
                                    {options.includes('name') && (

                                        <div className="mb-5">

                                            <label className="block font-semibold text-sm text-[#40232e] mb-2">
                                                Name to Print
                                            </label>

                                            <input
                                                value={customName}
                                                onChange={e => setCustomName(e.target.value)}
                                                placeholder="Enter a name"
                                                className="w-full border border-[#ead5dd] bg-[#fffdfd] rounded-xl px-4 py-3.5 outline-none focus:border-[#b85d7b] focus:ring-2 focus:ring-[#fbe8ed] transition-all"
                                            />

                                        </div>

                                    )}

                                    {/* Message */}
                                    {options.includes('message') && (

                                        <div className="mb-5">

                                            <label className="block font-semibold text-sm text-[#40232e] mb-2">
                                                Personal Message
                                            </label>

                                            <textarea
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                placeholder="Write your special message..."
                                                rows="4"
                                                className="w-full border border-[#ead5dd] bg-[#fffdfd] rounded-xl px-4 py-3.5 outline-none focus:border-[#b85d7b] focus:ring-2 focus:ring-[#fbe8ed] transition-all resize-none"
                                            />

                                        </div>

                                    )}

                                    {/* Photo */}
                                    {options.includes('photo') && (

                                        <div className="mb-2">

                                            <label className="block font-semibold text-sm text-[#40232e] mb-2">
                                                Upload Your Photo
                                            </label>

                                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#d9a4b4] bg-[#fff8fa] rounded-2xl p-7 cursor-pointer hover:bg-[#fbe8ed] hover:border-[#a84667] transition-all">

                                                <FaUpload className="text-3xl text-[#a84667] mb-3" />

                                                <span className="font-semibold text-[#872d4c]">
                                                    Choose an Image
                                                </span>

                                                <span className="text-xs text-gray-500 mt-2">
                                                    JPG, PNG or other image formats (Max 5MB)
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhoto}
                                                    className="hidden"
                                                />

                                            </label>

                                            {uploading && (
                                                <p className="text-[#a84667] text-sm font-medium mt-3 flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-[#d9a4b4] border-t-[#872d4c] rounded-full animate-spin"></span>
                                                    Uploading photo...
                                                </p>
                                            )}

                                            {photo && !uploading && (
                                                <p className="text-green-600 text-sm font-semibold mt-3 flex items-center gap-2">
                                                    <FaCheckCircle />
                                                    Photo uploaded successfully
                                                </p>
                                            )}

                                        </div>

                                    )}

                                </div>

                            )}

                            {/* QUANTITY */}
                            <div className="border-t border-[#f0dce3] mt-7 pt-7">

                                <label className="block font-bold text-[#40232e] mb-3">
                                    Select Quantity
                                </label>

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center border border-[#ead5dd] rounded-xl overflow-hidden">

                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                            className="w-11 h-11 flex items-center justify-center bg-[#fff5f7] text-[#872d4c] hover:bg-[#f5dce4] disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <FaMinus size={11} />
                                        </button>

                                        <span className="w-14 text-center font-bold text-[#40232e]">
                                            {quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.min(gift.stock, quantity + 1))}
                                            disabled={quantity >= gift.stock}
                                            className="w-11 h-11 flex items-center justify-center bg-[#fff5f7] text-[#872d4c] hover:bg-[#f5dce4] disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <FaPlus size={11} />
                                        </button>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs text-gray-500">
                                            Total Price
                                        </p>

                                        <p className="text-xl font-bold text-[#a84667]">
                                            ₹{Number(gift.price) * quantity}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-3 mt-8">

                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={gift.stock < 1 || uploading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#872d4c] text-white py-4 px-4 rounded-xl font-bold shadow-md hover:bg-[#682139] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    <FaShoppingBag />

                                    {uploading ? 'Uploading...' : 'Add to Cart'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => toggleWishlist({
                                        ...gift,
                                        id: gift._id,
                                        image: imageUrl
                                    })}
                                    className={`w-14 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                                        isWishlisted
                                            ? 'bg-[#c04460] border-[#c04460] text-white'
                                            : 'bg-white border-[#d9a4b4] text-[#a84667] hover:bg-[#fbe8ed]'
                                    }`}
                                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <FaHeart className="text-xl" />
                                </button>

                            </div>

                            <p className="text-xs text-center text-gray-500 mt-5">
                                Your gift will be carefully prepared with love.
                            </p>

                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}

export default View
