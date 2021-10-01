import type { TChildren } from '../../types'

export default function PageHeader(props: TChildren) {
  return <h4 className="text-gray-800 font-semibold text-3xl">{props.children}</h4>
}
