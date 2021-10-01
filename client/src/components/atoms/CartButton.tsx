import cn from 'classnames'
import { TChildren } from '../../types'

type Props = {
  /** decides whether the HTML button will have the disabled attribute */
  disabled: boolean
  /** decides whether to apply styling based on the `disabled:` pseudo selector */
  disabledStyle: boolean
  action: (e: React.SyntheticEvent<HTMLButtonElement, Event>) => void
  ariaLabel: string
  testId: string
} & TChildren

export default function CartButton({
  disabled,
  action,
  ariaLabel,
  disabledStyle,
  children,
  testId,
}: Props) {
  return (
    <button
      data-testid={testId}
      aria-label={ariaLabel}
      onClick={action}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center rounded-full w-9 h-9 bg-gray-300 text-gray-800 ',
        {
          'disabled:opacity-50': disabledStyle,
        }
      )}
    >
      {children}
    </button>
  )
}
