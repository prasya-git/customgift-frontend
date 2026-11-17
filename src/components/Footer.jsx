
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaGift,
    FaInstagram,
    FaFacebookF,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaHeart,
    FaArrowRight
} from 'react-icons/fa'
import apiService from '../api/apiService'

function Footer() {

    const [settings, setSettings] = useState({
        storeName: 'GIFTORA',
        email: '',
        phone: ''
    })

    useEffect(() => {

        const fetchSettings = async () => {

            try {

                const response = await apiService(
                    'GET',
                    '/settings'
                )

                if (response?.response) {
                    throw response
                }

                setSettings({
                    storeName: response.data.storeName || 'GIFTORA',
                    email: response.data.email || '',
                    phone: response.data.phone || ''
                })

            } catch (error) {

                console.error('Footer settings error:', error)

            }

        }

        fetchSettings()

    }, [])

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop Gifts', path: '/gifts' },
        { name: 'Wishlist', path: '/wishlist' },
        { name: 'Shopping Cart', path: '/cart' },
        { name: 'Contact Us', path: '/contact' }
    ]

    const serviceLinks = [
        { name: 'My Account', path: '/profile' },
        { name: 'My Orders', path: '/profile' },
        { name: 'Help & Support', path: '/contact' },
        { name: 'Delivery Information', path: '/contact' }
    ]

    return (
        <footer className="bg-[#291d20] text-white overflow-hidden">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-14 md:pt-16 pb-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Section */}
                    <div>

                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-[#872d4c] flex items-center justify-center group-hover:bg-[#a94769] transition-all duration-300">
                                <FaGift className="text-white text-2xl" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-wide">
                                {settings.storeName}
                            </h2>
                        </Link>

                        <p className="text-[#d3c3c7] mt-6 leading-8 text-sm">
                            Making every celebration more memorable with thoughtful,
                            personalized gifts made with love. Because every special
                            moment deserves a special gift.
                        </p>

                        <div className="mt-7">
                            <h4 className="text-sm font-semibold text-white mb-4">
                                Follow Us
                            </h4>

                            <div className="flex gap-3">

                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg text-white hover:bg-[#872d4c] hover:-translate-y-1 transition-all duration-300"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg text-white hover:bg-[#872d4c] hover:-translate-y-1 transition-all duration-300"
                                >
                                    <FaFacebookF />
                                </a>

                                {settings.email && (
                                    <a
                                        href={`mailto:${settings.email}`}
                                        aria-label="Email"
                                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg text-white hover:bg-[#872d4c] hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <FaEnvelope />
                                    </a>
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-lg font-bold mb-7 relative">
                            Quick Links
                            <span className="absolute left-0 -bottom-3 w-10 h-1 rounded-full bg-[#d66b8c]"></span>
                        </h3>

                        <div className="flex flex-col gap-4">

                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="flex items-center gap-2 text-[#d3c3c7] text-sm hover:text-[#f2a9c0] hover:translate-x-1 transition-all duration-300"
                                >
                                    <FaArrowRight className="text-[10px] text-[#d66b8c]" />
                                    {link.name}
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* Customer Service */}
                    <div>

                        <h3 className="text-lg font-bold mb-7 relative">
                            Customer Service
                            <span className="absolute left-0 -bottom-3 w-10 h-1 rounded-full bg-[#d66b8c]"></span>
                        </h3>

                        <div className="flex flex-col gap-4">

                            {serviceLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="flex items-center gap-2 text-[#d3c3c7] text-sm hover:text-[#f2a9c0] hover:translate-x-1 transition-all duration-300"
                                >
                                    <FaArrowRight className="text-[10px] text-[#d66b8c]" />
                                    {link.name}
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* Contact Information */}
                    <div>

                        <h3 className="text-lg font-bold mb-7 relative">
                            Get in Touch
                            <span className="absolute left-0 -bottom-3 w-10 h-1 rounded-full bg-[#d66b8c]"></span>
                        </h3>

                        <div className="space-y-5">

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 text-[#f2a9c0] flex items-center justify-center">
                                    <FaMapMarkerAlt />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-white">
                                        Our Location
                                    </h4>
                                    <p className="text-[#d3c3c7] text-sm mt-1">
                                        Kerala, India
                                    </p>
                                </div>
                            </div>

                            {settings.phone && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 text-[#f2a9c0] flex items-center justify-center">
                                        <FaPhone />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-white">
                                            Phone Number
                                        </h4>

                                        <a
                                            href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                                            className="text-[#d3c3c7] text-sm mt-1 block hover:text-[#f2a9c0] transition-colors"
                                        >
                                            {settings.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {settings.email && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 text-[#f2a9c0] flex items-center justify-center">
                                        <FaEnvelope />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-white">
                                            Email Address
                                        </h4>

                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="text-[#d3c3c7] text-sm mt-1 block break-all hover:text-[#f2a9c0] transition-colors"
                                        >
                                            {settings.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* Bottom Message */}
                <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-[#c5b2b8] text-sm text-center md:text-left">
                        © 2026 {settings.storeName}. All rights reserved.
                    </p>

                    <p className="flex items-center gap-2 text-[#c5b2b8] text-sm">
                        Made with
                        <FaHeart className="text-[#e77b9b]" />
                        for every special moment
                    </p>

                </div>

            </div>

        </footer>
    )
}

export default Footer
