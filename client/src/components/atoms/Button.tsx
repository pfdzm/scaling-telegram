import * as React from 'react'
import cn from 'classnames'
import { TChildren } from '../../types'
import Loading from './Loading'

type Props = {
  isLoading?: boolean
  action?: (e?: React.SyntheticEvent<HTMLButtonElement>) => void
  isDisabled?: boolean
} & TChildren

export default function Button(props: Props) {
  return (
    <button
      disabled={props.isDisabled}
      onClick={props.action}
      className={cn(
        'w-full shadow-lg px-3 py-2 text-white font-medium text-lg rounded',
        {
          'bg-gradient-to-tr from-blue-400 to-blue-600': !props.isLoading,
          'bg-gradient-to-tr from-gray-400 to-gray-600': props.isLoading,
        }
      )}
    >
      {props.isLoading ? <Loading /> : props.children}
    </button>
  )
}
