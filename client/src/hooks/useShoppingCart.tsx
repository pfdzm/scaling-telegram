import * as React from 'react'
import type { OrderPayload, StockItem } from '../types'

export default function useShoppingCart(stock: StockItem[]) {
  const [cart, setCart] = React.useState<OrderPayload[]>([])
  const [total, setTotal] = React.useState<number>(0)

  const getItemsInCart = React.useCallback(
    (name: string) => cart.find((item) => item.name === name)?.quantity || 0,
    [cart]
  )

  const getItemIdx = React.useCallback(
    (name: string) => cart.findIndex((item) => item.name === name),
    [cart]
  )

  const getRemainingStock = React.useCallback(
    (name: string) => stock.find((item) => item.name === name)?.stock || 0,
    [stock]
  )

  const increment =
    (name: string) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const remainingStock = getRemainingStock(name)
      const count = getItemsInCart(name)
      if (!remainingStock) {
        console.warn('There is no stock remaining!')
      } else {
        if (count === 0) {
          setCart((s) => [...s, { name, quantity: 1 }])
        }
        if (0 < count && count < remainingStock) {
          const idx = getItemIdx(name)
          setCart((s) => [
            ...s.slice(0, idx),
            { name, quantity: s[idx].quantity + 1 },
            ...s.slice(idx + 1, s.length),
          ])
        }
      }
    }

  const decrement =
    (name: string) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const remainingStock = getRemainingStock(name)
      const itemIdx = cart.findIndex((item) => item.name === name)
      if (!remainingStock) {
        console.warn('There is no stock remaining!')
      } else {
        if (getItemsInCart(name) > 0) {
          const idx = getItemIdx(name)
          setCart((s) => {
            const count = s[idx].quantity - 1
            return count > 0
              ? [
                  ...s.slice(0, itemIdx),
                  {
                    name,
                    quantity: Math.max(0, s[idx].quantity - 1),
                  },
                  ...s.slice(itemIdx + 1, s.length),
                ]
              : [...s.slice(0, itemIdx), ...s.slice(itemIdx + 1, s.length)]
          })
        }
      }
    }

  React.useEffect(() => {
    if (stock) {
      const total = stock.reduce((prev, curr) => {
        const count = getItemsInCart(curr.name)
        const priceInCents = curr.price * 100
        const subtotal = Math.round(count * priceInCents)
        return prev + subtotal
      }, 0)
      setTotal(total / 100)
    }
  }, [stock, getItemsInCart])

  const resetCart = React.useCallback(() => setCart([]), [])

  return {
    increment,
    decrement,
    total,
    cart,
    resetCart,
    getItemsInCart,
    getRemainingStock,
  }
}
