
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
    FaTimesCircle,
    FaShoppingBag,
    FaArrowLeft,
    FaGift
} from 'react-icons/fa'
import apiService from '../../api/apiService'

function PaymentFailed() {

    const [searchParams] = useSearchParams()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const cancelSession = async () => {

            const sessionId = searchParams.get('session_id')

            if (!sessionId) {
                setLoading(false)
                return
            }

            try {
                const response = await apiService(
                    'POST',
                    `/cancel-checkout/${sessionId}`
                )

                if (response?.response) {
                    setMessage(
                        response.response.data?.message ||
                        'Unable to cancel the checkout session.'
                    )
                }
            } catch (error) {
                setMessage(
                    'Something went wrong while processing your payment status.'
                )
            } finally {
                setLoading(false)
            }
        }

        cancelSession()

    }, [searchParams])

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-5 py-14 bg-gradient-to-br from-pink-50 via-white to-rose-100">

            <div className="bg-white shadow-xl shadow-pink-100 rounded-3xl p-8 md:p-10 max-w-lg w-full text-center border border-pink-100">

                {/* Icon */}
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-red-50 rounded-full">
                    <FaTimesCircle className="text-red-500 text-6xl" />
                    <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow">
                        <FaGift className="text-pink-600 text-xl" />
                    </span>
                </div>

                {/* Heading */}
                <p className="text-pink-600 text-sm font-bold uppercase tracking-[3px] mb-2">
                    GIFTORA
                </p>

                <h2 className="text-3xl font-extrabold text-[#38232b]">
                    Payment Cancelled
                </h2>

                <p className="text-gray-500 mt-4 leading-7">
                    Your payment was not completed. Don't worry! Your cart items
                    are still saved. You can return to checkout and try again.
                </p>

                {/* Status */}
                {loading ? (
                    <div className="mt-5 flex items-center justify-center gap-2 text-pink-600 text-sm font-medium">
                        <span className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></span>
                        Checking payment status...
                    </div>
                ) : message ? (
                    <div className="mt-5 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        {message}
                    </div>
                ) : (
                    <div className="mt-5 p-3 bg-pink-50 border border-pink-100 rounded-xl text-sm text-pink-700">
                        You can safely try your payment again.
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">

                    <Link
                        to="/checkout"
                        className="flex-1 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-pink-200 transition duration-300 hover:-translate-y-1"
                    >
                        <FaShoppingBag />
                        Return to Checkout
                    </Link>

                    <Link
                        to="/gifts"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#38232b] hover:bg-[#51323d] text-white font-semibold px-6 py-3.5 rounded-xl transition duration-300 hover:-translate-y-1"
                    >
                        <FaArrowLeft />
                        Browse Gifts
                    </Link>

                </div>

                <p className="text-xs text-gray-400 mt-7">
                    Need help? Contact our support team.
                </p>

            </div>

        </div>
    )
}

export default PaymentFailed
