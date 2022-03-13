import React from 'react'

import FeedbackItem from '../FeedbackItem'

const ListFeedback = ({ feedbacks }) => {
    return (
        <React.Fragment>
            {feedbacks.length !== 0 &&
                feedbacks.map((feedback) => (
                    <FeedbackItem
                        key={feedback.id}
                        content={feedback.content}
                        rating={feedback.rating}
                    />
                ))}
        </React.Fragment>
    )
}

export default ListFeedback
