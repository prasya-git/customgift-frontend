
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaBox, FaHeart, FaSignOutAlt } from 'react-icons/fa'

import Header from '../components/Header'
import Purchase from '../components/Purchase'
import Edit from '../components/Edit'
import apiService from '../../api/apiService'

function Profile() {

    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('giftUser')) || null
    )

    const [orders, setOrders] = useState([])
    const [activeTab, setActiveTab] = useState('orders')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch profile and order details from backend
    useEffect(() => {
        const fetchAccountData = async () => {

            const token = sessionStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

            try {
                const [profileResponse, ordersResponse] = await Promise.all([
                    apiService('GET', '/user-profile'),
                    apiService('GET', '/user-orders')
                ])

                if (profileResponse?.response) throw profileResponse
                if (ordersResponse?.response) throw ordersResponse

                const profileData = profileResponse.data

                const updatedUser = {
                    ...profileData,
                    name: profileData.username || profileData.name
                }

                setUser(updatedUser)
                localStorage.setItem('giftUser', JSON.stringify(updatedUser))

                setOrders(
                    Array.isArray(ordersResponse.data)
                        ? ordersResponse.data
                        : []
                )

            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Unable to load your account details'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchAccountData()
    }, [])

    const logout = () => {
        sessionStorage.removeItem('token')
        localStorage.removeItem('giftUser')
        navigate('/login')
    }

    if (!sessionStorage.getItem('token')) {
        return (
            <>
                <Header />
                <div className="text-center py-28">
                    <h2 className="text-3xl font-bold">
                        Please Login First
                    </h2>
                    <Link to="/login" className="gift-btn inline-block mt-6">
                        Login
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <section className="px-6 md:px-16 py-12">

                {location.state?.orderPlaced && (
                    <div className="bg-green-100 text-green-800 p-5 rounded-xl mb-8">
                        Your order was placed successfully!
                        <p className="text-sm mt-1">
                            Order ID: {location.state.orderId}
                        </p>
                    </div>
                )}

                <h1 className="text-4xl font-bold mb-8">
                    My Account
                </h1>

                {loading ? (
                    <div className="text-center py-20 text-rose-700">
                        Loading your account...
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="gift-btn mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 gap-7">

                        <div className="bg-white shadow-sm rounded-2xl p-6 h-fit">

                            <div className="text-center">
                                <div className="w-24 h-24 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-4xl mx-auto">
                                    <FaUser />
                                </div>

                                <h2 className="text-xl font-semibold mt-4">
                                    {user?.name || user?.username}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {user?.email}
                                </p>
                            </div>

                            <hr className="my-6" />

                            <div className="flex flex-col gap-3">

                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`p-3 rounded-lg flex items-center gap-3 ${
                                        activeTab === 'orders'
                                            ? 'bg-rose-100 text-rose-700'
                                            : ''
                                    }`}
                                >
                                    <FaBox /> My Orders
                                </button>

                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`p-3 rounded-lg flex items-center gap-3 ${
                                        activeTab === 'profile'
                                            ? 'bg-rose-100 text-rose-700'
                                            : ''
                                    }`}
                                >
                                    <FaUser /> Edit Profile
                                </button>

                                <Link
                                    to="/wishlist"
                                    className="p-3 rounded-lg flex items-center gap-3"
                                >
                                    <FaHeart /> My Wishlist
                                </Link>

                                <button
                                    onClick={logout}
                                    className="p-3 rounded-lg flex items-center gap-3 text-red-600"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>

                            </div>
                        </div>

                        <div className="md:col-span-3">

                            {activeTab === 'orders' && (
                                <>
                                    <h2 className="text-2xl font-semibold mb-6">
                                        My Orders ({orders.length})
                                    </h2>

                                    <Purchase orders={orders} />
                                </>
                            )}

                            {activeTab === 'profile' && (
                                <>
                                    <h2 className="text-2xl font-semibold mb-6">
                                        Profile Information
                                    </h2>

                                    <Edit
                                    user={user}
                                    onUpdate={setUser}
                                  />
                                </>
                            )}

                        </div>
                    </div>
                )}

            </section>
        </>
    )
}

export default Profile
