
import React, { useState } from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGift,
  FaHeadset
} from 'react-icons/fa'
import Header from '../components/Header'
import apiService from '../../api/apiService'

function Contact() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      setLoading(true)

      const response = await apiService(
        'POST',
        '/contact',
        {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim()
        }
      )

      if (response?.response) {
        throw response
      }

      alert(
        response.data?.message ||
        'Thank you! Your message has been submitted.'
      )

      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

    } catch (error) {

      console.log('Contact API Error:', error)

      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response.data
          : error.response?.data?.message ||
            'Unable to send your message. Please try again.'

      alert(errorMessage)

    } finally {
      setLoading(false)
    }
  }

  const inputStyle = "w-full px-4 py-3.5 rounded-xl border border-[#ead5dc] bg-[#fffafb] text-[#3b202b] placeholder:text-[#b69aa4] outline-none focus:border-[#a94b6c] focus:ring-2 focus:ring-[#f7dce5] transition-all duration-300"

  const labelStyle = "block text-sm font-semibold text-[#684452] mb-2"

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#fbe8ed] via-[#f8e7e9] to-[#f4dce5] px-6 py-20 md:py-24 text-center">

        <div className="absolute top-5 left-10 text-[#e8bdcb] text-5xl opacity-50">
          <FaGift />
        </div>

        <div className="absolute bottom-5 right-12 text-[#e8bdcb] text-5xl opacity-50">
          <FaHeartIcon />
        </div>

        <div className="relative z-10">
          <span className="inline-block bg-white/70 text-[#872d4c] px-5 py-2 rounded-full text-sm font-semibold mb-5">
            We'd Love To Hear From You
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3b202b]">
            Contact Us
          </h1>

          <p className="text-[#8c6573] mt-5 text-base md:text-lg max-w-xl mx-auto leading-7">
            Have a question or need help? We're always happy to make your gifting experience special.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#fff9fa] px-5 md:px-12 lg:px-16 py-14 md:py-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Contact Information */}
          <div className="pt-2">

            <span className="text-sm font-bold tracking-widest uppercase text-[#b45b78]">
              Get In Touch
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#3b202b] mt-3 mb-5">
              Let's Talk About Gifts!
            </h2>

            <p className="text-[#987985] leading-8 mb-9">
              Have a question about customization, an order or delivery?
              Send us a message and our team will be happy to help.
              We are here to make every gift memorable.
            </p>

            <div className="space-y-5">

              {/* Phone */}
              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-[#f2e2e7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-[#fbe8ed] text-[#872d4c] rounded-2xl flex items-center justify-center text-xl">
                  <FaPhone />
                </div>

                <div>
                  <h3 className="font-bold text-[#3b202b] text-lg">
                    Phone
                  </h3>
                  <p className="text-[#987985] mt-1">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-[#f2e2e7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-[#fbe8ed] text-[#872d4c] rounded-2xl flex items-center justify-center text-xl">
                  <FaEnvelope />
                </div>

                <div>
                  <h3 className="font-bold text-[#3b202b] text-lg">
                    Email
                  </h3>
                  <p className="text-[#987985] mt-1">
                    hello@giftora.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-[#f2e2e7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-[#fbe8ed] text-[#872d4c] rounded-2xl flex items-center justify-center text-xl">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h3 className="font-bold text-[#3b202b] text-lg">
                    Location
                  </h3>
                  <p className="text-[#987985] mt-1">
                    Kerala, India
                  </p>
                </div>
              </div>

            </div>

            {/* Support Banner */}
            <div className="mt-8 bg-gradient-to-r from-[#872d4c] to-[#ad5877] rounded-2xl p-6 text-white flex items-center gap-5 shadow-lg">
              <div className="w-14 h-14 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                <FaHeadset />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  We're Here to Help!
                </h3>
                <p className="text-white/80 text-sm mt-1 leading-6">
                  Your happiness is our priority. Let us help you find the perfect gift.
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#f2e2e7] p-6 md:p-9">

            <div className="mb-7">
              <div className="w-14 h-14 bg-[#fbe8ed] text-[#872d4c] rounded-2xl flex items-center justify-center text-2xl mb-4">
                <FaPaperPlane />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#3b202b]">
                Send a Message
              </h2>

              <p className="text-[#a1848e] mt-2 text-sm">
                Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className={labelStyle}>
                  Your Name <span className="text-rose-600">*</span>
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Email Address <span className="text-rose-600">*</span>
                </label>

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

              <div>
                <label className={labelStyle}>
                  Subject
                </label>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Your Message <span className="text-rose-600">*</span>
                </label>

                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..."
                  className={`${inputStyle} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#872d4c] text-white font-bold text-base shadow-md hover:bg-[#682139] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#b69aa4]">
                Thank you for choosing GIFTORA!
              </p>

            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default Contact

function FaHeartIcon() {
  return <span>♡</span>
}
