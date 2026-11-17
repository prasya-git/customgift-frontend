
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaGift,
    FaUser,
    FaLock,
    FaEnvelope,
    FaArrowLeft,
    FaHeart
} from 'react-icons/fa'
import apiService from '../api/apiService'

function Auth({ insideRegister = false }) {

    const [isRegister, setIsRegister] = useState(insideRegister)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {

            if (isRegister) {

                const reqBody = {
                    username: form.name,
                    email: form.email,
                    password: form.password
                }

                const response = await apiService(
                    'POST',
                    '/register',
                    reqBody
                )

                if (response?.response) {
                    throw response
                }

                alert('Registration successful! Please login.')

                setForm({
                    name: '',
                    email: '',
                    password: ''
                })

                navigate('/login')

            } else {

                const reqBody = {
                    email: form.email,
                    password: form.password
                }

                const response = await apiService(
                    'POST',
                    '/login',
                    reqBody
                )

                if (response?.response) {
                    throw response
                }

                const { token, user } = response.data

                sessionStorage.setItem('token', token)

                const loggedUser = {
                    ...user,
                    name: user.username
                }

                localStorage.setItem(
                    'giftUser',
                    JSON.stringify(loggedUser)
                )

                alert('Login successful!')

                if (user.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/profile')
                }
            }

        } catch (error) {

            console.log('Authentication Error:', error)

            const errorMessage =
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                'Something went wrong. Please try again.'

            alert(errorMessage)

        } finally {
            setLoading(false)
        }
    }

    const inputStyle = "w-full py-3 px-3 bg-transparent outline-none text-[#3b202b] placeholder:text-[#b69aa4] text-sm"

    const labelStyle = "block text-sm font-semibold text-[#54313e] mb-2"

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-[#fff9fa]">

            {/* Left Image Section */}
            <div className="hidden md:block relative min-h-screen overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000"
                    alt="Beautiful gift boxes"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[#291d20]/85 via-[#542536]/65 to-[#872d4c]/50" />

                <div className="relative z-10 h-full flex flex-col justify-between p-10 lg:p-14 text-white">

                    <Link to="/" className="flex items-center gap-3 w-fit">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FaGift className="text-2xl" />
                        </div>

                        <span className="text-2xl font-bold tracking-wider">
                            GIFTORA
                        </span>
                    </Link>

                    <div className="max-w-lg">

                        <div className="flex gap-2 text-[#ffc5d5] text-xl mb-5">
                            <FaHeart />
                            <FaHeart />
                            <FaHeart />
                        </div>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                            Make Every Moment Special
                        </h1>

                        <p className="text-white/85 text-base lg:text-lg mt-6 leading-8">
                            Find thoughtful gifts, add your personal touch,
                            and create beautiful memories with GIFTORA.
                        </p>

                        <div className="mt-9 flex items-center gap-3">

                            <div className="w-12 h-1 bg-[#f5b8ca] rounded-full" />
                            <div className="w-5 h-1 bg-white/50 rounded-full" />
                            <div className="w-5 h-1 bg-white/50 rounded-full" />

                        </div>

                    </div>

                    <p className="text-sm text-white/70">
                        A little gift, a lot of happiness.
                    </p>

                </div>

            </div>

            {/* Right Form Section */}
            <div className="flex items-center justify-center px-5 py-10 sm:px-8 md:px-10 lg:px-14">

                <div className="bg-white rounded-3xl border border-[#f2e3e8] shadow-xl shadow-[#872d4c]/5 p-7 sm:p-9 md:p-10 w-full max-w-lg">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[#872d4c] mb-8"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#fbe8ed] flex items-center justify-center">
                            <FaGift className="text-xl" />
                        </div>

                        <span className="text-2xl font-extrabold tracking-wide">
                            GIFTORA
                        </span>
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">

                        <h1 className="text-3xl sm:text-4xl font-bold text-[#3b202b]">
                            {isRegister ? 'Create Account' : 'Welcome Back!'}
                        </h1>

                        <p className="text-[#987985] text-sm sm:text-base mt-3 leading-6">
                            {isRegister
                                ? 'Join GIFTORA and make gifting more special.'
                                : 'Login to continue your shopping journey.'}
                        </p>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        {isRegister && (

                            <div>
                                <label className={labelStyle}>
                                    Full Name
                                </label>

                                <div className="flex items-center border border-[#ead7df] rounded-xl px-3 focus-within:border-[#a64d6d] focus-within:ring-2 focus-within:ring-[#fbe8ed] transition-all">

                                    <FaUser className="text-[#b69aa4]" />

                                    <input
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={inputStyle}
                                    />

                                </div>
                            </div>

                        )}

                        {/* Email */}
                        <div>
                            <label className={labelStyle}>
                                Email Address
                            </label>

                            <div className="flex items-center border border-[#ead7df] rounded-xl px-3 focus-within:border-[#a64d6d] focus-within:ring-2 focus-within:ring-[#fbe8ed] transition-all">

                                <FaEnvelope className="text-[#b69aa4]" />

                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={inputStyle}
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelStyle}>
                                Password
                            </label>

                            <div className="flex items-center border border-[#ead7df] rounded-xl px-3 focus-within:border-[#a64d6d] focus-within:ring-2 focus-within:ring-[#fbe8ed] transition-all">

                                <FaLock className="text-[#b69aa4]" />

                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className={inputStyle}
                                />

                            </div>
                        </div>

                        {/* Account Type */}
                        {isRegister && (

                            <div>

                                <label className={labelStyle}>
                                    Account Type
                                </label>

                                <select
                                    value="customer"
                                    disabled
                                    className="w-full border border-[#ead7df] rounded-xl p-3 bg-[#f8f3f5] text-[#987985] outline-none cursor-not-allowed"
                                >
                                    <option value="customer">
                                        Customer
                                    </option>
                                </select>

                                <p className="text-xs text-[#a1848e] mt-2">
                                    Admin accounts are created separately by the system administrator.
                                </p>

                            </div>

                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#872d4c] hover:bg-[#682139] text-white py-3.5 rounded-xl font-bold shadow-md shadow-[#872d4c]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >

                            {loading
                                ? 'Please wait...'
                                : isRegister
                                    ? 'Create Account'
                                    : 'Login'
                            }

                        </button>

                    </form>

                    {/* Switch Login / Register */}
                    <div className="text-center mt-7 text-sm text-[#987985]">

                        {isRegister
                            ? 'Already have an account?'
                            : "Don't have an account?"
                        }

                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister)
                                navigate(isRegister ? '/login' : '/register')
                            }}
                            className="text-[#872d4c] font-bold ml-2 hover:text-[#bd5275] transition"
                        >
                            {isRegister ? 'Login' : 'Register'}
                        </button>

                    </div>

                    {/* Back Home */}
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-sm text-[#987985] hover:text-[#872d4c] mt-7 transition"
                    >
                        <FaArrowLeft className="text-xs" />
                        Back to Home
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Auth
