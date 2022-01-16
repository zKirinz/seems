import { useState, Fragment } from 'react'

import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import ImageItem from './ImageItem'
import Pagination from './Pagination'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Carousel = ({ imageList }) => {
    const [index, setIndex] = useState(0)

    return (
        <Fragment>
            <AutoPlaySwipeableViews index={index} onChangeIndex={(index) => setIndex(index)}>
                {imageList.map(({ src, size }, index) => (
                    <ImageItem key={index} src={src} size={size} />
                ))}
            </AutoPlaySwipeableViews>
            <Pagination
                dots={imageList.length}
                index={index}
                onChangeIndex={(index) => setIndex(index)}
            />
        </Fragment>
    )
}

export default Carousel
