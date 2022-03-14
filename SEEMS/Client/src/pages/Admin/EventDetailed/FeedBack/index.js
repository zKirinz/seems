import React, { useState } from 'react'

import { RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import { useFeedbackAction } from '../../../../recoil/feedback'
import ViewListFeedback from './ViewListFeedback'

const FeedBack = ({ eventId }) => {
    const [openViewFeedbacks, setOpenViewFeedbacks] = useState(false)
    const { getFeedbacksOfEvent } = useFeedbackAction()
    const openViewFeedbacksHandler = () => {
        setOpenViewFeedbacks(true)
    }
    const closeViewFeedbacksHandler = () => {
        setOpenViewFeedbacks(false)
    }

    return (
        <React.Fragment>
            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 100, right: 40 }}
                variant="extended"
                onClick={openViewFeedbacksHandler}
            >
                <Tooltip title="Feedback" sx={{ mr: 1 }}>
                    <RateReview />
                </Tooltip>
                Feedback
            </Fab>
            {openViewFeedbacks && (
                <ViewListFeedback
                    open={openViewFeedbacks}
                    onClose={closeViewFeedbacksHandler}
                    eventId={eventId}
                    getFeedbacksOfEvent={getFeedbacksOfEvent}
                />
            )}
        </React.Fragment>
    )
}

export default FeedBack
