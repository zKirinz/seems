import React, { useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { Box, CircularProgress } from '@mui/material'

import FeedbackItem from '../FeedbackItem'

const Loading = () => (
    <Box display="flex" justifyContent="center" my={3}>
        <CircularProgress thickness={4} color="secondary" />
    </Box>
)

const ListFeedback = ({ feedbacks }) => {
    const [cloneFeedbacks, setCloneFeedbacks] = useState([])
    const [hasMore, setHasMore] = useState(true)

    const fakeFetchMore = () => {
        if (cloneFeedbacks.length >= feedbacks.length) {
            setHasMore(false)
            return
        }
        setTimeout(() => {
            setCloneFeedbacks((previousValue) => [...previousValue])
        }, 1000)
    }

    return (
        <React.Fragment>
            {cloneFeedbacks.length ? (
                <InfiniteScroll
                    dataLength={cloneFeedbacks.length}
                    loader={<Loading />}
                    hasMore={hasMore}
                    next={fakeFetchMore}
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
                <Box>There is no event available</Box>
            )}
        </React.Fragment>
    )
}

export default ListFeedback
