import * as React from 'react'
import { useHistory } from 'react-router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getStock, submitOrder } from '../../lib/api'
import useShoppingCart from '../../hooks/useShoppingCart'
import PageHeader from '../atoms/PageHeader'
import Button from '../atoms/Button'
import BottomBar from '../atoms/BottomBar'
import MainContent from '../atoms/MainContent'
import Loading from '../atoms/Loading'
import CartItem from '../molecules/CartItem'

export default function Home() {
  const history = useHistory()

  const queryClient = useQueryClient()
  const stockQuery = useQuery('stock', getStock)

  const {
    total,
    cart,
    increment,
    decrement,
    getItemsInCart,
    resetCart,
    getRemainingStock,
  } = useShoppingCart(stockQuery.data?.data.storage ?? [])

  const orderMutation = useMutation(submitOrder, {
    onSuccess: () => {
      resetCart()
      queryClient.invalidateQueries('stock')
      history.push({ pathname: '/success' })
    },
  })

  const bottomBar = React.useRef<HTMLDivElement>(null)

  return (
    <React.Fragment>
      <MainContent
        bottomBarHeight={
          bottomBar.current
            ? getComputedStyle(bottomBar.current).height
            : undefined
        }
      >
        <div className="mb-4">
          <PageHeader>My Order</PageHeader>
        </div>

        {stockQuery.error && (
          <div className="bg-red-500 text-white font-medium text-lg py-2 px-3">
            Fatal error! Could not fetch stock data!
          </div>
        )}

        {stockQuery.isLoading && <Loading />}

        {stockQuery?.data &&
          stockQuery.data.data.storage.map((item, idx) => (
            <CartItem
              item={item}
              key={item.name}
              isLast={idx + 1 === stockQuery?.data.data.storage.length}
              addItem={increment(item.name)}
              removeItem={decrement(item.name)}
              count={getItemsInCart(item.name)}
              remainingStock={getRemainingStock(item.name)}
            />
          ))}
      </MainContent>
      <BottomBar ref={bottomBar}>
        <div className="flex justify-between items-baseline w-full mb-4">
          <h4 className="font-semibold text-base">Total</h4>
          <h5 className="font-bold text-xl">
            $&nbsp;<span data-testid="total-due">{total.toFixed(2)}</span>
          </h5>
        </div>
        <Button
          isDisabled={!cart.length}
          isLoading={orderMutation.isLoading}
          action={cart.length ? () => orderMutation.mutate(cart) : undefined}
        >
          Order
        </Button>
        {orderMutation.isError && (
          <h5 className="text-red-600 font-medium text-xs mt-3">
            Your order did not go through! Please try again!
          </h5>
        )}
      </BottomBar>
    </React.Fragment>
  )
}
