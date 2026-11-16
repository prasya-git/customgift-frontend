
import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
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

    // Prevent empty or whitespace-only values
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

      // apiService returns an error object instead of throwing
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

  return (
    <>
      <Header />

      <section className="bg-[#f8e7e9] text-center py-16">
        <h1 className="text-5xl font-bold">Contact Us</h1>

        <p className="text-gray-600 mt-4">
          We would love to hear from you.
        </p>
      </section>

      <section className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12">

        <div>
          <h2 className="text-3xl font-bold mb-5">
            Let's Talk About Gifts!
          </h2>

          <p className="text-gray-500 leading-7 mb-8">
            Have a question about customization, an order or delivery?
            Send us a message and our team will be happy to help.
          </p>

          <div className="space-y-6">

            <div className="flex gap-4 items-center">
              <div className="bg-rose-100 text-rose-700 p-4 rounded-full">
                <FaPhone />
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-rose-100 text-rose-700 p-4 rounded-full">
                <FaEnvelope />
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-500">hello@giftora.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-rose-100 text-rose-700 p-4 rounded-full">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-500">Kerala, India</p>
              </div>
            </div>

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold">Send a Message</h2>

          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border rounded-lg p-3"
          />

          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Write your message..."
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="gift-btn w-full disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

        </form>

      </section>
    </>
  )
}

export default Contact
