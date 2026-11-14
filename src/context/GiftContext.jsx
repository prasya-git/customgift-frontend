import { createContext, useContext, useEffect, useState } from 'react'

const GiftContext = createContext()

export const useGift = () => useContext(GiftContext)

export function GiftProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('giftCart')) || []
  })

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('giftWishlist')) || []
  })

  useEffect(() => {
    localStorage.setItem('giftCart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('giftWishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (gift) => {
  setCart(prev => {
    const existing = prev.find(
      item =>
        item.id === gift.id &&
        item.customName === gift.customName &&
        item.message === gift.message
    )

    if (existing) {
      return prev.map(item =>
        item.id === gift.id &&
        item.customName === gift.customName &&
        item.message === gift.message
          ? { ...item, quantity: item.quantity + (gift.quantity || 1) }
          : item
      )
    }

    return [...prev, { ...gift, quantity: gift.quantity || 1 }]
  })
}

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return

    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const toggleWishlist = (gift) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === gift.id)

      return exists
        ? prev.filter(item => item.id !== gift.id)
        : [...prev, gift]
    })
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <GiftContext.Provider value={{
      cart,
      setCart,
      wishlist,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist
    }}>
      {children}
    </GiftContext.Provider>
  )
}