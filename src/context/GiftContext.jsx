
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

    // Add gift to cart
    const addToCart = (gift) => {
        const giftId = String(gift.id || gift._id)

        const newGift = {
            ...gift,
            id: giftId,
            quantity: gift.quantity || 1
        }

        setCart(prev => {
            const existing = prev.find(item =>
                String(item.id || item._id) === giftId &&
                item.customName === gift.customName &&
                item.message === gift.message &&
                item.photo === gift.photo
            )

            if (existing) {
                return prev.map(item =>
                    String(item.id || item._id) === giftId &&
                    item.customName === gift.customName &&
                    item.message === gift.message &&
                    item.photo === gift.photo
                        ? {
                            ...item,
                            quantity: item.quantity + newGift.quantity
                        }
                        : item
                )
            }

            return [...prev, newGift]
        })
    }

    // Remove gift from cart
    const removeFromCart = (id) => {
        setCart(prev =>
            prev.filter(item => String(item.id || item._id) !== String(id))
        )
    }

    // Update cart quantity
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return

        setCart(prev =>
            prev.map(item =>
                String(item.id || item._id) === String(id)
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    // Add or remove gift from wishlist
    const toggleWishlist = (gift) => {
        const giftId = String(gift.id || gift._id)

        const newGift = {
            ...gift,
            id: giftId
        }

        setWishlist(prev => {
            const exists = prev.some(
                item => String(item.id || item._id) === giftId
            )

            return exists
                ? prev.filter(
                    item => String(item.id || item._id) !== giftId
                )
                : [...prev, newGift]
        })
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

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
