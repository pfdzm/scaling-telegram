import * as React from 'react'
import { useHistory } from 'react-router'
import BottomBar from '../atoms/BottomBar'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import MainContent from '../atoms/MainContent'
import PageHeader from '../atoms/PageHeader'

export default function Home() {
  const history = useHistory()
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
          <PageHeader>Order received</PageHeader>
        </div>
        <div className="w-10/12 mx-auto flex-grow flex flex-col items-center justify-center container">
          <div className="w-10/12 mb-4 max-w-sm h-auto">
            <Image
              fill
              src="/assets/images/fireworks.png"
              alt="Fireworks"
            />
          </div>
          {/* <img
            className="w-10/12 mb-4 max-w-sm h-auto"
            src="/assets/images/fireworks.png"
            alt="Fireworks"
          /> */}
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">Thank you!</h2>
            <p className="text-gray-500 text-lg font-normal">
              We have successfully received your order.
            </p>
          </div>
        </div>
      </MainContent>

      <BottomBar ref={bottomBar}>
        <Button action={() => history.push({ pathname: '/' })}>
          Submit another order
        </Button>
      </BottomBar>
    </React.Fragment>
  )
}
