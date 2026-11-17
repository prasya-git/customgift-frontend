
import { Routes, Route } from 'react-router-dom'

import Home from './user/pages/Home'
import Gifts from './user/pages/Gifts'
import View from './user/pages/View'
import Cart from './user/pages/Cart'
import Checkout from './user/pages/Checkout'
import Contact from './user/pages/Contact'
import Profile from './user/pages/Profile'
import Wishlist from './user/pages/Wishlist'

import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFailed from './user/pages/PaymentFailed'

import Auth from './pages/Auth'
import Pnf from './pages/Pnf'

import AdminDashboard from './admin/pages/AdminDashboard'
import AdminResource from './admin/pages/AdminResource'
import AdminSettings from './admin/pages/AdminSettings'
import AdminOrders from './admin/pages/AdminOrders'
import AdminUsers from './admin/pages/AdminUsers'

import Footer from './components/Footer'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/:id" element={<View />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<AdminResource />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="*" element={<Pnf />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
