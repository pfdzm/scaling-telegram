import * as React from 'react'
import cn from 'classnames'
import type { StockItem } from '../../types'
import CartButton from '../atoms/CartButton'
import MinusIcon from '../atoms/MinusIcon'
import PlusIcon from '../atoms/PlusIcon'
import Image from '../atoms/Image'

type Props = {
  item: StockItem
  isLast: boolean
  addItem: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  removeItem: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  count: number
  remainingStock: number
}

export default function CartItem({
  item,
  isLast,
  addItem,
  removeItem,
  count,
  remainingStock,
}: Props) {
  return (
    <div
      data-testid={`container-${item.name}`}
      key={item.name}
      className={cn(
        'border-gray-200 container mx-auto flex items-center justify-between px-2 pt-4 pb-3',
        {
          'border-b': !isLast,
          'opacity-50': remainingStock === 0,
        }
      )}
    >
      <Image
        src={`/assets/images/${item.name.toLowerCase()}.png`}
        alt={item.name}
      />

      <div className="flex-grow flex-shrink-0">
        <h1 className="font-semibold text-lg leading-none">{item.name}</h1>
        <p className="text-sm text-gray-500">
          $&nbsp;
          <span data-testid={`price-${item.name}`}>
            {item.price.toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex-grow-0 flex items-center ml-auto space-x-3">
        <span data-testid={`count-${item.name}`} className="text-gray-800">
          {count}
        </span>

        <CartButton
          testId={`remove-${item.name}`}
          disabled={count === 0}
          disabledStyle={remainingStock > 0}
          action={removeItem}
          ariaLabel={`remove 1 ${item.name} from cart`}
        >
          <MinusIcon />
        </CartButton>

        <CartButton
          testId={`add-${item.name}`}
          disabled={count === remainingStock}
          disabledStyle={remainingStock > 0}
          action={addItem}
          ariaLabel={`add 1 ${item.name} from cart`}
        >
          <PlusIcon />
        </CartButton>
      </div>
    </div>
  )
}
