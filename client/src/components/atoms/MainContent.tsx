import type { TChildren } from '../../types'

type Props = { bottomBarHeight: string | undefined } & TChildren

export default function MainContent(props: Props) {
  return (
    <main
      style={{ paddingBottom: props.bottomBarHeight }}
      className="px-5 pt-8 min-h-screen flex flex-col"
    >
      {props.children}
    </main>
  )
}
