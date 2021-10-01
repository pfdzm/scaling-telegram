import * as React from 'react'
import cn from 'classnames'
import Loading from './Loading'

type Props = {
  src: string
  alt: string
  fill?: boolean
}

/**
 * An image component that shows
 * a loading icon while the browser
 * is still downloading the image
 */
export default function Image({ src, alt, fill }: Props) {
  const [imgLoad, setImgLoad] = React.useState(true)
  return (
    <React.Fragment>
      {imgLoad && (
        <div
          className={cn(
            'flex-grow-0 flex-shrink-0 relative flex items-center justify-center',
            {
              'w-16 h-16': !fill,
            },
            {
              'h-full w-full inset-0': fill,
            }
          )}
        >
          <div className="inset-0 absolute">
            <Loading />
          </div>
        </div>
      )}
      <img
        onLoad={() => setImgLoad(false)}
        onError={() => setImgLoad(false)}
        className={cn('flex-grow-0 flex-shrink-0 rounded-full mr-4', {
          hidden: imgLoad,
          'w-16 h-16 ': !fill,
          'w-full h-auto ': fill,
        })}
        src={src}
        alt={alt}
      />
    </React.Fragment>
  )
}
