import * as React from 'react'
import type { TChildren } from '../../types'

type Props = TChildren

const BottomBar = React.forwardRef<HTMLDivElement, TChildren>(
  function BottomBar(props: Props, ref) {
    return (
      <div
        ref={ref}
        className="fixed z-50 w-full bottom-0 pt-4 pb-6 px-5 bg-white border-t border-gray-200 rounded-xl shadow-xl"
      >
        {props.children}
      </div>
    )
  }
)
export default BottomBar
