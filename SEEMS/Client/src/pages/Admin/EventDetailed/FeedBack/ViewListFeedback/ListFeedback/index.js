import React, { useEffect, useRef, useState } from 'react'

import chunk from 'chunk'
import InfiniteScroll from 'react-infinite-scroll-component'

import { InfoRounded } from '@mui/icons-material'
import { Alert, Box, CircularProgress } from '@mui/material'

import FeedbackItem from '../FeedbackItem'

const Loading = () => (
    <Box display="flex" justifyContent="center" my={3}>
        <CircularProgress thickness={4} color="secondary" />
    </Box>
)

const ListFeedback = ({ feedbacks }) => {
    const [cloneFeedbacks, setCloneFeedbacks] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [chunkArray, setChunkArray] = useState([])
    const index = useRef(1)

    const fetchMoreData = () => {
        if (cloneFeedbacks.length >= feedbacks.length) {
            setHasMore(false)
            return
        }

        setTimeout(() => {
            const fetchingArray = chunkArray[index.current]
            index.current++
            setCloneFeedbacks((previousValue) => [...previousValue, ...fetchingArray])
        }, 1000)
    }

    useEffect(() => {
        if (feedbacks.length > 0) {
            const splittingFeedbacks = chunk(feedbacks, 5)
            setCloneFeedbacks(splittingFeedbacks[0])
            setChunkArray(splittingFeedbacks)
        }
    }, [feedbacks])

    return (
        <React.Fragment>
            {feedbacks.length ? (
                <InfiniteScroll
                    dataLength={cloneFeedbacks.length}
                    loader={<Loading />}
                    hasMore={hasMore}
                    next={fetchMoreData}
                    scrollableTarget="scrollableDialog"
                >
                    {cloneFeedbacks.map((feedback) => (
                        <FeedbackItem
                            key={feedback.id}
                            content={feedback.content}
                            rating={feedback.rating}
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                <Box display="flex" justifyContent="center">
                    <Alert icon={<InfoRounded />} variant="outlined" severity="warning">
                        Can not find any feedbacks
                    </Alert>
                </Box>
            )}
        </React.Fragment>
    )
}

export default ListFeedback
