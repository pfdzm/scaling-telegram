import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { OrderPayload, StockResponse } from '../types'

export function submitOrder(
  items: OrderPayload[]
): Promise<AxiosResponse<{ success: boolean }>> {
  return axios.post('/api/order', { items })
}

export function getStock(): Promise<AxiosResponse<StockResponse>> {
  return axios.get('/api/storage')
}
