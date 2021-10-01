import type { ReactNode } from 'react'

export type TChildren = {
  children: ReactNode
}

export type StockResponse = {
  storage: StockItem[]
}

export type StockItem = { name: string; stock: number; price: number }

export type OrderPayload = { name: string; quantity: number }
