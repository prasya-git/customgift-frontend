
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
    FaCheckCircle,
    FaTimesCircle,
    FaGift,
    FaShoppingBag,
    FaArrowRight
} from 'react-icons/fa'
import { useGift } from '../../context/GiftContext'
import apiService from '../../api/apiService'

function PaymentSuccess() {

    const [searchParams] = useSearchParams()
    const { setCart } = useGift()

    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('Verifying your payment...')
    const [verified, setVerified] = useState(false)

    useEffect(() => {

        const verifyPayment = async () => {

            const sessionId = searchParams.get('session_id')

            if (!sessionId) {
                setMessage('Payment session was not found.')
                setLoading(false)
                return
            }

            try {
                const response = await apiService(
                    'GET',
                    `/verify-payment/${sessionId}`
                )

                if (response?.response) {
                    throw new Error(
                        response.response.data?.message ||
                        'Payment verification failed'
                    )
                }

                if (response?.data?.success) {
                    setCart([])
                    sessionStorage.removeItem('giftCheckoutForm')
                    setVerified(true)
                    setMessage('Your payment was successful!')
                } else {
                    setMessage(
                        response?.data?.message ||
                        'Your payment could not be verified.'
                    )
                }

            } catch (error) {
                setMessage(
                    error.message || 'Unable to verify your payment.'
                )
            } finally {
                setLoading(false)
            }
        }

        verifyPayment()

    }, [searchParams, setCart])

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-5 py-14 bg-gradient-to-br from-pink-50 via-white to-rose-100">

            <div className="bg-white shadow-xl shadow-pink-100 rounded-3xl p-8 md:p-10 max-w-lg w-full text-center border border-pink-100">

                {/* GIFTORA Logo */}
                <div className="flex items-center justify-center gap-2 mb-7">
                    <FaGift className="text-pink-600 text-2xl" />
                    <span className="text-xl font-extrabold tracking-wider text-[#38232b]">
                        GIFTORA
                    </span>
                </div>

                {loading ? (

                    <>
                        <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-6">
                            <div className="animate-spin rounded-full h-14 w-14 border-4 border-pink-200 border-t-pink-600"></div>
                        </div>

                        <h2 className="text-2xl font-extrabold text-[#38232b]">
                            Verifying Payment
                        </h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            {message}
                        </p>

                        <p className="text-sm text-pink-600 mt-5 font-medium">
                            Please wait. Do not close this page.
                        </p>
                    </>

                ) : verified ? (

                    <>
                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-green-500 text-6xl" />
                        </div>

                        <p className="text-green-600 text-sm font-bold uppercase tracking-[3px] mb-2">
                            Order Confirmed
                        </p>

                        <h2 className="text-3xl font-extrabold text-[#38232b]">
                            Payment Successful!
                        </h2>

                        <p className="text-gray-500 mt-4 leading-7">
                            {message} Thank you for shopping with GIFTORA.
                            Your customized gifts are getting ready!
                        </p>

                        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                            <p className="text-green-700 text-sm font-medium">
                                <FaCheckCircle className="inline mr-2" />
                                Your order has been placed successfully.
                            </p>
                        </div>

                        <Link
                            to="/profile"
                            className="flex items-center justify-center gap-2 mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-pink-200 transition duration-300 hover:-translate-y-1"
                        >
                            <FaShoppingBag />
                            View My Orders
                            <FaArrowRight />
                        </Link>

                        <Link
                            to="/gifts"
                            className="inline-block mt-4 text-pink-600 hover:text-pink-800 font-semibold text-sm transition"
                        >
                            Continue Shopping
                        </Link>
                    </>

                ) : (

                    <>
                        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                            <FaTimesCircle className="text-red-500 text-6xl" />
                        </div>

                        <p className="text-red-500 text-sm font-bold uppercase tracking-[3px] mb-2">
                            Verification Failed
                        </p>

                        <h2 className="text-3xl font-extrabold text-[#38232b]">
                            Payment Not Verified
                        </h2>

                        <p className="text-gray-500 mt-4 leading-7">
                            {message}
                        </p>

                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-red-600 text-sm">
                                Your payment could not be confirmed. Please
                                check your order status before trying again.
                            </p>
                        </div>

                        <Link
                            to="/profile"
                            className="flex items-center justify-center gap-2 mt-8 w-full bg-[#38232b] hover:bg-[#51323d] text-white font-semibold px-6 py-3.5 rounded-xl transition duration-300 hover:-translate-y-1"
                        >
                            <FaShoppingBag />
                            View My Orders
                            <FaArrowRight />
                        </Link>
                    </>

                )}

                <p className="text-xs text-gray-400 mt-8">
                    Thank you for choosing GIFTORA ❤️
                </p>

            </div>

        </div>
    )
}

export default PaymentSuccess
