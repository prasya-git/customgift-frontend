
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaHeart, FaShoppingBag } from 'react-icons/fa'
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

    if (loading) {
        return (
            <>
                <Header />
                <div className="text-center py-32 text-rose-700">
                    Loading gift details...
                </div>
            </>
        )
    }

    if (error || !gift) {
        return (
            <>
                <Header />
                <div className="text-center py-32">
                    <h2 className="text-3xl font-semibold">
                        {error || 'Gift not found'}
                    </h2>
                    <Link to="/gifts" className="gift-btn mt-5 inline-block">
                        Back to Gifts
                    </Link>
                </div>
            </>
        )
    }

    const options = gift.customizationOptions || []
    const canCustomize = gift.customizable

    return (
        <>
            <Header />

            <div className="px-6 md:px-16 py-10">

                <Link to="/gifts" className="text-rose-700 flex items-center gap-2 mb-8">
                    <FaArrowLeft /> Back to Gifts
                </Link>

                <div className="grid md:grid-cols-2 gap-12">

                    <div>
                        <img
                            src={imageUrl}
                            alt={gift.name}
                            className="w-full h-[500px] object-cover rounded-2xl"
                        />

                        {preview && (
                            <div className="mt-5">
                                <p className="font-semibold mb-2">
                                    Your uploaded photo preview
                                </p>
                                <img
                                    src={preview}
                                    alt="Your uploaded preview"
                                    className="w-40 h-40 object-cover rounded-xl"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-rose-700 uppercase tracking-widest text-sm">
                            {gift.category}
                        </p>

                        <h1 className="text-4xl font-bold mt-3">
                            {gift.name}
                        </h1>

                        <div className="mt-5">
                            <span className="text-3xl text-rose-800 font-bold">
                                ₹{gift.price}
                            </span>
                        </div>

                        <p className="text-gray-600 leading-7 mt-5">
                            {gift.description}
                        </p>

                        <p className="mt-3 text-sm text-gray-600">
                            Available stock: {gift.stock}
                        </p>

                        {canCustomize && (
                            <div className="border-t border-b py-6 my-7">
                                <h2 className="text-2xl font-semibold mb-5">
                                    Personalize Your Gift
                                </h2>

                                {options.includes('name') && (
                                    <>
                                        <label className="block font-medium mb-2">
                                            Name to print
                                        </label>
                                        <input
                                            value={customName}
                                            onChange={e => setCustomName(e.target.value)}
                                            placeholder="Enter a name"
                                            className="w-full border rounded-lg p-3 mb-5 outline-rose-500"
                                        />
                                    </>
                                )}

                                {options.includes('message') && (
                                    <>
                                        <label className="block font-medium mb-2">
                                            Personal message
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            placeholder="Write your special message..."
                                            rows="4"
                                            className="w-full border rounded-lg p-3 mb-5 outline-rose-500"
                                        />
                                    </>
                                )}

                                {options.includes('photo') && (
                                    <>
                                        <label className="block font-medium mb-2">
                                            Upload your photo
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhoto}
                                            className="w-full border rounded-lg p-3 mb-5"
                                        />
                                        {uploading && (
                                            <p className="text-rose-700 text-sm mb-3">
                                                Uploading photo...
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        <label className="block font-medium mb-2">
                            Quantity
                        </label>

                        <div className="flex items-center gap-4 mb-7">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="border rounded px-4 py-2"
                            >
                                -
                            </button>

                            <span className="font-semibold">{quantity}</span>

                            <button
                                onClick={() => setQuantity(Math.min(gift.stock, quantity + 1))}
                                disabled={quantity >= gift.stock}
                                className="border rounded px-4 py-2 disabled:opacity-40"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={gift.stock < 1 || uploading}
                                className="gift-btn flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <FaShoppingBag /> Add to Cart
                            </button>

                            <button
                                onClick={() => toggleWishlist({
                                    ...gift,
                                    id: gift._id,
                                    image: imageUrl
                                })}
                                className="border border-rose-700 text-rose-700 px-5 rounded-lg"
                            >
                                <FaHeart className={isWishlisted ? 'text-rose-700' : ''} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default View
