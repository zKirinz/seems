import React, { useState } from 'react'

import { RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import { useFeedbackAction } from '../../../recoil/feedback'
import CreateFeedBack from './CreateFeedBack'

const FeedBack = ({ eventId }) => {
    const [open, setOpen] = useState(false)
    const { createFeedback } = useFeedbackAction()

    const openHandler = () => {
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
    }
    const createFeedBackHandler = (feedbackData) => {
        const feedbackWithEventId = { ...feedbackData, eventId: eventId }
        createFeedback(feedbackData)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    return (
        <React.Fragment>
            <Fab
                color="primary"
                sx={{ position: 'absolute', bottom: 100, right: 50 }}
                onClick={openHandler}
            >
                <Tooltip title="Feedback">
                    <RateReview />
                </Tooltip>
            </Fab>
            <CreateFeedBack
                open={open}
                onClose={closeHandler}
                onCreateFeedback={createFeedBackHandler}
            />
        </React.Fragment>
    )
}

export default FeedBack
